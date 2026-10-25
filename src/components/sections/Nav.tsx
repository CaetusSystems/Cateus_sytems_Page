import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { OFFERS } from "@/data/offers";
import { useCampaignMode } from "@/hooks/use-campaign-mode";
import {
  LANGS,
  LANG_LABELS,
  isTranslatedPath,
  switchLangHref,
  useLang,
  useLocalePath,
  useT,
} from "@/i18n";
import { cn } from "@/lib/utils";

function LanguageSwitcher() {
  const lang = useLang();
  const t = useT();
  const { pathname, search, hash } = useLocation();

  // Blog, Sobre e Modelos só existem em português: sem seletor nelas.
  if (!isTranslatedPath(pathname)) return null;

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="flex items-center rounded-full border border-border p-0.5 text-xs font-medium"
    >
      {LANGS.map((l) => (
        <Link
          key={l}
          to={switchLangHref(pathname, search, hash, l)}
          hrefLang={l}
          lang={l}
          aria-label={LANG_LABELS[l]}
          aria-current={l === lang ? "true" : undefined}
          className={cn(
            "flex h-8 min-w-8 items-center justify-center rounded-full px-1.5 uppercase transition-colors",
            l === lang ? "bg-brand-blue text-white" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}

export function Nav() {
  const campaign = useCampaignMode();
  const t = useT();
  const lp = useLocalePath();

  const links = [
    { to: lp("/"), label: t.nav.home },
    { to: lp(OFFERS.sites.path), label: t.nav.sites },
    { to: lp(OFFERS.atendente.path), label: t.nav.assistant },
    { to: lp(OFFERS.matricula.path), label: t.nav.enrollment },
    { to: "/blog", label: t.nav.blog },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to={lp("/")} className="flex items-center gap-2" aria-label={t.nav.homeAria}>
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
          <nav className="hidden items-center gap-7 md:flex" aria-label={t.nav.mainAria}>
            {links.map((l) => (
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

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            asChild
            size="sm"
            className="h-10 rounded-full bg-brand-blue px-4 text-sm text-white hover:bg-brand-blue/90 sm:px-5"
          >
            <Link to={lp("/agendar")}>{t.nav.cta}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
