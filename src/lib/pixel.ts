type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  push: unknown;
  queue: unknown[];
  loaded: boolean;
  version: string;
};

/**
 * Carrega o Pixel da Meta só quando o ID existe (VITE_META_PIXEL_ID). Sem ID, não injeta nada.
 * Segue o snippet oficial: depois que o fbevents.js carrega, ele troca `callMethod` e as
 * chamadas seguintes (como o evento Lead) deixam de ir para a fila.
 */
export function initPixel(id: string | undefined): void {
  if (!id || typeof document === "undefined") return;
  const w = window as unknown as { fbq?: Fbq; _fbq?: Fbq };
  if (w.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  w.fbq = fbq;
  if (!w._fbq) w._fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  fbq("init", id);
  fbq("track", "PageView");
}
