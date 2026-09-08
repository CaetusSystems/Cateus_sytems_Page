import { Baby, PartyPopper, Scissors, Store, type LucideIcon } from "lucide-react";

export type TemplateCategory =
  | "eventos-festas"
  | "varejo-personalizados"
  | "recreativo-infantil"
  | "beleza-barbearia";

export const TEMPLATE_CATEGORIES: { id: TemplateCategory; label: string; icon: LucideIcon }[] = [
  { id: "eventos-festas", label: "Eventos & festas", icon: PartyPopper },
  { id: "varejo-personalizados", label: "Varejo & personalizados", icon: Store },
  { id: "recreativo-infantil", label: "Recreativo infantil", icon: Baby },
  { id: "beleza-barbearia", label: "Beleza & barbearia", icon: Scissors },
];

export type Template = {
  slug: string;
  name: string;
  segment: string;
  category: TemplateCategory;
  description: string;
  image: string;
  badge?: string;
  /** Posição do recorte da imagem no card. Padrão: "left top" (mostra a logo no canto). */
  imagePosition?: "left top" | "center";
};

export const TEMPLATES: Template[] = [
  {
    slug: "mls-festa",
    name: "MLS Festa",
    segment: "Locação de mobiliário e decoração",
    category: "eventos-festas",
    description:
      "Catálogo de itens para locação, com destaque para fotos reais de festas já montadas e chamada direta pro WhatsApp.",
    image: "/templates/mls-festa.png",
  },
  {
    slug: "comercial-prazeres",
    name: "Comercial Prazeres",
    segment: "Materiais de construção",
    category: "varejo-personalizados",
    description:
      "Site institucional objetivo, focado em converter quem já sabe o que precisa comprar direto para o pedido no WhatsApp.",
    image: "/templates/comercial-prazeres.png",
    imagePosition: "center",
  },
  {
    slug: "espaco-prata-inlove",
    name: "Prata Inlove",
    segment: "Espaço de eventos",
    category: "eventos-festas",
    description:
      "Landing emocional, com fotos reais do espaço e da piscina, pensada para quem está escolhendo onde comemorar.",
    image: "/templates/espaco-prata-inlove.png",
  },
  {
    slug: "hotelzinho-tia-ju",
    name: "Hotelzinho Tia Ju",
    segment: "Recreativo infantil",
    category: "recreativo-infantil",
    description:
      "Visual lúdico e acolhedor para conquistar os pais, com diferenciais, depoimentos e agendamento de visita.",
    image: "/templates/hotelzinho-tia-ju.png",
  },
  {
    slug: "espaco-de-festa-joa",
    name: "Espaço de Festa Joá",
    segment: "Espaço de festas",
    category: "eventos-festas",
    description:
      "Estrutura enxuta com diferenciais, destaques do espaço e reserva direta, sem distrair quem já quer fechar.",
    image: "/templates/espaco-de-festa-joa.png",
  },
  {
    slug: "personalize-ls",
    name: "Personalize.ls",
    segment: "Gráfica e personalizados",
    category: "varejo-personalizados",
    description:
      "Vitrine colorida de produtos personalizáveis, com identidade visual vibrante alinhada à marca do cliente.",
    image: "/templates/personalize-ls.png",
  },
  {
    slug: "barbearia-navalha-de-ouro",
    name: "Navalha de Ouro",
    segment: "Barbearia",
    category: "beleza-barbearia",
    description:
      "Modelo novo, pensado para anúncios: identidade premium em preto e dourado, serviços com preço e uma prévia de sistema de agendamento.",
    image: "/templates/barbearia-navalha-de-ouro.png",
    badge: "Modelo novo",
    imagePosition: "center",
  },
];
