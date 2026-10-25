import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { PriceBlock } from "@/components/PriceBlock";
import { Button } from "@/components/ui/button";
import { HOME_CARDS } from "@/data/offers";

const MORE_LABEL: Record<string, string> = {
  sites: "Saiba mais sobre sites",
  atendente: "Saiba mais sobre o atendente",
  matricula: "Exemplo: sistema de matrícula para escolas",
};

export function ProductCards() {
  return (
    <section id="solucoes" className="border-t border-border bg-tint">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Três soluções, preço claro.
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Comece pela que mais resolve hoje. As outras entram quando fizer sentido.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {HOME_CARDS.map((offer) => (
            <article
              key={offer.name}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-xl hover:shadow-brand-blue/10"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={offer.image}
                  alt={offer.imageAlt}
                  width={480}
                  height={600}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold tracking-tight">{offer.name}</h3>
                <p className="mt-2 flex-1 text-muted-foreground">{offer.promise}</p>
                <PriceBlock offer={offer} className="mt-5" />
                <Button
                  asChild
                  className="btn-shine mt-5 h-12 rounded-full bg-brand-blue text-base text-white hover:bg-brand-blue/90"
                >
                  <Link to={`/agendar?produto=${offer.id}`}>
                    <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                    Agendar demonstração
                  </Link>
                </Button>
                <Link
                  to={offer.path}
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-brand-blue"
                >
                  {MORE_LABEL[offer.id]}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
