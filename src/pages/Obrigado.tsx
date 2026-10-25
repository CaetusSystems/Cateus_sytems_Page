import { CalendarCheck } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { HORARIOS_DEMO } from "@/lib/constants";
import { buildLeadWhatsAppUrl } from "@/lib/lead-message";
import { readStoredLead } from "@/lib/submit-lead";
import { useDocumentHead } from "@/lib/useDocumentHead";

const AGENDA_URL: string | undefined = import.meta.env.VITE_AGENDA_URL || undefined;

export default function Obrigado() {
  useDocumentHead({
    title: "Recebemos seus dados | Caetus Systems",
    description: "Escolha o horário da sua demonstração.",
    canonical: "/obrigado",
    robots: "noindex, nofollow",
  });

  const lead = readStoredLead();
  const firstName = lead?.name?.split(" ")[0];

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-12 text-center md:py-20">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
          <CalendarCheck className="h-7 w-7" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          {firstName ? `Recebemos seus dados, ${firstName}!` : "Recebemos seus dados!"}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          {AGENDA_URL
            ? "Agora escolha o melhor horário para a sua demonstração."
            : "Vamos te chamar no WhatsApp para combinar o melhor horário."}
        </p>

        {AGENDA_URL && (
          <iframe
            title="Agenda para marcar a demonstração"
            src={AGENDA_URL}
            loading="lazy"
            className="mt-8 h-[640px] w-full rounded-3xl border border-border"
          />
        )}

        <div className="mt-8 rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Horários das demonstrações</p>
          <ul className="mt-1 space-y-0.5">
            {HORARIOS_DEMO.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <p className="text-muted-foreground">Prefere falar agora?</p>
          <Button
            asChild
            size="lg"
            className="mt-3 h-12 rounded-full bg-brand-green px-6 text-base text-white hover:bg-brand-green/90"
          >
            <a href={buildLeadWhatsAppUrl(lead ?? {})} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-4 w-4" />
              Chamar no WhatsApp
            </a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
