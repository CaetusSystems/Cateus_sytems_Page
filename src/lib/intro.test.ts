import { describe, expect, it } from "vitest";
import { INTRO_KEY, markIntroSeen, shouldShowIntro } from "./intro";

function fakeStorage(initial: Record<string, string> = {}) {
  const data = { ...initial };
  return {
    getItem: (k: string) => data[k] ?? null,
    setItem: (k: string, v: string) => {
      data[k] = v;
    },
  };
}

describe("animação de abertura", () => {
  it("aparece na primeira visita", () => {
    expect(shouldShowIntro(fakeStorage())).toBe(true);
  });

  it("não volta depois de vista", () => {
    const s = fakeStorage();
    markIntroSeen(s);
    expect(s.getItem(INTRO_KEY)).toBe("1");
    expect(shouldShowIntro(s)).toBe(false);
  });

  it("sem acesso ao armazenamento, não aparece (nunca trava a página)", () => {
    const broken = {
      getItem: () => {
        throw new Error("bloqueado");
      },
      setItem: () => {
        throw new Error("bloqueado");
      },
    };
    expect(shouldShowIntro(broken)).toBe(false);
    expect(() => markIntroSeen(broken)).not.toThrow();
  });
});
