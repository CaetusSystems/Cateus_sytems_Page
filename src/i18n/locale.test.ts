import { describe, expect, it } from "vitest";
import {
  alternates,
  isTranslatedPath,
  langFromPath,
  localePath,
  stripLang,
  switchLangHref,
  TRANSLATED_PATHS,
} from "./locale";

describe("idioma pela rota", () => {
  it("sem prefixo é português", () => {
    expect(langFromPath("/")).toBe("pt");
    expect(langFromPath("/criacao-de-sites")).toBe("pt");
    expect(langFromPath("/blog/ia-whatsapp-business-2026")).toBe("pt");
  });

  it("/en e /es mudam o idioma, na raiz e nas páginas", () => {
    expect(langFromPath("/en")).toBe("en");
    expect(langFromPath("/en/")).toBe("en");
    expect(langFromPath("/en/agendar")).toBe("en");
    expect(langFromPath("/es")).toBe("es");
    expect(langFromPath("/es/sistema-de-matricula")).toBe("es");
  });

  it("não confunde um caminho que só começa com as mesmas letras", () => {
    expect(langFromPath("/english")).toBe("pt");
    expect(langFromPath("/espaco")).toBe("pt");
  });
});

describe("caminhos", () => {
  it("stripLang tira o prefixo e devolve a rota em português", () => {
    expect(stripLang("/en")).toBe("/");
    expect(stripLang("/en/agendar")).toBe("/agendar");
    expect(stripLang("/es/")).toBe("/");
    expect(stripLang("/agendar")).toBe("/agendar");
  });

  it("localePath põe o prefixo, sem duplicar, e mantém consulta e âncora", () => {
    expect(localePath("/", "pt")).toBe("/");
    expect(localePath("/", "en")).toBe("/en");
    expect(localePath("/agendar", "es")).toBe("/es/agendar");
    expect(localePath("/en/agendar", "es")).toBe("/es/agendar");
    expect(localePath("/agendar?produto=sites", "en")).toBe("/en/agendar?produto=sites");
    expect(localePath("/#solucoes", "en")).toBe("/en#solucoes");
  });

  it("switchLangHref troca o idioma da página atual mantendo a consulta", () => {
    expect(switchLangHref("/en/agendar", "?produto=sites", "", "pt")).toBe(
      "/agendar?produto=sites",
    );
    expect(switchLangHref("/", "", "", "es")).toBe("/es");
  });
});

describe("hreflang", () => {
  it("lista as três versões e o x-default em português", () => {
    expect(alternates("/criacao-de-sites")).toEqual([
      { hreflang: "pt-BR", href: "/criacao-de-sites" },
      { hreflang: "en", href: "/en/criacao-de-sites" },
      { hreflang: "es", href: "/es/criacao-de-sites" },
      { hreflang: "x-default", href: "/criacao-de-sites" },
    ]);
  });
});

describe("páginas traduzidas", () => {
  it("só as páginas de venda existem em inglês e espanhol", () => {
    expect(TRANSLATED_PATHS).toEqual([
      "/",
      "/criacao-de-sites",
      "/atendente-whatsapp",
      "/sistema-de-matricula",
      "/agendar",
      "/obrigado",
    ]);
    expect(isTranslatedPath("/en/agendar")).toBe(true);
    expect(isTranslatedPath("/blog")).toBe(false);
    expect(isTranslatedPath("/sobre")).toBe(false);
  });
});
