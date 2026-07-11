import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Calendar,
  Check,
  CheckCheck,
  FileText,
  MapPin,
  MessageCircle,
  MonitorPlay,
  Package,
  Sparkles,
  UserRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";
import { WHATSAPP_URL } from "@/lib/constants";

/**
 * Demonstração — o coração da landing.
 * Simulação do atendimento no WhatsApp: lista de conversas viva + telefone
 * com a conversa acontecendo + resultados aparecendo. Tudo pausa quando a
 * seção sai da viewport.
 */
export function Demo() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section
      id="demonstracao"
      className="relative overflow-hidden border-t border-border bg-gradient-to-b from-muted/50 via-background to-muted/30"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 15% 20%, color-mix(in oklab, var(--brand-green) 8%, transparent), transparent 55%), radial-gradient(ellipse at 85% 80%, color-mix(in oklab, var(--primary) 8%, transparent), transparent 60%)",
        }}
      />
      <div ref={ref} className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <MonitorPlay className="h-3.5 w-3.5 text-brand-green" />
              Simulação do atendimento
            </div>
            <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              Veja como seus clientes seriam atendidos{" "}
              <span className="text-brand-green">agora</span>.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Restaurante, clínica, oficina, loja — cada conversa ao lado é uma situação real do
              dia a dia sendo resolvida sem ninguém pegar no telefone.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Responde na hora, mesmo de madrugada",
                "Agenda, orça e envia localização sozinho",
                "Encaminha para você quando o assunto é sério",
              ].map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-base text-foreground/85">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-brand-green" strokeWidth={3} />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-brand-green px-6 text-white hover:bg-brand-green/90"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="mr-1 h-4 w-4" />
                  Quero isso na minha empresa
                </a>
              </Button>
            </div>
          </div>
          <WhatsAppLiveDemo active={inView} />
        </div>
      </div>
    </section>
  );
}

type WAMsg = { from: "client" | "ai"; text: string; typingMs?: number };
type WAConvo = {
  name: string;
  segment: string;
  initial: string;
  color: string;
  preview: string;
  messages: WAMsg[];
  handoff?: boolean;
};

const WA_CONVOS: WAConvo[] = [
  {
    name: "João",
    segment: "Restaurante",
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
    segment: "Loja",
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
    segment: "Serviços",
    initial: "C",
    color: "bg-amber-500",
    preview: "Quanto custa?",
    messages: [
      { from: "client", text: "Quanto custa o serviço para minha empresa?" },
      {
        from: "ai",
        text: "Oi, Carlos! O valor depende do que você precisa. Posso montar um orçamento em 2 min — qual o segmento?",
        typingMs: 1400,
      },
      { from: "client", text: "Restaurante." },
      { from: "ai", text: "Perfeito! Já estou preparando as opções para você.", typingMs: 1000 },
    ],
  },
  {
    name: "Ana",
    segment: "Clínica",
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
    segment: "Comércio",
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
    segment: "Loja",
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
    segment: "Delivery",
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
    segment: "Oficina",
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
    segment: "Escritório",
    initial: "D",
    color: "bg-orange-500",
    preview: "Precisa de contrato?",
    messages: [
      { from: "client", text: "Precisa assinar contrato mensal?" },
      {
        from: "ai",
        text: "Oi, Diego! Vou encaminhar essa conversa para nossa equipe explicar direitinho.",
        typingMs: 1400,
      },
    ],
    handoff: true,
  },
  {
    name: "Camila",
    segment: "Academia",
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
  "Pode mandar foto?",
  "Tem vaga amanhã?",
  "Faz entrega hoje?",
  "Qual o prazo?",
  "Vocês parcelam?",
  "Tem promoção?",
  "Qual o horário de vocês?",
  "Onde vocês ficam?",
  "Faz orçamento sem compromisso?",
  "Tem catálogo pra ver?",
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
  "Enviando as fotos agora. 📷",
  "Amanhã tenho 10h e 15h disponíveis.",
  "Prazo médio de 3 a 5 dias úteis.",
  "Já reservei seu horário. 📅",
  "Nosso catálogo está neste link 👉",
  "Seu pedido foi registrado com sucesso.",
  "Fica pronto em 48h úteis.",
  "Vou encaminhar para a equipe agora.",
];

type WaStatus =
  | "typing"
  | "replied"
  | "seen"
  | "scheduled"
  | "quoted"
  | "location"
  | "started"
  | "delivered";

const WA_STATUS_META: Record<
  WaStatus,
  { label: string; icon: LucideIcon; tone: "green" | "blue" | "muted" }
> = {
  typing: { label: "IA digitando...", icon: Bot, tone: "blue" },
  replied: { label: "Respondido automaticamente", icon: Check, tone: "green" },
  seen: { label: "Cliente visualizou", icon: CheckCheck, tone: "muted" },
  scheduled: { label: "Agendamento confirmado", icon: Calendar, tone: "green" },
  quoted: { label: "Orçamento enviado", icon: FileText, tone: "green" },
  location: { label: "Localização compartilhada", icon: MapPin, tone: "green" },
  started: { label: "Conversa iniciada", icon: MessageCircle, tone: "muted" },
  delivered: { label: "Produto enviado", icon: Package, tone: "green" },
};

const AGO = ["agora", "1 min", "3 min", "6 min", "12 min", "18 min", "22 min", "27 min", "34 min", "41 min"];

function WhatsAppLiveDemo({ active }: { active: boolean }) {
  const [convoIdx, setConvoIdx] = useState(0);
  const [visible, setVisible] = useState<WAMsg[]>([]);
  const [typing, setTyping] = useState(false);
  const [showHandoff, setShowHandoff] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const convo = WA_CONVOS[convoIdx];

  // Reproduz a conversa ativa (pausa fora da viewport)
  useEffect(() => {
    if (!active) return;
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
  }, [convoIdx, convo, active]);

  // Auto scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visible, typing, showHandoff]);

  // Lista de conversas viva
  type ConvoState = {
    lastClient: string;
    lastAi: string;
    status: WaStatus;
    unread: number;
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

  // Conversas de fundo continuam chegando/sendo respondidas (pausa fora da viewport)
  useEffect(() => {
    if (!active) return;
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

      timeouts.push(
        setTimeout(() => {
          if (cancelled) return;
          setConvoState((s) => ({ ...s, [idx]: { ...s[idx], status: "typing" } }));
        }, 1150),
      );
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
      timeouts.push(setTimeout(tick, 3100 + Math.random() * 900));
    };

    const start = setTimeout(tick, 1600);
    timeouts.push(start);
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [convoIdx, active]);

  return (
    <div className="relative flex w-full flex-col items-center gap-4">
      <div className="relative w-full max-w-sm space-y-3">
        {/* Lista de conversas */}
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
            {order.map((idx, pos) => {
              const c = WA_CONVOS[idx];
              const isActive = idx === convoIdx;
              const st = convoState[idx];
              const meta = WA_STATUS_META[st.status];
              const isFlash = flashIdx === idx;
              const StatusIcon = meta.icon;
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
                      <p className="truncate text-xs font-semibold">
                        {c.name}
                        <span className="ml-1.5 font-normal text-muted-foreground">
                          · {c.segment}
                        </span>
                      </p>
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
                            <Bot className="h-3 w-3" />
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
                            className="flex items-center gap-1 truncate text-[11px] text-foreground/80"
                          >
                            <Bot className="h-3 w-3 shrink-0 text-brand-green" />
                            <span className="truncate">{st.lastAi}</span>
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
                        <StatusIcon className="h-3 w-3" />
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

        {/* Telefone */}
        <div className="rounded-[2rem] border border-border bg-card p-3 shadow-xl shadow-brand-green/10">
          <div className="overflow-hidden rounded-[1.5rem] bg-muted/40">
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
                    <p className="text-sm font-semibold leading-tight">
                      {convo.name}
                      <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                        · {convo.segment}
                      </span>
                    </p>
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

            <div ref={scrollRef} className="h-72 space-y-2 overflow-hidden px-4 py-4">
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

      {/* Indicadores da simulação */}
      <div className="grid w-full max-w-sm grid-cols-3 gap-2">
        {[
          { label: "Resposta imediata", value: "4s", icon: Zap, color: "text-primary" },
          { label: "Sempre disponível", value: "24/7", icon: Check, color: "text-brand-green" },
          { label: "No automático", value: "97%", icon: Sparkles, color: "text-brand-green" },
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
