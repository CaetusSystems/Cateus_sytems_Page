import {
  Briefcase,
  Dumbbell,
  ShoppingBag,
  Stethoscope,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";

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
    <Section id="para-quem">
      <SectionHeader
        eyebrow="Para quem é"
        title="Feito para negócios de verdade."
        lead="Se sua empresa atende cliente, ela cabe aqui."
      />
      <div data-reveal-stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SEGMENTS.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-primary/10 p-3.5 text-primary">
              <s.icon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-base font-semibold tracking-tight">{s.label}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{s.useCase}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
