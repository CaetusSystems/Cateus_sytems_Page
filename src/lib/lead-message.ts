import { PRODUCT_LABELS, type LeadInput } from "./lead-schema";
import { WHATSAPP_URL, waUrl } from "./constants";

/** Link do WhatsApp com os dados do formulário já escritos na mensagem. */
export function buildLeadWhatsAppUrl(lead: Partial<LeadInput>): string {
  const parts: string[] = [];
  if (lead.product) parts.push(`Quero uma demonstração de: ${PRODUCT_LABELS[lead.product]}.`);
  if (lead.business) parts.push(`Meu negócio: ${lead.business}.`);
  if (lead.name) parts.push(`Meu nome: ${lead.name}.`);
  if (parts.length === 0) return WHATSAPP_URL;
  return waUrl(`Olá! ${parts.join(" ")}`);
}
