import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { OFFER_LIST } from "@/data/offers";

export function ProductCards() {
  return (
    <section id="solucoes" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Três soluções, preço claro.
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Comece pela que mais resolve hoje. As outras entram quando fizer sentido.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {OFFER_LIST.map((offer) => (
            <Link
              key={offer.id}
              to={offer.path}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-xl hover:shadow-brand-blue/10"
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
                <p className="mt-5">
                  <span className="text-3xl font-semibold tracking-tight text-brand-blue">
                    {offer.price}
                  </span>{" "}
                  <span className="text-sm text-muted-foreground">{offer.priceNote}</span>
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-medium text-brand-blue">
                  Agendar demonstração
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
