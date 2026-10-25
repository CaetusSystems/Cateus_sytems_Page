import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { OFFERS } from "@/data/offers";
import { useCampaignMode } from "@/hooks/use-campaign-mode";

const LINKS = [
  { to: "/", label: "Início" },
  { to: OFFERS.sites.path, label: "Sites" },
  { to: OFFERS.atendente.path, label: "Atendente" },
  { to: OFFERS.matricula.path, label: "Matrícula" },
  { to: "/blog", label: "Blog" },
];

export function Nav() {
  const campaign = useCampaignMode();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" aria-label="Caetus Systems, início">
          <img
            src="/caetus-logo.png"
            alt=""
            className="h-8 w-8 rounded-lg object-contain"
            width={32}
            height={32}
          />
          <span className="text-sm font-semibold tracking-tight">
            Caetus <span className="font-normal text-muted-foreground">Systems</span>
          </span>
        </Link>

        {!campaign && (
          <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}

        <Button
          asChild
          size="sm"
          className="h-10 rounded-full bg-brand-blue px-5 text-sm text-white hover:bg-brand-blue/90"
        >
          <Link to="/agendar">Agendar demonstração</Link>
        </Button>
      </div>
    </header>
  );
}
