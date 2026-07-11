import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { IntroSplash, useIntroSplash } from "@/components/IntroSplash";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { HelpSection } from "@/components/sections/HelpSection";
import { Products } from "@/components/sections/Products";
import { StartPaths } from "@/components/sections/StartPaths";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Demo } from "@/components/sections/Demo";
import { Benefits } from "@/components/sections/Benefits";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { ForWho } from "@/components/sections/ForWho";
import { Testimonials } from "@/components/sections/Testimonials";
import { AboutCompact } from "@/components/sections/AboutCompact";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

/**
 * Landing page da Caetus Systems.
 * Cada seção responde uma pergunta do empresário, nesta ordem:
 * o que é → é pra mim? → o que vocês vendem? → por onde começo? →
 * como funciona? → cadê funcionando? → o que eu ganho? → o que muda? →
 * serve pro meu negócio? → quem confia? → quem são vocês? → objeções → contato.
 */
function Index() {
  const { show, ready, finish } = useIntroSplash();
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Reveal único (fade-up) ao entrar na viewport. Seções com animação
  // própria ficam de fora para não competir.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const skipIds = new Set(["top", "demonstracao", "antes-depois", "contato"]);

    const sections = Array.from(root.querySelectorAll<HTMLElement>("section")).filter(
      (el) => !skipIds.has(el.id),
    );
    sections.forEach((el) => {
      el.classList.add("section-reveal", "section-reveal--fade-up");
      if (prefersReduced) el.classList.add("is-visible");
    });

    const grids = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-stagger] > *"));
    grids.forEach((child, i) => {
      child.classList.add("stagger-item");
      child.style.setProperty("--stagger-i", String(i % 12));
      if (prefersReduced) child.classList.add("is-visible");
    });

    if (prefersReduced || !("IntersectionObserver" in window)) {
      sections.forEach((el) => el.classList.add("is-visible"));
      grids.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    sections.forEach((el) => io.observe(el));
    grids.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-background text-foreground antialiased">
      <AnimatePresence>
        {ready && show && <IntroSplash key="intro" onFinish={finish} />}
      </AnimatePresence>
      <Nav />
      <main>
        <Hero />
        <HelpSection />
        <Products />
        <StartPaths />
        <HowItWorks />
        <Demo />
        <Benefits />
        <BeforeAfter />
        <ForWho />
        <Testimonials />
        <AboutCompact />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default Index;
