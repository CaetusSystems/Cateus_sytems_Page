import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LayoutGrid, Maximize2, X } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { FinalCta } from "@/components/sections/FinalCta";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { waUrl } from "@/lib/constants";
import { useDocumentHead } from "@/lib/useDocumentHead";
import { TEMPLATES, TEMPLATE_CATEGORIES, type TemplateCategory } from "@/data/templates";

export default function Templates() {
  useDocumentHead({
    title: "Catálogo de sites, Caetus Systems",
    description:
      "Modelos de sites já entregues pela Caetus Systems para negócios locais: festas, varejo, recreativo infantil e serviços. Veja os prints e peça o seu.",
    canonical: "/templates",
    og: {
      "og:title": "Catálogo de sites, Caetus Systems",
      "og:description":
        "Modelos de sites já entregues pela Caetus Systems para negócios locais. Veja os prints e peça o seu.",
      "og:url": "/templates",
      "og:type": "website",
    },
  });

  const [filter, setFilter] = useState<TemplateCategory | "all">("all");
  const [lightbox, setLightbox] = useState<{ image: string; name: string } | null>(null);
  const shown = filter === "all" ? TEMPLATES : TEMPLATES.filter((t) => t.category === filter);
  const categoryById = Object.fromEntries(TEMPLATE_CATEGORIES.map((c) => [c.id, c]));

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <Nav />
      <main id="conteudo">
        {/* Hero */}
        <section className="relative overflow-hidden bg-background">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,color-mix(in_oklab,var(--primary)_16%,transparent),transparent)]"
          />
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                <LayoutGrid className="h-4 w-4" />
                Catálogo de sites
              </span>
              <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Modelos de site que já <span className="text-primary">colocamos no ar</span>.
              </h1>
              <p className="mt-4 text-balance text-lg text-muted-foreground">
                Cada print abaixo é de um site real, feito sob medida para um negócio local, do
                jeito que o seu também pode ficar. Clique numa imagem para ampliar.
              </p>
            </div>
          </div>
        </section>

        {/* Catálogo */}
        <Section tone="muted" size="compact" className="border-t-0">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 text-center">
            <span className="text-sm font-medium text-primary">Escolha por segmento</span>
            <p className="text-balance text-base text-muted-foreground">
              Filtre pelo segmento mais parecido com o seu para ter uma ideia mais próxima do
              resultado final.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2" role="tablist">
            {[{ id: "all" as const, label: "Todos", icon: LayoutGrid }, ...TEMPLATE_CATEGORIES].map(
              (c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === c.id}
                  onClick={() => setFilter(c.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    filter === c.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  <c.icon className="h-3.5 w-3.5" />
                  {c.label}
                </button>
              ),
            )}
          </div>

          <motion.div layout className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((t) => (
                <motion.article
                  key={t.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => setLightbox({ image: t.image, name: t.name })}
                    className="relative block aspect-[16/10] w-full overflow-hidden bg-muted/60"
                    aria-label={`Ampliar print do site ${t.name}`}
                  >
                    <img
                      src={t.image}
                      alt={`Print do site modelo de ${t.name}, ${t.segment}`}
                      loading="lazy"
                      style={{ objectPosition: t.imagePosition ?? "left top" }}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-all duration-200 group-hover:bg-foreground/30 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground">
                        <Maximize2 className="h-3.5 w-3.5" />
                        Ampliar print
                      </span>
                    </div>
                    {t.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-brand-green px-2.5 py-1 text-[11px] font-medium text-white shadow-sm">
                        {t.badge}
                      </span>
                    )}
                  </button>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold tracking-tight">{t.name}</h3>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-primary">
                      <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-primary/10">
                        {(() => {
                          const Icon = categoryById[t.category].icon;
                          return <Icon className="h-3 w-3" />;
                        })()}
                      </span>
                      {t.segment}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {t.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </Section>

        {/* CTA intermediário */}
        <Section size="compact">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Não achou um parecido com o seu negócio?
            </h2>
            <p className="text-balance text-muted-foreground">
              Cada site é feito do zero a partir da identidade real da sua empresa. Esses modelos
              são só um ponto de partida do nível de acabamento.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <a href={waUrl("Olá! Vi o catálogo de sites da Caetus Systems e quero um orçamento.")} target="_blank" rel="noopener noreferrer">
                Pedir um orçamento
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </Section>

        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-full max-w-4xl overflow-hidden rounded-2xl border border-border/40 bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Fechar"
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-background"
              >
                <X className="h-4 w-4" />
              </button>
              <img
                src={lightbox.image}
                alt={`Print ampliado do site modelo de ${lightbox.name}`}
                className="max-h-[85vh] w-full object-contain object-top"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
