import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/constants";

const LINKS = [
  { href: "/#solucoes", label: "Soluções" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#demonstracao", label: "Demonstração" },
  { href: "/#faq", label: "Perguntas" },
  { href: "/sobre", label: "Quem somos" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2">
          <img
            src="/caetus-logo.png"
            alt="Caetus Systems"
            className="h-7 w-7 rounded-md object-contain"
          />
          <span className="text-sm font-semibold tracking-tight">
            Caetus <span className="font-normal text-muted-foreground">Systems</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Button asChild size="sm" className="gap-2 rounded-full">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar no WhatsApp"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {WHATSAPP_DISPLAY}
          </a>
        </Button>
      </div>
    </header>
  );
}
