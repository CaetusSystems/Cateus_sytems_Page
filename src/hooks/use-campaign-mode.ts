import { useLocation } from "react-router-dom";
import { isCampaignVisit } from "@/lib/attribution";

/**
 * Verdadeiro para quem chegou por anúncio (utm, gclid ou fbclid), mesmo depois de navegar.
 * Nesse modo o menu e o rodapé ficam mínimos para a pessoa não sair antes de converter.
 */
export function useCampaignMode(): boolean {
  const { search } = useLocation();
  return isCampaignVisit(search);
}
