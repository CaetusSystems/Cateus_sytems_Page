import { useEffect } from "react";
import { alternates, type Lang } from "@/i18n/locale";
import { absolutizeJsonLd, SITE_URL } from "@/lib/json-ld";

interface HeadOptions {
  title: string;
  description?: string;
  canonical?: string;
  og?: Record<string, string>;
  jsonLd?: object;
  /** ex.: "noindex, nofollow" para páginas que não devem aparecer no Google */
  robots?: string;
  /** idioma da página: ajusta <html lang> */
  lang?: Lang;
  /** caminho em português da página, para listar as versões em outros idiomas (hreflang) */
  alternatesOf?: string;
}

/** Garante URL absoluta — Google recomenda canonical absoluto, não relativo. */
function toAbsoluteUrl(url: string): string {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

// Pure Vite SPA has no server-side rendering, so per-route <head> tags
// (title, description, canonical, JSON-LD) are applied on mount instead of
// being rendered server-side. The homepage doesn't need this — its tags are
// already static in index.html, which crawlers see immediately.
const HTML_LANG: Record<Lang, string> = { pt: "pt-BR", en: "en", es: "es" };

export function useDocumentHead({
  title,
  description,
  canonical,
  og,
  jsonLd,
  robots,
  lang,
  alternatesOf,
}: HeadOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (description) upsertMeta("name", "description", description);
    if (robots) upsertMeta("name", "robots", robots);
    if (og)
      Object.entries(og).forEach(([key, content]) =>
        upsertMeta("property", key, key === "og:url" ? toAbsoluteUrl(content) : content),
      );

    let canonicalEl: HTMLLinkElement | null = null;
    if (canonical) {
      canonicalEl = document.head.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute("href", toAbsoluteUrl(canonical));
    }

    let jsonLdEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      jsonLdEl = document.createElement("script");
      jsonLdEl.type = "application/ld+json";
      jsonLdEl.textContent = JSON.stringify(absolutizeJsonLd(jsonLd));
      document.head.appendChild(jsonLdEl);
    }

    const previousLang = document.documentElement.lang;
    if (lang) document.documentElement.lang = HTML_LANG[lang];

    const alternateEls: HTMLLinkElement[] = [];
    if (alternatesOf) {
      for (const alt of alternates(alternatesOf)) {
        const el = document.createElement("link");
        el.setAttribute("rel", "alternate");
        el.setAttribute("hreflang", alt.hreflang);
        el.setAttribute("href", toAbsoluteUrl(alt.href));
        document.head.appendChild(el);
        alternateEls.push(el);
      }
    }

    return () => {
      document.title = previousTitle;
      if (lang) document.documentElement.lang = previousLang;
      alternateEls.forEach((el) => el.remove());
      if (jsonLdEl) document.head.removeChild(jsonLdEl);
    };
  }, [title, description, canonical, og, jsonLd, robots, lang, alternatesOf]);
}
