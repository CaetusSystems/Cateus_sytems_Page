import { Link } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
const CoverageMap = lazy(() => import("@/components/CoverageMap"));
import {
  ArrowRight,
  Sparkles,
  Check,
  X,
  Clock,
  Search,
  MessageCircle,
  Wallet,
  HeartHandshake,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Repeat,
  Instagram,
  UserRound,
  Wrench,
  UtensilsCrossed,
  Stethoscope,
  ShoppingBag,
  Briefcase,
  HardHat,
  Factory,
  Home,
  MapPin,
  Video,
  ImageIcon,
  Globe,
  Headphones,
  Megaphone,
  Workflow,
  LayoutDashboard,
  Code2,
  BrainCircuit,
  AlertTriangle,
  ArrowDown,
  Infinity as InfinityIcon,
  Bell,
  BarChart3,
  Cpu,
  Bot,
  Facebook,
  Linkedin,
  Heart,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { IntroSplash, useIntroSplash } from "@/components/IntroSplash";

const WHATSAPP_NUMBER = "5531972131824";
const WHATSAPP_DISPLAY = "(31) 97213-1824";
const WHATSAPP_MESSAGE = "Olá! Vim pelo site da Caetus Systems e gostaria de conversar.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;
// Configure only this URL to point to a different Instagram profile.
const INSTAGRAM_URL = "https://www.instagram.com/Caetus_Systems";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}

function WhatsAppFloatingButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-white shadow-lg shadow-brand-green/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function Index() {
  const { show, ready, finish } = useIntroSplash();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const variants = ["fade-up", "fade", "slide-left", "slide-right", "scale-in"] as const;
    const skipIds = new Set(["hero", "whatsapp", "quem-somos", "contato"]);

    const sections = Array.from(root.querySelectorAll<HTMLElement>("section"));
    sections.forEach((el, i) => {
      if (skipIds.has(el.id)) return;
      const v = variants[i % variants.length];
      el.classList.add("section-reveal", `section-reveal--${v}`);
      if (prefersReduced) el.classList.add("is-visible");
    });

    // Stagger direct card grids inside each section
    const grids = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-stagger] > *"));
    grids.forEach((child, i) => {
      child.classList.add("stagger-item");
      child.style.setProperty("--stagger-i", String(i % 12));
      if (prefersReduced) child.classList.add("is-visible");
    });

    if (prefersReduced || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    sections.forEach((el) => {
      if (!skipIds.has(el.id)) io.observe(el);
    });
    grids.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-background text-foreground antialiased">
      <AnimatePresence>
        {ready && show && <IntroSplash key="intro" onFinish={finish} />}
      </AnimatePresence>
      <Nav />
      <main>
        <Hero />
        <ValueProp />
        <Problem />
        <CostOfInaction />
        <Operation />
        <WhatsIncluded />
        <Ecosystem />
        <Meanwhile />
        <Economy />
        <WhatsAppSection />
        <BeforeAfter />
        <ForWho />
        <About />
        <HowItWorks />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <img
            src="/caetus-logo.png"
            alt="Caetus Systems"
            className="h-7 w-7 rounded-md object-contain"
          />
          <span className="text-sm font-semibold tracking-tight">
            Caetus <span className="text-muted-foreground font-normal">Systems</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#operacao"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Operação Digital
          </a>
          <a
            href="#para-quem"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Para quem é
          </a>
          <a
            href="#whatsapp"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            WhatsApp
          </a>
          <a
            href="#antes-depois"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Antes e depois
          </a>
          <a
            href="#quem-somos"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Quem somos
          </a>
        </nav>
        <Button asChild size="sm" className="rounded-full gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar no WhatsApp"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {WHATSAPP_DISPLAY}
          </a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top,var(--accent-soft)_0%,transparent_60%)]" />
      <div className="mx-auto max-w-6xl px-6 pt-8 md:pt-10">
        <img
          src="/caetus-banner.png"
          alt="Caetus Systems"
          className="w-full rounded-2xl object-cover"
        />
      </div>
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-28 md:pt-20 md:pb-40">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-brand-green" />
            Sua presença digital, cuidada continuamente
          </div>
          <h1 className="text-balance text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            Sua empresa funcionando,{" "}
            <span className="text-primary">mesmo quando você não está.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg font-medium text-foreground/80 md:text-xl">
            Você cuida do seu negócio. A gente cuida do digital.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
            Da primeira conversa à evolução contínua, assumimos a operação digital da sua empresa
            para que você possa crescer sem precisar montar uma equipe de tecnologia, marketing e
            automação.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-6">
              <a href="#contato">
                Agendar uma conversa
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full">
              <a href="#operacao">Ver como funciona</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-20 max-w-4xl"
        >
          <MockDashboard />
        </motion.div>
      </div>
    </section>
  );
}

const FEED_EVENTS = [
  "Cliente atendido automaticamente no WhatsApp",
  "Produto sincronizado com o site",
  "Publicação enviada para o Instagram",
  "Publicação enviada para o Facebook",
  "Google Business atualizado",
  "Novo lead registrado",
  "Comentário respondido",
  "Pedido encaminhado para o time",
  "Orçamento iniciado",
  "Relatório semanal gerado",
  "Dashboard atualizado",
  "Backup concluído com sucesso",
  "Agenda sincronizada",
  "Marketplace atualizado",
  "Produto publicado no catálogo",
  "Arquivo organizado na nuvem",
  "Documento enviado ao cliente",
  "Integração executada",
  "IA respondeu uma pergunta do cliente",
  "Cliente agendou atendimento",
  "Novo contato cadastrado",
  "Campanha de marketing iniciada",
  "Avaliação de 5 estrelas recebida",
  "Fatura emitida automaticamente",
  "Lembrete enviado ao cliente",
  "Estoque atualizado",
  "Landing page otimizada",
  "Formulário de contato recebido",
  "SEO atualizado no site",
  "Reunião confirmada na agenda",
  "E-mail de boas-vindas enviado",
  "Follow-up automático disparado",
];

type FeedItem = { id: number; text: string };

function MockDashboard() {
  const [feed, setFeed] = useState<FeedItem[]>(() => {
    const shuffled = [...FEED_EVENTS].sort(() => Math.random() - 0.5).slice(0, 4);
    return shuffled.map((text, i) => ({ id: i, text }));
  });
  const [clientes, setClientes] = useState(128);
  const [tempoMin, setTempoMin] = useState(12 * 60);
  const nextIdRef = useRef(100);

  useEffect(() => {
    let timeout: number;
    const tick = () => {
      const delay = 3000 + Math.random() * 2000;
      timeout = window.setTimeout(() => {
        setFeed((prev) => {
          const recent = new Set(prev.map((p) => p.text));
          const candidates = FEED_EVENTS.filter((e) => !recent.has(e));
          const text = candidates[Math.floor(Math.random() * candidates.length)];
          const next = [...prev.slice(-3), { id: nextIdRef.current++, text }];
          return next;
        });
        tick();
      }, delay);
    };
    tick();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const c = window.setInterval(() => setClientes((v) => v + 1), 6000);
    const t = window.setInterval(
      () => setTempoMin((v) => v + Math.floor(3 + Math.random() * 5)),
      5000,
    );
    return () => {
      clearInterval(c);
      clearInterval(t);
    };
  }, []);

  const horas = Math.floor(tempoMin / 60);
  const minutos = tempoMin % 60;
  const tempoStr = `${horas}h ${minutos.toString().padStart(2, "0")}min`;

  const stats = [
    {
      label: "Clientes atendidos",
      value: clientes.toString(),
      sub: "sem depender de você",
      pulse: false,
    },
    { label: "Tempo que você recuperou", value: tempoStr, sub: "só esta semana", pulse: false },
    { label: "Você sempre no ar", value: "24/7", sub: "todos os canais ativos", pulse: true },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-primary/10">
      <div className="rounded-xl bg-muted/40 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
            </span>
            <span className="text-xs text-muted-foreground">Seu ambiente digital, agora</span>
          </div>
          <span className="text-xs text-muted-foreground">No ar continuamente</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-border bg-background p-4 text-left"
            >
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <div className="mt-1 flex items-center gap-2">
                <div className="relative h-8 overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.p
                      key={s.value}
                      initial={{ y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -18, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="text-2xl font-semibold tracking-tight tabular-nums"
                    >
                      {s.value}
                    </motion.p>
                  </AnimatePresence>
                </div>
                {s.pulse && (
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-green" />
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <AnimatePresence initial={false} mode="popLayout">
            {feed.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green/10">
                  <Check className="h-3.5 w-3.5 text-brand-green" />
                </div>
                <span className="text-foreground/80">{item.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

type Pain = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  phrase: string;
};

const PAINS: Pain[] = [
  {
    icon: Search,
    title: "Não me encontram",
    phrase: "Quando procuram pelo meu serviço, meu concorrente aparece antes.",
  },
  {
    icon: MessageCircle,
    title: "Mensagens acumuladas",
    phrase: "Perco vendas porque demoro para responder no WhatsApp.",
  },
  {
    icon: UserRound,
    title: "Faço tudo sozinho",
    phrase: "O negócio inteiro depende de mim, o tempo todo.",
  },
  {
    icon: Wallet,
    title: "Fornecedores soltos",
    phrase: "Pago vários lugares diferentes e nada funciona junto.",
  },
  {
    icon: Instagram,
    title: "Redes abandonadas",
    phrase: "Esqueço de postar e minha empresa parece parada.",
  },
  {
    icon: Users,
    title: "Enquanto atendo, perco",
    phrase: "Atendo um cliente e, no meio, outros ficam sem resposta.",
  },
  {
    icon: Repeat,
    title: "Tarefas repetitivas",
    phrase: "Gasto horas em coisas que poderiam acontecer sozinhas.",
  },
  {
    icon: TrendingUp,
    title: "Poderia vender mais",
    phrase: "Sei que dá pra crescer, mas falta tempo para cuidar do digital.",
  },
];

function Problem() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const offsetRef = useRef(0); // current translation in px (positive = shift left)
  const boostRef = useRef(0); // additional pixels queued by arrow clicks
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStateRef = useRef({ startX: 0, startOffset: 0, moved: false });
  const halfRef = useRef(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const BASE_SPEED = 32; // px/s — slow, elegant
    const BOOST_SPEED = 900; // px/s while consuming boost
    let last = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (!draggingRef.current) {
        let delta = 0;
        if (boostRef.current !== 0) {
          const dir = Math.sign(boostRef.current);
          const step = Math.min(Math.abs(boostRef.current), BOOST_SPEED * dt) * dir;
          boostRef.current -= step;
          delta += step;
        }
        if (!pausedRef.current) {
          delta += BASE_SPEED * dt;
        }
        if (delta !== 0) offsetRef.current += delta;
      }

      const half = halfRef.current;
      if (half > 0) {
        // seamless wrap in both directions
        offsetRef.current = ((offsetRef.current % half) + half) % half;
      }
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

      // spotlight nearest-to-center card
      const vRect = viewport.getBoundingClientRect();
      const center = vRect.left + vRect.width / 2;
      const cards = cardsRef.current;
      for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
        if (!c) continue;
        const r = c.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const dist = Math.abs(cx - center);
        const norm = Math.min(1, dist / (r.width * 0.9));
        const t = 1 - norm; // 1 at center, 0 at edges
        const scale = 0.94 + t * 0.1; // 0.94 → 1.04
        const shadow = 0.05 + t * 0.18;
        const lift = t * 8;
        const active = t > 0.75;
        c.style.transform = `translateY(${-lift}px) scale(${scale})`;
        c.style.opacity = String(0.7 + t * 0.3);
        c.style.zIndex = active ? "2" : "1";
        if (active) {
          const glow = (t - 0.75) * 4; // 0 → 1 as it centers
          c.style.borderColor = "color-mix(in oklab, var(--primary) 55%, transparent)";
          c.style.boxShadow = [
            `0 ${8 + t * 20}px ${20 + t * 30}px -12px rgba(15,23,42,${shadow})`,
            `0 0 ${16 + glow * 24}px -6px color-mix(in oklab, var(--primary) ${18 + glow * 22}%, transparent)`,
          ].join(", ");
          c.dataset.active = "true";
        } else {
          c.style.borderColor = "";
          c.style.boxShadow = `0 ${8 + t * 20}px ${20 + t * 30}px -12px rgba(15,23,42,${shadow})`;
          c.dataset.active = "false";
        }
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    // approximate one card width; falls back gracefully
    const el = cardsRef.current[0];
    const step = el ? el.getBoundingClientRect().width + 24 : 320;
    boostRef.current += dir * step;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    dragStateRef.current = { startX: e.clientX, startOffset: offsetRef.current, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStateRef.current.startX;
    if (Math.abs(dx) > 3) dragStateRef.current.moved = true;
    offsetRef.current = dragStateRef.current.startOffset - dx;
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const el = e.currentTarget as HTMLElement;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  const loop = [...PAINS, ...PAINS];

  return (
    <section className="border-t border-border bg-muted/30">
      <div className="py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-sm font-medium text-primary">O que a gente escuta</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Isso parece a sua empresa?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Deslize, arraste ou apenas observe — os cards passam por conta própria.
          </p>
        </div>

        <div
          className="relative mt-14"
          onMouseEnter={() => {
            pausedRef.current = true;
            setHovering(true);
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
            setHovering(false);
          }}
        >
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => nudge(-1)}
            className={cn(
              "absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 p-2 shadow-md backdrop-blur transition-opacity hover:bg-background md:flex",
              hovering ? "opacity-100" : "opacity-0",
            )}
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <button
            type="button"
            aria-label="Próximo"
            onClick={() => nudge(1)}
            className={cn(
              "absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 p-2 shadow-md backdrop-blur transition-opacity hover:bg-background md:flex",
              hovering ? "opacity-100" : "opacity-0",
            )}
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>

          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-muted/60 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-muted/60 to-transparent" />

          <div
            ref={viewportRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={(e) => {
              if (dragStateRef.current.moved) {
                e.preventDefault();
                e.stopPropagation();
                dragStateRef.current.moved = false;
              }
            }}
            className="overflow-hidden py-6"
            style={{ cursor: draggingRef.current ? "grabbing" : "grab", touchAction: "pan-y" }}
          >
            <div
              ref={trackRef}
              className="flex gap-6 will-change-transform"
              style={{ width: "max-content" }}
            >
              {loop.map((p, i) => (
                <article
                  key={i}
                  ref={(el) => {
                    if (el) cardsRef.current[i] = el;
                  }}
                  className="group/pain flex min-h-[260px] w-[280px] shrink-0 select-none flex-col justify-between rounded-3xl border border-border/60 bg-card p-7 transition-[background-color,border-color,color] duration-300 data-[active=true]:border-primary/60 sm:w-[320px] md:w-[340px] md:p-8"
                  style={{ transformOrigin: "center center" }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-data-[active=true]/pain:bg-primary group-data-[active=true]/pain:text-primary-foreground">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 group-data-[active=true]/pain:text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                      “{p.phrase}”
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CostOfInaction() {
  const costs = [
    "Cada mensagem sua sem resposta é um cliente que compra do concorrente.",
    "Se você não aparece no Google, para o cliente, você simplesmente não existe.",
    "Horas do seu dia consumidas em tarefas que já poderiam funcionar sozinhas.",
    "Vários fornecedores cuidando de partes soltas — e nenhum cuidando de você.",
    "Retrabalho toda semana porque suas informações vivem espalhadas.",
    "Você virando o gargalo do próprio negócio.",
  ];

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">A conta que ninguém faz</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Deixar o digital de lado também custa caro.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A pergunta não é só{" "}
            <span className="text-foreground">"quanto isso vai me custar?"</span>. É também{" "}
            <span className="text-foreground">"quanto eu já estou perdendo por não ter?"</span>
          </p>
        </div>
        <div data-reveal-stagger className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          {costs.map((c) => (
            <div
              key={c}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-5"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                <X className="h-3.5 w-3.5 text-destructive" />
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">{c}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Operation() {
  const blocks = [
    {
      title: "Presença",
      subtitle: "Você passa a ser encontrado.",
      items: [
        "Novos clientes chegam até você pela internet",
        "Você aparece quando alguém procura pelo seu serviço",
        "Sua marca ativa no Google, no Maps e nas redes sociais",
        "Você nunca mais parece abandonado online",
      ],
    },
    {
      title: "Atendimento",
      subtitle: "Você não perde mais nenhum cliente.",
      items: [
        "Enquanto você atende um cliente, outro continua sendo atendido automaticamente",
        "Perguntas frequentes, orçamentos e horários no automático",
        "Comentários e mensagens acompanhados de perto por nós",
        "Seu cliente sempre encontra alguém — ou algo — do outro lado",
      ],
    },
    {
      title: "Operação",
      subtitle: "Você recupera horas do seu dia.",
      items: [
        "Você deixa de perder horas com tarefas repetitivas",
        "As informações passam a circular automaticamente entre seus sistemas",
        "Automações inteligentes cuidam da parte operacional em segundo plano",
        "A tecnologia trabalha por trás — você só sente o resultado",
      ],
    },
    {
      title: "Gestão",
      subtitle: "Você tem tudo no lugar, sempre.",
      items: [
        "Seus produtos, arquivos e informações organizados continuamente",
        "Você recebe um retrato simples de quem está chegando e como",
        "Conforme sua empresa cresce, sua estrutura digital evolui junto",
        "Um ecossistema digital cuidado de ponta a ponta, sem sobressaltos",
      ],
    },
  ];
  return (
    <section id="operacao" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Uma solução só</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Não é um serviço. É a sua Operação Digital.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Presença, atendimento, operação e gestão trabalhando juntos — como um ambiente digital
            vivo, que continua funcionando automaticamente todos os dias.
          </p>
        </div>

        <div data-reveal-stagger className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {blocks.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/30"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-primary">{b.title}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">{b.subtitle}</h3>
              <ul className="mt-6 space-y-3">
                {b.items.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Tudo faz parte da mesma estrutura. A Caetus monta, mantém e evolui essa rotina digital
          continuamente — no ritmo da sua empresa.
        </p>
      </div>
    </section>
  );
}

function Meanwhile() {
  const tasks = [
    "Respondendo seus clientes no WhatsApp",
    "Mantendo você visível no Google",
    "Publicando conteúdo nas suas redes",
    "Organizando suas informações e arquivos",
    "Integrando os sistemas que você já usa",
    "Automatizando o que hoje toma seu tempo",
    "Acompanhando o que precisa de ajuste",
    "Mantendo sua operação viva 24/7, em segundo plano",
  ];
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:items-center">
          <div className="lg:col-span-2">
            <p className="text-sm font-medium text-primary">Operação contínua</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              Enquanto você cuida do seu negócio...
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              A Caetus segue trabalhando por trás. Assistentes inteligentes e automações continuam
              ativos enquanto sua empresa está atendendo, produzindo ou descansando — sua rotina
              digital não para mesmo quando ninguém está olhando.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground/80">Referência ilustrativa:</span>{" "}
              pequenas empresas costumam recuperar entre{" "}
              <span className="font-medium text-foreground/80">5 e 15 horas por semana</span> ao
              automatizar tarefas repetitivas do dia a dia — tempo que volta para o negócio, a
              família ou o descanso.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-3 py-1 text-xs text-brand-green">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" />
              Sempre no ar
            </div>
          </div>
          <div className="lg:col-span-3">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {tasks.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
                    <Zap className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-foreground/85">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Economy() {
  const roles = [
    "Agência de marketing",
    "Social media",
    "Desenvolvedor",
    "Designer",
    "Gestor de anúncios",
    "Atendente de WhatsApp",
    "Quem atualiza produtos",
    "Quem responde comentários",
  ];
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-medium text-primary">Tecnologia acessível</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Tecnologia profissional sem precisar montar uma equipe.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Quando pensamos em um site profissional, redes sociais ativas, Google Business,
              WhatsApp inteligente, automações, manutenção e suporte, parece que seria necessário
              contratar vários profissionais diferentes.
            </p>
            <p>
              A Caetus reúne tudo isso em uma única operação, com uma mensalidade previsível,
              pensada para caber na realidade de pequenas empresas.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium text-primary">Menos fornecedores, mais resultado</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Um time inteiro. Uma contratação só.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Você para de somar boletos, reuniões e cobranças com vários fornecedores. Sua
              estrutura digital inteira passa a viver em um lugar só — com quem cuida, quem responde
              e quem evolui você a longo prazo.
            </p>

            <div className="mt-8 rounded-xl border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">Antes você precisava de</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {roles.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/70"
                  >
                    {r}
                  </span>
                ))}
              </div>
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="h-px flex-1 bg-border" />
              </div>
              <p className="text-sm text-muted-foreground">Agora você tem</p>
              <div className="mt-3 flex items-center gap-3 rounded-lg bg-primary/5 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <span className="text-xs font-bold">C</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Caetus Systems</p>
                  <p className="text-xs text-muted-foreground">
                    Seu ecossistema digital, num lugar só
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                icon: Wallet,
                title: "Custo previsível para você",
                desc: "Uma mensalidade no lugar de várias contas espalhadas.",
              },
              {
                icon: TrendingUp,
                title: "Você vende mais",
                desc: "Você é encontrado, seu cliente é respondido, a oportunidade vira venda.",
              },
              {
                icon: HeartHandshake,
                title: "Você deixa de ser o gargalo",
                desc: "Seu negócio deixa de girar exclusivamente em torno da sua agenda.",
              },
              {
                icon: ShieldCheck,
                title: "Você fica tranquilo",
                desc: "Alguém cuidando dessa parte continuamente — inclusive quando você não pode.",
              },
            ].map((b) => (
              <div key={b.title} className="rounded-xl border border-border bg-card p-6">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/5 text-primary">
                  <b.icon className="h-4 w-4" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppSection() {
  const capabilities = [
    "Responde perguntas frequentes",
    "Informa horários e localização",
    "Apresenta produtos e serviços",
    "Inicia orçamentos",
    "Agenda atendimentos",
    "Encaminha para a equipe quando precisa",
  ];
  return (
    <section id="whatsapp" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <WhatsAppIcon className="h-3.5 w-3.5 text-brand-green" />
              Um atendente que nunca dorme
            </div>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              Quantas vendas você perde porque ninguém respondeu?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Enquanto seu time atende um cliente, outro continua sendo acolhido automaticamente.
              Mesmo com a loja fechada, cada mensagem vira uma conversa iniciada — sem depender de
              você estar disponível para responder.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground/80">Referência ilustrativa:</span> boa
              parte das mensagens que chegam no WhatsApp são perguntas repetidas (horário, endereço,
              preço) — perguntas que já podem ser respondidas automaticamente, no mesmo instante.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {capabilities.map((c) => (
                <div key={c} className="flex items-start gap-2 text-sm text-foreground/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-brand-green text-white hover:bg-brand-green/90"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="mr-1 h-4 w-4" />
                  Ver funcionando no WhatsApp
                </a>
              </Button>
            </div>
          </div>
          <WhatsAppLiveDemo />
        </div>
      </div>
    </section>
  );
}

type WAMsg = { from: "client" | "ai"; text: string; typingMs?: number };
type WAConvo = {
  name: string;
  initial: string;
  color: string;
  preview: string;
  messages: WAMsg[];
  handoff?: boolean;
};

const WA_CONVOS: WAConvo[] = [
  {
    name: "João",
    initial: "J",
    color: "bg-blue-500",
    preview: "Boa tarde, vocês estão abertos?",
    messages: [
      { from: "client", text: "Boa tarde! Vocês estão abertos hoje?" },
      { from: "ai", text: "Oi, João! 👋 Sim, estamos abertos das 9h às 18h.", typingMs: 1200 },
      { from: "client", text: "Perfeito, obrigado!" },
      { from: "ai", text: "Qualquer coisa, é só chamar. 😉", typingMs: 900 },
    ],
  },
  {
    name: "Maria",
    initial: "M",
    color: "bg-pink-500",
    preview: "Onde vocês ficam?",
    messages: [
      { from: "client", text: "Oi, onde vocês ficam localizados?" },
      {
        from: "ai",
        text: "Olá, Maria! Estamos em Lagoa Santa/MG. Posso te enviar o link do Google Maps?",
        typingMs: 1300,
      },
      { from: "client", text: "Pode sim!" },
      { from: "ai", text: "📍 maps.google.com/…\nAté logo!", typingMs: 1000 },
    ],
  },
  {
    name: "Carlos",
    initial: "C",
    color: "bg-amber-500",
    preview: "Quanto custa um site?",
    messages: [
      { from: "client", text: "Quanto custa um site para minha empresa?" },
      {
        from: "ai",
        text: "Oi, Carlos! O valor depende do porte do projeto. Posso montar um orçamento em 2 min — qual o segmento?",
        typingMs: 1400,
      },
      { from: "client", text: "Restaurante." },
      { from: "ai", text: "Perfeito! Já estou preparando as opções para você.", typingMs: 1000 },
    ],
  },
  {
    name: "Ana",
    initial: "A",
    color: "bg-purple-500",
    preview: "Consigo agendar amanhã?",
    messages: [
      { from: "client", text: "Consigo agendar um horário amanhã de manhã?" },
      {
        from: "ai",
        text: "Claro, Ana! Tenho 09:30 ou 10:45 disponíveis. Qual prefere?",
        typingMs: 1200,
      },
      { from: "client", text: "10:45 fica ótimo." },
      { from: "ai", text: "Agendado ✅ Enviei a confirmação por aqui.", typingMs: 1000 },
    ],
  },
  {
    name: "Rafael",
    initial: "R",
    color: "bg-emerald-500",
    preview: "Quais produtos vocês têm?",
    messages: [
      { from: "client", text: "Quais produtos vocês têm disponíveis?" },
      {
        from: "ai",
        text: "Oi, Rafael! Temos catálogo digital atualizado. Quer que eu envie o link?",
        typingMs: 1200,
      },
      { from: "client", text: "Manda por favor." },
      { from: "ai", text: "🛒 catalogo.caetus.app/…", typingMs: 900 },
    ],
  },
  {
    name: "Beatriz",
    initial: "B",
    color: "bg-rose-500",
    preview: "Aceitam Pix?",
    messages: [
      { from: "client", text: "Vocês aceitam Pix e cartão parcelado?" },
      { from: "ai", text: "Aceitamos Pix, cartão em até 6x e boleto. 💳", typingMs: 1200 },
      { from: "client", text: "Show, obrigada!" },
    ],
  },
  {
    name: "Lucas",
    initial: "L",
    color: "bg-cyan-500",
    preview: "Vocês entregam aqui?",
    messages: [
      { from: "client", text: "Vocês fazem entrega em Vespasiano?" },
      {
        from: "ai",
        text: "Sim, Lucas! Entregamos em toda a região norte de BH. 🚚",
        typingMs: 1300,
      },
      { from: "client", text: "Ótimo!" },
    ],
  },
  {
    name: "Fernanda",
    initial: "F",
    color: "bg-indigo-500",
    preview: "Qual o prazo?",
    messages: [
      { from: "client", text: "Qual o prazo médio do serviço?" },
      {
        from: "ai",
        text: "Normalmente entre 3 e 5 dias úteis, dependendo do escopo.",
        typingMs: 1200,
      },
      { from: "client", text: "Perfeito." },
    ],
  },
  {
    name: "Diego",
    initial: "D",
    color: "bg-orange-500",
    preview: "Precisa de contrato?",
    messages: [
      { from: "client", text: "Precisa assinar contrato mensal?" },
      {
        from: "ai",
        text: "Oi, Diego! Vou encaminhar essa conversa para nossa equipe explicar direitinho. 👥",
        typingMs: 1400,
      },
    ],
    handoff: true,
  },
  {
    name: "Camila",
    initial: "K",
    color: "bg-teal-500",
    preview: "Quero falar com alguém",
    messages: [
      {
        from: "client",
        text: "Preciso falar com um atendente, é sobre um problema no meu pedido.",
      },
      {
        from: "ai",
        text: "Claro, Camila. Já estou chamando um humano da equipe para te ajudar agora.",
        typingMs: 1300,
      },
    ],
    handoff: true,
  },
];

const WA_NOTIFS = [
  { name: "João", text: "Boa tarde..." },
  { name: "Maria", text: "Vocês estão abertos?" },
  { name: "Carlos", text: "Quanto custa?" },
  { name: "Ana", text: "Consigo agendar?" },
  { name: "Rafael", text: "Qual o catálogo?" },
  { name: "Beatriz", text: "Aceitam Pix?" },
];

const WA_CLIENT_QS = [
  "Tem horário amanhã?",
  "Vocês aceitam Pix?",
  "Qual o endereço?",
  "Consegue mandar um orçamento?",
  "Vocês abrem sábado?",
  "Tem esse produto?",
  "Vocês entregam?",
  "Quanto custa?",
  "Pode reservar?",
  "Aceita cartão?",
  "Tem estacionamento?",
  "Pode mandar foto?",
  "Consegue hoje?",
  "Tem vaga amanhã?",
  "Faz entrega hoje?",
  "Qual o prazo?",
  "Vocês parcelam?",
  "Tem promoção?",
  "Qual o horário de vocês?",
  "Vocês atendem hoje?",
  "Onde vocês ficam?",
  "Quanto tempo demora?",
  "Faz orçamento sem compromisso?",
  "Tem catálogo pra ver?",
  "Aceita boleto?",
  "Fica pronto pra quando?",
  "Tem alguém disponível agora?",
  "Vocês trabalham no domingo?",
  "Consegue me passar o valor?",
  "Como faço pra agendar?",
];

const WA_AI_REPLIES = [
  "Temos 9h, 10h e 14h. Posso reservar?",
  "Aceitamos Pix, cartão e dinheiro. 💳",
  "Av. Central, 150 — envio a localização.",
  "Claro! Vou fazer algumas perguntas rápidas.",
  "Sim, das 8h às 13h. 👍",
  "Temos em estoque! Envio o link.",
  "Entregamos em toda a região. 🚚",
  "Envio o orçamento em 2 min.",
  "Reservado! ✅ Confirmação por aqui.",
  "Sim, em até 6x sem juros.",
  "Sim, temos estacionamento próprio.",
  "Enviando as fotos agora. 📷",
  "Hoje temos duas vagas. Confirma?",
  "Amanhã tenho 10h e 15h disponíveis.",
  "Prazo médio de 3 a 5 dias úteis.",
  "Posso iniciar seu orçamento agora mesmo.",
  "Já reservei seu horário. 📅",
  "Estamos na Av. Central, 150 — Lagoa Santa/MG.",
  "Acabei de enviar a localização. 📍",
  "Nosso catálogo está neste link 👉",
  "Seu pedido foi registrado com sucesso.",
  "Em instantes um especialista assume esta conversa. 👤",
  "Aceitamos boleto sim, envio o código.",
  "Fica pronto em 48h úteis.",
  "Sim, atendemos até 18h hoje.",
  "Vou encaminhar para a equipe agora.",
];

type WaStatusMeta = { label: string; icon: string; tone: "green" | "blue" | "muted" };
const WA_STATUS_META: Record<
  "typing" | "replied" | "seen" | "scheduled" | "quoted" | "location" | "started" | "delivered",
  WaStatusMeta
> = {
  typing: { label: "IA digitando...", icon: "🤖", tone: "blue" },
  replied: { label: "Respondido automaticamente", icon: "✓", tone: "green" },
  seen: { label: "Cliente visualizou", icon: "✓✓", tone: "muted" },
  scheduled: { label: "Agendamento confirmado", icon: "📅", tone: "green" },
  quoted: { label: "Orçamento enviado", icon: "📝", tone: "green" },
  location: { label: "Localização compartilhada", icon: "📍", tone: "green" },
  started: { label: "Conversa iniciada", icon: "💬", tone: "muted" },
  delivered: { label: "Produto enviado", icon: "📦", tone: "green" },
};

function WhatsAppLiveCounters() {
  const [stats, setStats] = useState({ replied: 127, avg: 6, scheduled: 9, deals: 18 });
  useEffect(() => {
    const id = setInterval(() => {
      setStats((s) => ({
        replied: s.replied + (Math.random() < 0.75 ? 1 : 0),
        avg: Math.max(
          4,
          Math.min(9, s.avg + (Math.random() < 0.5 ? -1 : 1) * (Math.random() < 0.2 ? 1 : 0)),
        ),
        scheduled: s.scheduled + (Math.random() < 0.18 ? 1 : 0),
        deals: s.deals + (Math.random() < 0.28 ? 1 : 0),
      }));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const items = [
    { icon: "🤖", label: "mensagens respondidas hoje", value: stats.replied },
    { icon: "⚡", label: "tempo médio de resposta", value: `${stats.avg}s` },
    { icon: "📅", label: "agendamentos realizados", value: stats.scheduled },
    { icon: "💰", label: "oportunidades iniciadas", value: stats.deals },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border bg-card p-3 shadow-sm">
      {items.map((it) => (
        <div key={it.label} className="flex items-start gap-2 rounded-xl bg-muted/40 px-2.5 py-2">
          <span className="text-base leading-none">{it.icon}</span>
          <div className="min-w-0">
            <motion.p
              key={String(it.value)}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-semibold leading-tight tabular-nums"
            >
              {it.value}
            </motion.p>
            <p className="text-[10px] leading-tight text-muted-foreground">{it.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Floating "real result" badges — visually reinforce that WhatsApp automation
// generates money, not just replies. Badges appear over the demo, drift up,
// and fade out with a calm cadence so the effect stays premium, not busy.
const WA_RESULT_BADGES: Array<{
  icon: string;
  label: string;
  tone: "green" | "blue" | "amber" | "violet";
}> = [
  { icon: "💰", label: "Venda iniciada", tone: "green" },
  { icon: "📅", label: "Agendamento confirmado", tone: "blue" },
  { icon: "⭐", label: "Avaliação recebida", tone: "amber" },
  { icon: "📦", label: "Pedido realizado", tone: "green" },
  { icon: "📍", label: "Localização enviada", tone: "blue" },
  { icon: "💳", label: "Pagamento aprovado", tone: "green" },
  { icon: "📞", label: "Atendimento encaminhado", tone: "violet" },
  { icon: "🛒", label: "Cliente no catálogo", tone: "amber" },
];

type FloatingBadge = {
  id: number;
  icon: string;
  label: string;
  tone: "green" | "blue" | "amber" | "violet";
  side: "left" | "right";
  top: number;
};

function WhatsAppResultBadges() {
  const [badges, setBadges] = useState<FloatingBadge[]>([]);
  const nextId = useRef(0);
  const cursor = useRef(Math.floor(Math.random() * WA_RESULT_BADGES.length));

  useEffect(() => {
    let cancelled = false;
    const timeouts: Array<ReturnType<typeof setTimeout>> = [];

    const spawn = () => {
      if (cancelled) return;
      cursor.current = (cursor.current + 1) % WA_RESULT_BADGES.length;
      const base = WA_RESULT_BADGES[cursor.current];
      const id = ++nextId.current;
      const badge: FloatingBadge = {
        id,
        icon: base.icon,
        label: base.label,
        tone: base.tone,
        side: Math.random() < 0.5 ? "left" : "right",
        top: 40 + Math.random() * 320,
      };
      setBadges((b) => [...b, badge]);
      timeouts.push(
        setTimeout(() => {
          if (cancelled) return;
          setBadges((b) => b.filter((x) => x.id !== id));
        }, 3600),
      );
      timeouts.push(setTimeout(spawn, 1900 + Math.random() * 1600));
    };

    const start = setTimeout(spawn, 900);
    timeouts.push(start);
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const toneClass = (tone: FloatingBadge["tone"]) => {
    switch (tone) {
      case "green":
        return "border-brand-green/30 bg-brand-green/10 text-brand-green";
      case "blue":
        return "border-primary/25 bg-primary/10 text-primary";
      case "amber":
        return "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400";
      case "violet":
        return "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400";
    }
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      <AnimatePresence>
        {badges.map((b) => (
          <motion.div
            key={b.id}
            initial={{
              opacity: 0,
              x: b.side === "left" ? -24 : 24,
              y: 12,
              scale: 0.92,
            }}
            animate={{ opacity: 1, x: 0, y: -18, scale: 1 }}
            exit={{ opacity: 0, y: -34, scale: 0.96 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              top: b.top,
              ...(b.side === "left" ? { left: -18 } : { right: -18 }),
            }}
            className={cn(
              "absolute flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-lg backdrop-blur-sm",
              toneClass(b.tone),
            )}
          >
            <span className="text-sm leading-none">{b.icon}</span>
            <span className="whitespace-nowrap">{b.label}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function WhatsAppLiveDemo() {
  const [convoIdx, setConvoIdx] = useState(0);
  const [visible, setVisible] = useState<WAMsg[]>([]);
  const [typing, setTyping] = useState(false);
  const [showHandoff, setShowHandoff] = useState(false);
  const [notif, setNotif] = useState<{ name: string; text: string; id: number } | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const convo = WA_CONVOS[convoIdx];

  // Play conversation
  useEffect(() => {
    let cancelled = false;
    const timeouts: Array<ReturnType<typeof setTimeout>> = [];
    setVisible([]);
    setTyping(false);
    setShowHandoff(false);

    const play = async () => {
      for (let i = 0; i < convo.messages.length; i++) {
        const msg = convo.messages[i];
        if (msg.from === "ai") {
          await new Promise<void>((res) => {
            const t = setTimeout(() => {
              if (!cancelled) setTyping(true);
              res();
            }, 400);
            timeouts.push(t);
          });
          await new Promise<void>((res) => {
            const t = setTimeout(res, msg.typingMs ?? 1100);
            timeouts.push(t);
          });
          if (cancelled) return;
          setTyping(false);
        } else {
          await new Promise<void>((res) => {
            const t = setTimeout(res, i === 0 ? 300 : 900);
            timeouts.push(t);
          });
        }
        if (cancelled) return;
        setVisible((v) => [...v, msg]);
      }
      if (convo.handoff) {
        await new Promise<void>((res) => {
          const t = setTimeout(res, 700);
          timeouts.push(t);
        });
        if (!cancelled) setShowHandoff(true);
      }
      await new Promise<void>((res) => {
        const t = setTimeout(res, 2600);
        timeouts.push(t);
      });
      if (!cancelled) setConvoIdx((c) => (c + 1) % WA_CONVOS.length);
    };

    play();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [convoIdx, convo]);

  // Auto scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visible, typing, showHandoff]);

  // Random notifications
  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      const n = WA_NOTIFS[counter % WA_NOTIFS.length];
      counter++;
      setNotif({ ...n, id: Date.now() });
      setTimeout(() => setNotif((cur) => (cur && cur.id === Date.now() ? null : cur)), 3200);
    }, 5200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!notif) return;
    const t = setTimeout(() => setNotif(null), 3200);
    return () => clearTimeout(t);
  }, [notif]);

  // Live conversation-list simulator
  type WaStatus =
    "typing" | "replied" | "seen" | "scheduled" | "quoted" | "location" | "started" | "delivered";
  type ConvoState = {
    lastClient: string;
    lastAi: string;
    status: WaStatus;
    unread: number;
    /** which message the list preview should show */
    showing: "client" | "ai";
  };

  const [order, setOrder] = useState<number[]>(() => WA_CONVOS.map((_, i) => i));
  const [flashIdx, setFlashIdx] = useState<number | null>(null);
  const [convoState, setConvoState] = useState<Record<number, ConvoState>>(() => {
    const s: Record<number, ConvoState> = {};
    WA_CONVOS.forEach((c, i) => {
      const lastClient =
        [...c.messages].reverse().find((m) => m.from === "client")?.text ?? c.preview;
      const lastAi = [...c.messages].reverse().find((m) => m.from === "ai")?.text ?? "";
      s[i] = { lastClient, lastAi, status: "replied", unread: 0, showing: "ai" };
    });
    return s;
  });

  useEffect(() => {
    setOrder((prev) => [convoIdx, ...prev.filter((i) => i !== convoIdx)]);
    setConvoState((s) => ({ ...s, [convoIdx]: { ...s[convoIdx], unread: 0, status: "replied" } }));
  }, [convoIdx]);

  // Background: continuously make non-active conversations receive/reply
  useEffect(() => {
    let cancelled = false;
    const timeouts: Array<ReturnType<typeof setTimeout>> = [];

    const tick = () => {
      if (cancelled) return;
      const candidates = WA_CONVOS.map((_, i) => i).filter((i) => i !== convoIdx);
      const idx = candidates[Math.floor(Math.random() * candidates.length)];
      const question = WA_CLIENT_QS[Math.floor(Math.random() * WA_CLIENT_QS.length)];
      const reply = WA_AI_REPLIES[Math.floor(Math.random() * WA_AI_REPLIES.length)];
      const terminalPool: WaStatus[] = [
        "replied",
        "replied",
        "replied",
        "seen",
        "seen",
        "scheduled",
        "quoted",
        "location",
        "delivered",
        "started",
      ];
      const terminal = terminalPool[Math.floor(Math.random() * terminalPool.length)];

      // 1) new client message arrives — preview shows client text
      setFlashIdx(idx);
      setConvoState((s) => ({
        ...s,
        [idx]: {
          ...s[idx],
          lastClient: question,
          status: "replied",
          showing: "client",
          unread: (s[idx]?.unread ?? 0) + 1,
        },
      }));
      setOrder((prev) => [idx, ...prev.filter((i) => i !== idx)]);

      // 2) IA starts typing
      timeouts.push(
        setTimeout(() => {
          if (cancelled) return;
          setConvoState((s) => ({
            ...s,
            [idx]: { ...s[idx], status: "typing" },
          }));
        }, 1150),
      );

      // 3) IA responds — client message replaced by AI reply in the list
      timeouts.push(
        setTimeout(
          () => {
            if (cancelled) return;
            setConvoState((s) => ({
              ...s,
              [idx]: { ...s[idx], lastAi: reply, status: terminal, showing: "ai" },
            }));
          },
          2600 + Math.random() * 600,
        ),
      );

      // 4) later, escalate to "seen" occasionally + clear highlight
      timeouts.push(
        setTimeout(() => {
          if (cancelled) return;
          if (Math.random() > 0.55) {
            setConvoState((s) =>
              s[idx].status === "replied" ? { ...s, [idx]: { ...s[idx], status: "seen" } } : s,
            );
          }
          setFlashIdx((cur) => (cur === idx ? null : cur));
        }, 3900),
      );

      // schedule next tick — calmer cadence so the viewer can read
      timeouts.push(setTimeout(tick, 3100 + Math.random() * 900));
    };

    const start = setTimeout(tick, 1600);
    timeouts.push(start);
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [convoIdx]);

  const AGO = [
    "agora",
    "1 min",
    "3 min",
    "6 min",
    "12 min",
    "18 min",
    "22 min",
    "27 min",
    "34 min",
    "41 min",
    "52 min",
    "1 h",
  ];
  // Render the full buffer so items never unmount — the fixed-height list
  // just clips whatever falls below the visible area (like a real feed).
  const listShown = order;

  return (
    <div className="relative flex w-full flex-col items-center gap-4">
      <WhatsAppResultBadges />
      <div className="relative w-full max-w-sm space-y-3">
        {/* Notification */}
        <div className="pointer-events-none absolute inset-x-0 -top-2 z-20 flex justify-center">
          <AnimatePresence>
            {notif && (
              <motion.div
                key={notif.id}
                initial={{ y: -20, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 shadow-lg"
              >
                <div className="grid h-8 w-8 place-items-center rounded-full bg-brand-green/15 text-xs font-semibold text-brand-green">
                  {notif.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold leading-tight">{notif.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{notif.text}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Conversation list */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border/70 px-3 py-2">
            <div className="flex items-center gap-2">
              <WhatsAppIcon className="h-3.5 w-3.5 text-brand-green" />
              <span className="text-[11px] font-semibold">Conversas</span>
            </div>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" />
              IA ativa
            </span>
          </div>
          <ul className="relative h-[336px] overflow-hidden">
            {listShown.map((idx, pos) => {
              const c = WA_CONVOS[idx];
              const isActive = idx === convoIdx;
              const st = convoState[idx];
              const meta = WA_STATUS_META[st.status];
              const isFlash = flashIdx === idx;
              const toneClass =
                meta.tone === "green"
                  ? "text-brand-green"
                  : meta.tone === "blue"
                    ? "text-primary"
                    : "text-muted-foreground";
              return (
                <motion.li
                  key={idx}
                  layout
                  animate={{
                    backgroundColor: isFlash
                      ? "color-mix(in oklab, var(--brand-green) 10%, transparent)"
                      : "rgba(0,0,0,0)",
                  }}
                  transition={{
                    layout: { type: "spring", stiffness: 260, damping: 32, mass: 0.9 },
                    backgroundColor: { duration: 1.1 },
                  }}
                  className={cn(
                    "flex h-[66px] items-start gap-2.5 border-b border-border/50 px-3 py-2",
                    isActive && "bg-brand-green/5",
                  )}
                >
                  <div
                    className={cn(
                      "relative grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-semibold text-white",
                      c.color,
                    )}
                  >
                    {c.initial}
                    {(isActive || st.status === "typing") && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-brand-green" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-xs font-semibold">{c.name}</p>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <span className="text-[10px] text-muted-foreground">
                          {AGO[pos] ?? `${pos + 5} min`}
                        </span>
                        <AnimatePresence>
                          {!isActive && st.unread > 0 && (
                            <motion.span
                              key={`u-${st.unread}`}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="grid h-4 min-w-[1rem] place-items-center rounded-full bg-brand-green px-1 text-[9px] font-bold text-white"
                            >
                              {st.unread}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="mt-0.5 h-[15px] overflow-hidden">
                      <AnimatePresence mode="wait" initial={false}>
                        {st.status === "typing" ? (
                          <motion.p
                            key="typing"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-1 text-[11px] font-medium text-primary"
                          >
                            <span>🤖</span>
                            <span>IA digitando</span>
                            <span className="inline-flex gap-0.5">
                              {[0, 1, 2].map((d) => (
                                <motion.span
                                  key={d}
                                  className="h-1 w-1 rounded-full bg-primary/70"
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{ duration: 1.2, repeat: Infinity, delay: d * 0.18 }}
                                />
                              ))}
                            </span>
                          </motion.p>
                        ) : st.showing === "client" ? (
                          <motion.p
                            key={`client-${st.lastClient}`}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.3 }}
                            className="truncate text-[11px] text-foreground/80"
                          >
                            "{st.lastClient}"
                          </motion.p>
                        ) : (
                          <motion.p
                            key={`ai-${st.lastAi}`}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.3 }}
                            className="truncate text-[11px] text-foreground/80"
                          >
                            <span className="text-brand-green">🤖</span> {st.lastAi}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    {st.status !== "typing" && (
                      <p
                        className={cn(
                          "mt-0.5 flex items-center gap-1 text-[10px] font-medium",
                          toneClass,
                        )}
                      >
                        <span>{meta.icon}</span>
                        <span className="truncate">
                          {isActive ? "Atendimento em andamento" : meta.label}
                        </span>
                      </p>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Live counters — reinforce the value at a glance */}
        <WhatsAppLiveCounters />

        {/* Phone card */}
        <div className="rounded-[2rem] border border-border bg-card p-3 shadow-xl shadow-brand-green/10">
          <div className="overflow-hidden rounded-[1.5rem] bg-muted/40">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-card/60 px-4 py-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={convo.name}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={cn(
                      "grid h-10 w-10 place-items-center rounded-full text-sm font-semibold text-white",
                      convo.color,
                    )}
                  >
                    {convo.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">{convo.name}</p>
                    <p className="text-[11px] text-brand-green">online agora</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="ml-auto flex items-center gap-1">
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand-green" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  IA
                </span>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="h-80 space-y-2 overflow-hidden px-4 py-4">
              <AnimatePresence initial={false}>
                {visible.map((m, i) => (
                  <motion.div
                    key={`${convoIdx}-${i}`}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={cn("flex", m.from === "ai" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm",
                        m.from === "ai"
                          ? "rounded-tr-sm bg-brand-green/15 text-foreground/90"
                          : "rounded-tl-sm bg-background text-foreground",
                      )}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    key={`typing-${convoIdx}-${visible.length}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-end"
                  >
                    <div className="flex items-center gap-1 rounded-2xl rounded-tr-sm bg-brand-green/15 px-3 py-2">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-brand-green/70"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                          transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                {showHandoff && (
                  <motion.div
                    key={`handoff-${convoIdx}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center pt-1"
                  >
                    <div className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-[11px] text-muted-foreground">
                      <UserRound className="h-3 w-3" />
                      Encaminhado para atendimento humano
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Live indicators */}
      <div className="grid w-full max-w-sm grid-cols-3 gap-2">
        {[
          { label: "Respondidas hoje", value: "37", icon: Check, color: "text-brand-green" },
          { label: "Tempo médio", value: "4s", icon: Zap, color: "text-primary" },
          { label: "Automático", value: "97%", icon: Sparkles, color: "text-brand-green" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card px-3 py-2 text-center"
          >
            <div
              className={cn(
                "flex items-center justify-center gap-1 text-sm font-semibold",
                stat.color,
              )}
            >
              <stat.icon className="h-3.5 w-3.5" />
              {stat.value}
            </div>
            <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BeforeAfter() {
  const pairs = [
    {
      before: "Você termina o dia respondendo mensagens acumuladas em vez de descansar",
      after: "Você fecha o dia sabendo que a operação continuou funcionando sem depender de você",
    },
    {
      before: "Um cliente decide comprar do concorrente porque ninguém respondeu a tempo",
      after: "Cada mensagem recebida vira uma conversa iniciada — mesmo às 23h ou no domingo",
    },
    {
      before: "Alguém procura pelo seu serviço no Google — e encontra outro nome",
      after: "Quem procura pelo seu serviço na região encontra a sua empresa primeiro",
    },
    {
      before: "Sua última publicação é de meses atrás e passa a impressão de empresa parada",
      after: "Sua marca segue viva no digital, com presença mantida em segundo plano",
    },
    {
      before: "Todo mês chegam boletos de fornecedores diferentes e nenhum resultado consolidado",
      after: "Uma única contratação cuida de tudo, com previsibilidade e acompanhamento contínuo",
    },
    {
      before: "As informações da sua empresa vivem entre cabeça, papel e várias planilhas",
      after: "Seu negócio ganha uma rotina digital organizada, previsível e tranquila",
    },
  ];

  const [inView, setInView] = useState(false);
  const [shineBad, setShineBad] = useState(false);
  const [shineGood, setShineGood] = useState(false);
  const [pulseGood, setPulseGood] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const totalItems = pairs.length;
    const itemsDoneAt = 300 + 400 + totalItems * 120 + 200; // bad card start + entrance + items
    const t1 = window.setTimeout(() => setShineBad(true), itemsDoneAt);
    const t2 = window.setTimeout(() => setShineBad(false), itemsDoneAt + 1100);
    const t3 = window.setTimeout(() => setShineGood(true), itemsDoneAt + 900);
    const t4 = window.setTimeout(() => setShineGood(false), itemsDoneAt + 2000);
    const t5 = window.setTimeout(() => setPulseGood(true), itemsDoneAt + 2100);
    return () => {
      [t1, t2, t3, t4, t5].forEach(window.clearTimeout);
    };
  }, [inView, pairs.length]);

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.45, ease: "easeOut" },
    }),
  } satisfies import("framer-motion").Variants;

  return (
    <section id="antes-depois" className="border-t border-border bg-muted/30">
      <div ref={ref} className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Antes e depois</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            A diferença aparece no seu dia.
          </h2>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* Bad card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={cn("ba-card ba-card--bad rounded-2xl border p-8", shineBad && "ba-shine")}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color-mix(in_oklab,oklch(0.62_0.19_25)_14%,transparent)]">
                <AlertTriangle className="h-4 w-4 text-[oklch(0.55_0.19_25)]" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground/80">
                Sem a Caetus
              </h3>
            </div>
            <ul className="space-y-3">
              {pairs.map((p, i) => (
                <motion.li
                  key={p.before}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,oklch(0.62_0.19_25)_12%,transparent)]">
                    <X className="h-3 w-3 text-[oklch(0.55_0.19_25)]" strokeWidth={3} />
                  </span>
                  <span>{p.before}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Divider arrow (mobile: down, desktop: absolute center) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-sm"
            >
              <Sparkles className="h-4 w-4 text-brand-green" />
            </motion.div>
          </div>
          <div aria-hidden className="flex items-center justify-center md:hidden">
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background"
            >
              <ArrowDown className="h-4 w-4 text-brand-green" />
            </motion.div>
          </div>

          {/* Good card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "ba-card ba-card--good rounded-2xl border p-8",
              shineGood && "ba-shine",
              pulseGood && "ba-pulse",
            )}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green/12">
                <Check className="h-4 w-4 text-brand-green" strokeWidth={3} />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Com a Caetus</h3>
            </div>
            <ul className="space-y-3">
              {pairs.map((p, i) => (
                <motion.li
                  key={p.after}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  className="flex items-start gap-2.5 text-sm text-foreground/90"
                >
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      delay: 0.3 + i * 0.12 + 0.15,
                      type: "spring",
                      stiffness: 380,
                      damping: 18,
                    }}
                    className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-green/15"
                  >
                    <Check className="h-3 w-3 text-brand-green" strokeWidth={3} />
                  </motion.span>
                  <span>{p.after}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "Semana 1",
      title: "Conhecemos você",
      desc: "Conversamos e mapeamos como sua empresa funciona hoje.",
    },
    {
      n: "Semana 2",
      title: "Organizamos sua presença",
      desc: "Deixamos você visível e apresentável no digital.",
    },
    {
      n: "Semana 3",
      title: "Ligamos o atendimento",
      desc: "Colocamos WhatsApp e automações inteligentes para funcionar em segundo plano.",
    },
    {
      n: "Semana 4",
      title: "Passamos a cuidar continuamente",
      desc: "Acompanhamos, ajustamos e evoluímos — sua rotina digital não para.",
    },
  ];
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Seus primeiros passos</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            O que acontece quando você contrata a Caetus?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Não entregamos um projeto e desaparecemos. Assumimos sua Operação Digital e seguimos
            cuidando conforme sua empresa cresce.
          </p>
        </div>
        <div
          data-reveal-stagger
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((s, i) => (
            <div key={s.n} className="relative rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-wider text-primary">
                  {s.n}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="absolute right-[-14px] top-1/2 hidden -translate-y-1/2 lg:block">
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Evolução contínua */}
        <EvolutionTimeline />
      </div>
    </section>
  );
}

type EvoStep = {
  m: string;
  title: string;
  items: string[];
  icons: Array<LucideIcon>;
  last?: boolean;
};

const EVO_STEPS: EvoStep[] = [
  {
    m: "Mês 1",
    title: "Sua base digital começa a tomar forma.",
    items: [
      "Site profissional",
      "Google Business",
      "Google Maps",
      "WhatsApp Inteligente",
      "Redes sociais organizadas",
    ],
    icons: [Globe, Instagram, Facebook, Linkedin, MapPin, Search, Heart, Bell, MessageCircle],
  },
  {
    m: "Mês 2",
    title: "Sua empresa começa a ganhar produtividade.",
    items: [
      "Publicações periódicas",
      "Marketplace (quando fizer sentido)",
      "Cadastro de produtos",
      "Primeiras automações",
      "Integrações",
    ],
    icons: [Workflow, Repeat, Zap, ShoppingBag, Check, ArrowRight, Sparkles],
  },
  {
    m: "Mês 3",
    title: "Sua gestão fica mais organizada.",
    items: ["Dashboards", "Relatórios", "Organização digital", "Indicadores"],
    icons: [LayoutDashboard, BarChart3, TrendingUp, FileText, Briefcase],
  },
  {
    m: "Mês 4",
    title: "Sua operação começa a trabalhar por você.",
    items: [
      "Inteligência Artificial",
      "Fluxos inteligentes",
      "Sistemas personalizados (quando necessário)",
      "Melhorias contínuas",
    ],
    icons: [BrainCircuit, Bot, Cpu, Zap, Sparkles, Code2],
  },
  {
    m: "Depois disso...",
    title: "Sua operação continua evoluindo conforme sua empresa cresce.",
    items: ["Novas soluções são incorporadas sempre que fizer sentido para o seu negócio."],
    icons: [
      InfinityIcon,
      BrainCircuit,
      LayoutDashboard,
      Workflow,
      Globe,
      MessageCircle,
      BarChart3,
      Sparkles,
    ],
    last: true,
  },
];

function ThemeParticles({ icons, activeKey }: { icons: EvoStep["icons"]; activeKey: string }) {
  const particles = Array.from({ length: 10 }).map((_, i) => {
    const Icon = icons[i % icons.length];
    const left = (i * 37) % 100;
    const delay = (i % 5) * 0.35;
    const size = 12 + (i % 3) * 4;
    const drift = (i % 2 === 0 ? 1 : -1) * (8 + (i % 4) * 4);
    const rot = (i % 2 === 0 ? 1 : -1) * (20 + (i % 3) * 15);
    return { Icon, left, delay, size, drift, rot, id: i };
  });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-6 h-24 overflow-hidden">
      <AnimatePresence mode="sync">
        {particles.map((p) => (
          <motion.span
            key={`${activeKey}-${p.id}`}
            initial={{ opacity: 0, y: 20, x: 0, rotate: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.22, 0.18, 0], y: -60, x: p.drift, rotate: p.rot, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 3.6,
              delay: p.delay,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 0.4,
            }}
            style={{ left: `${p.left}%` }}
            className="absolute top-6 text-primary"
          >
            <p.Icon className="h-4 w-4" style={{ width: p.size, height: p.size }} />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

function EvolutionTimeline() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % EVO_STEPS.length);
    }, 3800);
    return () => clearInterval(id);
  }, [paused]);

  const handleSelect = (i: number) => {
    setActive(i);
    setPaused(true);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), 8000);
  };

  useEffect(
    () => () => {
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    },
    [],
  );

  const progress = ((active + 1) / EVO_STEPS.length) * 100;

  return (
    <div className="mt-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-primary">Evolução contínua</p>
        <h3 className="mt-3 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
          E depois da implantação, sua operação continua evoluindo.
        </h3>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Não é um projeto que termina. É uma operação que cresce junto com sua empresa.
        </p>
      </div>

      <div className="relative mt-14">
        {/* Base line + progress fill */}
        <div aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block" />
        <motion.div
          aria-hidden
          className="absolute left-0 top-6 hidden h-px bg-gradient-to-r from-primary/40 via-primary to-primary md:block"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-6">
          {EVO_STEPS.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.m}
                type="button"
                onClick={() => handleSelect(i)}
                className="group relative flex flex-col items-center text-center focus:outline-none"
                aria-pressed={isActive}
              >
                {isActive && <ThemeParticles icons={s.icons} activeKey={`${i}`} />}
                <motion.span
                  animate={{
                    scale: isActive ? 1.12 : 1,
                    boxShadow: isActive
                      ? "0 0 0 6px color-mix(in oklab, var(--primary) 15%, transparent), 0 10px 30px -8px color-mix(in oklab, var(--primary) 55%, transparent)"
                      : "0 0 0 0 rgba(0,0,0,0)",
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={cn(
                    "relative z-10 grid h-12 w-12 place-items-center rounded-full border text-xs font-semibold transition-colors duration-500",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-primary/70 group-hover:border-primary/40",
                  )}
                >
                  {isActive && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-primary/50"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.9, opacity: 0 }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  {s.last ? "∞" : s.m.replace("Mês ", "")}
                </motion.span>
                <span
                  className={cn(
                    "mt-3 text-xs font-semibold uppercase tracking-wider transition-colors duration-500",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {s.m}
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${i}-${isActive}`}
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="w-full"
                  >
                    <p
                      className={cn(
                        "mt-2 text-sm font-medium transition-colors duration-500",
                        isActive ? "text-foreground" : "text-foreground/70",
                      )}
                    >
                      {s.title}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {s.items.map((it) => (
                        <li
                          key={it}
                          className={cn(
                            "text-xs leading-relaxed transition-colors duration-500",
                            isActive ? "text-muted-foreground" : "text-muted-foreground/70",
                          )}
                        >
                          {!s.last && <span className="mr-1 text-brand-green">✔</span>}
                          {it}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CTA() {
  return (
    <section id="contato" className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          Finalmente, alguém cuidando dessa parte da sua empresa.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-primary-foreground/70">
          Conte pra gente como sua empresa funciona hoje. A Caetus assume o digital para você voltar
          a focar no seu negócio.
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

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <span className="text-[10px] font-bold">C</span>
          </div>
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Caetus Systems
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Sua operação digital funcionando todos os dias.
        </p>
      </div>
    </footer>
  );
}

function ValueProp() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-gradient-to-b from-muted/40 via-background to-muted/30">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 10%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 55%), radial-gradient(ellipse at 85% 90%, color-mix(in oklab, var(--brand-green) 10%, transparent), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-5xl px-6 py-28 md:py-40">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary"
        >
          Por que Caetus
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mx-auto mt-8 max-w-4xl text-balance text-center text-3xl font-medium leading-[1.15] tracking-tight text-foreground/80 md:text-5xl lg:text-6xl"
        >
          Você não precisa contratar uma agência, um desenvolvedor, um social media, um designer e
          alguém para responder seu WhatsApp.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-10 max-w-4xl text-balance text-center text-4xl font-semibold leading-[1.1] tracking-tight text-primary md:text-6xl lg:text-7xl"
        >
          Você precisa de uma operação funcionando.
        </motion.p>
      </div>
    </section>
  );
}

const ECOSYSTEM_ICONS: { icon: LucideIcon; label: string }[] = [
  { icon: Globe, label: "Site" },
  { icon: MapPin, label: "Google Maps" },
  { icon: Search, label: "Google Business" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: ShoppingBag, label: "Marketplace" },
  { icon: BrainCircuit, label: "IA" },
  { icon: Workflow, label: "Automações" },
  { icon: Repeat, label: "Integrações" },
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: BarChart3, label: "Relatórios" },
  { icon: Code2, label: "Sistemas" },
  { icon: FileText, label: "Organização" },
  { icon: Cpu, label: "Nuvem" },
];

function EcosystemHighlight() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"idle" | "revealed">("idle");
  const [pulseIdx, setPulseIdx] = useState<number | null>(null);
  const [linkPair, setLinkPair] = useState<[number, number] | null>(null);

  // Trigger when in view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Count animation 0 → 35 in ~1s
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const duration = 1100;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 35));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        // Wait for icons to finish appearing (stagger)
        const done = window.setTimeout(
          () => setPhase("revealed"),
          ECOSYSTEM_ICONS.length * 80 + 400,
        );
        return () => window.clearTimeout(done);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  // Idle: subtle pulses + connecting line flickers
  useEffect(() => {
    if (phase !== "revealed") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const pulseTimer = window.setInterval(() => {
      const i = Math.floor(Math.random() * ECOSYSTEM_ICONS.length);
      setPulseIdx(i);
      window.setTimeout(() => setPulseIdx((cur) => (cur === i ? null : cur)), 1400);
    }, 2600);
    const linkTimer = window.setInterval(() => {
      const n = ECOSYSTEM_ICONS.length;
      const a = Math.floor(Math.random() * n);
      let b = Math.floor(Math.random() * n);
      if (b === a) b = (b + 1) % n;
      setLinkPair([a, b]);
      window.setTimeout(() => setLinkPair(null), 1600);
    }, 3400);
    return () => {
      window.clearInterval(pulseTimer);
      window.clearInterval(linkTimer);
    };
  }, [phase]);

  const n = ECOSYSTEM_ICONS.length;

  return (
    <div ref={wrapRef} className="mt-14 flex justify-center">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-background to-brand-green/5 px-6 py-10 text-center shadow-[0_20px_60px_-30px_color-mix(in_oklab,var(--primary)_45%,transparent)] md:px-14 md:py-14">
        {/* soft radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--primary) 12%, transparent) 0%, transparent 60%)",
          }}
        />

        <div className="relative flex items-center justify-center gap-3 text-primary">
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-widest">
            Ecossistema completo
          </span>
        </div>

        {/* Orbit stage */}
        <div className="relative mx-auto mt-8 aspect-square w-full max-w-[420px]">
          {/* Connection line */}
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            {linkPair &&
              (() => {
                const [a, b] = linkPair;
                const rA = a % 2 === 0 ? 44 : 34;
                const rB = b % 2 === 0 ? 44 : 34;
                const angA = (a / n) * Math.PI * 2 - Math.PI / 2;
                const angB = (b / n) * Math.PI * 2 - Math.PI / 2;
                const ax = 50 + Math.cos(angA) * rA;
                const ay = 50 + Math.sin(angA) * rA;
                const bx = 50 + Math.cos(angB) * rB;
                const by = 50 + Math.sin(angB) * rB;
                return (
                  <motion.line
                    x1={ax}
                    y1={ay}
                    x2={bx}
                    y2={by}
                    stroke="color-mix(in oklab, var(--primary) 55%, transparent)"
                    strokeWidth={0.35}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.25, 0.75, 1] }}
                  />
                );
              })()}
          </svg>

          {/* Center number */}
          <motion.div
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-baseline"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={active ? { scale: [0.9, 1.08, 1], opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="bg-gradient-to-br from-primary via-primary to-brand-green bg-clip-text text-6xl font-bold tracking-tight text-transparent md:text-7xl"
              style={{
                filter:
                  "drop-shadow(0 0 24px color-mix(in oklab, var(--primary) 30%, transparent))",
              }}
            >
              {count}
            </span>
            <span className="ml-1 text-3xl font-semibold text-primary md:text-4xl">+</span>
          </motion.div>

          {/* Icons around */}
          {ECOSYSTEM_ICONS.map((it, i) => {
            const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
            // alternate two radii to create a soft double-ring feel
            const radiusPct = i % 2 === 0 ? 44 : 34;
            const convergedPct = radiusPct - 2; // subtle inward drift after reveal
            const finalPct = phase === "revealed" ? convergedPct : radiusPct;
            const x = 50 + Math.cos(angle) * finalPct;
            const y = 50 + Math.sin(angle) * finalPct;
            const isPulse = pulseIdx === i;
            const Icon = it.icon;
            return (
              <motion.div
                key={it.label}
                className="absolute"
                style={{ left: `${x}%`, top: `${y}%` }}
                initial={{ opacity: 0, scale: 0.4, x: "-50%", y: "-50%" }}
                animate={
                  active
                    ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" }
                    : { opacity: 0, scale: 0.4, x: "-50%", y: "-50%" }
                }
                transition={{
                  delay: 0.35 + i * 0.07,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  left: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                  top: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-card/90 text-primary shadow-sm backdrop-blur md:h-11 md:w-11"
                  animate={
                    isPulse
                      ? {
                          scale: [1, 1.15, 1],
                          boxShadow: [
                            "0 0 0 0 color-mix(in oklab, var(--primary) 0%, transparent)",
                            "0 0 0 8px color-mix(in oklab, var(--primary) 22%, transparent)",
                            "0 0 0 0 color-mix(in oklab, var(--primary) 0%, transparent)",
                          ],
                        }
                      : { scale: 1 }
                  }
                  transition={{ duration: 1.3, ease: "easeInOut" }}
                  aria-label={it.label}
                >
                  <Icon className="h-4 w-4 md:h-[18px] md:w-[18px]" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <p className="relative mt-6 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
          35+ soluções disponíveis em uma única Operação Digital.
        </p>
        <p className="relative mt-3 text-sm text-muted-foreground md:text-base">
          Sua operação cresce conforme a necessidade da sua empresa — uma mensalidade, um parceiro,
          uma operação integrada.
        </p>
      </div>
    </div>
  );
}

function Ecosystem() {
  const categories = [
    {
      icon: Globe,
      title: "Presença Digital",
      items: [
        "Site Profissional",
        "Landing Pages",
        "Google Business",
        "Google Maps",
        "Instagram",
        "Facebook",
        "LinkedIn",
        "Marketplace",
      ],
    },
    {
      icon: Headphones,
      title: "Atendimento",
      items: [
        "WhatsApp Inteligente",
        "IA para atendimento",
        "Agendamentos",
        "Orçamentos",
        "Respostas automáticas",
      ],
    },
    {
      icon: Megaphone,
      title: "Marketing",
      items: [
        "Publicações periódicas",
        "Criação de conteúdo",
        "Campanhas promocionais",
        "Tráfego Pago (quando fizer sentido)",
        "Gestão de redes sociais",
      ],
    },
    {
      icon: Workflow,
      title: "Automação",
      items: [
        "Automação de planilhas",
        "Integração entre sistemas",
        "Fluxos automáticos",
        "Organização de arquivos",
        "Relatórios automáticos",
      ],
    },
    {
      icon: LayoutDashboard,
      title: "Gestão",
      items: ["Dashboards", "Indicadores", "Cadastro de produtos", "Organização de informações"],
    },
    {
      icon: Code2,
      title: "Desenvolvimento",
      items: [
        "Sistemas personalizados",
        "Softwares sob medida",
        "APIs",
        "Integrações",
        "Melhorias contínuas",
      ],
    },
    {
      icon: BrainCircuit,
      title: "Inteligência Artificial",
      items: [
        "Atendimento inteligente",
        "Assistentes digitais",
        "Geração de conteúdo",
        "Organização automática",
        "Fluxos inteligentes",
      ],
    },
  ];
  return (
    <section className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-primary">Sua Operação Digital</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Uma contratação. Toda a sua operação digital.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Enquanto muitas empresas precisam contratar uma agência, um desenvolvedor, um social
            media, alguém para cuidar do WhatsApp, outro para atualizar o site e outro para
            automatizar processos, a Caetus reúne tudo isso em uma única operação.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Conforme sua empresa evolui, novos serviços são incorporados naturalmente. Você não
            compra um projeto fechado — você ganha uma estrutura digital que cresce junto com o seu
            negócio.
          </p>
        </div>

        <div
          data-reveal-stagger
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((c) => (
            <div
              key={c.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold tracking-tight">{c.title}</h3>
              </div>
              <ul className="mt-5 space-y-2">
                {c.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" />
                    <span className="leading-snug">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <EcosystemHighlight />
      </div>
    </section>
  );
}

function WhatsIncluded() {
  const items = [
    "Site profissional",
    "Google Business",
    "Google Maps",
    "WhatsApp Inteligente",
    "Instagram",
    "Facebook",
    "LinkedIn",
    "Marketplace",
    "Cadastro de produtos",
    "Automações",
    "Integrações",
    "Relatórios",
    "Inteligência Artificial aplicada",
    "Organização de arquivos",
    "Dashboards",
    "Sistemas personalizados",
  ];
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">O que costuma vir junto</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            O que normalmente faz parte da sua operação.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Um mesmo time cuidando de tudo o que hoje vive espalhado — presença, atendimento,
            automações inteligentes e organização em um só lugar.
          </p>
        </div>
        <div
          data-reveal-stagger
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
        >
          {items.map((i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground/85 transition-colors hover:border-primary/40"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="leading-tight">{i}</span>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          O escopo é montado sob medida — só o que faz sentido para a sua empresa, nada além disso.
        </p>
      </div>
    </section>
  );
}

function ForWho() {
  const segments = [
    { icon: Wrench, label: "Oficinas" },
    { icon: UtensilsCrossed, label: "Restaurantes" },
    { icon: Stethoscope, label: "Clínicas" },
    { icon: ShoppingBag, label: "Lojas" },
    { icon: Briefcase, label: "Escritórios" },
    { icon: HeartHandshake, label: "Prestadores de serviço" },
    { icon: Factory, label: "Pequenas indústrias" },
    { icon: Home, label: "Empresas familiares" },
  ];
  return (
    <section id="para-quem" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Para quem é</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Ideal para empresas como:
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A Caetus atende negócios reais do dia a dia — de quem cuida do atendimento na esquina
            até quem toca uma operação com equipe.
          </p>
        </div>
        <div
          data-reveal-stagger
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        >
          {segments.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-5 py-6 text-center transition-colors hover:border-primary/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-foreground/85">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const presenciais = [
    "Lagoa Santa (Sede)",
    "Vespasiano",
    "Pedro Leopoldo",
    "Matozinhos",
    "Confins",
    "Capim Branco",
    "Jatobá",
  ];
  const agendamento = [
    "Belo Horizonte",
    "Santa Luzia",
    "Jaboticatubas",
    "Serra do Cipó",
    "São José de Almeida",
  ];
  const reasons = [
    "Atendimento presencial na região quando fizer sentido.",
    "Atendimento remoto para empresas de qualquer lugar do Brasil.",
    "Você conversa direto com quem desenvolve e acompanha a solução.",
    "Tecnologia criada para resolver problemas reais do dia a dia.",
    "Evolução contínua da sua operação digital, sem trocar de fornecedor.",
  ];
  return (
    <section id="quem-somos" className="relative border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          {/* Photo placeholder */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-muted/60 via-card to-muted/40 shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--primary)_35%,transparent)]">
              <img
                src="/Henrique Caetano.jpeg"
                alt="Henrique Caetano"
                className="absolute inset-0 h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--primary) 25%, transparent), transparent 55%), radial-gradient(circle at 80% 90%, color-mix(in oklab, var(--brand-green) 20%, transparent), transparent 60%)",
                }}
              />
              <div className="absolute bottom-4 left-4 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[11px] font-medium text-foreground/80 backdrop-blur">
                Henrique Caetano · Fundador
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Quem somos
            </div>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Uma empresa local, que entende empresas locais.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85 sm:text-lg">
              <p>
                A <strong className="text-foreground">Caetus Systems</strong> nasceu em Lagoa Santa
                com um objetivo simples: ajudar pequenas empresas a competir em igualdade com
                empresas muito maiores por meio da tecnologia.
              </p>
              <p>
                Acreditamos que negócios locais têm força — o que costuma faltar é estrutura digital
                para acompanhar esse potencial. É essa estrutura que a Caetus assume, monta e cuida
                continuamente para cada cliente.
              </p>
              <p>
                A empresa é conduzida por{" "}
                <strong className="text-foreground">Henrique Caetano</strong>, com mais de 5 anos de
                experiência desenvolvendo soluções de automação industrial, integração de sistemas e
                otimização de processos — em ambientes onde organização, eficiência e confiabilidade
                não são opcionais.
              </p>
              <p>
                Essa mesma bagagem é aplicada hoje para que pequenas empresas ganhem tempo, vendam
                mais e tenham uma operação digital organizada — sem depender do dono estar em todo
                lugar ao mesmo tempo.
              </p>
            </div>

            {/* Presencial */}
            <div className="mt-10 rounded-2xl border border-border/70 bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold">Atendimento presencial</h3>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-[11px] font-medium text-brand-green">
                  📍 Empresa Local
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Atendemos empresas presencialmente na região metropolitana de Belo Horizonte.
              </p>

              {/* Mapa real de cobertura */}
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
                    {presenciais.map((c) => (
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
                    {agendamento.map((c) => (
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
                <h3 className="text-lg font-semibold">Atendimento remoto</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Também atendemos empresas de qualquer lugar do Brasil. Grande parte do
                acompanhamento acontece por videoconferência, acesso remoto e suporte contínuo —
                mantendo a mesma qualidade independentemente da localização do cliente.
              </p>
            </div>

            {/* Diferenciais */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold">Diferenciais</h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {reasons.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 rounded-xl border border-border/70 bg-card p-4"
                  >
                    <Check className="mt-0.5 h-5 w-5 flex-none text-[color:var(--brand-green)]" />
                    <span className="text-sm leading-relaxed text-foreground/85">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Citação institucional — encerramento em destaque */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
              Nosso posicionamento
            </span>
            <blockquote className="mt-8 text-balance text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              <span className="text-primary">“</span>A tecnologia pode ser desenvolvida de qualquer
              lugar. Mas entender o seu negócio de perto faz toda a diferença.
              <span className="text-primary">”</span>
            </blockquote>
            <div className="mx-auto mt-10 h-px w-16 bg-primary/40" />
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "O que é uma Operação Digital?",
    a: "Operação Digital é todo o ecossistema digital de uma empresa funcionando de forma integrada: site, Google Business, redes sociais, WhatsApp Business, automações e sistemas — mantidos por um único parceiro em vez de vários fornecedores.",
  },
  {
    q: "O que está incluso no serviço?",
    a: "Sites profissionais, Google Business e Google Maps, gestão de Instagram, Facebook e LinkedIn, WhatsApp com Inteligência Artificial, automações de processos e desenvolvimento de sistemas sob medida.",
  },
  {
    q: "A Caetus cria sites?",
    a: "Sim. A Caetus Systems desenvolve sites profissionais já preparados para SEO, AEO e GEO desde o primeiro dia — otimizados para o Google e para inteligências artificiais como ChatGPT, Gemini e Copilot.",
  },
  {
    q: "Vocês cuidam das redes sociais?",
    a: "Sim. Mantemos Instagram, Facebook e LinkedIn atualizados como parte da Operação Digital, alinhados com o site e com o Google Business da empresa.",
  },
  {
    q: "O WhatsApp responde sozinho?",
    a: "Sim. Implementamos WhatsApp Business com Inteligência Artificial: atendimento automático 24/7, agendamentos, respostas personalizadas e encaminhamento humano quando necessário.",
  },
  {
    q: "Vocês desenvolvem sistemas personalizados?",
    a: "Sim. A Caetus Systems cria sistemas sob medida, dashboards, integrações com Mercado Livre e automações de processos internos para pequenas empresas.",
  },
  {
    q: "Atendem empresas de qualquer cidade?",
    a: "Atendemos presencialmente empresas de Lagoa Santa, Vespasiano, Pedro Leopoldo, Matozinhos, Confins, Capim Branco, Santa Luzia, Jaboticatubas e Serra do Cipó. Para o restante do Brasil, o atendimento é 100% remoto.",
  },
  {
    q: "Existe atendimento presencial?",
    a: "Sim. Reuniões presenciais em Lagoa Santa e na região metropolitana de Belo Horizonte, sempre que fizer sentido para o projeto.",
  },
  {
    q: "Quanto custa contratar?",
    a: "O investimento varia conforme o porte da empresa e os serviços contratados. Fale com a Caetus pelo WhatsApp para receber uma proposta personalizada.",
  },
  {
    q: "Preciso contratar vários fornecedores?",
    a: "Não. A Caetus centraliza site, redes sociais, WhatsApp, automações e sistemas em um único parceiro de longo prazo, evitando a complexidade de coordenar agência, desenvolvedor, designer e social media separadamente.",
  },
];

function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Perguntas frequentes
        </p>
        <h2
          id="faq-title"
          className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Tudo o que você precisa saber sobre a Caetus
        </h2>
        <p className="mt-4 text-muted-foreground">
          Respostas objetivas — pensadas para pessoas, para o Google e para mecanismos de resposta
          baseados em Inteligência Artificial.
        </p>

        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group p-5 open:bg-muted/30">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <h3 className="text-base font-semibold text-foreground">{item.q}</h3>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45">
                  <span className="text-lg leading-none">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>

        <aside className="mt-10 rounded-2xl border border-border/60 bg-card p-5 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Quer se aprofundar sobre SEO, AEO e GEO?</p>
          <p className="mt-2">
            Leia o artigo{" "}
            <Link
              to="/blog/futuro-do-seo-com-ia"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              "SEO, AEO e GEO: como preparar seu site para o Google e para as IAs"
            </Link>{" "}
            no{" "}
            <Link
              to="/blog"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              blog da Caetus
            </Link>
            .
          </p>
        </aside>
      </div>
    </section>
  );
}

export default Index;
