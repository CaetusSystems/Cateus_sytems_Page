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
