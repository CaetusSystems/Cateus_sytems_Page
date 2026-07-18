import { ArrowRight, HeartHandshake, MessagesSquare, Rocket } from "lucide-react";
import { Section } from "@/components/Section";

const STEPS = [
  {
    icon: MessagesSquare,
    title: "Conversamos",
    desc: "Você conta como a empresa funciona. Sem formulário, sem tecniquês.",
  },
  {
    icon: Rocket,
    title: "Montamos",
    desc: "Em poucas semanas, sua solução está no ar e funcionando.",
  },
  {
    icon: HeartHandshake,
    title: "Cuidamos todo dia",
    desc: "Acompanhamos, ajustamos e evoluímos junto com você.",
  },
];

export function HowItWorks() {
  return (
    <Section id="como-funciona" tone="brand">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-primary-foreground/70">Como funciona</p>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          Três passos. Nenhuma complicação.
        </h2>
      </div>
      <div data-reveal-stagger className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <div
            key={s.title}
            className="relative rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-8 text-center"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10 text-primary-foreground">
              <s.icon className="h-7 w-7" />
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight text-primary-foreground">
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">{s.desc}</p>
            {i < STEPS.length - 1 && (
              <span className="absolute right-[-16px] top-1/2 hidden -translate-y-1/2 md:block">
                <ArrowRight className="h-4 w-4 text-primary-foreground/25" />
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-primary-foreground/60">
        Não entregamos um projeto e desaparecemos — sua operação continua evoluindo com a empresa.
      </p>
    </Section>
  );
}
