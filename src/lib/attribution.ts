/**
 * Origem da visita (campanha). A primeira captura da sessão fica guardada para
 * valer mesmo depois de navegar entre páginas, e vai junto com o lead.
 */
export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  landing?: string;
};

type Store = Pick<Storage, "getItem" | "setItem">;

const KEY = "caetus_attr_v1";
const PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

function defaultStore(): Store | undefined {
  try {
    return globalThis.sessionStorage;
  } catch {
    return undefined;
  }
}

export function readAttribution(storage: Store | undefined = defaultStore()): Attribution {
  try {
    const raw = storage?.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

function fromUrl(search: string): Attribution {
  const params = new URLSearchParams(search);
  const found: Attribution = {};
  for (const name of PARAMS) {
    const value = params.get(name);
    if (value) found[name] = value.slice(0, 200);
  }
  return found;
}

export function captureAttribution(
  search: string,
  path: string,
  storage: Store | undefined = defaultStore(),
): Attribution {
  const stored = readAttribution(storage);
  if (Object.keys(stored).length > 0) return stored;
  const found = fromUrl(search);
  if (Object.keys(found).length === 0) return {};
  const attribution = { ...found, landing: path };
  try {
    storage?.setItem(KEY, JSON.stringify(attribution));
  } catch {
    /* storage bloqueado: a visita ainda vale, só não persiste */
  }
  return attribution;
}

export function isCampaignVisit(
  search: string,
  storage: Store | undefined = defaultStore(),
): boolean {
  const isCampaign = (a: Attribution) => Boolean(a.utm_source || a.gclid || a.fbclid);
  return isCampaign(fromUrl(search)) || isCampaign(readAttribution(storage));
}
