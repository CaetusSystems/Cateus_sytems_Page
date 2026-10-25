import { describe, expect, it } from "vitest";
import { MESSAGES, fill } from "./index";

function strings(value: unknown, path = ""): [string, string][] {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, `${path}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => strings(v, path ? `${path}.${k}` : k));
  }
  return [];
}

const pt = strings(MESSAGES.pt);

describe("textos nos três idiomas", () => {
  for (const lang of ["en", "es"] as const) {
    const other = strings(MESSAGES[lang]);

    it(`${lang} tem as mesmas chaves que o português`, () => {
      expect(other.map(([p]) => p)).toEqual(pt.map(([p]) => p));
    });

    it(`${lang} não deixa texto vazio onde o português tem texto`, () => {
      const ptByPath = Object.fromEntries(pt);
      for (const [p, v] of other) {
        if (ptByPath[p] !== "") expect(v, p).not.toBe("");
      }
    });

    it(`${lang} mantém os marcadores {n} e {name}`, () => {
      const ptByPath = Object.fromEntries(pt);
      for (const [p, v] of other) {
        const want = (ptByPath[p].match(/\{\w+\}/g) ?? []).sort();
        const got = (v.match(/\{\w+\}/g) ?? []).sort();
        expect(got, p).toEqual(want);
      }
    });
  }

  it("nenhum texto público usa travessão", () => {
    for (const lang of ["pt", "en", "es"] as const) {
      for (const [p, v] of strings(MESSAGES[lang])) expect(v, `${lang}:${p}`).not.toMatch(/[—–]/);
    }
  });

  it("os preços batem com os do português nos três idiomas", () => {
    const money = (s: string) =>
      (s.match(/R\$\s?\d+(?:[.,]\d+)?/g) ?? []).map((m) => m.replace(/[.,]/g, ","));
    const faqPt = money(MESSAGES.pt.faq.items[0].a);
    for (const lang of ["en", "es"] as const) {
      expect(money(MESSAGES[lang].faq.items[0].a)).toEqual(faqPt);
    }
  });

  it("fill troca os marcadores", () => {
    expect(fill("Passo {n} de 2", { n: 1 })).toBe("Passo 1 de 2");
    expect(fill("Olá, {name}!", { name: "Ana" })).toBe("Olá, Ana!");
  });
});
