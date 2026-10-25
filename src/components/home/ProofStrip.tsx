import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { TEMPLATES } from "@/data/templates";
import { REAL_REVIEWS, GOOGLE_REVIEWS_URL } from "@/data/reviews";

export function ProofStrip() {
  // A lista é duplicada para a faixa andar em laço contínuo (-50%).
  const loop = [...TEMPLATES, ...TEMPLATES];

  return (
    <section id="prova" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Quem já trabalhou com a gente conta como foi.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {REAL_REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col rounded-3xl border border-border bg-card p-6"
            >
              <blockquote className="flex-1 text-base leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <img
                  src={r.photo}
                  alt=""
                  width={44}
                  height={44}
                  loading="lazy"
                  className="h-11 w-11 rounded-full object-cover"
                />
                <span>
                  <span className="block font-medium">{r.name}</span>
                  <span className="block text-sm text-muted-foreground">
                    Avaliação no Google, {r.when}
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
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue"
        >
          Ver no Google
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="marquee-pause overflow-hidden border-t border-border bg-muted/30 py-10">
        <p className="mx-auto mb-6 flex max-w-6xl items-center justify-between px-5 text-sm font-medium text-muted-foreground sm:px-6">
          Alguns dos nossos modelos de site
          <Link to="/templates" className="inline-flex items-center gap-1 text-brand-blue">
            Ver todos
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </p>
        <div className="anim-marquee flex w-max gap-4 px-4">
          {loop.map((t, i) => (
            <img
              key={`${t.slug}-${i}`}
              src={t.image}
              alt={i < TEMPLATES.length ? `Modelo de site: ${t.name}` : ""}
              aria-hidden={i < TEMPLATES.length ? undefined : true}
              width={320}
              height={200}
              loading="lazy"
              className="h-44 w-72 shrink-0 rounded-2xl border border-border object-cover object-left-top shadow-sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
