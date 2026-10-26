import { describe, expect, it } from "vitest";
import { claimFirstVisit } from "./first-visit";

function fakeStorage() {
  const data: Record<string, string> = {};
  return {
    getItem: (k: string) => data[k] ?? null,
    setItem: (k: string, v: string) => {
      data[k] = v;
    },
  };
}

describe("primeira visita a uma tela", () => {
  it("é verdadeira só na primeira vez", () => {
    const s = fakeStorage();
    expect(claimFirstVisit("agendar", s)).toBe(true);
    expect(claimFirstVisit("agendar", s)).toBe(false);
  });

  it("cada tela tem a sua marca", () => {
    const s = fakeStorage();
    claimFirstVisit("a", s);
    expect(claimFirstVisit("b", s)).toBe(true);
  });

  it("sem armazenamento, nunca anima (a tela aparece completa)", () => {
    const broken = {
      getItem: () => {
        throw new Error("bloqueado");
      },
      setItem: () => {
        throw new Error("bloqueado");
      },
    };
    expect(claimFirstVisit("agendar", broken)).toBe(false);
    expect(claimFirstVisit("agendar", undefined)).toBe(false);
  });
});
