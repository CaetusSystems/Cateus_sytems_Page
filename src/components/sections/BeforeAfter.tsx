import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Check,
  Instagram,
  MessageCircle,
  Search,
  Sparkles,
  StickyNote,
  X,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Antes x Depois — predominantemente visual: cada linha é um "mini estado"
 * (como uma notificação), não uma frase para ler.
 */
type Row = { icon: LucideIcon; text: string; badge: string };

const BEFORE: Row[] = [
  { icon: MessageCircle, text: "WhatsApp", badge: "12 sem resposta" },
  { icon: Search, text: "Google", badge: "não aparece" },
  { icon: Instagram, text: "Redes sociais", badge: "há 4 meses parado" },
  { icon: StickyNote, text: "Informações", badge: "papel e planilha" },
];

const AFTER: Row[] = [
  { icon: MessageCircle, text: "WhatsApp", badge: "respondido às 23h41" },
  { icon: Search, text: "Google", badge: "te acham primeiro" },
  { icon: Instagram, text: "Redes sociais", badge: "publicado esta semana" },
  { icon: StickyNote, text: "Informações", badge: "tudo no lugar" },
];

export function BeforeAfter() {
  const [inView, setInView] = useState(false);
  const [shineBad, setShineBad] = useState(false);
  const [shineGood, setShineGood] = useState(false);
  const [pulseGood, setPulseGood] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const itemsDoneAt = 300 + 400 + BEFORE.length * 120 + 200;
    const t1 = window.setTimeout(() => setShineBad(true), itemsDoneAt);
    const t2 = window.setTimeout(() => setShineBad(false), itemsDoneAt + 1100);
    const t3 = window.setTimeout(() => setShineGood(true), itemsDoneAt + 900);
    const t4 = window.setTimeout(() => setShineGood(false), itemsDoneAt + 2000);
    const t5 = window.setTimeout(() => setPulseGood(true), itemsDoneAt + 2100);
    return () => [t1, t2, t3, t4, t5].forEach(window.clearTimeout);
  }, [inView]);

  return (
    <section id="antes-depois" className="border-t border-border bg-muted/30">
      <div ref={ref} className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Antes e depois</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            A diferença aparece no seu dia.
          </h2>
        </div>

        <div className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* Sem a Caetus */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={cn("ba-card ba-card--bad rounded-2xl border p-7", shineBad && "ba-shine")}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[color-mix(in_oklab,oklch(0.62_0.19_25)_14%,transparent)]">
                <AlertTriangle className="h-4 w-4 text-[oklch(0.55_0.19_25)]" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground/80">
                Sem a Caetus
              </h3>
            </div>
            <div className="space-y-3">
              {BEFORE.map((r, i) => (
                <motion.div
                  key={r.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.45, ease: "easeOut" }}
                  className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/70 px-4 py-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <r.icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="flex-1 text-sm font-medium text-foreground/75">{r.text}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_oklab,oklch(0.62_0.19_25)_12%,transparent)] px-2.5 py-1 text-[11px] font-medium text-[oklch(0.5_0.19_25)]">
                    <X className="h-3 w-3" strokeWidth={3} />
                    {r.badge}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Divisor */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-sm"
            >
              <Sparkles className="h-4 w-4 text-brand-green" />
            </motion.div>
          </div>

          {/* Com a Caetus */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "ba-card ba-card--good rounded-2xl border p-7",
              shineGood && "ba-shine",
              pulseGood && "ba-pulse",
            )}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green/12">
                <Check className="h-4 w-4 text-brand-green" strokeWidth={3} />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Com a Caetus</h3>
            </div>
            <div className="space-y-3">
              {AFTER.map((r, i) => (
                <motion.div
                  key={r.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.45, ease: "easeOut" }}
                  className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/70 px-4 py-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                    <r.icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="flex-1 text-sm font-medium text-foreground/90">{r.text}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-green/12 px-2.5 py-1 text-[11px] font-medium text-brand-green">
                    <Check className="h-3 w-3" strokeWidth={3} />
                    {r.badge}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
