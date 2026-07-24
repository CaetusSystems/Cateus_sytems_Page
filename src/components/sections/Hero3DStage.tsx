import { useRef, type PointerEvent, type ReactNode } from "react";
import { Hero3DScene } from "./Hero3DScene";

// Envolve o MockDashboard numa "tela" com perspectiva 3D + tilt que segue o
// mouse, com a cena WebGL do Hero3DScene rodando atrás como fundo decorativo.
export function Hero3DStage({ children }: { children: ReactNode }) {
  const tiltRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return;
    const el = tiltRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateX(${6 - y * 8}deg) rotateY(${-10 + x * 12}deg)`;
  }

  function handlePointerLeave() {
    if (tiltRef.current) tiltRef.current.style.transform = "";
  }

  return (
    <div
      className="hero3d-stage relative"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Hero3DScene />
      <div className="hero3d-float">
        <div ref={tiltRef} className="hero3d-tilt">
          {children}
        </div>
      </div>
    </div>
  );
}
