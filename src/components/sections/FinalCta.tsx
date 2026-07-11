import { ArrowRight, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/constants";

export function FinalCta() {
  return (
    <section id="contato" className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          Finalmente, alguém cuidando dessa parte da sua empresa.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-primary-foreground/70">
          Conte como sua empresa funciona hoje. A gente mostra por onde começar.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="animate-breathing rounded-full bg-brand-green px-6 text-white hover:bg-brand-green/90"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="mr-1 h-4 w-4" />
              Falar no WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary" className="rounded-full px-6">
            <a href="mailto:contato@caetus.systems">
              Enviar e-mail
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-primary-foreground/30 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir Instagram da Caetus Systems"
            >
              <Instagram className="mr-1 h-4 w-4" />
              Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
