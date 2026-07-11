import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { waUrl } from "@/lib/constants";
import { PRODUCTS, PRODUCT_CATEGORIES, type ProductCategory } from "@/data/products";

/** Mini-animação em loop: linhas de planilha virando tarefas concluídas sozinhas. */
function AutomationPulse() {
  return (
    <div className="automation-pulse mt-5 space-y-2" aria-hidden>
      {[0, 1, 2].map((i) => (
        <div key={i} className="automation-row flex items-center gap-2" style={{ "--row-i": i } as React.CSSProperties}>
          <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-primary/10">
            <span className="automation-row-bar absolute inset-y-0 left-0 rounded-full bg-primary/50" />
          </span>
          <span className="automation-row-check flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Catálogo de soluções, organizado pela dor do empresário.
 * Filtros por chip preparam a seção para crescer sem virar um paredão.
 * O botão "Saiba mais" abre o WhatsApp hoje; quando /produtos/<slug>
 * existir, basta trocar o href para a rota.
 */
export function Products() {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");
  const shown = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <Section id="solucoes">
      <SectionHeader
        eyebrow="Soluções para sua empresa"
        title="Cada problema daqui tem solução pronta."
        lead="Escolha pela dor — o nome técnico é o que menos importa."
      />

      {/* Filtro por dor */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2" role="tablist">
        {[{ id: "all" as const, label: "Todas" }, ...PRODUCT_CATEGORIES].map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={filter === c.id}
            onClick={() => setFilter(c.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              filter === c.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p) => {
            const category = PRODUCT_CATEGORIES.find((c) => c.id === p.category)!;
            return (
              <motion.article
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "flex flex-col rounded-2xl border p-7 transition-colors",
                  p.highlight
                    ? "border-primary/30 bg-gradient-to-br from-primary/[0.06] via-card to-brand-green/[0.06] hover:border-primary/50"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <p.icon className="h-7 w-7" />
                  </span>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                    {category.label}
                  </span>
                </div>

                {/* Benefício primeiro; nome técnico como subtítulo */}
                <h3 className="mt-6 text-balance text-xl font-semibold leading-snug tracking-tight">
                  {p.benefit}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">{p.techName}</p>

                {p.highlight && <AutomationPulse />}

                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild variant="outline" className="mt-6 w-full rounded-full">
                  <a href={waUrl(p.ctaMessage)} target="_blank" rel="noopener noreferrer">
                    Saiba mais
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
