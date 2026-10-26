import { motion, useInView, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { useRef } from "react";

const STARS = [0, 1, 2, 3, 4];

/**
 * Cinco estrelas que acendem uma a uma (1, 2, 3, 4, 5) quando entram na tela.
 * Antes de acender (ou sem JavaScript) ficam apagadas, nunca escondidas.
 */
export function FiveStars({
  label,
  className = "h-9 w-9",
  step = 0.16,
  delay = 0,
}: {
  label: string;
  className?: string;
  step?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const on = inView || Boolean(reduce);

  return (
    <span ref={ref} role="img" aria-label={label} className="inline-flex items-center gap-1">
      {STARS.map((i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-flex"
          initial={false}
          animate={
            on
              ? { opacity: 1, scale: reduce ? 1 : [0.5, 1.35, 1] }
              : { opacity: 0.25, scale: 0.7 }
          }
          transition={{ duration: 0.38, delay: delay + i * step, ease: "easeOut" }}
        >
          <Star className={`${className} fill-amber-400 text-amber-400 drop-shadow`} />
        </motion.span>
      ))}
    </span>
  );
}
