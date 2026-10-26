import { describe, expect, it } from "vitest";
import { handleLead, type Env } from "./lead";

const env: Env = {
  ASSETS: { fetch: async () => new Response("asset") },
  RESEND_API_KEY: "re_test_key",
  LEAD_TO: "dono@example.com",
};

const lead = {
  product: "sites",
  business: "Barbearia Silva",
  name: "João Silva",
  phone: "(31) 97213-1824",
  link: "@barbeariasilva",
  attribution: { utm_source: "instagram", utm_campaign: "lancamento" },
};

function post(body: unknown) {
  return new Request("https://caetussystems.com.br/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function fakeFetch(status = 200) {
  const calls: { url: string; init: RequestInit }[] = [];
  const impl = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    return new Response(JSON.stringify({ id: "x" }), { status });
  }) as unknown as typeof fetch;
  return { calls, impl };
}

describe("handleLead", () => {
  it("answers 405 for GET", async () => {
    const res = await handleLead(new Request("https://x.com/api/lead"), env, fakeFetch().impl);
    expect(res.status).toBe(405);
  });

  it("answers 400 with field errors for an invalid phone", async () => {
    const res = await handleLead(post({ ...lead, phone: "abc" }), env, fakeFetch().impl);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.errors.phone).toBe("Informe um WhatsApp com DDD");
  });

  it("answers 400 for malformed json", async () => {
    const res = await handleLead(post("{nope"), env, fakeFetch().impl);
    expect(res.status).toBe(400);
  });

  it("honeypot returns ok without calling resend", async () => {
    const f = fakeFetch();
    const res = await handleLead(post({ ...lead, website: "http://spam" }), env, f.impl);
    expect(res.status).toBe(200);
    expect(f.calls).toHaveLength(0);
  });

  it("sends one email with product, name, phone and attribution", async () => {
    const f = fakeFetch();
    const res = await handleLead(post(lead), env, f.impl);
    expect(res.status).toBe(200);
    expect(f.calls).toHaveLength(1);
    const call = f.calls[0];
    expect(call.url).toBe("https://api.resend.com/emails");
    const headers = call.init.headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer re_test_key");
    const sent = JSON.parse(call.init.body as string);
    expect(sent.to).toEqual(["dono@example.com"]);
    expect(sent.subject).toBe("Novo lead: Criação de sites - Barbearia Silva");
    expect(sent.text).toContain("5531972131824");
    expect(sent.text).toContain("utm_source: instagram");
  });

  it("mostra o idioma do site em que a pessoa preencheu, quando não é o português", async () => {
    const f = fakeFetch();
    const res = await handleLead(post({ ...lead, lang: "en" }), env, f.impl);
    expect(res.status).toBe(200);
    const sent = JSON.parse(f.calls[0].init.body as string);
    expect(sent.text).toContain("Idioma do site: English");
  });

  it("recusa um idioma desconhecido", async () => {
    const res = await handleLead(post({ ...lead, lang: "fr" }), env, fakeFetch().impl);
    expect(res.status).toBe(400);
  });

  it("escapes html in name and business and keeps accents and emoji in text", async () => {
    const f = fakeFetch();
    await handleLead(
      post({ ...lead, name: "<script>alert(1)</script>", business: "Café ☕ do Zé" }),
      env,
      f.impl,
    );
    const sent = JSON.parse(f.calls[0].init.body as string);
    expect(sent.html).toContain("&lt;script&gt;");
    expect(sent.html).not.toContain("<script>");
    expect(sent.text).toContain("Café ☕ do Zé");
  });

  it("answers 502 when resend fails", async () => {
    const res = await handleLead(post(lead), env, fakeFetch(500).impl);
    expect(res.status).toBe(502);
    expect((await res.json()).ok).toBe(false);
  });

  it("answers 500 without leaking when the api key is missing", async () => {
    const res = await handleLead(post(lead), { ...env, RESEND_API_KEY: "" }, fakeFetch().impl);
    expect(res.status).toBe(500);
    expect(await res.text()).not.toContain("RESEND");
  });
});
