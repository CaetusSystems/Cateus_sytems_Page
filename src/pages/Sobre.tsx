import { lazy, Suspense } from "react";
import { Check, MapPin, Video } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { FinalCta } from "@/components/sections/FinalCta";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { useDocumentHead } from "@/lib/useDocumentHead";

const CoverageMap = lazy(() => import("@/components/CoverageMap"));

const PRESENCIAIS = [
  "Lagoa Santa (Sede)",
  "Vespasiano",
  "Pedro Leopoldo",
  "Matozinhos",
  "Confins",
  "Capim Branco",
  "Jatobá",
];

const AGENDAMENTO = [
  "Belo Horizonte",
  "Santa Luzia",
  "Jaboticatubas",
  "Serra do Cipó",
  "São José de Almeida",
];

const REASONS = [
  "Atendimento presencial na região quando fizer sentido.",
  "Atendimento remoto para empresas de qualquer lugar do Brasil.",
  "Você conversa direto com quem desenvolve e acompanha a solução.",
  "Tecnologia criada para resolver problemas reais do dia a dia.",
  "Evolução contínua da sua operação digital, sem trocar de fornecedor.",
];

export default function Sobre() {
  useDocumentHead({
    title: "Quem somos — Caetus Systems",
    description:
      "A Caetus Systems nasceu em Lagoa Santa para ajudar pequenas empresas a competir em igualdade por meio da tecnologia. Conheça nossa história e onde atendemos.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <main>
        <section className="relative bg-background">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
              {/* Foto */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-muted/60 via-card to-muted/40 shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--primary)_35%,transparent)]">
                  <img
                    src="/Henrique Caetano.jpeg"
                    alt="Henrique Caetano"
                    className="absolute inset-0 h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[11px] font-medium text-foreground/80 backdrop-blur">
                    Henrique Caetano · Fundador
                  </div>
                </div>
              </div>

              {/* Conteúdo */}
              <div>
                <p className="text-sm font-medium text-primary">Quem somos</p>
                <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                  Uma empresa local, que entende empresas locais.
                </h1>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85 sm:text-lg">
                  <p>
                    A <strong className="text-foreground">Caetus Systems</strong> nasceu em Lagoa
                    Santa com um objetivo simples: ajudar pequenas empresas a competir em igualdade
                    com empresas muito maiores por meio da tecnologia.
                  </p>
                  <p>
                    Acreditamos que negócios locais têm força — o que costuma faltar é estrutura
                    digital para acompanhar esse potencial. É essa estrutura que a Caetus assume,
                    monta e cuida continuamente para cada cliente.
                  </p>
                  <p>
                    A empresa é conduzida por{" "}
                    <strong className="text-foreground">Henrique Caetano</strong>, com mais de 5
                    anos de experiência desenvolvendo soluções de automação industrial, integração
                    de sistemas e otimização de processos — em ambientes onde organização,
                    eficiência e confiabilidade não são opcionais.
                  </p>
                  <p>
                    Essa mesma bagagem é aplicada hoje para que pequenas empresas ganhem tempo,
                    vendam mais e tenham uma operação digital organizada — sem depender do dono
                    estar em todo lugar ao mesmo tempo.
                  </p>
                </div>

                {/* Presencial */}
                <div className="mt-10 rounded-2xl border border-border/70 bg-card p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <h2 className="text-lg font-semibold">Atendimento presencial</h2>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-[11px] font-medium text-brand-green">
                      <MapPin className="h-3 w-3" />
                      Empresa local
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Atendemos empresas presencialmente na região metropolitana de Belo Horizonte.
                  </p>

                  <div className="mt-5">
                    <Suspense
                      fallback={
                        <div className="aspect-[16/10] w-full animate-pulse rounded-xl border border-border/60 bg-muted/40" />
                      }
                    >
                      <CoverageMap />
                    </Suspense>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-green">
                        <span className="inline-block h-2 w-2 rounded-full bg-brand-green" />
                        Atendimento presencial
                      </div>
                      <ul className="flex flex-wrap gap-2">
                        {PRESENCIAIS.map((c) => (
                          <li
                            key={c}
                            className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-medium text-foreground/80"
                          >
                            <MapPin className="h-3 w-3 text-brand-green" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                        <span className="inline-block h-2 w-2 rounded-full bg-primary/70" />
                        Mediante agendamento
                      </div>
                      <ul className="flex flex-wrap gap-2">
                        {AGENDAMENTO.map((c) => (
                          <li
                            key={c}
                            className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-medium text-foreground/80"
                          >
                            <MapPin className="h-3 w-3 text-primary/70" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Remoto */}
                <div className="mt-4 rounded-2xl border border-border/70 bg-card p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Video className="h-5 w-5" />
                    </span>
                    <h2 className="text-lg font-semibold">Atendimento remoto</h2>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Também atendemos empresas de qualquer lugar do Brasil. Grande parte do
                    acompanhamento acontece por videoconferência, acesso remoto e suporte contínuo
                    — mantendo a mesma qualidade independentemente da localização do cliente.
                  </p>
                </div>

                {/* Diferenciais */}
                <div className="mt-10">
                  <h2 className="text-lg font-semibold">Diferenciais</h2>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {REASONS.map((r) => (
                      <li
                        key={r}
                        className="flex items-start gap-3 rounded-xl border border-border/70 bg-card p-4"
                      >
                        <Check className="mt-0.5 h-5 w-5 flex-none text-brand-green" />
                        <span className="text-sm leading-relaxed text-foreground/85">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Citação institucional */}
            <div className="mt-24 sm:mt-32">
              <div className="mx-auto max-w-4xl text-center">
                <span className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
                  Nosso posicionamento
                </span>
                <blockquote className="mt-8 text-balance text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                  <span className="text-primary">“</span>A tecnologia pode ser desenvolvida de
                  qualquer lugar. Mas entender o seu negócio de perto faz toda a diferença.
                  <span className="text-primary">”</span>
                </blockquote>
                <div className="mx-auto mt-10 h-px w-16 bg-primary/40" />
              </div>
            </div>
          </div>
        </section>
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
