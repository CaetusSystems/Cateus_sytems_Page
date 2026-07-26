import { useEffect, useRef } from "react";

// Campo de partículas em formato do mapa do Brasil, reativo ao mouse —
// portado do draft do Superdesign (projeto "Force Field Background",
// draft "Brasil Particle Force Field - Alta Densidade"). Canvas2D puro
// (sem p5.js) pra não trazer uma dependência nova só pra isso.
//
// Perf: redesenhar milhares de partículas (fillStyle+arc+fill) a cada
// frame, pra sempre, trava a página inteira em telas maiores. Em vez
// disso: o campo "em repouso" é renderizado UMA VEZ num canvas offscreen
// (base); a cada frame só limpamos+copiamos essa base (2 chamadas baratas)
// e redesenhamos individualmente apenas as partículas ativas (perto do
// cursor ou ainda voltando pro lugar) — normalmente um subconjunto bem
// pequeno do total. A animação também pausa quando a seção sai da viewport.
const BRAND_HUE = 221; // tom do azul de marca (--brand, #2f6bff)
const TARGET_PARTICLE_COUNT = 4600;

type Particle = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  brightness: number;
  fade: number;
};

export function HeroParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return initField(canvas);
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

function initField(canvas: HTMLCanvasElement) {
  const ctx2d = canvas.getContext("2d");
  if (!ctx2d) return () => {};
  const ctx = ctx2d;

  const base = document.createElement("canvas");
  const baseCtx2d = base.getContext("2d");
  if (!baseCtx2d) return () => {};
  const baseCtx = baseCtx2d;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const config = { radius: 130, force: 60, friction: 0.9, restore: 0.06 };

  let particles: Particle[] = [];
  const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  let width = 0;
  let height = 0;
  let frameId = 0;
  let visible = true;

  const img = new Image();
  img.src = "/brasil-particle-map.jpg";

  function particleStyle(p: Particle, dist: number, near: boolean) {
    // saturação/luminosidade mais fortes que o draft original — o azul
    // precisa "ler" como mapa do Brasil de longe, não como neblina clara.
    const l = 36 + ((p.brightness - 120) * 18) / 135;
    const s = near ? 82 + (1 - dist / config.radius) * 18 : 88;
    const r = near ? 2 - (dist / config.radius) * 0.9 : 1.15;
    return { fillStyle: `hsl(${BRAND_HUE} ${s}% ${l}% / ${p.fade})`, r };
  }

  // Altura de REFERÊNCIA fixa (não a altura real do viewport) usada só pra
  // calcular a escala do mapa. A altura real da tela varia mais do que se
  // imagina entre aparelhos — um celular em pé costuma ter viewport MAIS
  // alto que a janela de um notebook (ex.: 844px vs 625px), então escalar
  // pela altura real fazia o mapa ficar MAIOR e mais cortado no celular,
  // o oposto do que queríamos. Com uma referência fixa, o mapa tem sempre
  // o mesmo tamanho físico em pixels em qualquer aparelho; só a área
  // visível (recorte) muda conforme a tela é mais ou menos larga/alta.
  const REFERENCE_HEIGHT = 640;
  // Fator 1.15 (não mais 1.3): 1.3 deixava o mapa mais alto (832px) do que a
  // altura útil de janelas de desktop comuns (~650-760px, ex.: notebook
  // 1366x768 com a barra do navegador), forçando um corte vertical grande —
  // e por mais que a gente distribua esse corte, sempre sobra ou o topo
  // (Norte/Nordeste) ou o final (ponta do Sul) cortado de um jeito abrupto,
  // rente à borda da tela. Em 1.15 o mapa (≈736px) cabe inteiro nessas
  // janelas comuns sem cortar nada, e ainda cabe folgado no celular.
  const SCALE_MULTIPLIER = 1.15;

  function buildParticles() {
    const off = document.createElement("canvas");
    const heightRatio = (REFERENCE_HEIGHT / img.height) * SCALE_MULTIPLIER;
    // Em telas estreitas (celular), a escala calculada pela altura de
    // referência deixa o mapa muito mais largo que o container. Ajustar pra
    // caber 100% da largura (sem nenhum corte) deixava o mapa baixo demais —
    // "minúsculo" dentro da seção. E manter a escala do desktop sem limite
    // recriava o bug original: só uma fatia central estreita do território
    // fica visível, sem formato reconhecível de Brasil. O meio-termo: nunca
    // deixamos menos que ~62% da largura do mapa dentro do container — dá pra
    // manter o mapa grande (fisicamente quase do tamanho do desktop) mostrando
    // a maior parte do contorno, e o que sobra nas bordas dissolve em fade
    // (ver FADE_ZONE abaixo) em vez de terminar numa linha reta. Em desktop a
    // largura do container é sempre maior que o mapa calculado por altura,
    // então esse teto nunca é o menor dos dois e o comportamento atual não
    // muda.
    const MIN_VISIBLE_WIDTH_FRACTION = 0.62;
    const widthRatio = width / (img.width * MIN_VISIBLE_WIDTH_FRACTION);
    const ratio = Math.min(heightRatio, widthRatio);
    const iw = Math.max(1, Math.round(img.width * ratio));
    const ih = Math.max(1, Math.round(img.height * ratio));
    off.width = iw;
    off.height = ih;
    const octx = off.getContext("2d");
    if (!octx) return;
    octx.drawImage(img, 0, 0, iw, ih);
    const data = octx.getImageData(0, 0, iw, ih).data;

    // spacing calibrado pela área do mapa renderizado (não do container) —
    // como o mapa agora tem tamanho físico fixo, isso mantém a densidade de
    // pontos igual em qualquer viewport.
    const area = iw * ih;
    const spacing = Math.max(5, Math.round(Math.sqrt((area * 0.4) / TARGET_PARTICLE_COUNT)));

    const startX = (width - iw) / 2;
    // Quando o mapa é mais alto que o container, cortar simetricamente (metade
    // em cima, metade embaixo) corta justo o topo do Brasil (Norte/Nordeste),
    // que é a parte que mais ajuda a reconhecer a forma. Em vez disso, tiramos
    // a maior parte do corte vertical do fundo (Sul). O alívio é PROPORCIONAL
    // ao corte real (nunca mais que metade dele) em vez de um valor fixo — um
    // valor fixo "estourava" em telas com pouco corte (ex.: celular real com a
    // barra de endereço do navegador visível, reduzindo um pouco a altura da
    // viewport), empurrando o mapa pra baixo demais e abrindo um vão em branco
    // no topo. Proporcional, isso nunca ultrapassa o corte simétrico original.
    const TOP_CROP_RELIEF = 0.85;
    const overflowY = Math.max(0, ih - height);
    const startY = (height - ih) / 2 + (overflowY / 2) * TOP_CROP_RELIEF;

    // Em janelas mais baixas (ou, no celular, mais estreitas) que o mapa,
    // uma parte das bordas sempre vai ficar fora do container (ver
    // comentários de startY/widthRatio acima). Em vez de um corte seco bem
    // na borda, as partículas ali percebem um "fade" suave nos últimos
    // FADE_ZONE px de cada lado — fica parecendo que o campo de partículas se
    // dissipa naturalmente, não que a imagem foi truncada. Aplicado nos dois
    // eixos: vertical (janelas baixas) e horizontal (telas estreitas).
    const FADE_ZONE = 64;

    const next: Particle[] = [];
    for (let y = 0; y < ih; y += spacing) {
      for (let x = 0; x < iw; x += spacing) {
        const idx = (x + y * iw) * 4;
        const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
        if (brightness > 120) {
          const px = startX + x;
          const py = startY + y;
          const fadeY = Math.max(0, Math.min(1, Math.min(py, height - py) / FADE_ZONE));
          const fadeX = Math.max(0, Math.min(1, Math.min(px, width - px) / FADE_ZONE));
          const fade = Math.min(fadeX, fadeY);
          next.push({ ox: px, oy: py, x: px, y: py, vx: 0, vy: 0, brightness, fade });
        }
      }
    }
    particles = next;
    renderBase();
  }

  function renderBase() {
    base.width = canvas.width;
    base.height = canvas.height;
    baseCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    baseCtx.clearRect(0, 0, width, height);
    for (const p of particles) {
      const { fillStyle, r } = particleStyle(p, config.radius, false);
      baseCtx.fillStyle = fillStyle;
      baseCtx.beginPath();
      baseCtx.arc(p.ox, p.oy, r, 0, Math.PI * 2);
      baseCtx.fill();
    }
  }

  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    if (!width || !height) return;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (img.complete) buildParticles();
  }

  img.onload = () => {
    resize();
    if (reduceMotion) draw();
    else animate();
  };

  function onPointerMove(e: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    mouse.tx = e.clientX - rect.left;
    mouse.ty = e.clientY - rect.top;
  }
  function onPointerLeave() {
    mouse.tx = -9999;
    mouse.ty = -9999;
  }

  window.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerleave", onPointerLeave);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible && !reduceMotion) animate();
    },
    { threshold: 0.01 },
  );
  intersectionObserver.observe(canvas);

  resize();

  const DOT_MAX_R = 2; // maior raio possível desenhado por uma partícula ativa
  const SETTLE_EPS = 0.05;

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(base, 0, 0, width, height);
    for (const p of particles) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const distSq = dx * dx + dy * dy;
      const near = distSq < config.radius * config.radius;
      const displaced = Math.abs(p.x - p.ox) > SETTLE_EPS || Math.abs(p.y - p.oy) > SETTLE_EPS;
      if (!near && !displaced) continue;

      const dist = Math.sqrt(distSq);
      // apaga o ponto "em repouso" correspondente que veio da base, só na
      // área que essa partícula ocupa, antes de redesenhar na posição real.
      ctx.clearRect(p.ox - DOT_MAX_R - 1, p.oy - DOT_MAX_R - 1, DOT_MAX_R * 2 + 2, DOT_MAX_R * 2 + 2);
      const { fillStyle, r } = particleStyle(p, dist, near);
      ctx.fillStyle = fillStyle;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function animate() {
    if (!visible) return;
    frameId = requestAnimationFrame(animate);
    mouse.x += (mouse.tx - mouse.x) * 0.15;
    mouse.y += (mouse.ty - mouse.y) * 0.15;

    for (const p of particles) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < config.radius && dist > 0.01) {
        const push = (config.force * (1 - dist / config.radius)) / dist;
        p.vx += dx * push * 0.02;
        p.vy += dy * push * 0.02;
      }
      p.vx += (p.ox - p.x) * config.restore;
      p.vy += (p.oy - p.y) * config.restore;
      p.vx *= config.friction;
      p.vy *= config.friction;
      p.x += p.vx;
      p.y += p.vy;
    }
    draw();
  }

  return () => {
    cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("pointerleave", onPointerLeave);
  };
}
