import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

// Cena 3D real (WebGL + CSS3D) onde o MockDashboard real (recebido via
// children) vive DENTRO da cena, numa "tela" flutuante que a WebGLRenderer
// encapsula com um cage de wireframe + sólidos orbitando + partículas. As
// duas renderers dividem a mesma THREE.Scene/Camera: o CSS3DObject carrega o
// DOM real do dashboard (via portal) e é tratado como qualquer outro objeto
// 3D — gira junto com o cage no tilt do mouse, então o dashboard aparece
// fisicamente preso à tela 3D, não apenas flutuando na frente dela.
// three e o addon CSS3DRenderer são importados dinamicamente (mesma técnica
// do hero3d.js do site pessoal) pra não engordar o bundle inicial.
const BRAND_DEEP = 0x053069;
const BRAND_BLUE = 0x2f6bff;
const BRAND_GREEN = 0x3fb171;
const PADDING_RATIO = 0.26; // espaço extra ao redor da tela pro cage/orbitantes respirarem

export function Hero3DStage({ children }: { children: ReactNode }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<HTMLCanvasElement>(null);
  const [portalEl, setPortalEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const mountEl = mountRef.current;
    const glCanvas = glRef.current;
    if (!mountEl || !glCanvas) return;
    const mount: HTMLDivElement = mountEl;

    const screenEl = document.createElement("div");
    screenEl.style.pointerEvents = "none";
    setPortalEl(screenEl);

    let cancelled = false;
    let cleanup = () => {};

    Promise.all([import("three"), import("three/addons/renderers/CSS3DRenderer.js")]).then(
      ([THREE, CSS3D]) => {
        if (cancelled) return;
        cleanup = initScene(THREE, CSS3D, mount, glCanvas, screenEl);
      },
    );

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={mountRef} className="hero3d-stage relative w-full">
      <canvas ref={glRef} className="absolute inset-0 z-0" aria-hidden="true" />
      {portalEl && createPortal(children, portalEl)}
    </div>
  );
}

function initScene(
  THREE: typeof import("three"),
  CSS3D: typeof import("three/examples/jsm/renderers/CSS3DRenderer.js"),
  mount: HTMLDivElement,
  glCanvas: HTMLCanvasElement,
  screenEl: HTMLDivElement,
) {
  const { CSS3DObject, CSS3DRenderer } = CSS3D;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 1, 10000);

  const glRenderer = new THREE.WebGLRenderer({ canvas: glCanvas, alpha: true, antialias: true });
  glRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const cssRenderer = new CSS3DRenderer();
  cssRenderer.domElement.style.position = "absolute";
  cssRenderer.domElement.style.inset = "0";
  cssRenderer.domElement.style.pointerEvents = "none";
  mount.appendChild(cssRenderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const point = new THREE.PointLight(BRAND_BLUE, 6, 4000);
  scene.add(point);

  // cage de wireframe que envolve a tela — a "carcaça" 3D da cena
  const cage = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      color: BRAND_DEEP,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    }),
  );
  scene.add(cage);

  // brilho suave logo atrás da tela, reforçando que ela "emite luz"
  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      color: BRAND_BLUE,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    }),
  );

  // grupo que representa a tela: gira junto (WebGL + CSS3D) no tilt do mouse
  const screenAnchor = new THREE.Group();
  screenAnchor.add(glow);
  const screenObject = new CSS3DObject(screenEl);
  screenAnchor.add(screenObject);
  scene.add(screenAnchor);

  const orbiter = new THREE.Mesh(
    new THREE.OctahedronGeometry(1, 0),
    new THREE.MeshStandardMaterial({
      color: BRAND_BLUE,
      emissive: BRAND_BLUE,
      emissiveIntensity: 0.8,
      roughness: 0.25,
      metalness: 0.3,
    }),
  );
  scene.add(orbiter);

  const orbiter2 = new THREE.Mesh(
    new THREE.TetrahedronGeometry(1, 0),
    new THREE.MeshStandardMaterial({
      color: BRAND_GREEN,
      emissive: BRAND_GREEN,
      emissiveIntensity: 0.75,
      roughness: 0.3,
    }),
  );
  scene.add(orbiter2);

  const starGeo = new THREE.BufferGeometry();
  const starCount = 140;
  starGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(starCount * 3), 3));
  const stars = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({
      color: BRAND_BLUE,
      size: 3,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: false,
    }),
  );
  scene.add(stars);

  // A largura da tela é imposta a partir do mount (largura conhecida via CSS);
  // a altura é o resultado natural do conteúdo do dashboard nessa largura,
  // por isso é medida com ResizeObserver em vez de calculada.
  let screenW = 0;
  let screenH = 0;

  function applyScreenWidth() {
    const w = mount.clientWidth;
    if (!w) return;
    screenEl.style.width = `${Math.round(w / (1 + PADDING_RATIO * 2))}px`;
  }

  function layout() {
    const w = mount.clientWidth;
    if (!w || !screenW || !screenH) return;

    const stageH = screenH * (1 + PADDING_RATIO * 2);
    const viewH = Math.round(stageH * (w / (screenW * (1 + PADDING_RATIO * 2))));
    mount.style.height = `${viewH}px`;

    const fovRad = (camera.fov * Math.PI) / 180;
    const dist = viewH / 2 / Math.tan(fovRad / 2);
    camera.position.set(0, 0, dist);
    camera.aspect = w / viewH;
    camera.updateProjectionMatrix();

    point.position.set(w * 0.3, viewH * 0.3, dist * 0.7);

    const cageRadius = Math.max(screenW, screenH) * 0.62;
    cage.geometry.dispose();
    cage.geometry = new THREE.IcosahedronGeometry(cageRadius, 1);

    glow.geometry.dispose();
    glow.geometry = new THREE.PlaneGeometry(screenW * 1.08, screenH * 1.12);
    glow.position.z = -Math.min(screenW, screenH) * 0.03;

    orbiter.scale.setScalar(screenH * 0.07);
    orbiter2.scale.setScalar(screenH * 0.05);

    const starPos = starGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * w * 1.6;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * viewH * 1.6;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * dist * 0.7 - dist * 0.25;
    }
    starGeo.attributes.position.needsUpdate = true;

    glRenderer.setSize(w, viewH, false);
    cssRenderer.setSize(w, viewH);
  }

  const resizeObserver = new ResizeObserver((entries) => {
    const entry = entries[0];
    if (!entry) return;
    screenW = entry.contentRect.width;
    screenH = entry.contentRect.height;
    layout();
  });
  resizeObserver.observe(screenEl);

  function handleWindowResize() {
    applyScreenWidth();
  }
  window.addEventListener("resize", handleWindowResize);
  applyScreenWidth();

  let targetRotX = 0;
  let targetRotY = 0;
  function handlePointerMove(e: PointerEvent) {
    if (e.pointerType === "touch") return;
    const rect = mount.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetRotX = -y * 0.16;
    targetRotY = x * 0.24;
  }
  function handlePointerLeave() {
    targetRotX = 0;
    targetRotY = 0;
  }
  mount.addEventListener("pointermove", handlePointerMove);
  mount.addEventListener("pointerleave", handlePointerLeave);

  let frameId = 0;
  const clock = new THREE.Clock();

  function render() {
    glRenderer.render(scene, camera);
    cssRenderer.render(scene, camera);
  }

  function animate() {
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    cage.rotation.x = t * 0.08;
    cage.rotation.y = t * 0.12;

    screenAnchor.rotation.x += (targetRotX - screenAnchor.rotation.x) * 0.06;
    screenAnchor.rotation.y += (targetRotY - screenAnchor.rotation.y) * 0.06;

    const rBase = Math.max(screenW, screenH) || 300;
    const r1 = rBase * 0.72;
    orbiter.position.set(
      Math.cos(t * 0.5) * r1,
      Math.sin(t * 0.35) * rBase * 0.3,
      Math.sin(t * 0.5) * r1 * 0.35 + rBase * 0.08,
    );
    orbiter.rotation.x += 0.01;
    orbiter.rotation.y += 0.015;

    const r2 = rBase * 0.58;
    orbiter2.position.set(
      Math.cos(t * -0.7 + 2) * r2,
      Math.cos(t * 0.6) * rBase * 0.34,
      Math.sin(t * -0.7 + 2) * r2 * 0.35 + rBase * 0.05,
    );

    stars.rotation.y = t * 0.02;

    render();
  }

  if (reduceMotion) {
    // ainda posiciona a cena numa pose estática, só não anima
    layout();
    render();
  } else {
    animate();
  }

  return () => {
    cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    window.removeEventListener("resize", handleWindowResize);
    mount.removeEventListener("pointermove", handlePointerMove);
    mount.removeEventListener("pointerleave", handlePointerLeave);
    if (cssRenderer.domElement.parentElement === mount) {
      mount.removeChild(cssRenderer.domElement);
    }
    glRenderer.dispose();
  };
}
