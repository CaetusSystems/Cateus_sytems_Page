import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Tilt 3D do MockDashboard: o card inclina em perspectiva conforme a posição
// do mouse dentro da seção, com uma mola (useSpring) suavizando o retorno ao
// centro quando o ponteiro sai. Sem WebGL — só CSS 3D transforms via
// framer-motion, então respeita prefers-reduced-motion nativamente ao não
// reagir ao pointermove nesse caso.
const MAX_TILT_DEG = 8;
const SPRING = { stiffness: 150, damping: 20, mass: 0.5 };

export function Hero3DStage({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT_DEG, -MAX_TILT_DEG]), SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT_DEG, MAX_TILT_DEG]), SPRING);

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="hero3d-stage relative isolate w-full"
      style={{ perspective: 1200 }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>{children}</motion.div>
    </div>
  );
}
