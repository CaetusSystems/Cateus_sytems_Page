import type { Offer } from "@/data/offers";
import { cn } from "@/lib/utils";

/**
 * Preço da oferta: valor grande com "pagamento único" (ou "por mês") ao lado
 * e a mensalidade de manutenção pequena embaixo.
 */
export function PriceBlock({
  offer,
  size = "md",
  className,
}: {
  offer: Offer;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div className={className}>
      {offer.from && (
        <span className="mr-1.5 text-sm font-medium text-muted-foreground">a partir de</span>
      )}
      <span
        className={cn(
          "font-semibold tracking-tight text-brand-blue",
          size === "lg" ? "text-5xl" : "text-3xl",
        )}
      >
        {offer.price}
      </span>{" "}
      <span className="text-sm font-medium text-foreground/70">{offer.priceLabel}</span>
      {offer.monthly && <p className="mt-0.5 text-xs text-muted-foreground">{offer.monthly}</p>}
    </div>
  );
}
