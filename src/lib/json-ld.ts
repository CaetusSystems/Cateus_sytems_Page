export const SITE_URL = "https://caetussystems.com.br";

const URL_KEYS = new Set(["@id", "url", "item", "image", "logo"]);

/**
 * Dados estruturados precisam de endereços absolutos. As páginas escrevem
 * caminhos relativos ("/blog/post"); aqui eles ganham o domínio do site.
 */
export function absolutizeJsonLd<T>(value: T): T {
  if (Array.isArray(value)) return value.map((v) => absolutizeJsonLd(v)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [
        k,
        typeof v === "string" && URL_KEYS.has(k) && v.startsWith("/")
          ? `${SITE_URL}${v}`
          : absolutizeJsonLd(v),
      ]),
    ) as T;
  }
  return value;
}
