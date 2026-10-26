import { describe, expect, it } from "vitest";
import worker from "./index";
import type { Env } from "./lead";

const env = {
  ASSETS: { fetch: async () => new Response("asset", { status: 200 }) },
} as unknown as Env;

const call = (url: string) => worker.fetch(new Request(url), env);

describe("worker: endereços e redirecionamentos", () => {
  it("www vai para o domínio sem www, mantendo caminho e parâmetros", async () => {
    const res = await call("https://www.caetussystems.com.br/blog?utm_source=ig");
    expect(res.status).toBe(301);
    expect(res.headers.get("Location")).toBe("https://caetussystems.com.br/blog?utm_source=ig");
  });

  it("o endereço antigo do atendente continua redirecionando", async () => {
    const res = await call("https://caetussystems.com.br/produtos/bot-whatsapp?x=1");
    expect(res.status).toBe(301);
    expect(res.headers.get("Location")).toBe("/atendente-whatsapp?x=1");
  });

  it("o formulário de criação de site segue na Vercel (upload de arquivos)", async () => {
    const res = await call("https://caetussystems.com.br/formulario_criacao_sites");
    expect(res.status).toBe(302);
    expect(res.headers.get("Location")).toBe(
      "https://cateus-sytems-page.vercel.app/formulario_criacao_sites",
    );
  });

  it("o resto vai para os arquivos do site", async () => {
    const res = await call("https://caetussystems.com.br/agendar");
    expect(await res.text()).toBe("asset");
  });
});
