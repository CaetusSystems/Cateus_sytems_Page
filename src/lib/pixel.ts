/** Carrega o Pixel da Meta só quando o ID existe (VITE_META_PIXEL_ID). Sem ID, não injeta nada. */
export function initPixel(id: string | undefined): void {
  if (!id || typeof document === "undefined") return;
  const w = window as unknown as Record<string, unknown> & {
    fbq?: ((...a: unknown[]) => void) & { q?: unknown[]; queue?: unknown[]; loaded?: boolean };
  };
  if (w.fbq) return;
  const queue: unknown[] = [];
  const fbq = ((...args: unknown[]) => void queue.push(args)) as NonNullable<typeof w.fbq>;
  fbq.queue = queue;
  fbq.loaded = true;
  w.fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  fbq("init", id);
  fbq("track", "PageView");
}
