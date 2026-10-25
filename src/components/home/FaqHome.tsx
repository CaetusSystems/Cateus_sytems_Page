import { Plus } from "lucide-react";
import { FAQ_HOME } from "@/data/faq-home";

export function FaqHome() {
  return (
    <section id="faq" className="border-t border-border bg-gradient-to-b from-background to-tint">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 md:py-24">
        <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          Perguntas frequentes
        </h2>
        <div className="mt-8 divide-y divide-border rounded-3xl border border-border bg-card">
          {FAQ_HOME.map((item) => (
            <details key={item.q} className="group p-5 open:bg-muted/30">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4">
                <h3 className="text-base font-semibold">{item.q}</h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="mt-2 leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
