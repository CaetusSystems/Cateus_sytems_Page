import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Clock,
  RotateCcw,
  BookOpen,
  ArrowLeft,
  Moon,
  Sun,
  LayoutDashboard,
} from "lucide-react";

// Import Slide modular components
import { Slide1, Slide2, Slide3 } from "@/components/presentation/Slides1To3";
import { Slide4, Slide5, Slide6, Slide7 } from "@/components/presentation/Slides4To7";
import { Slide8, Slide9, Slide10, Slide11, Slide12 } from "@/components/presentation/Slides8To12";

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(false);

  // Presenter Mode Timer State
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Touch swipe detection
  const touchStartX = useRef<number | null>(null);

  const slideList = [
    { id: 0, title: "Caetus Systems", subtitle: "Sua Operação Digital", component: <Slide1 /> },
    { id: 1, title: "O Problema", subtitle: "As Dores das Empresas", component: <Slide2 /> },
    { id: 2, title: "O Custo Invisível", subtitle: "Calculadora de Perdas", component: <Slide3 /> },
    { id: 3, title: "Operação Digital", subtitle: "Ecosistema Conectado", component: <Slide4 /> },
    { id: 4, title: "O Que Fazemos", subtitle: "Nossos 35+ Serviços", component: <Slide5 /> },
    { id: 5, title: "Como Funciona", subtitle: "Linha do Tempo", component: <Slide6 /> },
    { id: 6, title: "A Implantação", subtitle: "Os Primeiros 30 Dias", component: <Slide7 /> },
    { id: 7, title: "Operação Mensal", subtitle: "Manutenção e Evolução", component: <Slide8 /> },
    { id: 8, title: "O Diferencial", subtitle: "Caetus vs Agência Comum", component: <Slide9 /> },
    { id: 9, title: "Exemplos Reais", subtitle: "Automação na Prática", component: <Slide10 /> },
    {
      id: 10,
      title: "Quem Somos",
      subtitle: "Nossa Estrutura e Experiência",
      component: <Slide11 />,
    },
    {
      id: 11,
      title: "Próximos Passos",
      subtitle: "Agende seu Diagnóstico",
      component: <Slide12 />,
    },
  ];

  const speakerNotes: Record<number, string> = {
    0: "Apresente a Caetus Systems. Destaque que a pequena empresa não precisa se preocupar com tecnologia: nós cuidamos de toda a estrutura digital continuamente para que eles foquem em operar. Toque nos nós para simular.",
    1: "Discuta as dores. Faça perguntas retóricas para o cliente se identificar ('O seu WhatsApp fica congestionado?'). Clique nos cartões para mostrar o contraste entre o caos atual e o alívio que trazemos.",
    2: "Use a calculadora interativa com o cliente. Peça os dados reais deles (contatos perdidos e ticket médio) e deixe que eles vejam o faturamento anual que está escorrendo pelo ralo.",
    3: "Mostre a integração. Explique que o site, WhatsApp, Google e redes não devem trabalhar isolados: eles funcionam como um ecossistema integrado que gera clientes de forma automática.",
    4: "Selecione as abas para mostrar a amplitude das nossas entregas. Explique que eles têm uma equipe completa (designer, desenvolvedor, copywriter, especialista em Google) inclusa.",
    5: "Explique a linha do tempo. Diga que dividimos o trabalho em três fases claras: o setup inicial no 1º mês, a operação contínua e a evolução recorrente.",
    6: "Mostre o checklist de setup. Demonstre organização e profissionalismo: eles sabem exatamente o que faremos nos primeiros 30 dias.",
    7: "Reforce o valor da mensalidade: posts novos, IA sempre atualizada, velocidade garantida, relatórios transparentes. Sem taxas surpresas.",
    8: "Contraste o modelo tradicional de agência ('te entregam um arquivo e somem, te deixam sozinho') com a nossa parceria diária contínua.",
    9: "Selecione o segmento do cliente (Oficina, Clínica, Restaurante ou Loja) e narre o fluxo de automação para que ele se visualize usando a solução.",
    10: "Apresente Henrique Caetano. Fale da solidez de mais de 5 anos de experiência e do atendimento presencial e próximo na região de Lagoa Santa / BH.",
    11: "Call to action decisivo. Convide-os a dar o primeiro passo hoje mesmo agendando o diagnóstico gratuito de 20 minutos com Henrique Caetano.",
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        setCurrentSlide((prev) => (prev < slideList.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slideList.length]);

  // Stopwatch effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  const nextSlide = () => {
    if (currentSlide < slideList.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const minSwipeDistance = 50;

    if (diffX > minSwipeDistance) {
      nextSlide(); // Swipe left -> advance
    } else if (diffX < -minSwipeDistance) {
      prevSlide(); // Swipe right -> return
    }
    touchStartX.current = null;
  };

  // Fullscreen helper
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`relative isolate min-h-[100dvh] w-screen overflow-hidden font-sans transition-colors duration-500 ${
        isDarkMode ? "dark bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background abstract glowing visual details */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/8 blur-[120px] dark:bg-primary/5" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-brand-green/8 blur-[120px] dark:bg-brand-green/5" />
      </div>

      {/* Top Navbar Header */}
      <header className="relative z-20 flex h-16 w-full items-center justify-between border-b border-border/40 px-6 backdrop-blur-md bg-background/45">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-background/50 hover:bg-background/80 hover:text-primary"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
          </Link>
          <div className="flex flex-col text-left">
            <span className="text-xs font-extrabold tracking-wide text-brand-green uppercase">
              Caetus Systems
            </span>
            <span className="text-[10px] text-muted-foreground">Apresentação de Negócios</span>
          </div>
        </div>

        {/* Dynamic Navigation Progress Bar for the whole deck */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 items-center gap-2">
          <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-green transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / slideList.length) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-muted-foreground shrink-0 font-mono">
            {currentSlide + 1} / {slideList.length}
          </span>
        </div>

        {/* Presenter Utilities / Controls */}
        <div className="flex items-center gap-2.5">
          {/* Quick Select Slide Dropdown Menu */}
          <select
            value={currentSlide}
            onChange={(e) => setCurrentSlide(Number(e.target.value))}
            className="hidden sm:inline-block bg-background/80 border border-border/80 text-xs font-semibold px-2.5 py-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green/50 cursor-pointer"
          >
            {slideList.map((slide, idx) => (
              <option key={slide.id} value={idx}>
                {idx + 1}. {slide.subtitle}
              </option>
            ))}
          </select>

          {/* Theme Mode Toggle Button */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="h-9 w-9 rounded-xl border border-border/60 bg-background/50 hover:bg-background flex items-center justify-center transition-all"
            title="Alternar Tema"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Speaker Notes Trigger */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`h-9 px-3.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all ${
              showNotes
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/60 bg-background/50 hover:bg-background"
            }`}
            title="Notas do Apresentador"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden md:inline">Notas</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="h-9 w-9 rounded-xl border border-border/60 bg-background/50 hover:bg-background flex items-center justify-center transition-all"
            title="Tela Cheia"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Main Body Stage Container */}
      <main className="relative z-10 flex h-[calc(100vh-100px)] w-full overflow-hidden">
        {/* Slides Viewport */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:p-16 relative overflow-hidden h-full">
          {/* Slide Transverse Carousel Box */}
          <div className="w-full h-full max-w-6.5xl mx-auto flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 25, scale: 0.99 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -25, scale: 0.99 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full h-full"
              >
                {slideList[currentSlide].component}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left Navigation Arrow */}
          {currentSlide > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-border bg-background/70 backdrop-blur-md shadow-lg flex items-center justify-center hover:scale-105 hover:bg-background text-foreground/80 hover:text-foreground transition-all z-20"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Right Navigation Arrow */}
          {currentSlide < slideList.length - 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-border bg-background/70 backdrop-blur-md shadow-lg flex items-center justify-center hover:scale-105 hover:bg-background text-foreground/80 hover:text-foreground transition-all z-20"
              aria-label="Próximo slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Presenter Mode / Notes Sidebar */}
        <AnimatePresence>
          {showNotes && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 340, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full border-l border-border/40 bg-card/60 backdrop-blur-md flex flex-col justify-between shrink-0 overflow-hidden relative z-20"
            >
              {/* Sidebar Header with Stopwatch */}
              <div className="p-5 border-b border-border/40 text-left">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-brand-green flex items-center gap-1.5">
                  <LayoutDashboard className="h-4 w-4" />
                  Painel de Reunião
                </h3>

                {/* Stopwatch widget */}
                <div className="mt-4 bg-background/80 border border-border p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-mono text-sm font-bold text-foreground">
                      {formatTimer(elapsedSeconds)}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setTimerActive(!timerActive)}
                      className="p-1.5 rounded-lg border bg-background hover:bg-muted text-foreground transition-colors"
                    >
                      {timerActive ? (
                        <Pause className="h-3.5 w-3.5" />
                      ) : (
                        <Play className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setTimerActive(false);
                        setElapsedSeconds(0);
                      }}
                      className="p-1.5 rounded-lg border bg-background hover:bg-muted text-foreground transition-colors"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Speaker Notes */}
              <div className="flex-1 p-5 overflow-y-auto text-left">
                <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
                  Guia do Apresentador
                </span>
                <h4 className="font-bold text-sm text-foreground mt-1">
                  Slide {currentSlide + 1}: {slideList[currentSlide].title}
                </h4>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground bg-background/40 p-4 rounded-xl border border-border/50">
                  {speakerNotes[currentSlide]}
                </p>
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-border/40 text-[10px] text-muted-foreground/80 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                Use as setas ← → do teclado ou passe o dedo no celular para mudar de slide.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Progress Navigation indicators for click-jumping */}
      <footer className="relative z-20 h-9 w-full border-t border-border/30 px-6 bg-background/25 backdrop-blur-md flex items-center justify-center">
        <div className="flex items-center gap-2">
          {slideList.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === idx
                  ? "w-6 bg-brand-green"
                  : "w-2 bg-muted-foreground/45 hover:bg-muted-foreground/70"
              }`}
              title={slide.title}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}
