import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Check, CheckCheck, MapPin, MessageCircle, Receipt, UserRound } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { fill, useT } from "@/i18n";
import { cn } from "@/lib/utils";

type StatusKey = "replied" | "seen" | "location" | "quoted" | "started";

const STATUS_ICON = {
  replied: Check,
  seen: CheckCheck,
  location: MapPin,
  quoted: Receipt,
  started: MessageCircle,
} as const;

const STATUS_TONE: Record<StatusKey, "green" | "muted"> = {
  replied: "green",
  seen: "muted",
  location: "green",
  quoted: "green",
  started: "muted",
};

/** Só o que não é texto: inicial, cor do avatar, tempo de "digitando" e se termina em atendimento humano. */
const CONVO_META = [
  { initial: "J", color: "bg-blue-500", typingMs: 1200, handoff: false },
  { initial: "M", color: "bg-pink-500", typingMs: 1300, handoff: false },
  { initial: "C", color: "bg-amber-500", typingMs: 1300, handoff: false },
  { initial: "B", color: "bg-rose-500", typingMs: 1100, handoff: false },
  { initial: "D", color: "bg-orange-500", typingMs: 1400, handoff: true },
  { initial: "A", color: "bg-teal-500", typingMs: 1100, handoff: false },
] as const;

const BG_STATUS: StatusKey[] = [
  "replied",
  "replied",
  "replied",
  "seen",
  "seen",
  "location",
  "quoted",
  "started",
];

type Msg = { from: "client" | "ai"; text: string };

type ConvoState = {
  lastClient: string;
  lastAi: string;
  status: StatusKey | "typing";
  unread: number;
  showing: "client" | "ai";
};

const pick = <T,>(list: readonly T[]): T => list[Math.floor(Math.random() * list.length)];

/**
 * Simulação do atendente no WhatsApp: lista de conversas viva e o celular com a
 * conversa acontecendo. É a animação do site antigo, agora traduzida, mais enxuta
 * no celular e limitada ao que o produto faz (horário, endereço, preço, encaminhar).
 */
export function WhatsAppLiveDemo({ active, className }: { active: boolean; className?: string }) {
  const t = useT();
  const d = t.demo;

  const convos = d.convos.map((c, i) => ({
    ...CONVO_META[i],
    name: c.name,
    segment: c.segment,
    messages: c.messages.map((text, k): Msg => ({ from: k % 2 === 0 ? "client" : "ai", text })),
  }));

  const [convoIdx, setConvoIdx] = useState(0);
  const [visible, setVisible] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [showHandoff, setShowHandoff] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const convo = convos[convoIdx];

  // Reproduz a conversa ativa; pausa quando a seção sai da tela.
  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const timeouts: Array<ReturnType<typeof setTimeout>> = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => {
        timeouts.push(setTimeout(res, ms));
      });
    setVisible([]);
    setTyping(false);
    setShowHandoff(false);

    const play = async () => {
      for (let i = 0; i < convo.messages.length; i++) {
        const msg = convo.messages[i];
        if (msg.from === "ai") {
          await wait(400);
          if (cancelled) return;
          setTyping(true);
          await wait(convo.typingMs);
          if (cancelled) return;
          setTyping(false);
        } else {
          await wait(i === 0 ? 300 : 900);
          if (cancelled) return;
        }
        setVisible((v) => [...v, msg]);
      }
      if (convo.handoff) {
        await wait(700);
        if (cancelled) return;
        setShowHandoff(true);
      }
      await wait(2600);
      if (!cancelled) setConvoIdx((c) => (c + 1) % convos.length);
    };

    play();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convoIdx, active, d]);

  // Rola só a área das mensagens, nunca a página.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visible, typing, showHandoff]);

  const [order, setOrder] = useState<number[]>(() => convos.map((_, i) => i));
  const [flashIdx, setFlashIdx] = useState<number | null>(null);
  const [state, setState] = useState<Record<number, ConvoState>>(() => {
    const s: Record<number, ConvoState> = {};
    convos.forEach((c, i) => {
      const lastClient = [...c.messages].reverse().find((m) => m.from === "client")?.text ?? "";
      const lastAi = [...c.messages].reverse().find((m) => m.from === "ai")?.text ?? "";
      s[i] = { lastClient, lastAi, status: "replied", unread: 0, showing: "ai" };
    });
    return s;
  });

  useEffect(() => {
    setOrder((prev) => [convoIdx, ...prev.filter((i) => i !== convoIdx)]);
    setState((s) => ({ ...s, [convoIdx]: { ...s[convoIdx], unread: 0, status: "replied" } }));
  }, [convoIdx]);

  // As outras conversas continuam chegando e sendo respondidas.
  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const timeouts: Array<ReturnType<typeof setTimeout>> = [];

    const tick = () => {
      if (cancelled) return;
      const idx = pick(convos.map((_, i) => i).filter((i) => i !== convoIdx));
      const question = pick(d.bgQuestions);
      const reply = pick(d.bgReplies);
      const terminal = pick(BG_STATUS);

      setFlashIdx(idx);
      setState((s) => ({
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
          if (!cancelled) setState((s) => ({ ...s, [idx]: { ...s[idx], status: "typing" } }));
        }, 1150),
        setTimeout(
          () => {
            if (!cancelled)
              setState((s) => ({
                ...s,
                [idx]: { ...s[idx], lastAi: reply, status: terminal, showing: "ai" },
              }));
          },
          2600 + Math.random() * 600,
        ),
        setTimeout(() => {
          if (!cancelled) setFlashIdx((cur) => (cur === idx ? null : cur));
        }, 3900),
        setTimeout(tick, 3100 + Math.random() * 900),
      );
    };

    timeouts.push(setTimeout(tick, 1600));
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convoIdx, active, d]);

  return (
    <div aria-hidden="true" className={cn("relative w-full max-w-sm space-y-3", className)}>
      {/* Lista de conversas */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border/70 px-3 py-2">
          <div className="flex items-center gap-2">
            <WhatsAppIcon className="h-4 w-4 text-brand-green" />
            <span className="text-xs font-semibold">{d.list}</span>
          </div>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" />
            {d.aiOn}
          </span>
        </div>
        <ul className="relative h-[198px] overflow-hidden sm:h-[264px]">
          {order.map((idx, pos) => {
            const c = convos[idx];
            const isActive = idx === convoIdx;
            const st = state[idx];
            const isFlash = flashIdx === idx;
            const StatusIcon = st.status === "typing" ? Bot : STATUS_ICON[st.status];
            const tone =
              st.status !== "typing" && STATUS_TONE[st.status] === "green"
                ? "text-brand-green"
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
                        {pos === 0 ? d.agoNow : fill(d.agoMin, { n: pos * 3 })}
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
                          <span>{d.typing}</span>
                          <span className="inline-flex gap-0.5">
                            {[0, 1, 2].map((k) => (
                              <motion.span
                                key={k}
                                className="h-1 w-1 rounded-full bg-primary/70"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.2, repeat: Infinity, delay: k * 0.18 }}
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
                          “{st.lastClient}”
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
                      className={cn("mt-0.5 flex items-center gap-1 text-[10px] font-medium", tone)}
                    >
                      <StatusIcon className="h-3 w-3" />
                      <span className="truncate">
                        {isActive ? d.inProgress : d.status[st.status]}
                      </span>
                    </p>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* Celular */}
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
                  <p className="text-[11px] text-brand-green">{d.online}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="ml-auto flex items-center gap-1">
              <span className="h-2 w-2 animate-pulse rounded-full bg-brand-green" />
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {d.ai}
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
                      "max-w-[82%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm",
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
                    {[0, 1, 2].map((k) => (
                      <motion.span
                        key={k}
                        className="h-1.5 w-1.5 rounded-full bg-brand-green/70"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: k * 0.15 }}
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
                    {d.handoff}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
