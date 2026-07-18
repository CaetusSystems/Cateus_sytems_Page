import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCheck,
  Clock,
  MessagesSquare,
  Plus,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Section, SectionHeader } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useInView } from "@/hooks/use-in-view";
import { useDocumentHead } from "@/lib/useDocumentHead";
import { waUrl } from "@/lib/constants";

const CTA_MESSAGE = "Olá! Quero testar grátis o Atendente Virtual para WhatsApp.";

const BENEFITS = [
  {
    icon: Clock,
    title: "Responde a qualquer hora",
    desc: "De madrugada, no domingo, no feriado — o cliente nunca encontra o \"visto por último\" sem resposta.",
  },
  {
    icon: Calendar,
    title: "Agenda sozinho",
    desc: "Marca horário, confirma presença e lembra o cliente, sem ninguém da equipe tocar no calendário.",
  },
  {
    icon: MessagesSquare,
    title: "Fala do jeito da sua empresa",
    desc: "As respostas usam suas próprias palavras: preços, horários, endereço e política de atendimento.",
  },
  {
    icon: ShieldCheck,
    title: "Chama você quando precisa",
    desc: "Assunto delicado ou fora do script? Ele passa a conversa para um humano, sem travar o cliente.",
  },
];

const STEPS = [
  {
    icon: MessagesSquare,
    title: "Contamos o que seu WhatsApp mais responde",
    desc: "Uma conversa rápida sobre preços, horários, dúvidas e agendamentos do seu dia a dia.",
  },
  {
    icon: Settings,
    title: "Montamos o Atendente Virtual",
    desc: "Configuramos as respostas e conectamos ao número que sua empresa já usa — sem trocar de WhatsApp.",
  },
  {
    icon: Check,
    title: "Ele entra no ar e você acompanha",
    desc: "Os clientes são respondidos na hora. Você ajusta o que quiser, sempre que quiser.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Ele substitui completamente o atendimento humano?",
    a: "Não precisa. O Atendente Virtual cuida do repetitivo — perguntas frequentes, horários, preços, agendamento — e passa para uma pessoa da equipe quando o assunto exige.",
  },
  {
    q: "Preciso trocar de número de WhatsApp?",
    a: "Não. Ele funciona no número que sua empresa já usa hoje, sem perder o histórico de conversas com seus clientes.",
  },
  {
    q: "E se o cliente perguntar algo fora do script?",
    a: "O atendimento é encaminhado para você ou sua equipe. Nada fica sem resposta, mesmo quando o assunto foge do combinado.",
  },
  {
    q: "Quanto tempo leva para entrar no ar?",
    a: "Depende do tamanho da empresa, mas normalmente algumas poucas semanas — do primeiro contato até o atendente respondendo de verdade.",
  },
  {
    q: "Como funciona o teste grátis?",
    a: "É feito em conversa direta com a Caetus: você conta como seu WhatsApp funciona hoje e a gente mostra o Atendente Virtual respondendo do jeito da sua empresa.",
  },
];

export default function ProdutoAtendenteVirtual() {
  useDocumentHead({
    title: "Atendente Virtual para WhatsApp — Caetus Systems",
    description:
      "Atendimento automático no WhatsApp para pequenas empresas: responde clientes, agenda horários e nunca deixa mensagem no vácuo. Teste grátis com a Caetus Systems.",
    canonical: "https://caetussystems.com.br/produtos/bot-whatsapp",
    og: {
      "og:title": "Atendente Virtual para WhatsApp — Caetus Systems",
      "og:description":
        "Atendimento automático no WhatsApp para pequenas empresas: responde clientes, agenda horários e nunca deixa mensagem no vácuo.",
      "og:url": "/produtos/bot-whatsapp",
      "og:type": "website",
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <Nav />
      <main id="conteudo">
        <ProductHero />
        <TrustStrip />
        <BenefitsSection />
        <HowItWorksSection />
        <FaqSection />
        <TrialCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function ProductHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top,var(--accent-soft)_0%,transparent_60%)]" />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium text-primary">Atendente Virtual para WhatsApp</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Um atendente que nunca dorme{" "}
            <span className="text-primary">no seu WhatsApp.</span>
          </h1>
          <p className="mt-6 max-w-lg text-balance text-lg text-foreground/80 md:text-xl">
            Ele responde perguntas, agenda horários e cuida do repetitivo — enquanto sua equipe
            resolve o que só uma pessoa resolve.
          </p>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="animate-breathing rounded-full bg-brand-green px-6 text-white hover:bg-brand-green/90"
            >
              <a href={waUrl(CTA_MESSAGE)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="mr-1 h-4 w-4" />
                Testar grátis
              </a>
            </Button>
            <a
              href="#como-funciona-atendente"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Ver como funciona
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ChatMock />
        </motion.div>
      </div>
    </section>
  );
}

const TRUST_STATS = [
  { value: "24/7", label: "sempre disponível" },
  { value: "< 1min", label: "tempo médio de resposta" },
  { value: "0", label: "mensagens perdidas" },
] as const;

function TrustStrip() {
  return (
    <section className="border-t border-border bg-primary">
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-4 px-6 py-8 text-center">
        {TRUST_STATS.map((s) => (
          <div key={s.label}>
            <p className="text-2xl font-semibold tracking-tight text-primary-foreground sm:text-3xl">
              {s.value}
            </p>
            <p className="mt-1 text-[11px] text-primary-foreground/60 sm:text-xs">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const EXCHANGES: { q: string; a: string }[] = [
  {
    q: "Oi, vocês abrem aos sábados?",
    a: "Sim! Sábados das 9h às 13h. Quer que eu já deixe um horário reservado pra você?",
  },
  {
    q: "Quanto custa o serviço básico?",
    a: "A partir de R$ 120. Me conta rapidinho o que você precisa que eu te passo o valor certinho.",
  },
  {
    q: "Consigo marcar pra amanhã de manhã?",
    a: "Consigo sim! Tenho 9h ou 10h30 livres. Qual fica melhor pra você?",
  },
];

type Phase = "idle" | "question" | "typing" | "answer" | "hold";

function ChatMock() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (!inView) return;

    const durations: Record<Phase, number> = {
      idle: 400,
      question: 1400,
      typing: 1300,
      answer: 3200,
      hold: 500,
    };

    const advance = () => {
      setPhase((prev) => {
        if (prev === "idle") return "question";
        if (prev === "question") return "typing";
        if (prev === "typing") return "answer";
        if (prev === "answer") return "hold";
        setIndex((i) => (i + 1) % EXCHANGES.length);
        return "idle";
      });
    };

    const timeout = window.setTimeout(advance, durations[phase]);
    return () => clearTimeout(timeout);
  }, [inView, phase]);

  const current = EXCHANGES[index];
  const showQuestion = phase !== "idle";
  const showTyping = phase === "typing";
  const showAnswer = phase === "answer" || phase === "hold";

  // Coordenadas do recorte transparente da tela dentro do PNG da moldura
  // (assets/stock/elements/mockups/mockups-mockuphone-iphone-15-preto-retrato.png,
  // 1419x2796), medidas varrendo o canal alpha pixel a pixel — bordas retas em
  // left=120 top=120 right=1298 bottom=2675, raio de canto real ~165px medido
  // por ajuste de círculo em 2 pontos do arco (não é um chute visual).
  // Levemente maior que o recorte medido (0.3% de folga por lado) para nunca
  // deixar uma linha de arredondamento sub-pixel do navegador aparecer como
  // uma fresta branca na borda — o excesso fica escondido atrás da moldura
  // opaca, que sempre é desenhada por cima.
  const SCREEN = { left: "8.16%", top: "3.99%", width: "83.62%", height: "91.98%" };
  // Raio do arco medido em px do PNG original (~165px), convertido para % de
  // cada eixo do próprio recorte — um único "10%" ficaria pequeno demais no
  // eixo vertical e grande demais no horizontal, por ser um retângulo estreito.
  const SCREEN_RADIUS = "14% / 6.5%";

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[260px] drop-shadow-2xl"
      style={{ aspectRatio: "1419 / 2796" }}
    >
      <div
        className="absolute flex flex-col overflow-hidden bg-[#e9edf1]"
        style={{ ...SCREEN, borderRadius: SCREEN_RADIUS }}
      >
        <div className="flex items-center gap-2 bg-primary px-3 pb-2 pt-9">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
            <WhatsAppIcon className="h-3 w-3" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold leading-none text-white">
              Atendente Virtual
            </p>
            <p className="mt-1 truncate text-[9px] text-white/70">online agora</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-end gap-1.5 px-2.5 pb-5 pt-2.5">
          <AnimatePresence mode="wait">
            {showQuestion && (
              <motion.div
                key={`q-${index}`}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[85%] self-start rounded-xl rounded-bl-sm bg-white px-2.5 py-2 text-[11px] leading-snug text-foreground/90 shadow-sm"
              >
                {current.q}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {showTyping && (
              <motion.div
                key={`t-${index}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex max-w-[55%] items-center gap-1 self-end rounded-xl rounded-br-sm bg-brand-green px-2.5 py-2"
              >
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1 w-1 animate-bounce rounded-full bg-white/80"
                    style={{ animationDelay: `${d * 120}ms` }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {showAnswer && (
              <motion.div
                key={`a-${index}`}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[85%] self-end rounded-xl rounded-br-sm bg-brand-green px-2.5 py-2 text-[11px] leading-snug text-white shadow-sm"
              >
                {current.a}
                <div className="mt-1 flex items-center justify-end gap-1">
                  <span className="text-[8px] text-white/70">agora</span>
                  <CheckCheck className="h-2.5 w-2.5 text-white/70" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <img
        src="/mockups/iphone-15-frame.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
      />
    </div>
  );
}

function BenefitsSection() {
  return (
    <Section id="beneficios-atendente" tone="muted">
      <SectionHeader
        eyebrow="Por que ter um"
        title="O que muda no seu dia a dia."
      />
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
        {BENEFITS.map((b) => (
          <div
            key={b.title}
            className="flex flex-col rounded-2xl border border-border bg-card p-7"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <b.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function HowItWorksSection() {
  return (
    <Section id="como-funciona-atendente" tone="brand">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-primary-foreground/70">Como funciona</p>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          Três passos até ele responder por você.
        </h2>
      </div>
      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <div
            key={s.title}
            className="relative rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-8 text-center"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10 text-primary-foreground">
              <s.icon className="h-7 w-7" />
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight text-primary-foreground">
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">{s.desc}</p>
            {i < STEPS.length - 1 && (
              <span className="absolute right-[-16px] top-1/2 hidden -translate-y-1/2 md:block">
                <ArrowRight className="h-4 w-4 text-primary-foreground/25" />
              </span>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

function FaqSection() {
  return (
    <Section id="faq-atendente" tone="muted">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          eyebrow="Perguntas frequentes"
          title="O que todo empresário pergunta antes de testar"
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

function TrialCta() {
  return (
    <section className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          O teste grátis é uma conversa, não um formulário.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-primary-foreground/70">
          Chame no WhatsApp, conte como seu atendimento funciona hoje e a gente mostra o Atendente
          Virtual respondendo do jeito da sua empresa — sem custo, sem compromisso.
        </p>
        <div className="mt-10 flex justify-center">
          <Button
            asChild
            size="lg"
            className="animate-breathing rounded-full bg-brand-green px-6 text-white hover:bg-brand-green/90"
          >
            <a href={waUrl(CTA_MESSAGE)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="mr-1 h-4 w-4" />
              Testar grátis no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
