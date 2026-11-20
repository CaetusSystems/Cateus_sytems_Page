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
  // Navegador automatizado (o pré-render do build roda assim): não carrega o Pixel, senão o script
  // injetado vai parar gravado no HTML estático e conta visitas falsas.
  if (typeof navigator !== "undefined" && navigator.webdriver) return;
  const w = window as unknown as { fbq?: Fbq; _fbq?: Fbq };
  if (w.fbq) return;
  // Igual ao snippet oficial da Meta: a fila guarda o objeto `arguments`, que o fbevents.js espera.
  const fbq = function () {
    // eslint-disable-next-line prefer-rest-params
    if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments as unknown as unknown[]);
    // eslint-disable-next-line prefer-rest-params
    else fbq.queue.push(arguments);
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
