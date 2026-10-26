import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, Eye, Plus, Rocket } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { LeadForm } from "@/components/lead/LeadForm";
import { Button } from "@/components/ui/button";
import { PriceBlock } from "@/components/PriceBlock";
import { AssistantDemoSection } from "@/components/product/AssistantDemoSection";
import { OFFERS, localizeOffer, priceSentence, type OfferId } from "@/data/offers";
import { getProductPage } from "@/data/product-pages";
import { GOOGLE_REVIEWS_URL } from "@/data/reviews";
import { useLang, useLocalePath, useT } from "@/i18n";
import { useDocumentHead } from "@/lib/useDocumentHead";

const STEP_ICONS = [CalendarCheck, Eye, Rocket];

/**
 * Modelo único das páginas de produto (campanha): promessa e preço no topo,
 * o que está incluso, caso real, como funciona, dúvidas, formulário e venda cruzada.
 * Os textos vêm de src/data/product-pages.ts.
 */
export function ProductPage({ id }: { id: OfferId }) {
  const t = useT();
  const lang = useLang();
  const lp = useLocalePath();
  const offer = localizeOffer(OFFERS[id], lang);
  const page = getProductPage(id, lang);
  const tp = t.productPage;
  const ctaHref = page.acao === "assinar" && page.checkoutUrl ? page.checkoutUrl : "#agendar";

  useDocumentHead({
    title: `${page.title} | Caetus Systems`,
    description: page.description,
    canonical: lp(offer.path),
    og: {
      "og:title": page.title,
      "og:description": page.description,
      "og:url": lp(offer.path),
      "og:type": "website",
      "og:image": `https://caetussystems.com.br${offer.image}`,
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: offer.name,
          description: page.promise,
          provider: {
            "@type": "Organization",
            name: "Caetus Systems",
            url: "https://caetussystems.com.br",
          },
          areaServed: "BR",
          offers: {
            "@type": "Offer",
            priceCurrency: "BRL",
            price: page.schemaPrice,
            description: priceSentence(offer, lang),
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: page.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    },
    lang,
    alternatesOf: OFFERS[id].path,
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <main>
        {/* 1. Topo */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_at_75%_0%,color-mix(in_oklab,var(--brand-blue)_16%,transparent)_0%,transparent_62%)]" />
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-10 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:pb-20 md:pt-16">
            <div>
              <p className="text-sm font-medium text-brand-blue">{offer.name}</p>
              <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
                {page.promise}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">{page.support}</p>
              <PriceBlock offer={offer} size="lg" className="mt-6" />
              <Button
                asChild
                size="lg"
                className="btn-shine mt-6 h-13 w-full rounded-full bg-brand-blue px-7 text-base text-white hover:bg-brand-blue/90 sm:w-auto"
              >
                <a href={ctaHref}>
                  {page.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <p className="mt-3 text-sm text-muted-foreground">{tp.noCommitment}</p>
            </div>
            <div className="mx-auto w-full max-w-[340px]">
              <div className="anim-float overflow-hidden rounded-[2.2rem] border border-border bg-brand-night p-2.5 shadow-2xl shadow-brand-blue/20">
                <img
                  src={offer.image}
                  alt={offer.imageAlt}
                  width={480}
                  height={600}
                  fetchPriority="high"
                  className="aspect-[4/5] w-full rounded-[1.7rem] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {id === "atendente" && <AssistantDemoSection />}

        {/* 2. O que está incluso */}
        <section className="border-t border-border bg-tint">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {tp.includes}
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {page.includes.map((item) => (
                <li
                  key={item.text}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Caso real */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 md:py-20">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {tp.clients}
            </h2>
            <figure className="mt-8 rounded-3xl border border-border bg-card p-6">
              <blockquote lang="pt-BR" className="text-base leading-relaxed">
                “{page.realCase.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <img
                  src={page.realCase.photo}
                  alt=""
                  width={44}
                  height={44}
                  loading="lazy"
                  className="h-11 w-11 rounded-full object-cover"
                />
                <span>
                  <span className="block font-medium">{page.realCase.name}</span>
                  <span className="block text-sm text-muted-foreground">
                    {tp.source} {t.reviews.when[page.realCase.name] ?? page.realCase.when}
                  </span>
                </span>
              </figcaption>
            </figure>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-brand-blue"
            >
              {tp.seeGoogle}
            </a>
          </div>
        </section>

        {/* 4. Como funciona */}
        <section className="border-t border-border bg-brand-night text-white">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20">
            <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {tp.how}
            </h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {page.steps.map((s, i) => (
                <li key={s.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue shadow-lg shadow-brand-blue/40">
                    {(() => {
                      const Icon = STEP_ICONS[i];
                      return <Icon className="h-6 w-6" aria-hidden="true" />;
                    })()}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">
                    <span className="sr-only">
                      {tp.step} {i + 1}:{" "}
                    </span>
                    {s.title}
                  </h3>
                  <p className="mt-2 text-white/70">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5. Perguntas */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 md:py-20">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {tp.faq}
            </h2>
            <div className="mt-8 divide-y divide-border rounded-3xl border border-border bg-card">
              {page.faq.map((item) => (
                <details key={item.q} className="group p-5 open:bg-muted/30">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4">
                    <h3 className="text-base font-semibold">{item.q}</h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45">
                      <Plus className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Formulário */}
        <section
          id="agendar"
          className="scroll-mt-16 border-t border-border bg-brand-night text-white"
        >
          <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 py-14 sm:px-6 md:grid-cols-2 md:py-20">
            <div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                {tp.formTitle}
              </h2>
              <p className="mt-4 text-lg text-white/70">{tp.formText}</p>
              <ul className="mt-6 space-y-1 text-sm text-white/60">
                {t.hours.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
            <div className="text-foreground">
              <LeadForm key={page.product} defaultProduct={page.product} />
            </div>
          </div>
        </section>

        {/* 7. Combine com */}
        <section className="border-t border-border bg-tint">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {tp.combine}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {page.combine.map((other) => {
                const o = localizeOffer(OFFERS[other], lang);
                return (
                  <Link
                    key={other}
                    to={lp(o.path)}
                    className="group flex gap-4 rounded-3xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-lg"
                  >
                    <img
                      src={o.image}
                      alt=""
                      width={96}
                      height={120}
                      loading="lazy"
                      className="h-28 w-24 shrink-0 rounded-2xl object-cover"
                    />
                    <span className="flex flex-col">
                      <span className="text-lg font-semibold tracking-tight">{o.name}</span>
                      <span className="mt-1 flex-1 text-sm text-muted-foreground">
                        {page.combineText[other]}
                      </span>
                      <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue">
                        {priceSentence(o, lang)}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
