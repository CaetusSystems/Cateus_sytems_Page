import { useEffect, useRef, useState } from "react";

/**
 * Observa se o elemento está visível na viewport.
 * Usado pelas demos animadas para pausar timers/rAF quando fora da tela
 * (economia de CPU/bateria — o público acessa de celular).
 */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView } as const;
}
