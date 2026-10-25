import { describe, expect, it } from "vitest";
import worker from "./index";
import type { Env } from "./lead";

const env: Env = {
  ASSETS: { fetch: async () => new Response("asset", { status: 200 }) },
  RESEND_API_KEY: "k",
  LEAD_TO: "a@b.c",
};

describe("worker routing", () => {
  it("redirects the old atendente url to the new page", async () => {
    const res = await worker.fetch(
      new Request("https://caetussystems.com.br/produtos/bot-whatsapp?utm_source=instagram"),
      env,
    );
    expect(res.status).toBe(301);
    expect(res.headers.get("Location")).toBe("/atendente-whatsapp?utm_source=instagram");
  });

  it("serves other paths from the static assets", async () => {
    const res = await worker.fetch(new Request("https://caetussystems.com.br/blog"), env);
    expect(await res.text()).toBe("asset");
  });
});
