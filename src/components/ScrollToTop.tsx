import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router não reseta o scroll ao navegar entre rotas (comportamento
 * padrão de SPA) — sem isto, um link do tipo "leia o post" abre a página
 * nova já rolada para onde a página anterior estava.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
