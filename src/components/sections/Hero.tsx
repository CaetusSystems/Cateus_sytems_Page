import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, MonitorPlay } from "lucide-react";
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

const FEED_EVENTS = [
  "Cliente atendido automaticamente no WhatsApp",
  "Produto sincronizado com o site",
  "Publicação enviada para o Instagram",
  "Google Business atualizado",
  "Novo lead registrado",
  "Comentário respondido",
  "Pedido encaminhado para o time",
  "Orçamento iniciado",
  "Relatório semanal gerado",
  "Agenda sincronizada",
  "Documento enviado ao cliente",
  "Cliente agendou atendimento",
  "Avaliação de 5 estrelas recebida",
  "Lembrete enviado ao cliente",
  "Estoque atualizado",
  "Follow-up automático disparado",
];

type FeedItem = { id: number; text: string };

function MockDashboard() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [feed, setFeed] = useState<FeedItem[]>(() => {
    const shuffled = [...FEED_EVENTS].sort(() => Math.random() - 0.5).slice(0, 4);
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
          const candidates = FEED_EVENTS.filter((e) => !recent.has(e));
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
    { label: "Clientes atendidos", value: clientes.toString(), sub: "sem depender de você" },
    { label: "Tempo recuperado", value: tempoStr, sub: "em uma semana típica" },
    { label: "Sempre no ar", value: "24/7", sub: "todos os canais ativos" },
  ];

  return (
    <div ref={ref} className="rounded-2xl border border-primary/20 bg-primary p-2 shadow-2xl shadow-primary/30">
      <div className="rounded-xl bg-white/[0.04] p-6">
        <div className="mb-4 flex items-center justify-between">
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
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary-foreground/70">
            <MonitorPlay className="h-3 w-3" />
            Simulação
          </span>
        </div>
        <div className="mb-6 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
          </span>
          <span className="text-xs text-primary-foreground/60">Assim fica o seu dia a dia</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-4 text-left"
            >
              <p className="text-xs text-primary-foreground/60">{s.label}</p>
              <div className="relative mt-1 h-8 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={s.value}
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="text-2xl font-semibold tracking-tight tabular-nums text-primary-foreground"
                  >
                    {s.value}
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className="mt-1 text-xs text-primary-foreground/60">{s.sub}</p>
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
                className="flex items-center gap-3 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-3 text-sm"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green/15">
                  <Check className="h-3.5 w-3.5 text-brand-green" />
                </div>
                <span className="text-primary-foreground/85">{item.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
