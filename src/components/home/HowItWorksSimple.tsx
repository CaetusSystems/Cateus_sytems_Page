import { CalendarCheck, Eye, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: CalendarCheck,
    title: "Você agenda a demonstração",
    text: "Conta rápido sobre o seu negócio e escolhe o melhor horário.",
  },
  {
    icon: Eye,
    title: "Vê como ficaria",
    text: "Mostramos a solução funcionando no seu caso, antes de você decidir.",
  },
  {
    icon: Rocket,
    title: "Seu negócio no ar",
    text: "Você aprova e a gente coloca tudo para funcionar e cuida do resto.",
  },
];

export function HowItWorksSimple() {
  return (
    <section id="como-funciona" className="border-t border-border bg-brand-night text-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24">
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          Do primeiro contato ao seu negócio no ar.
        </h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue text-white">
                <s.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                <span className="sr-only">Passo {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-2 text-white/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
