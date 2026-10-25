import type { ProductId } from "@/lib/lead-schema";

export type OfferId = Exclude<ProductId, "nao-sei">;

export type Offer = {
  id: OfferId;
  name: string;
  /** frase curta do que a pessoa ganha */
  promise: string;
  price: string;
  priceNote: string;
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
    priceNote: "para criar, e R$ 24,90 por mês",
    image: "/img/caetus-card-site.webp",
    imageAlt: "Barbearia com o site da Caetus aberto no celular",
    path: "/criacao-de-sites",
  },
  atendente: {
    id: "atendente",
    name: "Atendente no WhatsApp",
    promise:
      "Seu WhatsApp respondendo sozinho, com preço, horário e endereço, sem deixar ninguém no vácuo.",
    price: "R$ 87",
    priceNote: "por mês",
    image: "/img/caetus-card-atendente.webp",
    imageAlt: "Atendente virtual respondendo clientes no WhatsApp",
    path: "/atendente-whatsapp",
  },
  matricula: {
    id: "matricula",
    name: "Sistema de matrícula",
    promise: "Matrículas, famílias e cobranças da sua escola organizadas num só lugar.",
    price: "R$ 297",
    priceNote: "para implantar, e R$ 96 por mês",
    image: "/img/caetus-card-sistemas.webp",
    imageAlt: "Sistema de gestão e matrícula de escola em uso",
    path: "/sistema-de-matricula",
  },
};

export const OFFER_LIST: Offer[] = [OFFERS.sites, OFFERS.atendente, OFFERS.matricula];
