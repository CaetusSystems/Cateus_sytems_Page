import { Link } from "react-router-dom";
import { ArrowRight, Globe } from "lucide-react";
import { TEMPLATES } from "@/data/templates";
import { useT } from "@/i18n";

/** Navalha de Ouro é um modelo novo, ainda não entregue a um cliente. */
const DELIVERED = TEMPLATES.filter((t) => t.slug !== "barbearia-navalha-de-ouro");

export function DeliveredSites() {
  const t = useT();
  return (
    <section id="sites-entregues" className="border-t border-border bg-tint">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-sm font-medium text-brand-blue">
              <Globe className="h-4 w-4" aria-hidden="true" />
              {t.delivered.badge}
            </p>
            <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {t.delivered.title}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">{t.delivered.subtitle}</p>
          </div>
          <Link
            to="/templates"
            className="inline-flex min-h-11 items-center gap-1.5 font-medium text-brand-blue"
          >
            {t.delivered.seeAll}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="-mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {DELIVERED.map((tpl) => (
            <li key={tpl.slug} className="w-[82%] shrink-0 snap-center sm:w-auto">
              <Link
                to="/templates"
                className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-xl hover:shadow-brand-blue/10"
              >
                <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 truncate rounded-full bg-background px-3 py-0.5 text-xs text-muted-foreground">
                    {tpl.name}
                  </span>
                </div>
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={tpl.image}
                    alt={`Site de ${tpl.name}, ${t.delivered.segments[tpl.slug] ?? tpl.segment}`}
                    width={632}
                    height={395}
                    loading="lazy"
                    className="h-full w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-lg font-semibold tracking-tight">{tpl.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.delivered.segments[tpl.slug] ?? tpl.segment}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
