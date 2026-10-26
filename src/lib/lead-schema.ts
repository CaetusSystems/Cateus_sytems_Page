import { z } from "zod";
import { LANGS } from "../i18n/locale";

export const PRODUCT_IDS = ["sites", "atendente", "sob-medida", "matricula", "nao-sei"] as const;
export type ProductId = (typeof PRODUCT_IDS)[number];

export const PRODUCT_LABELS: Record<ProductId, string> = {
  sites: "Criação de sites",
  atendente: "Atendente no WhatsApp",
  "sob-medida": "Sistema sob medida",
  matricula: "Sistema de matrícula",
  "nao-sei": "Ainda não sei",
};

/** Só dígitos, com 55 na frente. Devolve "" se o número não for um celular/fixo com DDD. */
export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) return digits;
  return "";
}

const attributionSchema = z
  .object({
    utm_source: z.string().max(200).optional(),
    utm_medium: z.string().max(200).optional(),
    utm_campaign: z.string().max(200).optional(),
    utm_content: z.string().max(200).optional(),
    utm_term: z.string().max(200).optional(),
    gclid: z.string().max(200).optional(),
    fbclid: z.string().max(200).optional(),
    landing: z.string().max(200).optional(),
  })
  .partial();

export const leadSchema = z.object({
  product: z.enum(PRODUCT_IDS),
  business: z.string().trim().min(1, "Informe o nome do negócio").max(80),
  name: z.string().trim().min(2, "Informe seu nome").max(80),
  phone: z
    .string()
    .transform(normalizePhone)
    .refine((p) => p.length > 0, "Informe um WhatsApp com DDD"),
  email: z.union([z.literal(""), z.string().trim().email("E-mail inválido")]).optional(),
  /** Instagram ou página do Google do negócio. */
  link: z.string().trim().min(3, "Informe o Instagram ou a página do Google do negócio").max(200),
  /** Idioma do site em que a pessoa preencheu (para o dono saber como responder). */
  lang: z.enum(LANGS).optional(),
  /** Isca para robôs: pessoas nunca preenchem. */
  website: z.string().max(200).optional(),
  attribution: attributionSchema.optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
