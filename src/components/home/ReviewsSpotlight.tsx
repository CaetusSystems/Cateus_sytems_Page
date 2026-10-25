import { ExternalLink, Quote } from "lucide-react";
import { GoogleG } from "@/components/GoogleG";
import { GOOGLE_REVIEWS_URL, REAL_REVIEWS } from "@/data/reviews";
import { useLang, useT } from "@/i18n";

/**
 * Avaliações reais do Google em destaque, logo depois do topo.
 * Só texto, nome e data como foram publicados: nunca nota ou número inventado.
 */
export function ReviewsSpotlight() {
  const t = useT();
  const lang = useLang();
  return (
    <section
      id="avaliacoes"
      className="relative overflow-hidden bg-gradient-to-br from-brand-blue to-[#0a2f8f] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg">
            <GoogleG className="h-6 w-6" />
          </span>
          <p className="text-sm font-medium text-white/80">{t.reviews.badge}</p>
        </div>
        <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          {t.reviews.title}
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {REAL_REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="relative flex flex-col rounded-3xl bg-card p-7 text-card-foreground shadow-2xl shadow-black/25 md:p-8"
            >
              <Quote
                className="absolute right-6 top-6 h-10 w-10 text-brand-blue/15"
                aria-hidden="true"
              />
              <blockquote lang="pt-BR" className="flex-1 text-lg leading-relaxed md:text-xl">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4 border-t border-border pt-5">
                <img
                  src={r.photo}
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-brand-blue/20"
                />
                <span className="min-w-0">
                  <span className="block text-base font-semibold">{r.name}</span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <GoogleG className="h-3.5 w-3.5" />
                    {t.reviews.source} {t.reviews.when[r.name] ?? r.when}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-5 text-sm font-medium text-white ring-1 ring-white/25 transition-colors hover:bg-white/20"
        >
          {t.reviews.seeAll}
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
        {lang !== "pt" && <p className="mt-4 text-sm text-white/70">{t.reviews.languageNote}</p>}
      </div>
    </section>
  );
}
