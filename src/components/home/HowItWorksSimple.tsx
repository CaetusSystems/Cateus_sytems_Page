import { CalendarCheck, Check, Eye, Rocket } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useT } from "@/i18n";

const STEP_ICONS = [CalendarCheck, Eye, Rocket];

/** Mini cena de cada passo: só desenho e movimento, sem números ou dados. */
function StepScene({ index }: { index: number }) {
  const t = useT();
  if (index === 0) {
    return (
      <div className="rounded-2xl bg-white/10 p-3">
        <div className="flex items-center justify-between">
          <span className="h-2 w-16 rounded-full bg-white/40" />
          <span className="step-pop flex items-center gap-1 rounded-full bg-brand-blue px-2.5 py-1 text-xs font-medium">
            <CalendarCheck className="h-3 w-3" aria-hidden="true" />
            {t.how.booked}
          </span>
        </div>
        <span className="step-grow mt-3 block h-2 w-full rounded-full bg-white/25" />
        <span className="step-grow mt-2 block h-2 w-2/3 rounded-full bg-white/25" />
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="rounded-2xl bg-white/10 p-3">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
        </div>
        <span className="step-grow mt-3 block h-8 w-full rounded-lg bg-brand-blue/70" />
        <div className="mt-2 grid grid-cols-3 gap-2">
          <span className="step-grow block h-6 rounded-md bg-white/25" />
          <span className="step-grow block h-6 rounded-md bg-white/25" />
          <span className="step-grow block h-6 rounded-md bg-white/25" />
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-2xl bg-white/10 p-3">
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
        </span>
        <span className="text-sm font-medium">{t.how.live}</span>
        <Check className="step-pop ml-auto h-4 w-4 text-emerald-300" aria-hidden="true" />
      </div>
      <div className="mt-3 flex h-10 items-end gap-1.5">
        {[40, 62, 50, 78, 92].map((h, i) => (
          <span
            key={i}
            className="step-bar w-full rounded-sm bg-brand-blue"
            style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export function HowItWorksSimple() {
  const t = useT();
  const { ref, inView } = useInView<HTMLOListElement>(0.2);

  return (
    <section id="como-funciona" className="border-t border-border bg-brand-night text-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24">
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          {t.how.title}
        </h2>
        <ol
          ref={ref}
          data-in-view={inView ? "true" : "false"}
          className="steps-scene relative mt-10 grid gap-5 md:grid-cols-3"
        >
          {t.how.steps.map((s, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <li
                key={s.title}
                style={{ transitionDelay: `${i * 140}ms` }}
                className="step-card relative rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue text-white shadow-lg shadow-brand-blue/40">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  <span className="sr-only">
                    {t.how.step} {i + 1}:{" "}
                  </span>
                  {s.title}
                </h3>
                <p className="mt-2 text-white/70">{s.text}</p>
                <div className="mt-5" aria-hidden="true">
                  <StepScene index={i} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
