import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Biblioteca de blocos visuais animados para posts do blog — extraída do
 * primeiro post ("futuro-do-seo-com-ia") para dar aos posts novos a mesma
 * cara de produto Caetus (não texto corrido). Ver `.claude/skills/blog-writer/`
 * para o checklist de quando usar cada um.
 */

/** Revela o conteúdo com fade-up ao entrar na viewport — use em quase tudo. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Trecho do título/lead em destaque (azul da marca) — ex: title={<>Frase normal <Highlight>parte que importa</Highlight></>} */
export function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="text-primary">{children}</span>;
}

type FlowStepData = { icon: LucideIcon; label: string };

/** Diagrama "A → B → C" com ícones — para mostrar um antes/depois de processo. */
export function FlowSteps({
  steps,
  highlightLast,
}: {
  steps: FlowStepData[];
  highlightLast?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center gap-3 md:gap-4">
          <Reveal delay={i * 0.15} y={12}>
            <FlowStepCard
              icon={s.icon}
              label={s.label}
              tone={
                highlightLast && i === steps.length - 1 ? "green" : i === 0 ? "primary" : "muted"
              }
            />
          </Reveal>
          {i < steps.length - 1 && <FlowArrow />}
        </div>
      ))}
    </div>
  );
}

function FlowStepCard({
  icon: Icon,
  label,
  tone = "muted",
}: {
  icon: LucideIcon;
  label: string;
  tone?: "muted" | "primary" | "green";
}) {
  const toneClass =
    tone === "primary"
      ? "bg-primary text-primary-foreground border-primary"
      : tone === "green"
        ? "border-[color:var(--brand-green)] bg-[color:color-mix(in_oklab,var(--brand-green)_10%,var(--card))] text-foreground"
        : "bg-card text-foreground border-border";
  return (
    <div
      className={`flex min-w-[140px] flex-col items-center gap-2 rounded-2xl border px-4 py-4 text-center shadow-sm ${toneClass}`}
    >
      <Icon className="h-6 w-6" aria-hidden="true" />
      <span className="text-xs font-medium leading-tight">{label}</span>
    </div>
  );
}

function FlowArrow() {
  return (
    <motion.div
      animate={{ x: [0, 6, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      className="text-muted-foreground"
      aria-hidden="true"
    >
      <ArrowRight className="h-5 w-5" />
    </motion.div>
  );
}

type ComparisonItem = { icon: LucideIcon; title: string; subtitle?: string; desc: string };

/** Grid de 2-4 cards com ícone — para comparar conceitos (ex: SEO x AEO x GEO). */
export function ComparisonGrid({ items }: { items: ComparisonItem[] }) {
  const cols = items.length >= 4 ? "md:grid-cols-4" : items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <div className={`grid gap-4 ${cols}`}>
      {items.map((c, i) => {
        const Icon = c.icon;
        return (
          <Reveal key={c.title} delay={i * 0.1}>
            <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{c.title}</h3>
              {c.subtitle && (
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {c.subtitle}
                </p>
              )}
              <p className="mt-3 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

type BeforeAfterSide = { label: string; items: string[] };

/** 2 cards lado a lado — "sem" (vermelho, X) vs "com" (verde, check). */
export function BeforeAfterGrid({
  before,
  after,
}: {
  before: BeforeAfterSide;
  after: BeforeAfterSide;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Reveal>
        <div className="h-full rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-destructive">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-destructive/40 text-xs">
              ✕
            </span>
            {before.label}
          </div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {before.items.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="h-full rounded-2xl border border-[color:var(--brand-green)]/40 bg-[color:color-mix(in_oklab,var(--brand-green)_8%,var(--card))] p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--brand-green)]">
            <Check className="h-4 w-4" aria-hidden="true" /> {after.label}
          </div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {after.items.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

/** Checklist que marca os itens em sequência ao entrar na viewport. */
export function AnimatedChecklist({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [checked, setChecked] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setChecked((c) => {
        if (c >= items.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 260);
    return () => clearInterval(id);
  }, [inView, items.length]);

  return (
    <div ref={ref} className="mx-auto max-w-2xl">
      <ul className="space-y-2">
        {items.map((item, i) => {
          const isDone = i < checked;
          return (
            <li
              key={item}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                isDone
                  ? "border-[color:var(--brand-green)]/40 bg-[color:color-mix(in_oklab,var(--brand-green)_8%,var(--card))]"
                  : "border-border bg-card"
              }`}
            >
              <motion.span
                initial={false}
                animate={{ scale: isDone ? 1 : 0.8, opacity: isDone ? 1 : 0.5 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                  isDone
                    ? "border-[color:var(--brand-green)] bg-[color:var(--brand-green)] text-white"
                    : "border-border bg-background text-muted-foreground"
                }`}
              >
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              </motion.span>
              <span className={`text-sm ${isDone ? "text-foreground" : "text-muted-foreground"}`}>
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type TimelineStep = { tag: string; title: string; desc: string; icon: LucideIcon };

/** Linha do tempo vertical com marcos alternados — para evolução de um processo. */
export function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="relative mt-4">
      <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" />
      <div className="space-y-10">
        {steps.map((item, i) => (
          <TimelineRow key={item.tag} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

function TimelineRow({ item, index }: { item: TimelineStep; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isRight = index % 2 === 1;
  const Icon = item.icon;

  return (
    <div ref={ref} className="relative grid grid-cols-9 items-center gap-4">
      <motion.div
        initial={{ opacity: 0, x: isRight ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`col-span-9 md:col-span-4 ${isRight ? "md:col-start-6 md:text-left" : "md:text-right"}`}
      >
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">{item.tag}</p>
          <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
        </div>
      </motion.div>

      <div className="col-span-9 flex justify-center md:col-span-1 md:col-start-5">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-background text-primary shadow-sm"
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </motion.div>
      </div>
    </div>
  );
}

/** Bloco de destaque com fundo gradiente (CTA no meio do artigo). */
export function CalloutBlock({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary to-[color:color-mix(in_oklab,var(--primary)_75%,black)] p-8 text-center text-primary-foreground shadow-lg md:p-10">
        <Icon className="mx-auto h-8 w-8 opacity-90" aria-hidden="true" />
        <div className="mt-4 text-balance text-xl font-semibold md:text-2xl">{children}</div>
      </div>
    </Reveal>
  );
}
