import { ArrowDown, Check, Clock } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { IMPACT_ITEMS, IMPACT_PUNCHLINE, PAINS } from "@/data/pains";

/**
 * "Como podemos ajudar sua empresa?" — checklist visual de dores
 * seguido do bloco de impacto que faz a ponte para as soluções.
 */
export function HelpSection() {
  return (
    <Section id="como-ajudamos" tone="muted">
      <SectionHeader
        eyebrow="Como podemos ajudar sua empresa?"
        title="Marque o que acontece aí hoje."
      />

      <div data-reveal-stagger className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
        {PAINS.map((p) => (
          <a
            key={p.text}
            href="#solucoes"
            data-pain={p.solvedBy}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <p.icon className="h-7 w-7" />
            </span>
            <span className="flex-1 text-base font-medium leading-snug text-foreground/90">
              “{p.text}”
            </span>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-border transition-colors group-hover:border-brand-green group-hover:bg-brand-green">
              <Check className="h-4 w-4 text-transparent transition-colors group-hover:text-white" />
            </span>
          </a>
        ))}
      </div>

      {/* Bloco de impacto — ponte visual para as soluções */}
      <div className="mx-auto mt-14 max-w-2xl text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {IMPACT_ITEMS.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground"
            >
              <Clock className="h-3.5 w-3.5 text-primary/60" />
              {item}
            </span>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background">
            <ArrowDown className="h-4 w-4 text-primary" />
          </span>
        </div>
        <p className="mt-6 text-balance text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {IMPACT_PUNCHLINE}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Cada um desses problemas tem uma solução pronta logo abaixo.
        </p>
      </div>
    </Section>
  );
}
