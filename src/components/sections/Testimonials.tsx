import { Quote } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { TESTIMONIALS } from "@/data/testimonials";

/**
 * Depoimentos — estrutura pronta para receber os reais.
 * Enquanto forem placeholders, os cards se apresentam honestamente como
 * "espaço reservado" (nunca inventamos depoimento).
 */
export function Testimonials() {
  return (
    <Section id="depoimentos" tone="muted">
      <SectionHeader
        eyebrow="O que nossos clientes dizem"
        title="Esse espaço é dos nossos clientes."
        lead="Estamos coletando os primeiros depoimentos — em breve, histórias reais aqui."
      />
      <div data-reveal-stagger className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={`${t.role}-${i}`}
            className="flex flex-col rounded-2xl border border-dashed border-border bg-card/60 p-7"
          >
            <Quote className="h-6 w-6 text-primary/30" />
            {t.placeholder ? (
              <div className="mt-4 flex-1 space-y-2" aria-hidden>
                <div className="h-3 w-full rounded-full bg-muted" />
                <div className="h-3 w-5/6 rounded-full bg-muted" />
                <div className="h-3 w-2/3 rounded-full bg-muted" />
              </div>
            ) : (
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">
                “{t.quote}”
              </blockquote>
            )}
            <figcaption className="mt-6">
              <p className="text-sm font-semibold">{t.placeholder ? "Em breve" : t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
