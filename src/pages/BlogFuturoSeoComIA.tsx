import { Link } from "react-router-dom";
import { useDocumentHead } from "../lib/useDocumentHead";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Search,
  Sparkles,
  Bot,
  Globe,
  Building2,
  Check,
  X,
  MessageCircle,
  Cpu,
  Rocket,
  ListChecks,
  Users,
  Calendar,
  HelpCircle,
  ExternalLink,
  User,
  type LucideIcon,
} from "lucide-react";

const ARTICLE_URL = "/blog/futuro-do-seo-com-ia";
const ARTICLE_TITLE = "SEO, AEO e GEO: como preparar seu site para o Google e para as IAs";
const ARTICLE_DESCRIPTION =
  "Guia completo sobre SEO, AEO e GEO: como preparar seu site para o Google e para inteligências artificiais como ChatGPT, Gemini e Copilot em 2026.";
const ARTICLE_PUBLISHED = "2026-07-03";
const ARTICLE_MODIFIED = "2026-07-03";
const AUTHOR_NAME = "Henrique Caetano";
const AUTHOR_ROLE = "Fundador da Caetus Systems";

const FAQ: { q: string; a: string }[] = [
  {
    q: "O que é SEO?",
    a: "SEO (Search Engine Optimization) é o conjunto de práticas técnicas e de conteúdo que ajudam o Google e outros buscadores a entender e ranquear seu site nas listas de resultados de busca.",
  },
  {
    q: "O que é AEO?",
    a: "AEO (Answer Engine Optimization) é a otimização de um site para que mecanismos de resposta — como o Google com IA, ChatGPT e Gemini — consigam extrair respostas prontas do seu conteúdo e exibi-las diretamente ao usuário.",
  },
  {
    q: "O que é GEO?",
    a: "GEO (Generative Engine Optimization) é a estratégia de preparar sua empresa para ser citada dentro de respostas geradas por inteligência artificial, como ChatGPT, Gemini, Copilot e Perplexity.",
  },
  {
    q: "Qual a diferença entre SEO e GEO?",
    a: "SEO otimiza seu site para aparecer em listas de links no Google. GEO otimiza sua empresa para ser citada dentro de respostas geradas por IA, onde o usuário pode nem chegar a ver uma lista de sites.",
  },
  {
    q: "Como preparar um site para Inteligência Artificial?",
    a: "É preciso ter conteúdo semântico, headings organizados, dados estruturados Schema.org, FAQ com perguntas reais, informações completas sobre a empresa e uma marcação clara de serviços, localização e horários.",
  },
  {
    q: "Meu site atual está preparado para IA?",
    a: "Provavelmente não. A maioria dos sites foi construída pensando apenas no Google e não organiza informações essenciais de um jeito que uma IA consiga entender e recomendar sua empresa.",
  },
  {
    q: "Vale a pena atualizar um site antigo?",
    a: "Sim. Em muitos casos é mais rápido e barato reestruturar o site atual do que criar um novo do zero — desde que a base técnica permita adicionar Schema.org, melhorar performance e reorganizar o conteúdo.",
  },
];

function Reveal({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FlowStep({
  icon: Icon,
  label,
  tone = "muted",
}: {
  icon: LucideIcon;
  label: string;
  tone?: "muted" | "primary" | "green";
}) {
  const toneClass =
    tone === "primary"
      ? "bg-primary text-primary-foreground border-primary"
      : tone === "green"
        ? "border-[color:var(--brand-green)] bg-[color:color-mix(in_oklab,var(--brand-green)_10%,var(--card))] text-foreground"
        : "bg-card text-foreground border-border";
  return (
    <div
      className={`flex min-w-[140px] flex-col items-center gap-2 rounded-2xl border px-4 py-4 text-center shadow-sm ${toneClass}`}
    >
      <Icon className="h-6 w-6" />
      <span className="text-xs font-medium leading-tight">{label}</span>
    </div>
  );
}

function Arrow() {
  return (
    <motion.div
      animate={{ x: [0, 6, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      className="text-muted-foreground"
    >
      <ArrowRight className="h-5 w-5" />
    </motion.div>
  );
}

function AnimatedFlow({
  steps,
  highlightLast,
}: {
  steps: { icon: LucideIcon; label: string }[];
  highlightLast?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center gap-3 md:gap-4">
          <Reveal delay={i * 0.15} y={12}>
            <FlowStep
              icon={s.icon}
              label={s.label}
              tone={
                highlightLast && i === steps.length - 1 ? "green" : i === 0 ? "primary" : "muted"
              }
            />
          </Reveal>
          {i < steps.length - 1 && <Arrow />}
        </div>
      ))}
    </div>
  );
}

const COMPARISON = [
  {
    key: "SEO",
    title: "SEO",
    subtitle: "Search Engine Optimization",
    desc: "Facilitar para o Google entender seu site e ranquear suas páginas nas listas de busca.",
    icon: Search,
  },
  {
    key: "AEO",
    title: "AEO",
    subtitle: "Answer Engine Optimization",
    desc: "Facilitar para inteligências artificiais encontrarem respostas prontas dentro do seu conteúdo.",
    icon: Bot,
  },
  {
    key: "GEO",
    title: "GEO",
    subtitle: "Generative Engine Optimization",
    desc: "Preparar sua empresa para aparecer nas respostas geradas por IA quando alguém pergunta sobre o seu segmento.",
    icon: Sparkles,
  },
];

const TIMELINE = [
  {
    year: "2010",
    title: "A era do Google",
    desc: "Todo mundo pesquisava no Google. Ranquear entre os 10 primeiros era o objetivo.",
    icon: Search,
  },
  {
    year: "2020",
    title: "Google + Redes Sociais",
    desc: "Instagram, Facebook e Google passam a dividir a atenção do consumidor.",
    icon: Globe,
  },
  {
    year: "2025",
    title: "Google + IA",
    desc: "ChatGPT, Gemini e Copilot passam a responder perguntas antes mesmo do usuário clicar em um site.",
    icon: Bot,
  },
  {
    year: "Futuro",
    title: "IA como porta de entrada",
    desc: "Boa parte das descobertas de empresas passará por respostas geradas por inteligência artificial.",
    icon: Rocket,
  },
];

const CHECKLIST = [
  "SEO técnico",
  "Dados estruturados (Schema.org)",
  "Google Business otimizado",
  "Performance e Core Web Vitals",
  "Experiência mobile impecável",
  "Conteúdo organizado por tópicos",
  "FAQ com perguntas reais dos clientes",
  "Marcação semântica para IAs",
  "AEO — respostas prontas para IA",
  "GEO — presença nas respostas generativas",
  "Atualizações contínuas de conteúdo",
];

function TimelineItem({ item, index }: { item: (typeof TIMELINE)[number]; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isRight = index % 2 === 1;
  const Icon = item.icon;

  return (
    <div ref={ref} className="relative grid grid-cols-9 items-center gap-4">
      <motion.div
        initial={{ opacity: 0, x: isRight ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`col-span-9 md:col-span-4 ${isRight ? "md:col-start-6 md:text-left" : "md:text-right"}`}
      >
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {item.year}
          </p>
          <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
        </div>
      </motion.div>

      <div className="col-span-9 md:col-span-1 md:col-start-5 flex justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-background text-primary shadow-sm"
        >
          <Icon className="h-5 w-5" />
        </motion.div>
      </div>
    </div>
  );
}

function AnimatedChecklist() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [checked, setChecked] = useState<number>(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setChecked((c) => {
        if (c >= CHECKLIST.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 260);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="mx-auto max-w-2xl">
      <ul className="space-y-2">
        {CHECKLIST.map((item, i) => {
          const isDone = i < checked;
          return (
            <li
              key={item}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                isDone
                  ? "border-[color:var(--brand-green)]/40 bg-[color:color-mix(in_oklab,var(--brand-green)_8%,var(--card))]"
                  : "border-border bg-card"
              }`}
            >
              <motion.span
                initial={false}
                animate={{ scale: isDone ? 1 : 0.8, opacity: isDone ? 1 : 0.5 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                  isDone
                    ? "border-[color:var(--brand-green)] bg-[color:var(--brand-green)] text-white"
                    : "border-border bg-background text-muted-foreground"
                }`}
              >
                <Check className="h-3.5 w-3.5" />
              </motion.span>
              <span className={`text-sm ${isDone ? "text-foreground" : "text-muted-foreground"}`}>
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function ArticlePage() {
  useDocumentHead({
    title: `${ARTICLE_TITLE} — Caetus Systems`,
    description: ARTICLE_DESCRIPTION,
    canonical: ARTICLE_URL,
    og: {
      "og:title": ARTICLE_TITLE,
      "og:description": ARTICLE_DESCRIPTION,
      "og:type": "article",
      "og:url": ARTICLE_URL,
      "og:locale": "pt_BR",
      "article:author": AUTHOR_NAME,
      "article:section": "SEO e Inteligência Artificial",
      "article:published_time": ARTICLE_PUBLISHED,
      "article:modified_time": ARTICLE_MODIFIED,
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "@id": `${ARTICLE_URL}#article`,
          headline: ARTICLE_TITLE,
          description: ARTICLE_DESCRIPTION,
          inLanguage: "pt-BR",
          datePublished: ARTICLE_PUBLISHED,
          dateModified: ARTICLE_MODIFIED,
          author: {
            "@type": "Person",
            name: AUTHOR_NAME,
            jobTitle: AUTHOR_ROLE,
            worksFor: { "@type": "Organization", name: "Caetus Systems" },
          },
          publisher: {
            "@type": "Organization",
            name: "Caetus Systems",
            logo: { "@type": "ImageObject", url: "/favicon.ico" },
          },
          about: [
            "SEO",
            "AEO",
            "GEO",
            "Inteligência Artificial",
            "ChatGPT",
            "Gemini",
            "Google Business",
          ],
          keywords:
            "SEO, AEO, GEO, IA, ChatGPT, Gemini, Copilot, presença digital, pequenas empresas",
          mainEntityOfPage: { "@type": "WebPage", "@id": ARTICLE_URL },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: "/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
            { "@type": "ListItem", position: 3, name: ARTICLE_TITLE, item: ARTICLE_URL },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    },
  });

  return (
    <main className="bg-background text-foreground">
      {/* Top nav */}
      <div className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-sm font-semibold tracking-tight text-foreground">
            Caetus Systems
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao blog
          </Link>
        </div>
      </div>

      {/* 1. Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklab,var(--primary)_18%,transparent)_0%,transparent_70%)]" />
        <div className="mx-auto max-w-4xl px-6 pb-20 pt-20 md:pt-28">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Futuro da busca • SEO, AEO e GEO
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              SEO está mudando.{" "}
              <span className="text-primary">
                Seu próximo cliente talvez nunca entre no Google.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{AUTHOR_NAME}</p>
                  <p className="text-xs">{AUTHOR_ROLE}</p>
                </div>
              </div>
              <span className="hidden h-4 w-px bg-border sm:inline-block" />
              <p className="text-xs">
                Publicado em <time dateTime={ARTICLE_PUBLISHED}>03 de julho de 2026</time> ·
                Atualizado em <time dateTime={ARTICLE_MODIFIED}>03 de julho de 2026</time>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
              Cada vez mais pessoas fazem perguntas diretamente para inteligências artificiais como
              ChatGPT, Gemini e Copilot — e recebem uma resposta pronta, sem passar por uma lista de
              sites. Sua empresa está preparada para aparecer nessas respostas?
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
              <div className="flex flex-col items-center gap-6 md:flex-row md:justify-around">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Search className="h-5 w-5" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">Ontem</p>
                    <p className="text-muted-foreground">Pesquisa no Google</p>
                  </div>
                </div>
                <ArrowRight className="hidden h-5 w-5 text-muted-foreground md:block" />
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">Hoje</p>
                    <p className="text-muted-foreground">Pergunta direta para uma IA</p>
                  </div>
                </div>
                <ArrowRight className="hidden h-5 w-5 text-muted-foreground md:block" />
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--brand-green)] text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">Amanhã</p>
                    <p className="text-muted-foreground">IA recomenda sua empresa</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Como funcionava antes */}
      <section className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Como funcionava antes
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Por mais de duas décadas, encontrar uma empresa seguiu quase sempre o mesmo caminho.
            </p>
          </Reveal>
          <div className="mt-10">
            <AnimatedFlow
              steps={[
                { icon: Users, label: "Pessoa" },
                { icon: Search, label: "Google" },
                { icon: Globe, label: "Lista de sites" },
                { icon: Building2, label: "Cliente escolhe" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 3. Como está começando a funcionar agora */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-20">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Como está começando a funcionar agora
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              As inteligências artificiais estão se tornando uma nova porta de entrada para
              encontrar empresas. A pessoa pergunta, a IA responde — e recomenda apenas quem está
              preparado.
            </p>
          </Reveal>
          <div className="mt-10">
            <AnimatedFlow
              highlightLast
              steps={[
                { icon: Users, label: "Pessoa" },
                { icon: Bot, label: "IA" },
                { icon: MessageCircle, label: "Resposta pronta" },
                { icon: Building2, label: "Empresa recomendada" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 4. O problema */}
      <section className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">O problema</h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Muitos sites foram construídos pensando apenas no Google. Eles não organizam
              informações essenciais — o que a empresa faz, onde atende, como é contratada, quais
              dúvidas responde — de um jeito que uma inteligência artificial consiga entender.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Resultado: quando alguém pergunta a um ChatGPT da vida{" "}
              <span className="font-semibold text-foreground">
                "qual a melhor empresa para X na minha região?"
              </span>
              , essas empresas simplesmente não aparecem.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5. SEO x AEO x GEO */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              SEO, AEO e GEO — o que muda?
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Três siglas, três públicos diferentes. Explicado sem jargão:
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {COMPARISON.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.key} delay={i * 0.1}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">{c.title}</h3>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {c.subtitle}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">{c.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Exemplo prático */}
      <section className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Um exemplo prático
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Imagine duas oficinas mecânicas em Lagoa Santa. Alguém pergunta para uma IA:{" "}
              <span className="font-semibold text-foreground">
                "Qual a melhor oficina para revisão de carro em Lagoa Santa?"
              </span>
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-destructive">
                  <X className="h-4 w-4" /> Oficina A — site comum
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Página com foto do dono e um telefone.</li>
                  <li>• Sem descrição clara dos serviços.</li>
                  <li>• Sem endereço estruturado.</li>
                  <li>• Sem perguntas frequentes.</li>
                  <li>• Google Business desatualizado.</li>
                </ul>
                <p className="mt-4 text-sm">
                  A IA <span className="font-semibold">não a recomenda</span> porque não entende o
                  que ela faz.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-[color:var(--brand-green)]/40 bg-[color:color-mix(in_oklab,var(--brand-green)_8%,var(--card))] p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--brand-green)]">
                  <Check className="h-4 w-4" /> Oficina B — site preparado
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Serviços descritos por categoria e preço médio.</li>
                  <li>• Endereço, horários e área de atendimento estruturados.</li>
                  <li>• FAQ com dúvidas reais dos clientes.</li>
                  <li>• Google Business sincronizado com o site.</li>
                  <li>• Marcação Schema.org para IAs entenderem tudo.</li>
                </ul>
                <p className="mt-4 text-sm">
                  A IA{" "}
                  <span className="font-semibold text-[color:var(--brand-green)]">
                    recomenda essa
                  </span>{" "}
                  quando alguém pergunta.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. Timeline */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-20">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              A evolução da descoberta de empresas
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Uma linha do tempo curta para entender onde estamos e para onde vamos.
            </p>
          </Reveal>

          <div className="relative mt-14">
            <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" />
            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <TimelineItem key={item.year} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Checklist */}
      <section className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <Reveal>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <ListChecks className="h-4 w-4" /> Checklist Caetus
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              O que um site preparado para o futuro precisa ter
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Cada item abaixo é entregue de série nos sites que a Caetus constrói.
            </p>
          </Reveal>

          <div className="mt-10">
            <AnimatedChecklist />
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary to-[color:color-mix(in_oklab,var(--primary)_75%,black)] p-8 text-center text-primary-foreground shadow-lg md:p-10">
              <Cpu className="mx-auto h-8 w-8 opacity-90" />
              <p className="mt-4 text-balance text-xl font-semibold md:text-2xl">
                Na Caetus Systems, nossos sites já nascem preparados para o presente e para o futuro
                da internet.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-green)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02]"
                >
                  Quero um site assim
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  Ver mais conteúdos
                  <Calendar className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Reveal>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <HelpCircle className="h-4 w-4" /> Perguntas frequentes
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Dúvidas sobre SEO, AEO e GEO
            </h2>
            <p className="mt-3 text-muted-foreground">
              Respostas objetivas — pensadas para pessoas, para o Google e para mecanismos de
              resposta baseados em IA.
            </p>
          </Reveal>

          <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
            {FAQ.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.05}>
                <details className="group p-5 open:bg-muted/30">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <h3 className="text-base font-semibold text-foreground">{item.q}</h3>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45">
                      <span className="text-lg leading-none">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 rounded-2xl border border-border/60 bg-muted/30 p-5 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Referências</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                <li>
                  <a
                    href="https://developers.google.com/search"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-foreground"
                  >
                    Google Search Central
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://schema.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-foreground"
                  >
                    Schema.org
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://openai.com/index/introducing-chatgpt-search/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-foreground"
                  >
                    OpenAI — ChatGPT Search
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com/business/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-foreground"
                  >
                    Google Business Profile
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. CTA final */}
      <section className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Reveal>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Seu site está preparado para o futuro das buscas?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-muted-foreground">
              A Caetus Systems desenvolve sites já preparados para SEO, AEO e GEO desde o primeiro
              dia — com estrutura semântica, dados estruturados e conteúdo pronto para o Google e
              para as IAs.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="https://wa.me/5531972131824"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-green)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" />
                Conversar no WhatsApp
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Conhecer nossos serviços
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
