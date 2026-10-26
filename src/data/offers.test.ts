import { describe, expect, it } from "vitest";
import { HOME_CARDS, OFFERS, priceSentence } from "./offers";

describe("preços das ofertas", () => {
  it("site: R$ 247 em pagamento único e manutenção de R$ 24,90 por mês", () => {
    expect(OFFERS.sites.price).toBe("R$ 247");
    expect(OFFERS.sites.priceLabel).toBe("pagamento único");
    expect(OFFERS.sites.monthly).toBe("+ R$ 24,90 por mês de manutenção");
  });

  it("atendente: R$ 87 por mês, sem mensalidade extra", () => {
    expect(OFFERS.atendente.price).toBe("R$ 87");
    expect(OFFERS.atendente.priceLabel).toBe("por mês");
    expect(OFFERS.atendente.monthly).toBeUndefined();
  });

  it("matrícula: R$ 297 em pagamento único e R$ 96 por mês de manutenção", () => {
    expect(OFFERS.matricula.price).toBe("R$ 297");
    expect(OFFERS.matricula.priceLabel).toBe("pagamento único");
    expect(OFFERS.matricula.monthly).toBe("+ R$ 96 por mês de manutenção");
  });
});

describe("preço cheio riscado", () => {
  it("só o site mostra R$ 500 riscado acima do R$ 247", () => {
    expect(OFFERS.sites.listPrice).toBe("R$ 500");
    expect(OFFERS.atendente.listPrice).toBeUndefined();
    expect(OFFERS.matricula.listPrice).toBeUndefined();
  });

  it("o preço cheio não entra no texto de preço dos dados estruturados", () => {
    expect(priceSentence(OFFERS.sites)).not.toContain("500");
  });
});

describe("cartões da home", () => {
  it("são três e o terceiro é o sistema sob medida, a partir de R$ 297", () => {
    expect(HOME_CARDS.map((c) => c.id)).toEqual(["sites", "atendente", "matricula"]);
    const custom = HOME_CARDS[2];
    expect(custom.name).toBe("Sistema sob medida");
    expect(custom.leadProduct).toBe("sob-medida");
    expect(custom.from).toBe(true);
    expect(custom.price).toBe("R$ 297");
    expect(custom.monthly).toContain("R$ 96");
  });

  it("nenhum texto dos cartões usa travessão", () => {
    const text = JSON.stringify(HOME_CARDS);
    expect(text).not.toMatch(/[—–]/);
  });
});
