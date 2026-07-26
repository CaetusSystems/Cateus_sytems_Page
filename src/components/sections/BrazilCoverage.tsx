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
    // viewport pra ganhar esses pixels embaixo. No mobile o mapa físico é
    // menor (limitado pela largura, ver MIN_VISIBLE_WIDTH_FRACTION), então a
    // mesma folga sobrava como vão em branco acima/abaixo — reduzida só
    // abaixo do breakpoint sm, o desktop mantém os valores originais.
    <section
      aria-label="Caetus Systems atende empresas em todo o Brasil"
      className="relative isolate flex h-[calc(100svh+40px)] min-h-[560px] w-full items-center justify-center overflow-hidden bg-white sm:h-[calc(100svh+110px)] sm:min-h-[670px]"
    >
      <HeroParticleField className="absolute inset-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex px-6 pt-8 text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-400 md:px-12 md:pt-10">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
          Atendimento ativo
        </span>
      </div>

      <div className="relative z-10 -translate-y-8 flex flex-col items-center px-6 sm:-translate-y-10 md:-translate-y-10">
        {/* No mobile o mapa de pontos é bem mais baixo (ver
            MIN_VISIBLE_WIDTH_FRACTION no HeroParticleField) e fica centrado
            na seção — a logo, no fluxo normal, caía bem em cima do topo do
            território. Um translate extra só nela (não afeta o fluxo dos
            irmãos abaixo) sobe a logo pra ficar inteira acima do mapa,
            deixando "Atendimento em todo o Brasil" e os CTAs centralizados
            sobre o território como antes. */}
        <img
          src="/caetus-wordmark.png"
          alt="Caetus Systems"
          className="pointer-events-none block h-20 w-auto max-sm:-translate-y-[90px] sm:h-24 md:h-32 lg:h-36"
        />
        {/* Texto e CTAs centralizados na tela (não mais restritos à faixa da
            "escrita" da logo) — a logo continua no mesmo lugar, só o bloco de
            texto abaixo passou a centralizar em relação à seção inteira. */}
        <div className="mt-9 flex flex-col items-center text-center max-sm:mt-7 md:mt-10">
          {/* No mobile o texto cai sobre a parte mais densa dos pontos do
              mapa — text-foreground/70 lia bem no fundo liso do desktop, mas
              vira ruído contra a textura. Maior, mais peso e um halo branco
              (text-shadow) separam a letra do fundo sem mexer na animação
              nem introduzir um card/blur por cima do mapa. */}
          <p className="text-balance text-lg font-semibold tracking-tight text-foreground/70 max-sm:text-xl max-sm:font-bold max-sm:text-foreground max-sm:[text-shadow:0_1px_3px_rgba(255,255,255,.9),0_0_18px_rgba(255,255,255,.75)] md:text-xl">
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
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="rounded-full max-sm:font-semibold max-sm:[text-shadow:0_1px_3px_rgba(255,255,255,.9),0_0_18px_rgba(255,255,255,.75)]"
            >
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
