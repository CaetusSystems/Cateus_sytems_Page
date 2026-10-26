import { describe, expect, it } from "vitest";
import { absolutizeJsonLd } from "./json-ld";

const SITE = "https://caetussystems.com.br";

describe("absolutizeJsonLd", () => {
  it("transforma caminhos em URLs absolutas nas chaves de endereço", () => {
    const out = absolutizeJsonLd({
      "@id": "/blog/post#article",
      url: "/",
      image: "/caetus-logo.png",
      mainEntityOfPage: { "@type": "WebPage", "@id": "/blog/post" },
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Início", item: "/" }],
    });
    expect(out).toEqual({
      "@id": `${SITE}/blog/post#article`,
      url: `${SITE}/`,
      image: `${SITE}/caetus-logo.png`,
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/post` },
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` }],
    });
  });

  it("não mexe em URLs já absolutas nem em textos que começam com barra", () => {
    const out = absolutizeJsonLd({
      url: "https://www.instagram.com/Caetus_Systems",
      name: "/barra no começo do nome",
      acceptedAnswer: { text: "/texto" },
    });
    expect(out).toEqual({
      url: "https://www.instagram.com/Caetus_Systems",
      name: "/barra no começo do nome",
      acceptedAnswer: { text: "/texto" },
    });
  });
});
