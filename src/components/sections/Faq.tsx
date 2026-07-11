import { Plus } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { FAQ_ITEMS } from "@/data/faq";

export function Faq() {
  return (
    <Section id="faq" tone="muted">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          eyebrow="Perguntas frequentes"
          title="O que todo empresário pergunta antes de contratar"
          align="left"
        />
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group p-5 open:bg-muted/30">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <h3 className="text-base font-semibold text-foreground">{item.q}</h3>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
