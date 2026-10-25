import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { en } from "./en";
import { es } from "./es";
import { langFromPath, localePath, type Lang } from "./locale";
import { pt, type Messages } from "./pt";

export * from "./locale";
export type { Messages } from "./pt";

export const MESSAGES: Record<Lang, Messages> = { pt, en, es };

/** Idioma da página atual, pela rota. */
export function useLang(): Lang {
  return langFromPath(useLocation().pathname);
}

/** Textos da interface no idioma da página atual. */
export function useT(): Messages {
  return MESSAGES[useLang()];
}

/** Devolve uma função que coloca o prefixo do idioma atual em um caminho interno. */
export function useLocalePath(): (path: string) => string {
  const lang = useLang();
  return useCallback((path: string) => localePath(path, lang), [lang]);
}

/** Troca {chave} pelo valor em um texto com marcadores. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? ""));
}
