import { useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CalendarCheck, CalendarClock, Check, Eye, Rocket, Video } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { LeadForm } from "@/components/lead/LeadForm";
import { useLang, useLocalePath, useT } from "@/i18n";
import { claimFirstVisit } from "@/lib/first-visit";
import { PRODUCT_IDS, type ProductId } from "@/lib/lead-schema";
import { useDocumentHead } from "@/lib/useDocumentHead";

const STEP_ICONS = [CalendarCheck, Eye, Rocket];

function productFromQuery(value: string | null): ProductId | undefined {
  return PRODUCT_IDS.find((id) => id === value);
}

/** Verdadeiro só na primeira visita: os passos "carregam" um a um. Depois aparecem prontos. */
function useLoadSequence() {
  const [play, setPlay] = useState(false);
  useLayoutEffect(() => {
    if (claimFirstVisit("agendar")) setPlay(true);
  }, []);
  return play;
}

export default function Agendar() {
  const [params] = useSearchParams();
  const product = productFromQuery(params.get("produto"));
  const t = useT();
  const lang = useLang();
  const lp = useLocalePath();
  const play = useLoadSequence();

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
        <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] gap-6 px-5 py-8 sm:px-6 md:grid-cols-[1fr_1.1fr] md:items-start md:gap-x-10 md:gap-y-4 md:py-20">
          <div className="md:col-start-1 md:row-start-1">
            <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {t.agendar.title}
            </h1>
            <p className="mt-3 text-base text-muted-foreground md:mt-4 md:text-lg">
              {t.agendar.text}
            </p>

            <p className="mt-4 inline-flex items-center gap-2 rounded-full md:hidden border border-brand-blue/25 bg-brand-blue/5 px-3.5 py-1.5 text-sm font-medium text-brand-blue">
              <Video className="h-4 w-4" aria-hidden="true" />
              {t.agendar.onlineTitle}
            </p>

            <ol data-play={play ? "true" : "false"} className="load-steps mt-5 space-y-3">
              {STEP_ICONS.map((Icon, i) => {
                const step = t.agendar.steps[i];
                return (
                  <li
                    key={step.title}
                    style={{ "--i": i } as React.CSSProperties}
                    className="load-step relative flex items-center gap-3 overflow-hidden rounded-2xl border border-border bg-card p-3 sm:gap-4 sm:p-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue sm:h-12 sm:w-12">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">{step.title}</span>
                      <span className="hidden text-sm text-muted-foreground sm:block">
                        {step.text}
                      </span>
                    </span>
                    <span className="load-check flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                      <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="load-bar absolute inset-x-0 bottom-0 h-1 bg-brand-blue"
                    />
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="md:col-start-2 md:row-span-2 md:row-start-1">
            <LeadForm defaultProduct={product} />
          </div>

          <div className="space-y-3 md:col-start-1 md:row-start-2">
            <div className="flex gap-3 rounded-2xl border border-brand-blue/20 bg-brand-blue/5 p-4">
              <Video className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
              <div>
                <p className="font-medium">{t.agendar.onlineTitle}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{t.agendar.onlineText}</p>
              </div>
            </div>

            <div className="flex gap-3 rounded-2xl bg-tint p-4">
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
