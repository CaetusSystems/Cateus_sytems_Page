import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  ChevronDown,
  MessageCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceBlock } from "@/components/PriceBlock";
import { BrazilParticleField } from "@/components/home/BrazilParticleField";
import { OFFERS } from "@/data/offers";

const CHIPS = [
  { icon: Search, text: "Achado no Google", className: "left-[2%] top-[10%] anim-float" },
  {
    icon: MessageCircle,
    text: "Cliente chamou no WhatsApp",
    className: "right-[0%] top-[46%] anim-float-slow",
  },
  {
    icon: CalendarCheck,
    text: "Matrícula recebida",
    className: "left-[4%] bottom-[8%] anim-float",
  },
];

export function HeroHome() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-tint to-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[640px] bg-[radial-gradient(ellipse_at_75%_0%,color-mix(in_oklab,var(--brand-blue)_20%,transparent)_0%,transparent_62%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-5 pb-12 pt-8 sm:px-6 md:grid-cols-[1fr_1fr] md:gap-8 md:pb-20 md:pt-14">
        <div>
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
            Seu negócio achado no Google, atendendo no WhatsApp e organizado.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground md:text-xl">
            Site, atendente e sistema para pequenos negócios. Você vê funcionando no seu caso antes
            de decidir.
          </p>

          <div className="mt-6 flex items-end gap-4 rounded-2xl border border-brand-blue/20 bg-card/80 p-4 shadow-sm backdrop-blur-sm sm:inline-flex">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Site profissional</p>
              <PriceBlock offer={OFFERS.sites} className="mt-1" />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="btn-shine anim-pulse-cta h-14 rounded-full bg-brand-blue px-8 text-base font-semibold text-white hover:bg-brand-blue/90"
            >
              <Link to="/agendar">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Agendar demonstração
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-14 rounded-full px-6 text-base font-medium text-brand-blue hover:bg-brand-blue/10"
            >
              <a href="#solucoes">
                Ver preços
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-brand-blue" aria-hidden="true" />
            Sem compromisso. Você escolhe o horário.
          </p>
        </div>

        <div className="relative mx-auto h-[300px] w-full max-w-[560px] md:h-[520px]">
          <BrazilParticleField className="absolute inset-0 h-full w-full" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card/90 shadow-xl shadow-brand-blue/20 ring-1 ring-brand-blue/20 backdrop-blur md:h-20 md:w-20">
              <img
                src="/caetus-logo.png"
                alt=""
                width={56}
                height={56}
                className="h-10 w-10 object-contain md:h-14 md:w-14"
              />
            </span>
            <span className="mt-2 rounded-full bg-card/90 px-4 py-1.5 text-lg font-semibold tracking-tight shadow-lg ring-1 ring-brand-blue/20 backdrop-blur md:text-2xl">
              Caetus Systems
            </span>
          </div>
          {CHIPS.map((c) => (
            <span
              key={c.text}
              aria-hidden="true"
              className={`pointer-events-none absolute hidden items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium shadow-lg sm:flex ${c.className}`}
            >
              <c.icon className="h-4 w-4 text-brand-blue" />
              {c.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
