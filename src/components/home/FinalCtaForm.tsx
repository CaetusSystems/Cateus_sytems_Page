import { LeadForm } from "@/components/lead/LeadForm";
import { HORARIOS_DEMO } from "@/lib/constants";

export function FinalCtaForm() {
  return (
    <section id="contato" className="border-t border-border bg-brand-night text-white">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Veja funcionando no seu negócio.
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Conte rápido o que você faz e marque a demonstração no horário que preferir.
          </p>
          <ul className="mt-6 space-y-1 text-sm text-white/60">
            {HORARIOS_DEMO.map((h) => (
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
