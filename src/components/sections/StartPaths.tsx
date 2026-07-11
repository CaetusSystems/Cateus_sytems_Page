import { ArrowRight, LayoutDashboard, MessageCircle, Search, TrendingUp } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { waUrl } from "@/lib/constants";

const GOALS = [
  {
    icon: MessageCircle,
    goal: "Quero automatizar meu WhatsApp",
    result: "Clientes respondidos em segundos, dia e noite.",
    message: "Olá! Quero automatizar o WhatsApp da minha empresa.",
  },
  {
    icon: LayoutDashboard,
    goal: "Quero organizar minha empresa",
    result: "Tudo num lugar só, sem planilha espalhada.",
    message: "Olá! Quero organizar melhor a operação da minha empresa.",
  },
  {
    icon: TrendingUp,
    goal: "Quero vender mais",
    result: "Mais gente encontrando e comprando de você.",
    message: "Olá! Quero vender mais com a ajuda da Caetus.",
  },
  {
    icon: Search,
    goal: "Quero aparecer no Google",
    result: "Sua empresa na frente quando procuram seu serviço.",
    message: "Olá! Quero que minha empresa apareça no Google.",
  },
];

/**
 * "Comece pequeno" — portas de entrada por objetivo do cliente.
 * Filosofia Caetus: resolver um problema de cada vez, sem vender
 * transformação gigante no primeiro contato.
 */
export function StartPaths() {
  return (
    <Section id="comece-pequeno" tone="muted">
      <SectionHeader
        eyebrow="Comece pequeno"
        title="Comece pelo problema que mais incomoda hoje."
        lead="Não precisa contratar tudo. Um passo de cada vez."
      />

      <div data-reveal-stagger className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
        {GOALS.map((g) => (
          <a
            key={g.goal}
            href={waUrl(g.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-brand-green/60"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-brand-green group-hover:text-white">
              <g.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">“{g.goal}”</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{g.result}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-green">
              <WhatsAppIcon className="h-4 w-4" />
              Começar por aqui
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        ))}
      </div>

      <p className="mt-10 text-center text-base font-medium text-foreground/80">
        Depois, evoluímos juntos — no ritmo da sua empresa.
      </p>
    </Section>
  );
}
