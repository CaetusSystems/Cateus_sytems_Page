import type { LeadInput, ProductId } from "./lead-schema";
import { trackLead } from "./track";

type Store = Pick<Storage, "getItem" | "setItem">;

export type SubmitResult = { ok: true } | { ok: false; reason: "invalid" | "network" | "server" };

type Deps = {
  fetchImpl?: typeof fetch;
  track?: (product: ProductId) => void;
  storage?: Store;
};

const LEAD_KEY = "caetus_lead_v1";
let pending: Promise<SubmitResult> | undefined;

function defaultStore(): Store | undefined {
  try {
    return globalThis.sessionStorage;
  } catch {
    return undefined;
  }
}

export function readStoredLead(storage: Store | undefined = defaultStore()): LeadInput | undefined {
  try {
    const raw = storage?.getItem(LEAD_KEY);
    return raw ? (JSON.parse(raw) as LeadInput) : undefined;
  } catch {
    return undefined;
  }
}

async function send(lead: LeadInput, deps: Deps): Promise<SubmitResult> {
  const { fetchImpl = fetch, track = trackLead, storage = defaultStore() } = deps;
  let res: Response;
  try {
    res = await fetchImpl("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
  } catch {
    return { ok: false, reason: "network" };
  }
  if (res.status === 400) return { ok: false, reason: "invalid" };
  if (!res.ok) return { ok: false, reason: "server" };
  // Um host estático que devolve a página em vez da API também responde 200: só conta com o ok do Worker.
  try {
    const body = (await res.json()) as { ok?: boolean };
    if (body.ok !== true) return { ok: false, reason: "server" };
  } catch {
    return { ok: false, reason: "server" };
  }

  try {
    storage?.setItem(LEAD_KEY, JSON.stringify(lead));
  } catch {
    /* storage bloqueado: /obrigado cai no WhatsApp genérico */
  }
  track(lead.product);
  return { ok: true };
}

/** Envia o lead. Uma segunda chamada enquanto a primeira não terminou reaproveita a mesma resposta. */
export function submitLead(lead: LeadInput, deps: Deps = {}): Promise<SubmitResult> {
  if (pending) return pending;
  pending = send(lead, deps).finally(() => {
    pending = undefined;
  });
  return pending;
}
