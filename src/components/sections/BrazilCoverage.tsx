import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { WHATSAPP_URL } from "@/lib/constants";
import { HeroParticleField } from "./HeroParticleField";

// Seção de abertura, antes do Hero: o mapa do Brasil em partículas ocupa a
// tela inteira, reage ao mouse — a primeira coisa que a pessoa vê ao entrar
// no site. Draft original: Superdesign, projeto "Force Field Background".
// A logo é o destaque principal aqui (por isso grande) — "Atendimento em
// todo o Brasil" e os CTAs são coadjuvantes; os mesmos CTAs foram removidos
// da Hero logo abaixo pra não duplicar.
export function BrazilCoverage() {
  return (
    // Altura da tela + folga extra embaixo: o mapa de partículas tem tamanho
    // físico fixo (ver HeroParticleField) e em janelas de desktop comuns
    // (~650-760px úteis) sobrava um corte na ponta do Sul. Em vez de mexer
    // no tamanho do mapa, esticamos o container um pouco além da altura da
    // viewport pra ganhar esses pixels embaixo.
    <section
      aria-label="Caetus Systems atende empresas em todo o Brasil"
      className="relative isolate flex h-[calc(100svh+110px)] min-h-[670px] w-full items-center justify-center overflow-hidden bg-white"
    >
      <HeroParticleField className="absolute inset-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex px-6 pt-8 text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-400 md:px-12 md:pt-10">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
          Atendimento ativo
        </span>
      </div>

      <div className="relative z-10 -translate-y-8 w-fit px-6 sm:-translate-y-10 md:-translate-y-10">
        <img
          src="/caetus-wordmark.png"
          alt="Caetus Systems"
          className="pointer-events-none block h-20 w-auto sm:h-24 md:h-32 lg:h-36"
        />
        {/* A "escrita" CAETUS SYSTEMS ocupa só ~67,7% da largura da wordmark
            (os outros ~32,3% à esquerda são o ícone "C") — esse bloco fica
            restrito a essa faixa pra centralizar de verdade só sob o texto,
            não sob a logo inteira. Frações vêm da bbox real do PNG
            (caetus-wordmark.png, texto vai de x=187 a x=579 numa imagem de
            579px de largura). */}
        <div
          className="mt-9 flex w-full flex-col items-center text-center md:mt-10 md:ml-[32.3%] md:w-[67.7%]"
        >
          <p className="text-balance text-lg font-semibold tracking-tight text-foreground/70 md:text-xl">
            Atendimento em todo o Brasil.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-brand-green px-6 text-white hover:bg-brand-green/90"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="mr-1 h-4 w-4" />
                Falar no WhatsApp
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full">
              <a href="#solucoes">
                Ver soluções
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
