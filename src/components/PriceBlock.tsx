import type { Offer } from "@/data/offers";
import { useT } from "@/i18n";
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
  const t = useT();
  return (
    <div className={className}>
      {offer.listPrice && (
        <p className="mb-0.5 flex items-center gap-2">
          <del
            className={cn(
              "font-semibold text-red-600 decoration-2 dark:text-red-400",
              size === "lg" ? "text-2xl" : "text-lg",
            )}
          >
            {offer.listPrice}
          </del>
          <span className="rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
            {t.cards.offerBadge}
          </span>
        </p>
      )}
      {offer.from && (
        <span className="mr-1.5 text-sm font-medium text-muted-foreground">
          {t.cards.fromLabel}
        </span>
      )}
      <span
        className={cn(
          "font-semibold tracking-tight",
          offer.listPrice ? "text-brand-green" : "text-brand-blue",
          size === "lg" ? "text-5xl" : "text-3xl",
        )}
      >
        {offer.price}
      </span>{" "}
      <span className="text-sm font-medium text-foreground/70">{offer.priceLabel}</span>
      {offer.monthly && <p className="mt-0.5 text-balance text-[13px] text-muted-foreground">{offer.monthly}</p>}
    </div>
  );
}
