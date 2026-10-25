import { useSearchParams } from "react-router-dom";
import { CalendarCheck, CalendarClock, Eye, Rocket } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { LeadForm } from "@/components/lead/LeadForm";
import { useLang, useLocalePath, useT } from "@/i18n";
import { PRODUCT_IDS, type ProductId } from "@/lib/lead-schema";
import { useDocumentHead } from "@/lib/useDocumentHead";

const STEP_ICONS = [CalendarCheck, Eye, Rocket];

function productFromQuery(value: string | null): ProductId | undefined {
  return PRODUCT_IDS.find((id) => id === value);
}

export default function Agendar() {
  const [params] = useSearchParams();
  const product = productFromQuery(params.get("produto"));
  const t = useT();
  const lang = useLang();
  const lp = useLocalePath();

  useDocumentHead({
    title: t.agendar.headTitle,
    description: t.agendar.headDescription,
    canonical: lp("/agendar"),
    og: {
      "og:title": t.agendar.headTitle,
      "og:description": t.agendar.headDescription,
      "og:url": lp("/agendar"),
      "og:type": "website",
    },
    lang,
    alternatesOf: "/agendar",
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <main className="bg-gradient-to-b from-tint to-background">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-[1fr_1.1fr] md:py-20">
          <div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {t.agendar.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{t.agendar.text}</p>
            <ol className="mt-8 space-y-3">
              {STEP_ICONS.map((Icon, i) => {
                const step = t.agendar.steps[i];
                return (
                  <li
                    key={step.title}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-medium">{step.title}</span>
                      <span className="block text-sm text-muted-foreground">{step.text}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
            <div className="mt-6 flex gap-3 rounded-2xl bg-tint p-4">
              <CalendarClock
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue"
                aria-hidden="true"
              />
              <div>
                <p className="font-medium">{t.agendar.hoursTitle}</p>
                <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                  {t.hours.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <LeadForm defaultProduct={product} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
