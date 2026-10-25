import { describe, expect, it } from "vitest";
import { WHATSAPP_URL } from "./constants";
import { buildLeadWhatsAppUrl } from "./lead-message";

describe("buildLeadWhatsAppUrl", () => {
  it("includes product, business and name", () => {
    const url = buildLeadWhatsAppUrl({
      product: "sites",
      business: "Barbearia Silva",
      name: "João",
    });
    expect(url).toContain("wa.me/5531972131824");
    const text = decodeURIComponent(url.split("text=")[1]);
    expect(text).toContain("Criação de sites");
    expect(text).toContain("Barbearia Silva");
    expect(text).toContain("João");
  });

  it("falls back to the generic message for an empty lead", () => {
    expect(buildLeadWhatsAppUrl({})).toBe(WHATSAPP_URL);
  });
});
