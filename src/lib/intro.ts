export const INTRO_KEY = "caetus_intro_seen_v2";

type Store = Pick<Storage, "getItem" | "setItem">;

function defaultStore(): Store | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

/** A abertura só roda na primeira visita; sem armazenamento, nunca roda. */
export function shouldShowIntro(storage: Store | undefined = defaultStore()): boolean {
  if (!storage) return false;
  try {
    return !storage.getItem(INTRO_KEY);
  } catch {
    return false;
  }
}

export function markIntroSeen(storage: Store | undefined = defaultStore()): void {
  try {
    storage?.setItem(INTRO_KEY, "1");
  } catch {
    /* sem armazenamento: a abertura simplesmente não volta a ser marcada */
  }
}

/**
 * Solta a rolagem do body. A abertura trava a rolagem enquanto roda; se um HTML
 * pré-renderizado (ou uma montagem anterior) deixou `overflow: hidden` gravado,
 * quem já viu a abertura ficaria sem rolar a página.
 */
export function releaseScrollLock(
  body: { style: { overflow: string } } | undefined = typeof document === "undefined"
    ? undefined
    : document.body,
): void {
  if (body) body.style.overflow = "";
}
