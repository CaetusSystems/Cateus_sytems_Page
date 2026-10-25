import type { ProductId } from "@/lib/lead-schema";

export type OfferId = Exclude<ProductId, "nao-sei">;

export type Offer = {
  id: OfferId;
  name: string;
  /** frase curta do que a pessoa ganha */
  promise: string;
  price: string;
  /** "pagamento único" ou "por mês" */
  priceLabel: string;
  /** mensalidade de manutenção, mostrada pequena abaixo do preço */
  monthly?: string;
  /** mostra "a partir de" antes do preço */
  from?: boolean;
  image: string;
  imageAlt: string;
  /** página própria do produto */
  path: string;
};

export const OFFERS: Record<OfferId, Offer> = {
  sites: {
    id: "sites",
    name: "Criação de sites",
    promise: "Seu negócio encontrado no Google, com um site pronto para receber clientes.",
    price: "R$ 247",
    priceLabel: "pagamento único",
    monthly: "+ R$ 24,90 por mês de manutenção",
    image: "/img/caetus-card-site.webp",
    imageAlt: "Site de uma escola infantil aberto em um notebook",
    path: "/criacao-de-sites",
  },
  atendente: {
    id: "atendente",
    name: "Atendente no WhatsApp",
    promise:
      "Seu WhatsApp respondendo sozinho, com preço, horário e endereço, sem deixar ninguém no vácuo.",
    price: "R$ 87",
    priceLabel: "por mês",
    image: "/img/caetus-card-atendente.webp",
    imageAlt: "Atendente virtual de uma barbearia respondendo um cliente no WhatsApp",
    path: "/atendente-whatsapp",
  },
  matricula: {
    id: "matricula",
    name: "Sistema de matrícula",
    promise: "Matrículas, famílias e cobranças da sua escola organizadas num só lugar.",
    price: "R$ 297",
    priceLabel: "pagamento único",
    monthly: "+ R$ 96 por mês de manutenção",
    image: "/img/caetus-card-sistemas.webp",
    imageAlt: "Painel de gestão no notebook e avisos no celular, sobre uma mesa de cafeteria",
    path: "/sistema-de-matricula",
  },
};

export const OFFER_LIST: Offer[] = [OFFERS.sites, OFFERS.atendente, OFFERS.matricula];

/** Texto de preço em uma linha (JSON-LD e descrições). */
export function priceSentence(o: Offer): string {
  return [o.from ? "a partir de" : "", o.price, o.priceLabel, o.monthly ?? ""]
    .filter(Boolean)
    .join(" ");
}

/**
 * Cartões da home. O terceiro é o sistema sob medida: a matrícula para escolas
 * fica na página própria dela e aparece aqui só como exemplo.
 */
export const HOME_CARDS: Offer[] = [
  OFFERS.sites,
  OFFERS.atendente,
  {
    ...OFFERS.matricula,
    name: "Sistema sob medida",
    promise:
      "Cadastros, matrículas, cobranças e o que a sua operação precisar, num sistema feito para o seu jeito de trabalhar.",
    from: true,
  },
];
