import {
  MessageCircle,
  Globe,
  Megaphone,
  LayoutDashboard,
  Code2,
  Table2,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Catálogo de soluções da Caetus.
 *
 * As categorias são as DORES do empresário, não áreas técnicas.
 * Cada solução tem um `slug` reservado para a futura página /produtos/<slug>;
 * enquanto ela não existe, o botão "Saiba mais" abre o WhatsApp com
 * `ctaMessage` pré-preenchida. Quando a página existe, informe `detailPath`
 * e o card linka para ela em vez de abrir o WhatsApp direto.
 *
 * Para adicionar uma solução nova: acrescente um item neste array. Nada mais.
 */

export type ProductCategory =
  | "atender-clientes"
  | "vender-mais"
  | "organizar-a-empresa"
  | "economizar-tempo";

export const PRODUCT_CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: "atender-clientes", label: "Atender clientes" },
  { id: "vender-mais", label: "Vender mais" },
  { id: "organizar-a-empresa", label: "Organizar a empresa" },
  { id: "economizar-tempo", label: "Economizar tempo" },
];

export type Product = {
  /** rota futura: /produtos/<slug> */
  slug: string;
  category: ProductCategory;
  /** o que o empresário ganha — é o título grande do card */
  benefit: string;
  /** nome técnico/comercial — subtítulo pequeno */
  techName: string;
  icon: LucideIcon;
  bullets: [string, string, string];
  /** mensagem pré-preenchida no WhatsApp ao clicar em "Saiba mais" */
  ctaMessage: string;
  /** rota interna já existente (ex: "/produtos/bot-whatsapp") — se presente, o card linka para ela */
  detailPath?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "bot-whatsapp",
    category: "atender-clientes",
    benefit: "Seu WhatsApp respondendo sozinho.",
    techName: "Atendente virtual para WhatsApp",
    icon: MessageCircle,
    bullets: [
      "Perguntas frequentes respondidas na hora",
      "Horários, endereço e preços no automático",
      "Nenhuma mensagem fica no vácuo",
    ],
    ctaMessage: "Olá! Quero testar grátis o Atendente Virtual para WhatsApp.",
    detailPath: "/produtos/bot-whatsapp",
  },
  {
    slug: "sites",
    category: "vender-mais",
    benefit: "Sua empresa encontrada no Google.",
    techName: "Sites profissionais",
    icon: Globe,
    bullets: [
      "Site pronto, rápido e sempre no ar",
      "Aparece quando procuram seu serviço na região",
      "Clientes novos chegam até você",
    ],
    ctaMessage: "Olá! Quero saber mais sobre sites profissionais.",
  },
  {
    slug: "presenca-digital",
    category: "vender-mais",
    benefit: "Sua marca sempre ativa nas redes.",
    techName: "Redes sociais + Caetus Studio",
    icon: Megaphone,
    bullets: [
      "Publicações periódicas sem você se preocupar",
      "Perfil profissional e atualizado",
      "Sua empresa nunca parece parada",
    ],
    ctaMessage: "Olá! Quero saber mais sobre gestão de redes sociais.",
  },
  {
    slug: "dashboards",
    category: "organizar-a-empresa",
    benefit: "Seu negócio em números.",
    techName: "Dashboards",
    icon: LayoutDashboard,
    bullets: [
      "Vendas e atendimento em um painel só",
      "Decisões com dados, não com achismo",
      "Atualizado automaticamente todos os dias",
    ],
    ctaMessage: "Olá! Quero saber mais sobre dashboards para minha empresa.",
  },
  {
    slug: "sistemas-sob-medida",
    category: "organizar-a-empresa",
    benefit: "Um sistema do jeito que sua empresa funciona.",
    techName: "Sistemas sob medida",
    icon: Code2,
    bullets: [
      "Feito para a sua rotina real, não o contrário",
      "Substitui papel e planilhas espalhadas",
      "Cresce junto com a empresa",
    ],
    ctaMessage: "Olá! Quero saber mais sobre sistemas sob medida.",
  },
  {
    slug: "automacao-planilhas",
    category: "organizar-a-empresa",
    benefit: "Sua planilha vira sistema.",
    techName: "Automação de planilhas e processos",
    icon: Table2,
    bullets: [
      "Planilhas manuais viram fluxos automáticos",
      "Processos repetitivos rodando sozinhos",
      "Menos erro humano, mais consistência",
    ],
    ctaMessage: "Olá! Quero saber mais sobre automação de planilhas e processos.",
  },
  {
    slug: "automacoes",
    category: "economizar-tempo",
    benefit: "Tarefas repetitivas acontecendo sozinhas.",
    techName: "Automações e integrações",
    icon: Workflow,
    bullets: [
      "Seus sistemas conversando entre si",
      "Relatórios e lembretes automáticos",
      "Horas do seu dia de volta, toda semana",
    ],
    ctaMessage: "Olá! Quero saber mais sobre automações para minha empresa.",
  },
];
