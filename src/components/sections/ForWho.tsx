import {
  Briefcase,
  Dumbbell,
  ShoppingBag,
  Stethoscope,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/Section";

/** Segmentos com um mini-caso de uso real cada — não só um rótulo. */
const SEGMENTS: { icon: LucideIcon; label: string; useCase: string }[] = [
  {
    icon: UtensilsCrossed,
    label: "Restaurantes",
    useCase: "Cardápio, reservas e pedidos no WhatsApp",
  },
  {
    icon: Stethoscope,
    label: "Clínicas",
    useCase: "Agendamento e lembretes sem telefonema",
  },
  {
    icon: Wrench,
    label: "Oficinas",
    useCase: "Orçamento por foto, direto no WhatsApp",
  },
  {
    icon: ShoppingBag,
    label: "Lojas",
    useCase: "Catálogo, preços e estoque no automático",
  },
  {
    icon: Dumbbell,
    label: "Academias",
    useCase: "Matrículas e cobranças sem papelada",
  },
  {
    icon: Briefcase,
    label: "Escritórios",
    useCase: "Documentos e clientes organizados",
  },
];

export function ForWho() {
  return (
    <Section id="para-quem" tone="brand">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-primary-foreground/70">Para quem é</p>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          Feito para negócios de verdade.
        </h2>
        <p className="mt-4 text-balance text-lg text-primary-foreground/70">
          Se sua empresa atende cliente, ela cabe aqui.
        </p>
      </div>
      <div data-reveal-stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SEGMENTS.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-4 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 transition-colors hover:border-primary-foreground/30"
          >
            <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/10 p-3.5 text-primary-foreground">
              <s.icon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-base font-semibold tracking-tight text-primary-foreground">
                {s.label}
              </h3>
              <p className="mt-0.5 text-sm text-primary-foreground/70">{s.useCase}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
