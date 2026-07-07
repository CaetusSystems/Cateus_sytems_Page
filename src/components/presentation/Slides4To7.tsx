import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Globe,
  MessageCircle,
  Instagram,
  Facebook,
  Bot,
  Cpu,
  Workflow,
  Search,
  MapPin,
  Sparkles,
  Check,
  Calendar,
  Layers,
  Zap,
  ArrowRight,
  Database,
  Users,
  LineChart,
} from "lucide-react";

// Slide 4 Component: Connected Operation Interactive Loop
export function Slide4() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  const loopSteps = [
    {
      id: 0,
      label: "Cliente Busca no Google",
      icon: Search,
      desc: "Acha sua empresa no topo do Google Maps, clica no seu link profissional.",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      id: 1,
      label: "Acessa o Site Otimizado",
      icon: Globe,
      desc: "Site ultra-rápido carrega no celular em 1s, focado em conversão de leads.",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      id: 2,
      label: "Aciona o Botão WhatsApp",
      icon: MessageCircle,
      desc: "Dispara uma conversa direta, gerando um lead qualificado na hora.",
      color: "text-[#25D366]",
      bg: "bg-[#25D366]/10",
    },
    {
      id: 3,
      label: "Atendimento IA Imediato",
      icon: Bot,
      desc: "Nossa IA exclusiva responde em 3 segundos, tirando dúvidas e agendando.",
      color: "text-[#68D391]",
      bg: "bg-[#68D391]/10",
    },
    {
      id: 4,
      label: "Notificação & Sincronização",
      icon: Cpu,
      desc: "A IA salva no banco de dados e notifica o dono da empresa no celular.",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
  ];

  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % loopSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isSimulating, loopSteps.length]);

  return (
    <div className="grid h-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 py-2">
      {/* Description */}
      <div className="flex flex-col justify-center lg:col-span-5 text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
          Etapa 03: A Solução
        </span>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          A Operação Digital Unificada
        </h2>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          Chega de ferramentas isoladas e softwares que não se conversam. Na Caetus Systems, nós
          conectamos todas as frentes da sua presença digital em um único motor de vendas
          automático.
        </p>

        {/* Dynamic active status list */}
        <div className="mt-6 space-y-3.5">
          {loopSteps.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            return (
              <div
                key={step.id}
                onClick={() => {
                  setActiveStep(step.id);
                  setIsSimulating(false);
                }}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? "border-brand-green bg-brand-green/5 shadow-md shadow-brand-green/2"
                    : "border-border/60 bg-transparent hover:border-border"
                }`}
              >
                <div className={`p-2 rounded-lg ${step.bg} ${step.color} shrink-0 mt-0.5`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4
                    className={`text-xs font-bold ${isActive ? "text-brand-green" : "text-foreground"}`}
                  >
                    {step.id + 1}. {step.label}
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visual Connection Loop (Right) */}
      <div className="flex flex-col justify-center items-center lg:col-span-7 h-[420px] lg:h-[480px] w-full rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm p-6 overflow-hidden relative">
        <div className="absolute top-4 left-4 text-[10px] text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-full flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-green animate-ping" />
          <span>Simulação Ativa</span>
        </div>

        {/* Node ring structure */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Central Core */}
          <div className="z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-primary/10 border border-primary/30 shadow-lg shadow-primary/5 backdrop-blur-md">
            <Share2 className="h-8 w-8 text-primary animate-pulse" />
            <span className="text-[10px] font-bold text-primary tracking-widest mt-1">NÚCLEO</span>
          </div>

          {/* Connected orbiting elements */}
          {loopSteps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            // Place nodes in a circle
            const angle = (idx * 2 * Math.PI) / loopSteps.length - Math.PI / 2;
            const radius = 110; // orbit radius
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={step.id}
                className="absolute transition-transform duration-500"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    boxShadow: isActive ? "0 0 25px rgba(104, 211, 145, 0.45)" : "none",
                  }}
                  className={`flex h-14 w-14 items-center justify-center rounded-full border transition-all ${
                    isActive
                      ? "border-brand-green bg-background z-20 text-brand-green"
                      : "border-border/60 bg-background/90 text-muted-foreground"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                {/* Micro Label */}
                <span
                  className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold tracking-tight px-1.5 py-0.5 rounded-md ${isActive ? "bg-brand-green/15 text-brand-green" : "text-muted-foreground bg-muted/20"}`}
                >
                  {step.label.split(" ")[0]}
                </span>
              </div>
            );
          })}

          {/* Orbit paths */}
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50%"
              cy="50%"
              r="110"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
            {/* Highlighting active glowing connection lines to central core */}
            {loopSteps.map((step, idx) => {
              const isActive = activeStep === step.id;
              if (!isActive) return null;
              const angle = (idx * 2 * Math.PI) / loopSteps.length - Math.PI / 2;
              const x2 = 160 + Math.cos(angle) * 110;
              const y2 = 160 + Math.sin(angle) * 110;
              return (
                <g key={`connection-${idx}`}>
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`${x2}`}
                    y2={`${y2}`}
                    stroke="var(--brand-green)"
                    strokeWidth="2.5"
                    className="animate-pulse"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Dynamic description box at bottom */}
        <div className="absolute bottom-4 left-4 right-4 bg-background/90 border border-brand-green/20 rounded-xl p-3.5 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            Status Atual: {loopSteps[activeStep].label}
          </span>
          <p className="text-xs text-muted-foreground mt-1 leading-normal">
            {loopSteps[activeStep].desc}
          </p>
        </div>
      </div>
    </div>
  );
}

// Slide 5 Component: O que fazemos (Nossos 35+ Serviços)
export function Slide5() {
  const [activeCategory, setActiveCategory] = useState<string>("presenca");

  const categories = [
    { id: "presenca", label: "Presença Digital", desc: "Sua vitrine blindada", icon: Globe },
    { id: "atendimento", label: "Atendimento", desc: "Conversão automática", icon: MessageCircle },
    { id: "marketing", label: "Marketing Local", desc: "Atração de clientes", icon: Sparkles },
    { id: "automacao", label: "Automação & IA", desc: "Eficiência de ponta", icon: Cpu },
  ];

  const services: Record<string, string[]> = {
    presenca: [
      "Site Profissional Institucional",
      "Páginas de Alta Conversão (Landing Pages)",
      "Blogs Integrados com IA para SEO",
      "Domínios e Contas de E-mail Corporativo",
      "Hospedagem em Servidores Cloud Premium",
      "Certificado de Segurança SSL Incluso",
      "Otimização Completa de Velocidade",
      "Design Moderno Adaptado para Celulares",
    ],
    atendimento: [
      "Integração do WhatsApp com IA Exclusiva",
      "Atendentes Virtuais Multicanal",
      "Agendamento Automático de Serviços",
      "Filtragem e Qualificação de Leads",
      "Respostas Prontas para Dúvidas Frequentes",
      "Histórico Sincronizado de Atendimentos",
      "Direcionamento Inteligente para Humanos",
      "Disparos Automáticos de Lembretes",
    ],
    marketing: [
      "Otimização de Perfil Google Meu Negócio",
      "Configuração e Gestão Google Maps",
      "Campanhas de Tráfego Pago Otimizadas",
      "Identidade Visual & Posts de Redes Sociais",
      "Estratégia de Captação Ativa de Leads",
      "Gestão de Avaliações e Reputação Online",
      "Relatórios de Posicionamento Local",
      "Campanhas de Anúncios no Meta Ads",
    ],
    automacao: [
      "Criação de Banco de Conhecimento com IA",
      "Automação de Envio de Orçamentos",
      "Sincronização de CRM de Vendas",
      "Dashboards e Painéis de Controle",
      "Automação de Processos Administrativos",
      "Integração com Gateway de Pagamento",
      "Atualização de Planilhas em Lote",
      "Monitoramento Contínuo de Redes e IA",
    ],
  };

  return (
    <div className="flex flex-col h-full justify-between gap-6 py-2">
      {/* Header */}
      <div className="text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Nossos Serviços
        </span>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Nossa caixa de ferramentas com mais de 35 soluções
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Nós não vendemos uma ferramenta. Entregamos a solução sob medida que sua empresa precisa
          para decolar.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[58vh] overflow-y-auto lg:overflow-visible">
        {/* Category Selector (Left) */}
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:col-span-4 pb-2 lg:pb-0 shrink-0">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-3.5 p-4 rounded-xl border text-left transition-all shrink-0 w-[200px] lg:w-full select-none ${
                  isActive
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border/60 bg-transparent hover:border-border"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4
                    className={`text-xs font-bold ${isActive ? "text-primary" : "text-foreground"}`}
                  >
                    {cat.label}
                  </h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{cat.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Services List (Right) - Cascading badged items */}
        <div className="lg:col-span-8 flex flex-col justify-start">
          <div className="bg-card/40 border border-border/60 rounded-2xl p-6 h-full">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5" />
              {categories.find((c) => c.id === activeCategory)?.label} — Soluções Integradas
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <AnimatePresence mode="popLayout">
                {services[activeCategory].map((svc, idx) => (
                  <motion.div
                    key={svc}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex items-start gap-2.5 p-3 rounded-lg border border-border/40 bg-background/50 hover:bg-background transition-colors text-left"
                  >
                    <div className="rounded-full bg-brand-green/10 p-1 text-brand-green shrink-0 mt-0.5">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <span className="text-xs font-semibold text-foreground/90 leading-tight">
                      {svc}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Helper prompt */}
      <div className="text-center text-xs text-muted-foreground/80 mt-1">
        Não se preocupe com a complexidade. Nós cuidamos do planejamento, montagem e manutenção de
        cada detalhe.
      </div>
    </div>
  );
}

// Slide 6 Component: Como funciona (Linha do Tempo)
export function Slide6() {
  const [activeStage, setActiveStage] = useState<number>(0);

  const timelineStages = [
    {
      id: 0,
      title: "1. Implantação & Setup",
      subtitle: "Os primeiros 30 dias",
      desc: "Estruturamos os alicerces digitais da sua empresa. Criamos seu site profissional do zero, otimizamos suas redes sociais, estruturamos seu Google Meu Negócio, e treinamos a Inteligência Artificial com as particularidades e respostas do seu negócio.",
      bullets: [
        "Auditoria de posicionamento atual",
        "Desenvolvimento do site responsivo",
        "Configurações iniciais do Google Maps",
        "Treinamento básico da IA com sua base de dados",
      ],
      color: "border-primary",
      textColor: "text-primary",
      bg: "bg-primary/10",
    },
    {
      id: 1,
      title: "2. Operação Ativa",
      subtitle: "Trabalho contínuo mensal",
      desc: "Nossa equipe assume os bastidores tecnológicos. Publicamos posts estratégicos nas suas redes, garantimos que seu site esteja no ar 100% do tempo na velocidade máxima, monitoramos as respostas da IA, e geramos avaliações positivas constantes no Google.",
      bullets: [
        "Postagens profissionais semanais",
        "Manutenção de velocidade e backups",
        "Otimização constante de SEO local",
        "Monitoramento e ajuste da IA de vendas",
      ],
      color: "border-brand-green",
      textColor: "text-brand-green",
      bg: "bg-brand-green/10",
    },
    {
      id: 2,
      title: "3. Evolução Contínua",
      subtitle: "Aceleração e novos canais",
      desc: "Seu ecossistema não fica estagnado. À medida que seu negócio cresce, implementamos novas automações (como integrações de CRM, envio automatizado de orçamentos ou novos canais de vendas), relatórios detalhados e campanhas patrocinadas.",
      bullets: [
        "Relatórios de faturamento e leads",
        "Montagem de novas automações",
        "Campanhas de tráfego (Google/Meta Ads)",
        "Melhorias contínuas de conversão",
      ],
      color: "border-amber-500",
      textColor: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="flex flex-col h-full justify-between gap-6 py-2">
      {/* Header */}
      <div className="text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          A Jornada
        </span>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Como nossa parceria funciona na prática?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Enquanto agências tradicionais entregam um projeto e somem, a Caetus Systems opera como
          seu departamento de TI e Vendas ativo.
        </p>
      </div>

      {/* Main timeline interactive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-h-[60vh] overflow-y-auto lg:overflow-visible">
        {/* Timeline Line (Left) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-4 pr-2">
          {timelineStages.map((stage, idx) => {
            const isActive = activeStage === idx;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
                  isActive
                    ? `${stage.color} bg-background shadow-lg`
                    : "border-border/60 bg-transparent hover:border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-8 w-8 flex items-center justify-center rounded-full font-bold text-xs ${isActive ? stage.bg + " " + stage.textColor : "bg-muted text-muted-foreground"}`}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <h3
                      className={`text-sm font-bold ${isActive ? stage.textColor : "text-foreground"}`}
                    >
                      {stage.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground">{stage.subtitle}</p>
                  </div>
                </div>

                {/* Left vertical active path line in layout */}
                {idx < timelineStages.length - 1 && (
                  <div className="absolute left-8 bottom-[-16px] h-4 w-0.5 bg-border pointer-events-none hidden lg:block" />
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Detail Panel (Right) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl border-l-4 ${timelineStages[activeStage].color} bg-card/40 border border-y-border border-r-border p-6 shadow-md text-left`}
            >
              <span
                className={`text-[10px] uppercase font-bold tracking-wider ${timelineStages[activeStage].textColor}`}
              >
                {timelineStages[activeStage].subtitle}
              </span>
              <h3 className="text-xl font-bold text-foreground mt-1">
                {timelineStages[activeStage].title}
              </h3>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                {timelineStages[activeStage].desc}
              </p>

              {/* Bullet Checklist */}
              <div className="mt-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground block mb-2">
                  Principais entregáveis da etapa:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timelineStages[activeStage].bullets.map((bullet) => (
                    <div key={bullet} className="flex items-center gap-2">
                      <div
                        className={`rounded-full ${timelineStages[activeStage].bg} ${timelineStages[activeStage].textColor} p-0.5 shrink-0`}
                      >
                        <Check className="h-3 w-3 stroke-[2.5]" />
                      </div>
                      <span className="text-xs text-foreground/80 font-medium">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Slide 7 Component: Implantação (Setup Detalhado)
export function Slide7() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([0, 1]);

  const setupTasks = [
    {
      id: 0,
      title: "Diagnóstico de Presença",
      text: "Auditoria de redes, Google Meu Negócio e concorrência local.",
    },
    {
      id: 1,
      title: "Registro e Hospedagem",
      text: "Contratação de servidores de alta performance, e-mails e segurança.",
    },
    {
      id: 2,
      title: "Design do Site Profissional",
      text: "Esboço e codificação da Landing Page com velocidade otimizada.",
    },
    {
      id: 3,
      title: "Configuração da Inteligência Artificial",
      text: "Treinamento do robô com dados da empresa e respostas de atendimento.",
    },
    {
      id: 4,
      title: "Sincronização de Redes e Google Maps",
      text: "Ajuste de endereços, avaliações automáticas e posts iniciais.",
    },
  ];

  const handleToggleStep = (id: number) => {
    if (completedSteps.includes(id)) {
      setCompletedSteps(completedSteps.filter((s) => s !== id));
    } else {
      setCompletedSteps([...completedSteps, id].sort());
    }
  };

  const progressPercent = Math.round((completedSteps.length / setupTasks.length) * 100);

  return (
    <div className="grid h-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 py-2">
      {/* Title & Stats */}
      <div className="flex flex-col justify-center lg:col-span-5 text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          A Fase Crítica
        </span>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Como funciona a Implantação?
        </h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Nossos primeiros 30 dias são dedicados a retirar sua empresa do anonimato digital.
          Montamos toda a estrutura de ponta sem que você precise mexer em uma única linha de
          código.
        </p>

        {/* Setup Progress Indicator Card */}
        <div className="mt-6 border border-border bg-card/50 p-4 rounded-xl">
          <div className="flex justify-between items-center text-xs font-semibold text-foreground mb-1">
            <span>Progresso da Implantação:</span>
            <span className="text-primary font-bold">{progressPercent}%</span>
          </div>
          {/* Progress track */}
          <div className="h-2 w-full bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground mt-2 block">
            {completedSteps.length === setupTasks.length
              ? "🚀 Setup Concluído! Pronto para iniciar operação ativa."
              : `Restam ${setupTasks.length - completedSteps.length} etapas críticas para decolar.`}
          </span>
        </div>
      </div>

      {/* Interactive Progressive List */}
      <div className="lg:col-span-7 flex flex-col justify-center bg-card/30 border border-border/40 rounded-2xl p-6 h-full relative">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Etapas do Primeiro Mês (Clique para simular a conclusão)
        </h3>

        <div className="space-y-3">
          {setupTasks.map((task) => {
            const isDone = completedSteps.includes(task.id);
            return (
              <div
                key={task.id}
                onClick={() => handleToggleStep(task.id)}
                className={`flex items-start gap-3.5 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                  isDone
                    ? "border-brand-green/30 bg-brand-green/[0.02] opacity-80"
                    : "border-border/60 bg-background/80 hover:border-border"
                }`}
              >
                {/* Checkbox circle */}
                <div
                  className={`mt-0.5 h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    isDone
                      ? "border-brand-green bg-brand-green text-white"
                      : "border-border bg-background"
                  }`}
                >
                  {isDone && <Check className="h-3 w-3 stroke-[3]" />}
                </div>

                <div className="text-left">
                  <h4
                    className={`text-xs font-bold transition-all ${isDone ? "text-brand-green/90 line-through" : "text-foreground"}`}
                  >
                    {task.title}
                  </h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal">
                    {task.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
