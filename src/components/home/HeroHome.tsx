import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, ChevronDown, MessageCircle, Search, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceBlock } from "@/components/PriceBlock";
import { BrazilParticleField, type FieldCenter } from "@/components/home/BrazilParticleField";
import { OFFERS, localizeOffer } from "@/data/offers";
import { useLang, useLocalePath, useT } from "@/i18n";

/**
 * Avisos que aparecem um depois do outro, como notificações chegando.
 * Ficam nas bordas do mapa; o centro é só da logo.
 */
const CHIPS = [
  { icon: Search, pos: "left-0 top-[1%] sm:top-[6%]", delay: "0s" },
  { icon: MessageCircle, pos: "right-0 top-[17%] sm:top-[15%]", delay: "2.6s" },
  { icon: CalendarCheck, pos: "bottom-[1%] left-[4%] sm:bottom-[6%]", delay: "5.2s" },
];

const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#F2A900", "#4285F4", "#34A853", "#EA4335"];

/** Pinta "Google" com as cores do Google e "WhatsApp" de verde, em qualquer idioma. */
function BrandedTitle({ text }: { text: string }) {
  return (
    <>
      {text.split(/(Google|WhatsApp)/).map((part, i) => {
        if (part === "Google") {
          return (
            <span key={i}>
              {[...part].map((ch, j) => (
                <span key={j} style={{ color: GOOGLE_COLORS[j] }}>
                  {ch}
                </span>
              ))}
            </span>
          );
        }
        if (part === "WhatsApp") {
          return (
            <span key={i} style={{ color: "#1DA851" }}>
              {part}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}

export function HeroHome() {
  const t = useT();
  const lang = useLang();
  const lp = useLocalePath();
  const [center, setCenter] = useState<FieldCenter>({ x: 0.5, y: 0.5 });

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-tint to-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(ellipse_at_75%_0%,color-mix(in_oklab,var(--brand-blue)_20%,transparent)_0%,transparent_62%)]" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-4 px-5 pb-10 pt-6 sm:px-6 md:grid-cols-2 md:gap-8 md:pb-20 md:pt-14">
        <div>
          <h1 className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            <BrandedTitle text={t.hero.title} />
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl">
            {t.hero.subtitle}
          </p>

          <div className="mt-5 rounded-2xl border border-brand-blue/25 bg-card/90 p-4 shadow-md shadow-brand-blue/10 backdrop-blur-sm sm:inline-block sm:pr-8 md:mt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t.hero.priceCaption}
            </p>
            <PriceBlock offer={localizeOffer(OFFERS.sites, lang)} size="lg" className="mt-1" />
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center md:mt-6">
            <Button
              asChild
              size="lg"
              className="btn-shine anim-pulse-cta h-14 w-full rounded-full bg-brand-blue px-8 text-base font-semibold text-white hover:bg-brand-blue/90 sm:w-auto"
            >
              <Link to={lp("/agendar")}>
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                {t.hero.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-12 w-full rounded-full px-6 text-base font-medium text-brand-blue hover:bg-brand-blue/10 sm:w-auto"
            >
              <a href="#solucoes">
                {t.hero.seePrices}
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
          <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
            <Video className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
            <span>{t.hero.noCommitment}</span>
          </p>
        </div>

        <div className="relative mx-auto h-[330px] w-full max-w-[560px] sm:h-[420px] md:h-[540px]">
          <BrazilParticleField className="absolute inset-0 h-full w-full" onCenter={setCenter} />

          {/* Logo no centro de massa do mapa, com anéis de alcance saindo dela. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{ left: `${center.x * 100}%`, top: `${center.y * 100}%` }}
          >
            <span className="hero-ring h-44 w-44" />
            <span className="hero-ring h-44 w-44" style={{ animationDelay: "1.8s" }} />
            <div className="absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-card shadow-xl shadow-brand-blue/25 ring-1 ring-brand-blue/20 md:h-24 md:w-24">
                <img
                  src="/caetus-logo.png"
                  alt=""
                  width={64}
                  height={64}
                  className="h-12 w-12 object-contain md:h-16 md:w-16"
                />
              </span>
              <span className="mt-2 whitespace-nowrap rounded-full bg-card px-4 py-1.5 text-lg font-semibold tracking-tight shadow-lg ring-1 ring-brand-blue/20 md:text-2xl">
                Caetus Systems
              </span>
            </div>
          </div>

          {CHIPS.map((c, i) => (
            <span
              key={t.hero.chips[i]}
              aria-hidden="true"
              style={{ animationDelay: c.delay }}
              className={`hero-chip pointer-events-none absolute ${c.pos}`}
            >
              <span
                className={`flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card px-3 py-2 text-xs font-medium shadow-lg sm:px-3.5 sm:text-sm ${
                  i === 1 ? "anim-float-slow" : "anim-float"
                }`}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <c.icon className="h-3.5 w-3.5" />
                </span>
                {t.hero.chips[i]}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
