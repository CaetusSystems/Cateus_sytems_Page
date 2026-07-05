import { useEffect } from "react";

interface HeadOptions {
  title: string;
  description?: string;
  canonical?: string;
  og?: Record<string, string>;
  jsonLd?: object;
}

// Pure Vite SPA has no server-side rendering, so per-route <head> tags
// (title, description, canonical, JSON-LD) are applied on mount instead of
// being rendered server-side. The homepage doesn't need this — its tags are
// already static in index.html, which crawlers see immediately.
export function useDocumentHead({ title, description, canonical, og, jsonLd }: HeadOptions) {
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
    if (og) Object.entries(og).forEach(([key, content]) => upsertMeta("property", key, content));

    let canonicalEl: HTMLLinkElement | null = null;
    if (canonical) {
      canonicalEl = document.head.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute("href", canonical);
    }

    let jsonLdEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      jsonLdEl = document.createElement("script");
      jsonLdEl.type = "application/ld+json";
      jsonLdEl.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(jsonLdEl);
    }

    return () => {
      document.title = previousTitle;
      if (jsonLdEl) document.head.removeChild(jsonLdEl);
    };
  }, [title, description, canonical, og, jsonLd]);
}
