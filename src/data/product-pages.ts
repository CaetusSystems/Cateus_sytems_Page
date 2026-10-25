import {
  BadgeCheck,
  CalendarClock,
  ClipboardList,
  FileSignature,
  Globe,
  HandCoins,
  Headset,
  Images,
  MapPin,
  MessageCircle,
  Pencil,
  Smartphone,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { OfferId } from "@/data/offers";
import { REAL_REVIEWS, type RealReview } from "@/data/reviews";
import { MESSAGES, type Lang } from "@/i18n";
import type { ProductId } from "@/lib/lead-schema";

export type ProductPageData = {
  id: OfferId;
  product: ProductId;
  /** <title> e og:title */
  title: string;
  /** meta description, 140 a 160 caracteres */
  description: string;
  promise: string;
  /** frase de apoio abaixo da promessa */
  support: string;
  ctaLabel: string;
  /** "assinar" só quando houver checkoutUrl; hoje todos agendam demonstração */
  acao: "agendar" | "assinar";
  checkoutUrl?: string;
  /** preço para o JSON-LD (número, sem R$) */
  schemaPrice: string;
  includes: { icon: LucideIcon; text: string }[];
  /** caso real: avaliação do Google (texto como foi publicado) */
  realCase: RealReview;
  steps: [
    { title: string; text: string },
    { title: string; text: string },
    { title: string; text: string },
  ];
  faq: { q: string; a: string }[];
  /** produtos oferecidos em "Combine com" */
  combine: OfferId[];
  combineText: Record<string, string>;
};

const [RAFAELA, JOA] = REAL_REVIEWS;

export const PRODUCT_PAGES: Record<OfferId, ProductPageData> = {
  sites: {
    id: "sites",
    product: "sites",
    title: "Criação de sites para pequenos negócios",
    description:
      "Site profissional para o seu negócio ser achado no Google e receber clientes. R$ 247 para criar e R$ 24,90 por mês. Agende uma demonstração.",
    promise: "Um site profissional para o seu negócio ser achado no Google e receber clientes.",
    support:
      "Você vê a prévia antes de decidir. Pagamento da criação uma vez, e uma mensalidade pequena para manter no ar.",
    ctaLabel: "Agendar demonstração",
    acao: "agendar",
    schemaPrice: "247.00",
    includes: [
      { icon: Smartphone, text: "Site que abre bem no celular" },
      { icon: Images, text: "Identidade visual a partir do que você já tem" },
      { icon: Globe, text: "Publicação e hospedagem" },
      { icon: Pencil, text: "Um ajuste pequeno por mês incluso (texto, preço, horário ou foto)" },
    ],
    realCase: JOA,
    steps: [
      {
        title: "Você agenda a demonstração",
        text: "Conta rápido sobre o negócio e manda o básico: nome, endereço, horários e fotos.",
      },
      { title: "Recebe a prévia", text: "Montamos o site e você vê como ficou antes de aprovar." },
      { title: "Seu site no ar", text: "Aprovou? Publicamos e cuidamos de mantê-lo funcionando." },
    ],
    faq: [
      {
        q: "Quanto custa?",
        a: "R$ 247 para criar o site, pagos uma vez, e R$ 24,90 por mês para mantê-lo no ar.",
      },
      {
        q: "O que a mensalidade inclui?",
        a: "Manter o site no ar e um ajuste pequeno por mês, como trocar um texto, um preço, um horário ou uma foto.",
      },
      {
        q: "Eu já tenho Instagram. Preciso de um site?",
        a: "O Instagram mostra o seu negócio para quem já te segue. O site ajuda quem procura no Google a te encontrar e a decidir. Explicamos a diferença no artigo sobre quem aparece no Instagram mas não no Google.",
      },
      {
        q: "O que eu preciso mandar?",
        a: "O nome do negócio, endereço, horários, fotos e o link do Instagram ou da página do Google. Se faltar algo, a gente ajuda a montar.",
      },
      {
        q: "Vocês cuidam também do WhatsApp?",
        a: "É outra solução: o atendente no WhatsApp, por R$ 87 por mês. Mostramos como funciona na demonstração.",
      },
    ],
    combine: ["atendente", "matricula"],
    combineText: {
      atendente:
        "Seu site atrai o cliente e o atendente responde no WhatsApp sem deixar ninguém esperando.",
      matricula:
        "Para escolas: o site apresenta a escola e o sistema organiza matrículas e famílias.",
    },
  },
  atendente: {
    id: "atendente",
    product: "atendente",
    title: "Atendente no WhatsApp para pequenos negócios",
    description:
      "Atendente com inteligência artificial no WhatsApp do seu negócio: responde horário, endereço e preço e chama você quando precisa. R$ 87 por mês.",
    promise:
      "Seu WhatsApp respondendo sozinho, com horário, endereço e preço, sem deixar ninguém no vácuo.",
    support:
      "Configurado com as informações do seu negócio. Quando não sabe responder, chama uma pessoa.",
    ctaLabel: "Agendar demonstração",
    acao: "agendar",
    schemaPrice: "87.00",
    includes: [
      { icon: CalendarClock, text: "Horário de funcionamento" },
      { icon: MapPin, text: "Endereço e como chegar" },
      { icon: ClipboardList, text: "Perguntas frequentes do seu negócio" },
      { icon: Headset, text: "Encaminha para uma pessoa quando não sabe responder" },
      { icon: BadgeCheck, text: "Respostas com inteligência artificial, ajustadas ao seu negócio" },
    ],
    realCase: JOA,
    steps: [
      {
        title: "Você conta como atende hoje",
        text: "Horários, endereço, preços e as perguntas que mais chegam.",
      },
      {
        title: "A gente configura",
        text: "Montamos o atendente com as informações do seu negócio e o jeito de falar com seus clientes.",
      },
      {
        title: "Ligamos no seu WhatsApp",
        text: "Depois de testar com você, ele começa a responder.",
      },
    ],
    faq: [
      { q: "Quanto custa?", a: "R$ 87 por mês, sem cobrança de configuração à parte." },
      {
        q: "O que ele responde?",
        a: "Horário, endereço, preços e as perguntas frequentes do seu negócio. Quando não sabe, ele chama uma pessoa em vez de inventar.",
      },
      {
        q: "Ele substitui a minha equipe?",
        a: "Não. Ele cuida das perguntas repetidas e da primeira resposta, e a sua equipe assume o que precisa de conversa.",
      },
      {
        q: "E a IA que o próprio WhatsApp Business lançou?",
        a: "A IA do aplicativo responde com base no seu catálogo. O atendente da Caetus é configurado para o seu negócio, com as regras que você definir. No artigo sobre a IA do WhatsApp Business explicamos quando cada uma faz sentido.",
      },
      {
        q: "O que eu preciso mandar?",
        a: "Horários, endereço, preços e uma lista das perguntas que mais chegam no seu WhatsApp. Se faltar algo, a gente ajuda a montar.",
      },
    ],
    combine: ["sites", "matricula"],
    combineText: {
      sites:
        "O site mostra o seu negócio a quem procura no Google e leva a pessoa direto para o WhatsApp.",
      matricula:
        "Para escolas: o atendente responde as famílias e o sistema registra as matrículas.",
    },
  },
  matricula: {
    id: "matricula",
    product: "matricula",
    title: "Sistema de matrícula e gestão para escolas",
    description:
      "Sistema para a escola organizar matrículas, famílias, contratos e cobranças. Implantação de R$ 297 e R$ 96 por mês. Agende uma demonstração.",
    promise: "Matrículas, famílias e cobranças da sua escola organizadas num só lugar.",
    support: "Implantação feita pela Caetus. Você vê o sistema funcionando antes de decidir.",
    ctaLabel: "Agendar demonstração",
    acao: "agendar",
    schemaPrice: "297.00",
    includes: [
      { icon: Smartphone, text: "Matrícula online pelo celular da família" },
      { icon: UsersRound, text: "Cadastro organizado de famílias e alunos" },
      { icon: FileSignature, text: "Contrato com aceite digital" },
      { icon: HandCoins, text: "Cobranças e lembretes" },
      { icon: MessageCircle, text: "Painel da escola para acompanhar tudo" },
    ],
    realCase: RAFAELA,
    steps: [
      {
        title: "Conversamos sobre a rotina da escola",
        text: "Como é a matrícula hoje, quem cuida e onde as coisas se perdem.",
      },
      {
        title: "Implantamos e configuramos",
        text: "Deixamos o sistema pronto com os dados e as regras da sua escola.",
      },
      { title: "As famílias passam a usar", text: "A secretaria acompanha tudo em um só lugar." },
    ],
    faq: [
      { q: "Quanto custa?", a: "R$ 297 de implantação, pagos uma vez, e R$ 96 por mês." },
      {
        q: "Serve para a minha escola?",
        a: "Mostramos o sistema na demonstração, com o seu caso, para você decidir se faz sentido. Sem compromisso.",
      },
      {
        q: "O que as famílias fazem no sistema?",
        a: "Acessam pelo celular para fazer a matrícula e aceitar o contrato, sem precisar ir até a secretaria.",
      },
      {
        q: "Posso ter também o site e o atendente?",
        a: "Sim. O site apresenta a escola e o atendente no WhatsApp responde as famílias. Cada um é uma solução separada, e você contrata só o que precisar.",
      },
      {
        q: "Preciso entender de tecnologia?",
        a: "Não. A Caetus implanta, mantém e evolui o sistema para você.",
      },
    ],
    combine: ["sites", "atendente"],
    combineText: {
      sites: "O site apresenta a escola e leva as famílias até a matrícula.",
      atendente:
        "O atendente responde as famílias no WhatsApp a qualquer hora, sem sobrecarregar a secretaria.",
    },
  },
};

/** Página de produto com os textos do idioma pedido (ícones, caso real e rotas não mudam). */
export function getProductPage(id: OfferId, lang: Lang): ProductPageData {
  const base = PRODUCT_PAGES[id];
  if (lang === "pt") return base;
  const m = MESSAGES[lang].products[id];
  return {
    ...base,
    title: m.title,
    description: m.description,
    promise: m.promise,
    support: m.support,
    ctaLabel: m.ctaLabel,
    includes: base.includes.map((item, i) => ({ ...item, text: m.includes[i] ?? item.text })),
    steps: base.steps.map((step, i) => m.steps[i] ?? step) as ProductPageData["steps"],
    faq: m.faq,
    combineText: m.combineText,
  };
}
