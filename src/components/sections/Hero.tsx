import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Boxes,
  Calendar,
  CalendarCheck,
  Clock,
  FileText,
  Globe,
  Instagram,
  MapPin,
  MessageCircle,
  MonitorPlay,
  Package,
  Repeat,
  Star,
  UserPlus,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useInView } from "@/hooks/use-in-view";
import { WHATSAPP_URL } from "@/lib/constants";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top,var(--accent-soft)_0%,transparent_60%)]" />
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:pb-32 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-balance text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            Sua empresa funcionando,{" "}
            <span className="text-primary">mesmo quando você não está.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg font-medium text-foreground/80 md:text-xl">
            Atendimento, vendas e organização no automático — enquanto você toca o negócio.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-16 max-w-4xl md:mt-20"
        >
          <MockDashboard />
        </motion.div>
      </div>
    </section>
  );
}

type FeedCategory = {
  icon: LucideIcon;
  bg: string;
  text: string;
};

const CATEGORY_STYLES = {
  green: { bg: "bg-brand-green/15", text: "text-brand-green" },
  cyan: { bg: "bg-cyan-400/15", text: "text-cyan-300" },
  purple: { bg: "bg-purple-400/15", text: "text-purple-300" },
  pink: { bg: "bg-pink-400/15", text: "text-pink-300" },
  amber: { bg: "bg-amber-400/15", text: "text-amber-300" },
  orange: { bg: "bg-orange-400/15", text: "text-orange-300" },
  teal: { bg: "bg-teal-400/15", text: "text-teal-300" },
  blue: { bg: "bg-blue-400/15", text: "text-blue-300" },
} as const;

const FEED_EVENTS: Record<string, FeedCategory> = {
  "Cliente atendido automaticamente no WhatsApp": { icon: MessageCircle, ...CATEGORY_STYLES.green },
  "Produto sincronizado com o site": { icon: Globe, ...CATEGORY_STYLES.blue },
  "Publicação enviada para o Instagram": { icon: Instagram, ...CATEGORY_STYLES.pink },
  "Google Business atualizado": { icon: MapPin, ...CATEGORY_STYLES.blue },
  "Novo lead registrado": { icon: UserPlus, ...CATEGORY_STYLES.cyan },
  "Comentário respondido": { icon: MessageCircle, ...CATEGORY_STYLES.purple },
  "Pedido encaminhado para o time": { icon: Package, ...CATEGORY_STYLES.orange },
  "Orçamento iniciado": { icon: FileText, ...CATEGORY_STYLES.teal },
  "Relatório semanal gerado": { icon: BarChart3, ...CATEGORY_STYLES.blue },
  "Agenda sincronizada": { icon: Calendar, ...CATEGORY_STYLES.purple },
  "Documento enviado ao cliente": { icon: FileText, ...CATEGORY_STYLES.teal },
  "Cliente agendou atendimento": { icon: CalendarCheck, ...CATEGORY_STYLES.cyan },
  "Avaliação de 5 estrelas recebida": { icon: Star, ...CATEGORY_STYLES.amber },
  "Lembrete enviado ao cliente": { icon: Bell, ...CATEGORY_STYLES.amber },
  "Estoque atualizado": { icon: Boxes, ...CATEGORY_STYLES.orange },
  "Follow-up automático disparado": { icon: Repeat, ...CATEGORY_STYLES.cyan },
};

const FEED_EVENT_KEYS = Object.keys(FEED_EVENTS);

type FeedItem = { id: number; text: string };

function MockDashboard() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [feed, setFeed] = useState<FeedItem[]>(() => {
    const shuffled = [...FEED_EVENT_KEYS].sort(() => Math.random() - 0.5).slice(0, 4);
    return shuffled.map((text, i) => ({ id: i, text }));
  });
  const [clientes, setClientes] = useState(128);
  const [tempoMin, setTempoMin] = useState(12 * 60);
  const nextIdRef = useRef(100);

  useEffect(() => {
    if (!inView) return;
    let timeout: number;
    const tick = () => {
      const delay = 3000 + Math.random() * 2000;
      timeout = window.setTimeout(() => {
        setFeed((prev) => {
          const recent = new Set(prev.map((p) => p.text));
          const candidates = FEED_EVENT_KEYS.filter((e) => !recent.has(e));
          const text = candidates[Math.floor(Math.random() * candidates.length)];
          return [...prev.slice(-3), { id: nextIdRef.current++, text }];
        });
        tick();
      }, delay);
    };
    tick();
    return () => clearTimeout(timeout);
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    const c = window.setInterval(() => setClientes((v) => v + 1), 6000);
    const t = window.setInterval(
      () => setTempoMin((v) => v + Math.floor(3 + Math.random() * 5)),
      5000,
    );
    return () => {
      clearInterval(c);
      clearInterval(t);
    };
  }, [inView]);

  const horas = Math.floor(tempoMin / 60);
  const minutos = tempoMin % 60;
  const tempoStr = `${horas}h ${minutos.toString().padStart(2, "0")}min`;

  const stats = [
    {
      label: "Clientes atendidos",
      value: clientes.toString(),
      sub: "sem depender de você",
      icon: Users,
      ...CATEGORY_STYLES.cyan,
    },
    {
      label: "Tempo recuperado",
      value: tempoStr,
      sub: "em uma semana típica",
      icon: Clock,
      ...CATEGORY_STYLES.amber,
    },
    {
      label: "Sempre no ar",
      value: "24/7",
      sub: "todos os canais ativos",
      icon: Zap,
      ...CATEGORY_STYLES.green,
    },
  ];

  return (
    <div ref={ref} className="rounded-2xl border border-primary/20 bg-primary p-2 shadow-2xl shadow-primary/30">
      <div className="relative overflow-hidden rounded-xl bg-white/[0.04] p-6">
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-10 h-48 w-48 rounded-full bg-purple-400/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/caetus-logo.png"
              alt=""
              aria-hidden="true"
              className="h-6 w-6 rounded-md object-contain"
            />
            <span className="text-sm font-semibold tracking-tight text-primary-foreground">
              Dashboard de Relatórios
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-400/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-amber-200">
            <MonitorPlay className="h-3 w-3" />
            Simulação
          </span>
        </div>
        <div className="relative mb-6 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
          </span>
          <span className="text-xs text-primary-foreground/60">Assim fica o seu dia a dia</span>
        </div>
        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-4 text-left"
            >
              <div className="flex items-center gap-2">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${s.bg}`}>
                  <s.icon className={`h-3.5 w-3.5 ${s.text}`} />
                </div>
                <p className="text-xs text-primary-foreground/60">{s.label}</p>
              </div>
              <div className="relative mt-2 h-8 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={s.value}
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-2xl font-semibold tracking-tight tabular-nums ${s.text}`}
                  >
                    {s.value}
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className="mt-1 text-xs text-primary-foreground/60">{s.sub}</p>
            </div>
          ))}
        </div>
        <div className="relative mt-4 flex flex-col gap-2">
          <AnimatePresence initial={false} mode="popLayout">
            {feed.map((item) => {
              const category = FEED_EVENTS[item.text];
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-3 text-sm"
                >
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${category.bg}`}>
                    <category.icon className={`h-3.5 w-3.5 ${category.text}`} />
                  </div>
                  <span className="text-primary-foreground/85">{item.text}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
