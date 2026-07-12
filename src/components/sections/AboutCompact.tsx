import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Section } from "@/components/Section";

/** Quem somos — versão compacta. A história completa vive em /sobre. */
export function AboutCompact() {
  return (
    <Section id="quem-somos">
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-10 md:grid-cols-[240px_1fr]">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-3xl border border-border/70 shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--primary)_35%,transparent)]">
          <img
            src="/Henrique Caetano.jpeg"
            alt="Henrique Caetano, fundador da Caetus Systems"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-primary">Quem somos</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Uma empresa local, que entende empresas locais.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A Caetus Systems nasceu em Lagoa Santa para dar a pequenas empresas a mesma estrutura
            digital das grandes. Quem cuida da sua operação é quem desenvolve: Henrique Caetano,
            com 5 anos de indústria e mais de 2 anos de automação.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground/80">
              <MapPin className="h-4 w-4 text-brand-green" />
              Lagoa Santa e região · remoto para todo o Brasil
            </span>
            <Link
              to="/sobre"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Conhecer a Caetus
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
