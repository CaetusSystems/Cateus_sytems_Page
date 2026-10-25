type Fbq = ((...args: unknown[]) => void) & { queue: unknown[]; loaded: boolean };

/** Carrega o Pixel da Meta só quando o ID existe (VITE_META_PIXEL_ID). Sem ID, não injeta nada. */
export function initPixel(id: string | undefined): void {
  if (!id || typeof document === "undefined") return;
  const w = window as unknown as { fbq?: Fbq };
  if (w.fbq) return;
  const queue: unknown[] = [];
  const fbq = Object.assign((...args: unknown[]) => void queue.push(args), {
    queue,
    loaded: true,
  }) as Fbq;
  w.fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  fbq("init", id);
  fbq("track", "PageView");
}
