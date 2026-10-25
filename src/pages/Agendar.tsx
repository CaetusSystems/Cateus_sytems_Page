import { useSearchParams } from "react-router-dom";
import { CalendarClock } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { LeadForm } from "@/components/lead/LeadForm";
import { HORARIOS_DEMO } from "@/lib/constants";
import { PRODUCT_IDS, type ProductId } from "@/lib/lead-schema";
import { useDocumentHead } from "@/lib/useDocumentHead";

function productFromQuery(value: string | null): ProductId | undefined {
  return PRODUCT_IDS.find((id) => id === value);
}

export default function Agendar() {
  const [params] = useSearchParams();
  const product = productFromQuery(params.get("produto"));

  useDocumentHead({
    title: "Agendar demonstração | Caetus Systems",
    description:
      "Escolha o que você quer ver, deixe seu WhatsApp e marque uma demonstração de site, atendente no WhatsApp ou sistema de matrícula.",
    canonical: "/agendar",
    og: {
      "og:title": "Agendar demonstração | Caetus Systems",
      "og:description":
        "Marque uma demonstração de site, atendente no WhatsApp ou sistema de matrícula.",
      "og:url": "/agendar",
      "og:type": "website",
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <main className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-[1fr_1.1fr] md:py-20">
        <div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Agende sua demonstração
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Conte rápido sobre o seu negócio. Depois você escolhe o melhor horário e vemos juntos,
            sem compromisso.
          </p>
          <div className="mt-8 flex gap-3 rounded-2xl bg-muted p-4">
            <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
            <div>
              <p className="font-medium">Horários das demonstrações</p>
              <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                {HORARIOS_DEMO.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <LeadForm defaultProduct={product} />
      </main>
      <Footer />
    </div>
  );
}
