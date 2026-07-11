import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  /** "default" = fundo branco · "muted" = faixa cinza suave · "brand" = fundo primary */
  tone?: "default" | "muted" | "brand";
  /** "normal" = seção padrão · "compact" = faixa curta (dores, impacto) */
  size?: "normal" | "compact";
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

/**
 * Primitivo único de seção: controla borda, fundo e espaçamento vertical
 * em um lugar só, para nenhuma seção inventar o próprio padding.
 */
export function Section({
  id,
  tone = "default",
  size = "normal",
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "border-t border-border",
        tone === "muted" && "bg-muted/30",
        tone === "brand" && "bg-primary text-primary-foreground",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl px-6",
          size === "normal" ? "py-20 md:py-28" : "py-14 md:py-16",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
  className?: string;
};

/** Cabeçalho padrão de seção: eyebrow + título + (opcional) uma linha de apoio. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && <p className="text-sm font-medium text-primary">{eyebrow}</p>}
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-balance text-lg text-muted-foreground">{lead}</p>}
    </div>
  );
}
