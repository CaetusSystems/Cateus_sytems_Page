import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const STORAGE_KEY = "caetus_intro_seen_v1";

const NOUNS = [
  "mais tempo.",
  "mais clientes.",
  "mais presença.",
  "mais resultados.",
];

const VERBS = [
  "Automatizando.",
  "Organizando.",
  "Crescendo.",
];

type Phase = "logo" | "nouns" | "verbs" | "final" | "done";

interface IntroSplashProps {
  onFinish: () => void;
}

export function IntroSplash({ onFinish }: IntroSplashProps) {
  const [phase, setPhase] = useState<Phase>("logo");
  const [wordIdx, setWordIdx] = useState(0);

  // Block scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Phase orchestration
  useEffect(() => {
    const timers: number[] = [];
    const NOUN_STEP = 1300;
    const VERB_STEP = 1100;
    timers.push(window.setTimeout(() => setPhase("nouns"), 1400));
    timers.push(window.setTimeout(() => setPhase("verbs"), 1400 + NOUNS.length * NOUN_STEP));
    timers.push(
      window.setTimeout(
        () => setPhase("final"),
        1400 + NOUNS.length * NOUN_STEP + VERBS.length * VERB_STEP,
      ),
    );
    timers.push(
      window.setTimeout(
        () => setPhase("done"),
        1400 + NOUNS.length * NOUN_STEP + VERBS.length * VERB_STEP + 3200,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Rotate words within active phase
  useEffect(() => {
    if (phase !== "nouns" && phase !== "verbs") return;
    setWordIdx(0);
    const list = phase === "nouns" ? NOUNS : VERBS;
    const step = phase === "nouns" ? 1300 : 1100;
    const interval = window.setInterval(() => {
      setWordIdx((i) => (i + 1) % list.length);
    }, step);
    return () => clearInterval(interval);
  }, [phase]);

  // Finish
  useEffect(() => {
    if (phase !== "done") return;
    const t = window.setTimeout(onFinish, 600);
    return () => clearTimeout(t);
  }, [phase, onFinish]);

  const skip = () => setPhase("done");

  const currentWord =
    phase === "nouns"
      ? NOUNS[wordIdx]
      : phase === "verbs"
        ? VERBS[wordIdx]
        : null;

  const showBackdrop = phase === "nouns" || phase === "verbs";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "done" ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: phase === "done" ? "none" : "auto" }}
    >
      {/* Ambient background elements */}
      <AnimatePresence>
        {showBackdrop && <AmbientScene active={phase === "verbs"} />}
      </AnimatePresence>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="relative z-10 flex items-center gap-2"
      >
        <img src="/caetus-logo.png" alt="Caetus Systems" className="h-9 w-9 rounded-lg object-contain" />
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Caetus Systems
        </span>
      </motion.div>

      {/* Word slot */}
      <div className="relative z-10 mt-10 flex h-16 items-center justify-center px-6 sm:h-20">
        <AnimatePresence mode="wait">
          {phase === "logo" && (
            <motion.p
              key="prelude"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-center text-lg text-muted-foreground sm:text-xl"
            >
              Sua empresa merece…
            </motion.p>
          )}
          {currentWord && (
            <motion.h2
              key={phase + wordIdx}
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-5xl"
            >
              {currentWord}
            </motion.h2>
          )}
          {phase === "final" && (
            <motion.h2
              key="final"
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl text-center text-2xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Tecnologia que trabalha pela sua empresa.
            </motion.h2>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button */}
      <motion.button
        type="button"
        onClick={skip}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "done" ? 0 : 0.7 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-6 right-6 z-20 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        Pular animação →
      </motion.button>
    </motion.div>
  );
}

function AmbientScene({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
      className="pointer-events-none absolute inset-0"
      aria-hidden
    >
      {/* Soft grid lines */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--primary) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--primary) 8%, transparent) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Floating minimal cards */}
      <FloatingCard
        className="left-[8%] top-[18%] hidden sm:block"
        delay={0.2}
        width={180}
      >
        <div className="h-1.5 w-10 rounded-full bg-primary/60" />
        <div className="mt-2 h-1 w-24 rounded-full bg-muted" />
        <div className="mt-1.5 h-1 w-16 rounded-full bg-muted" />
      </FloatingCard>

      <FloatingCard
        className="right-[10%] top-[22%] hidden sm:block"
        delay={0.5}
        width={160}
      >
        <div className="flex items-center justify-between">
          <div className="h-2 w-8 rounded-full bg-muted" />
          <div className="h-2 w-2 rounded-full bg-[var(--brand-green,theme(colors.emerald.500))]" />
        </div>
        <div className="mt-3 flex items-end gap-1">
          {[10, 18, 12, 22, 16, 26].map((h, i) => (
            <motion.div
              key={i}
              className="w-2 rounded-sm bg-primary/40"
              initial={{ height: 4 }}
              animate={{ height: h }}
              transition={{
                delay: 0.8 + i * 0.08,
                duration: 0.5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </FloatingCard>

      <FloatingCard
        className="bottom-[20%] left-[12%] hidden md:block"
        delay={0.8}
        width={200}
      >
        <div className="h-1.5 w-14 rounded-full bg-primary/60" />
        <div className="mt-3 space-y-1.5">
          <div className="h-1 w-full rounded-full bg-muted" />
          <div className="h-1 w-3/4 rounded-full bg-muted" />
          <div className="h-1 w-5/6 rounded-full bg-muted" />
        </div>
      </FloatingCard>

      <FloatingCard
        className="bottom-[24%] right-[12%] hidden md:block"
        delay={1.1}
        width={150}
      >
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-primary/15" />
          <div className="space-y-1">
            <div className="h-1 w-16 rounded-full bg-muted" />
            <div className="h-1 w-10 rounded-full bg-muted" />
          </div>
        </div>
      </FloatingCard>

      {/* Connection lines that draw when active */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <motion.path
          d="M 15 22 Q 40 40 60 30"
          stroke="color-mix(in oklab, var(--primary) 35%, transparent)"
          strokeWidth="0.15"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: active ? 1 : 0.4, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        <motion.path
          d="M 20 78 Q 45 60 82 74"
          stroke="color-mix(in oklab, var(--primary) 35%, transparent)"
          strokeWidth="0.15"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: active ? 1 : 0.4, opacity: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
        />
      </svg>
    </motion.div>
  );
}

function FloatingCard({
  children,
  className = "",
  delay = 0,
  width = 160,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  width?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ width }}
      className={`absolute rounded-xl border border-border/70 bg-card/80 p-3 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)] backdrop-blur-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function useIntroSplash() {
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      setShow(!seen);
    } catch {
      setShow(false);
    }
    setReady(true);
  }, []);

  const finish = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* noop */
    }
    setShow(false);
  };

  return { show, ready, finish };
}
