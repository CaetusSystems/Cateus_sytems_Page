import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Check, ChevronDown, Menu, X } from "lucide-react";
import { Flag } from "@/components/Flags";
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

/** Mostra só o idioma atual; ao tocar, abre a lista com os três. */
function LanguageSwitcher() {
  const lang = useLang();
  const t = useT();
  const { pathname, search, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Blog, Sobre e Modelos só existem em português: sem seletor nelas.
  if (!isTranslatedPath(pathname)) return null;

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${t.nav.language}: ${LANG_LABELS[lang]}`}
        className="flex h-11 items-center gap-1.5 rounded-full border border-border bg-card px-2.5 text-sm font-medium transition-colors hover:border-brand-blue/50 active:scale-95"
      >
        <Flag lang={lang} className="h-6 w-6" />
        <span className="hidden uppercase sm:inline">{lang}</span>
        <ChevronDown
          className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {open && (
        <ul
          aria-label={t.nav.language}
          className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-xl"
        >
          {LANGS.map((l) => (
            <li key={l}>
              <Link
                to={switchLangHref(pathname, search, hash, l)}
                hrefLang={l}
                lang={l}
                onClick={() => setOpen(false)}
                aria-current={l === lang ? "true" : undefined}
                className={cn(
                  "flex h-12 items-center gap-3 rounded-xl px-3 text-base font-medium transition-colors",
                  l === lang ? "bg-brand-blue/10 text-brand-blue" : "hover:bg-muted",
                )}
              >
                <Flag lang={l} className="h-7 w-7" />
                <span className="flex-1">{LANG_LABELS[l]}</span>
                {l === lang && <Check className="h-4 w-4" aria-hidden="true" />}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Nav() {
  const campaign = useCampaignMode();
  const t = useT();
  const lp = useLocalePath();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Trocar de página fecha o menu do celular.
  useEffect(() => setMenuOpen(false), [pathname]);

  const links = [
    { to: lp("/"), label: t.nav.home },
    { to: lp(OFFERS.sites.path), label: t.nav.sites },
    { to: lp(OFFERS.atendente.path), label: t.nav.assistant },
    { to: lp(OFFERS.matricula.path), label: t.nav.enrollment },
    { to: "/blog", label: t.nav.blog },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to={lp("/")} className="flex min-h-11 items-center gap-2" aria-label={t.nav.homeAria}>
          <img
            src="/caetus-logo.png"
            alt=""
            className="h-9 w-9 rounded-lg object-contain"
            width={36}
            height={36}
          />
          <span className="text-base font-semibold tracking-tight">
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
            className="hidden h-11 rounded-full bg-brand-blue px-5 text-sm text-white hover:bg-brand-blue/90 sm:inline-flex"
          >
            <Link to={lp("/agendar")}>{t.nav.cta}</Link>
          </Button>
          {!campaign && (
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="menu-celular"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.menu}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-colors active:scale-95 md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>

      {!campaign && menuOpen && (
        <nav
          id="menu-celular"
          aria-label={t.nav.mainAria}
          className="border-t border-border bg-background px-4 pb-4 pt-2 shadow-xl md:hidden"
        >
          <ul>
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="flex h-14 items-center border-b border-border/60 text-lg font-medium last:border-0"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
