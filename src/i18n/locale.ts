export const LANGS = ["pt", "en", "es"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_LABELS: Record<Lang, string> = { pt: "Português", en: "English", es: "Español" };
const HREFLANG: Record<Lang, string> = { pt: "pt-BR", en: "en", es: "es" };

const PREFIXED = /^\/(en|es)(?=\/|$)/;

/** Português não tem prefixo; inglês e espanhol vivem em /en e /es. */
export function langFromPath(pathname: string): Lang {
  const m = PREFIXED.exec(pathname);
  return m ? (m[1] as Lang) : "pt";
}

/** Rota em português, sem o prefixo de idioma. */
export function stripLang(pathname: string): string {
  const rest = pathname.replace(PREFIXED, "");
  const clean = rest.length > 1 ? rest.replace(/\/+$/, "") : rest;
  return clean === "" ? "/" : clean;
}

/** Coloca o prefixo do idioma num caminho (aceita consulta e âncora). */
export function localePath(path: string, lang: Lang): string {
  const cut = path.search(/[?#]/);
  const pathname = cut === -1 ? path : path.slice(0, cut);
  const tail = cut === -1 ? "" : path.slice(cut);
  const base = stripLang(pathname);
  if (lang === "pt") return `${base}${tail}`;
  return `/${lang}${base === "/" ? "" : base}${tail}`;
}

/** Endereço da página atual no outro idioma, mantendo consulta e âncora. */
export function switchLangHref(pathname: string, search: string, hash: string, to: Lang): string {
  return localePath(`${stripLang(pathname)}${search}${hash}`, to);
}

/** Versões da mesma página para <link rel="alternate" hreflang>. */
export function alternates(ptPath: string) {
  return [
    ...LANGS.map((l) => ({ hreflang: HREFLANG[l], href: localePath(ptPath, l) })),
    { hreflang: "x-default", href: localePath(ptPath, "pt") },
  ];
}

/** Páginas que existem em inglês e espanhol; o resto (blog, sobre, modelos) só em português. */
export const TRANSLATED_PATHS = [
  "/",
  "/criacao-de-sites",
  "/atendente-whatsapp",
  "/sistema-de-matricula",
  "/agendar",
  "/obrigado",
] as const;

export function isTranslatedPath(pathname: string): boolean {
  return (TRANSLATED_PATHS as readonly string[]).includes(stripLang(pathname));
}
