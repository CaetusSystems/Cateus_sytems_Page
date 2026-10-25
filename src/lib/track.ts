import type { ProductId } from "./lead-schema";

type Trackers = { gtag?: (...args: unknown[]) => void; fbq?: (...args: unknown[]) => void };

/** Conta a conversão (GA4 e Pixel da Meta). Só chamar quando o lead foi enviado com sucesso. */
export function trackLead(
  product: ProductId,
  win: Trackers = globalThis as unknown as Trackers,
): void {
  try {
    win.gtag?.("event", "generate_lead", { product });
  } catch {
    /* bloqueador de anúncios ou erro do tag: não atrapalha o envio */
  }
  try {
    win.fbq?.("track", "Lead", { content_name: product });
  } catch {
    /* idem */
  }
}
