type Store = Pick<Storage, "getItem" | "setItem">;

function defaultStore(): Store | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

/**
 * Verdadeira só na primeira vez que o visitante chega a uma tela (e já marca a visita).
 * Sem armazenamento devolve falso: a tela aparece completa, sem animação de entrada.
 */
export function claimFirstVisit(key: string, storage: Store | undefined = defaultStore()): boolean {
  if (!storage) return false;
  const full = `caetus_first_${key}_v1`;
  try {
    if (storage.getItem(full)) return false;
    storage.setItem(full, "1");
    return true;
  } catch {
    return false;
  }
}
