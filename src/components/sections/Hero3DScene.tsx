import { useEffect, useRef } from "react";

// Cena 3D real (WebGL via Three.js) atrás do mockup do dashboard — camada
// puramente decorativa. Se WebGL falhar, o canvas fica vazio e o hero
// continua 100% funcional (o conteúdo real está no MockDashboard).
const BRAND_DEEP = 0x053069;
const BRAND_BLUE = 0x2f6bff;
const BRAND_GREEN = 0x3fb171;

export function Hero3DScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (cancelled) return;
      cleanup = initScene(THREE, canvas);
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute -inset-x-[16%] -inset-y-[18%] z-0 opacity-60"
    />
  );
}

function initScene(THREE: typeof import("three"), canvas: HTMLCanvasElement) {
  const stage = canvas.parentElement!;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  function resize() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const point = new THREE.PointLight(BRAND_BLUE, 6, 20);
  point.position.set(4, 3, 6);
  scene.add(point);

  // icosaedro wireframe grande, girando devagar — a "peça" central da cena
  const icoGeo = new THREE.IcosahedronGeometry(2.8, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: BRAND_DEEP,
    wireframe: true,
    transparent: true,
    opacity: 0.38,
  });
  const ico = new THREE.Mesh(icoGeo, icoMat);
  scene.add(ico);

  // dois sólidos orbitando, nas cores da marca (azul elétrico + verde Caetus)
  const orbiter = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.55, 0),
    new THREE.MeshStandardMaterial({
      color: BRAND_BLUE,
      emissive: BRAND_BLUE,
      emissiveIntensity: 0.8,
      roughness: 0.25,
      metalness: 0.3,
    })
  );
  scene.add(orbiter);

  const orbiter2 = new THREE.Mesh(
    new THREE.TetrahedronGeometry(0.34, 0),
    new THREE.MeshStandardMaterial({
      color: BRAND_GREEN,
      emissive: BRAND_GREEN,
      emissiveIntensity: 0.75,
      roughness: 0.3,
    })
  );
  scene.add(orbiter2);

  // partículas de fundo
  const starCount = 120;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 16;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
    starPos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  const stars = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({ color: BRAND_BLUE, size: 0.05, transparent: true, opacity: 0.45 })
  );
  scene.add(stars);

  resize();
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();
  let frameId = 0;
  function animate() {
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    ico.rotation.x = t * 0.1;
    ico.rotation.y = t * 0.15;

    const r1 = 3.2;
    orbiter.position.set(Math.cos(t * 0.5) * r1, Math.sin(t * 0.35) * 1.4, Math.sin(t * 0.5) * r1);
    orbiter.rotation.x += 0.01;
    orbiter.rotation.y += 0.015;

    const r2 = 2.2;
    orbiter2.position.set(Math.cos(t * -0.7 + 2) * r2, Math.cos(t * 0.6) * 1.8, Math.sin(t * -0.7 + 2) * r2);

    stars.rotation.y = t * 0.02;

    renderer.render(scene, camera);
  }
  animate();

  return () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener("resize", resize);
    renderer.dispose();
    icoGeo.dispose();
    icoMat.dispose();
  };
}
