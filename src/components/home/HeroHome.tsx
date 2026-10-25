import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OFFER_LIST } from "@/data/offers";

const CHIPS = [
  { icon: Search, text: "Achado no Google", className: "left-[-4%] top-[14%] anim-float" },
  { icon: MessageCircle, text: "Cliente chamou no WhatsApp", className: "right-[-6%] top-[46%] anim-float-slow" },
  { icon: CalendarCheck, text: "Matrícula recebida", className: "left-[2%] bottom-[8%] anim-float" },
];

export function HeroHome() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(ellipse_at_70%_0%,color-mix(in_oklab,var(--brand-blue)_16%,transparent)_0%,transparent_62%)]" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-10 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:pb-24 md:pt-16">
        <div>
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
            Seu negócio achado no Google, atendendo no WhatsApp e organizado.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground md:text-xl">
            Site, atendente e sistema para pequenos negócios. Você vê funcionando no seu caso antes
            de decidir.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="btn-shine h-13 rounded-full bg-brand-blue px-7 text-base text-white hover:bg-brand-blue/90"
            >
              <Link to="/agendar">
                Agendar demonstração
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-13 rounded-full px-7 text-base">
              <a href="#solucoes">Ver soluções</a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Sem compromisso. Você escolhe o horário.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[340px] md:max-w-[380px]" aria-hidden="false">
          <div className="anim-float rounded-[2.4rem] border border-border bg-brand-night p-2.5 shadow-2xl shadow-brand-blue/20">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.9rem] bg-muted">
              {OFFER_LIST.map((offer, i) => (
                <img
                  key={offer.id}
                  src={offer.image}
                  alt={offer.imageAlt}
                  width={480}
                  height={600}
                  fetchPriority={i === 0 ? "high" : undefined}
                  style={{ animationDelay: `${i * 4}s` }}
                  className="anim-scene absolute inset-0 h-full w-full object-cover"
                />
              ))}
            </div>
          </div>
          {CHIPS.map((c) => (
            <span
              key={c.text}
              aria-hidden="true"
              className={`absolute hidden items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium shadow-lg sm:flex ${c.className}`}
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
