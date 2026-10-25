import { LeadForm } from "@/components/lead/LeadForm";
import { useT } from "@/i18n";

export function FinalCtaForm() {
  const t = useT();
  return (
    <section id="contato" className="border-t border-border bg-brand-night text-white">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {t.finalCta.title}
          </h2>
          <p className="mt-4 text-lg text-white/70">{t.finalCta.text}</p>
          <ul className="mt-6 space-y-1 text-sm text-white/60">
            {t.hours.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
        <div className="text-foreground">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
