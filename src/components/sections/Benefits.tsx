import { HeartHandshake, ShieldCheck, TrendingUp, Wallet } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";

const BENEFITS = [
  {
    icon: Wallet,
    title: "Custo previsível",
    desc: "Uma mensalidade no lugar de várias contas espalhadas.",
  },
  {
    icon: TrendingUp,
    title: "Você vende mais",
    desc: "Cliente encontrado, respondido e atendido vira venda.",
  },
  {
    icon: HeartHandshake,
    title: "Você sai do gargalo",
    desc: "O negócio deixa de depender de você para tudo.",
  },
  {
    icon: ShieldCheck,
    title: "Você fica tranquilo",
    desc: "Tem alguém cuidando dessa parte — todos os dias.",
  },
];

export function Benefits() {
  return (
    <Section id="beneficios" tone="muted">
      <SectionHeader eyebrow="O que você ganha" title="No fim do mês, é isso que muda." />
      <div data-reveal-stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b) => (
          <div key={b.title} className="rounded-2xl border border-border bg-card p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <b.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
