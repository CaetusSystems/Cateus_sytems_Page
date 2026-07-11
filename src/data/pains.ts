import { MessageCircle, Search, Table2, UserRound, type LucideIcon } from "lucide-react";
import type { ProductCategory } from "./products";

/** Checklist de dores — seção "Como podemos ajudar sua empresa?". */
export type Pain = {
  icon: LucideIcon;
  /** frase curta, na voz do empresário */
  text: string;
  /** categoria do catálogo que resolve essa dor (usada como âncora/filtro) */
  solvedBy: ProductCategory;
};

export const PAINS: Pain[] = [
  {
    icon: MessageCircle,
    text: "Perco cliente por demora no WhatsApp",
    solvedBy: "atender-clientes",
  },
  {
    icon: Search,
    text: "Quem procura no Google não me encontra",
    solvedBy: "vender-mais",
  },
  {
    icon: Table2,
    text: "Minha empresa vive refém de planilha e papel",
    solvedBy: "organizar-a-empresa",
  },
  {
    icon: UserRound,
    text: "Faço tudo sozinho, o dia não rende",
    solvedBy: "economizar-tempo",
  },
];

/** Bloco de impacto — o que a rotina de hoje custa. */
export const IMPACT_ITEMS = [
  "Clientes esperando resposta",
  "Orçamento esquecido",
  "Tarefas repetitivas",
  "Informações espalhadas",
];

export const IMPACT_PUNCHLINE = "Todos os dias, isso custa tempo, clientes e dinheiro.";
