import { Link } from "react-router-dom";
import { CalendarCheck, Check, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppLiveDemo } from "@/components/product/WhatsAppLiveDemo";
import { useInView } from "@/hooks/use-in-view";
import { useLocalePath, useT } from "@/i18n";

/**
 * "Veja o atendente funcionando": texto e botão ao lado da simulação do WhatsApp.
 * Usada na página do atendente e na home. No celular a simulação vem logo abaixo do botão.
 */
export function AssistantDemoSection({ id }: { id?: string }) {
  const t = useT();
  const lp = useLocalePath();
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section
      id={id}
      className="relative overflow-hidden border-t border-border bg-gradient-to-b from-brand-green/[0.07] via-background to-background"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-24">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <MonitorPlay className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
              {t.demo.badge}
            </span>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              {t.demo.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.demo.text}</p>
            <ul className="mt-6 space-y-3">
              {t.demo.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-base">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Button
              asChild
              size="lg"
              className="btn-shine mt-7 h-14 w-full rounded-full bg-brand-blue px-7 text-base font-semibold text-white hover:bg-brand-blue/90 sm:w-auto"
            >
              <Link to={lp("/agendar?produto=atendente")}>
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                {t.demo.cta}
              </Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <WhatsAppLiveDemo active={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}
