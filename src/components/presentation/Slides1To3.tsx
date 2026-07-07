import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Globe,
  Instagram,
  Facebook,
  Bot,
  Cpu,
  Workflow,
  Search,
  MapPin,
  TrendingDown,
  Clock,
  Coins,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  XCircle,
  TrendingUp,
  UserCheck,
  ShieldCheck,
  Zap,
} from "lucide-react";

// Slide 1 Component: Interactive Ecosystem Cover
export function Slide1() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes = [
    {
      id: "whatsapp",
      label: "WhatsApp IA",
      icon: MessageCircle,
      desc: "Atendimento 24/7 automático",
      color: "text-[#25D366]",
      bg: "bg-[#25D366]/10",
      border: "border-[#25D366]/30",
      x: "12%",
      y: "20%",
    },
    {
      id: "site",
      label: "Site Profissional",
      icon: Globe,
      desc: "Sua sede digital otimizada",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      x: "85%",
      y: "25%",
    },
    {
      id: "google",
      label: "Google Business",
      icon: Search,
      desc: "Sendo encontrado na sua cidade",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      x: "80%",
      y: "75%",
    },
    {
      id: "instagram",
      label: "Redes Sociais",
      icon: Instagram,
      desc: "Presença ativa sem esforço",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      border: "border-pink-500/30",
      x: "15%",
      y: "70%",
    },
    {
      id: "system",
      label: "Sistemas & IA",
      icon: Cpu,
      desc: "Automação e controle total",
      color: "text-[#68D391]",
      bg: "bg-[#68D391]/10",
      border: "border-[#68D391]/30",
      x: "50%",
      y: "85%",
    },
  ];

  return (
    <div className="grid h-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
      {/* Text Info */}
      <div className="flex flex-col justify-center lg:col-span-5 text-left z-10">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-brand-green w-fit mb-4"
        >
          <Zap className="h-3.5 w-3.5 animate-pulse" />
          Apresentação Comercial Caetus
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl xl:text-6.5xl"
        >
          Caetus Systems
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-primary to-brand-green bg-clip-text text-transparent"
        >
          Sua Operação Digital.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md"
        >
          Você foca em fazer o seu negócio crescer. Nós assumimos, estruturamos e cuidamos de toda a
          sua tecnologia, vendas e automação de forma contínua.
        </motion.p>

        {/* Tip for meeting */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1 }}
          className="mt-8 text-xs text-muted-foreground/80 flex items-center gap-2 border border-border bg-card/40 p-3 rounded-xl max-w-sm"
        >
          <HelpCircle className="h-4 w-4 shrink-0 text-primary" />
          <span>
            Dica do Apresentador: Clique nas conexões do ecossistema ao lado para demonstrar os
            pilares.
          </span>
        </motion.div>
      </div>

      {/* Live Interactive Ecosystem Grid */}
      <div className="relative flex items-center justify-center lg:col-span-7 h-[420px] lg:h-[500px] w-full rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm shadow-inner p-4 overflow-hidden">
        {/* Dynamic connection lines (SVG) */}
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Central Hub (50%, 45%) to nodes */}
          <g opacity="0.4">
            <line
              x1="50%"
              y1="45%"
              x2="12%"
              y2="20%"
              stroke="var(--primary)"
              strokeWidth="1.5"
              strokeDasharray="5,5"
              className="animate-[dash_20s_linear_infinite]"
            />
            <line
              x1="50%"
              y1="45%"
              x2="85%"
              y2="25%"
              stroke="var(--primary)"
              strokeWidth="1.5"
              strokeDasharray="5,5"
            />
            <line
              x1="50%"
              y1="45%"
              x2="80%"
              y2="75%"
              stroke="var(--primary)"
              strokeWidth="1.5"
              strokeDasharray="5,5"
            />
            <line
              x1="50%"
              y1="45%"
              x2="15%"
              y2="70%"
              stroke="var(--primary)"
              strokeWidth="1.5"
              strokeDasharray="5,5"
            />
            <line
              x1="50%"
              y1="45%"
              x2="50%"
              y2="85%"
              stroke="var(--primary)"
              strokeWidth="1.5"
              strokeDasharray="5,5"
            />
          </g>

          {/* Interactive animated particles floating along lines */}
          <g>
            <circle r="4" fill="var(--brand-green)" className="animate-[pulse_1.5s_infinite]">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 250,225 L 60,100" />
            </circle>
            <circle r="4" fill="var(--primary)" className="animate-[pulse_2s_infinite]">
              <animateMotion dur="5.5s" repeatCount="indefinite" path="M 250,225 L 425,125" />
            </circle>
            <circle r="4.5" fill="#25D366" className="animate-[pulse_1.8s_infinite]">
              <animateMotion
                dur="4.8s"
                repeatCount="indefinite"
                path="M 60,100 L 75,350 L 250,425"
              />
            </circle>
            <circle r="4" fill="var(--brand-green)" className="animate-[pulse_1.2s_infinite]">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M 250,225 L 400,375" />
            </circle>
          </g>
        </svg>

        {/* Central Node "Sua Empresa" */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="absolute z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-brand-green bg-background shadow-lg shadow-brand-green/20 cursor-pointer"
          style={{ left: "50%", top: "45%", transform: "translate(-50%, -50%)" }}
          onClick={() => setActiveNode("hub")}
        >
          <div className="relative">
            <span className="absolute -inset-2 rounded-full bg-brand-green/10 animate-ping" />
            <span className="text-xl font-bold tracking-wider text-brand-green">CAETUS</span>
          </div>
          <span className="text-[10px] font-bold text-muted-foreground uppercase mt-1">
            Ecosistema
          </span>
        </motion.div>

        {/* Outer Nodes */}
        {nodes.map((node) => {
          const Icon = node.icon;
          const isActive = activeNode === node.id;
          return (
            <motion.div
              key={node.id}
              whileHover={{ scale: 1.08 }}
              className={`absolute z-10 flex flex-col items-center justify-center rounded-2xl border ${isActive ? "border-brand-green bg-brand-green/10 ring-2 ring-brand-green/20" : node.border + " bg-background/90"} p-3 shadow-md cursor-pointer transition-colors w-[130px] sm:w-[150px]`}
              style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)" }}
              onClick={() => setActiveNode(node.id)}
            >
              <div className={`p-2 rounded-xl ${node.bg} ${node.color} mb-1.5`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-foreground text-center leading-tight">
                {node.label}
              </span>
              <span className="text-[9px] text-muted-foreground text-center mt-0.5 leading-none hidden sm:block">
                {node.desc}
              </span>
            </motion.div>
          );
        })}

        {/* Info Box detailing selected node */}
        <div className="absolute bottom-3 left-3 right-3 z-20">
          <AnimatePresence mode="wait">
            {activeNode ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="rounded-xl border border-brand-green/30 bg-background/95 p-4.5 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-brand-green" />
                      {activeNode === "hub"
                        ? "A Conexão Caetus"
                        : nodes.find((n) => n.id === activeNode)?.label}
                    </h4>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {activeNode === "hub" &&
                        "Integramos e gerenciamos todas as pontas da sua operação para que ela trabalhe de forma unificada e automática."}
                      {activeNode === "whatsapp" &&
                        "Não perca nenhuma venda. Desenvolvemos assistentes de inteligência artificial específicos para a sua empresa, capazes de agendar, tirar dúvidas, enviar orçamentos e filtrar leads 24h por dia."}
                      {activeNode === "site" &&
                        "Criação de sites de altíssimo padrão tecnológico. Rápidos, adaptados para celulares, otimizados para o Google e prontos para alimentar seu funil de vendas sem falhas."}
                      {activeNode === "google" &&
                        "Colocamos seu negócio no mapa! Gerenciamos seu Google Meu Negócio, geramos avaliações positivas automáticas e garantimos que sua empresa lidere os rankings locais."}
                      {activeNode === "instagram" &&
                        "Sua marca ativa sem consumir seu tempo. Mantemos suas redes atualizadas de forma estratégica, conectadas com seu site e as campanhas de marketing."}
                      {activeNode === "system" &&
                        "Sistemas web sob medida, painéis de controle, dashboards interativos e automação de processos repetitivos para economizar horas de trabalho toda semana."}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveNode(null);
                    }}
                    className="text-muted-foreground hover:text-foreground text-xs p-1 rounded-md hover:bg-muted"
                  >
                    Fechar
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-border/50 bg-background/70 px-4 py-3 text-center text-xs text-muted-foreground/80 backdrop-blur-sm"
              >
                Toque nos ícones para simular o fluxo de trabalho integrado
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Slide 2 Component: Interactive Problems (Pain VS Solution)
export function Slide2() {
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  const painPoints = [
    {
      id: "invisible",
      title: "Invisível no Google",
      pain: "As pessoas buscam pelo seu serviço na sua cidade, mas encontram seus concorrentes. Sua empresa não aparece no mapa.",
      solution:
        "Otimização local completa (AEO, GEO e Google Maps) para garantir as primeiras posições da sua região.",
      icon: Search,
    },
    {
      id: "whatsapp",
      title: "WhatsApp Congestionado",
      pain: "Mensagens acumulando, demora para responder, clientes que desistem pela lentidão e vão para o concorrente.",
      solution:
        "Chatbot inteligente com IA que atende na hora, tira dúvidas e encaminha para o humano de forma cirúrgica.",
      icon: MessageCircle,
    },
    {
      id: "social",
      title: "Redes Sociais Abandonadas",
      pain: "Semanas sem postar nada. Quem visita seu perfil acha que a empresa fechou. Imagem de amadorismo.",
      solution:
        "Frequência estratégica e posts profissionais alinhados ao seu site, sem roubar um único minuto seu.",
      icon: Instagram,
    },
    {
      id: "providers",
      title: "Vários Fornecedores",
      pain: "A agência culpa o programador, o programador culpa o designer, e você gasta uma fortuna pagando mensalidades separadas.",
      solution:
        "Sua equipe digital completa em um só parceiro. Site, marketing, sistemas e IA resolvidos sob o mesmo teto.",
      icon: Workflow,
    },
    {
      id: "manual",
      title: "Planilhas e Retrabalho",
      pain: "Passar dados manualmente do WhatsApp para planilhas, notas fiscais, ou sistemas antigos. Perda de tempo crucial.",
      solution:
        "Automações inteligentes que integram tudo. Dados sincronizados em tempo real de forma automática.",
      icon: Cpu,
    },
    {
      id: "overloaded",
      title: "Dono Sobrecarregado",
      pain: "Você passa o dia respondendo cliente, cobrando financeiro, postando e resolvendo pepino técnico. Sem tempo para crescer.",
      solution:
        "Nós assumimos o digital. Você volta a ser o Diretor da sua empresa e foca apenas na qualidade do seu serviço.",
      icon: Clock,
    },
  ];

  const handleToggleResolve = (id: string) => {
    if (resolvedIds.includes(id)) {
      setResolvedIds(resolvedIds.filter((item) => item !== id));
    } else {
      setResolvedIds([...resolvedIds, id]);
    }
  };

  const handleResolveAll = () => {
    if (resolvedIds.length === painPoints.length) {
      setResolvedIds([]);
    } else {
      setResolvedIds(painPoints.map((p) => p.id));
    }
  };

  return (
    <div className="flex flex-col h-full justify-between gap-6 py-2">
      {/* Slide Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
            Etapa 01: O Cenário Atual
          </span>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            A realidade silenciosa de 90% das pequenas empresas
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A tecnologia deveria ajudar, mas a falta de braço técnico cria um caos invisível.
          </p>
        </div>
        <button
          onClick={handleResolveAll}
          className={`shrink-0 rounded-full px-5 py-2 text-xs font-bold transition-all border ${
            resolvedIds.length === painPoints.length
              ? "bg-red-500/10 text-red-600 border-red-500/30 hover:bg-red-500/20"
              : "bg-brand-green/10 text-brand-green border-brand-green/30 hover:bg-brand-green/20"
          }`}
        >
          {resolvedIds.length === painPoints.length
            ? "Resetar Problemas"
            : "Como a Caetus Resolve Tudo?"}
        </button>
      </div>

      {/* Grid of Problem Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-h-[60vh] overflow-y-auto pr-1">
        {painPoints.map((point) => {
          const Icon = point.icon;
          const isResolved = resolvedIds.includes(point.id);

          return (
            <motion.div
              layout
              key={point.id}
              onClick={() => handleToggleResolve(point.id)}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-all cursor-pointer select-none ${
                isResolved
                  ? "border-brand-green/40 bg-gradient-to-br from-brand-green/5 via-card to-brand-green/2% shadow-brand-green/5"
                  : "border-red-500/15 bg-gradient-to-br from-red-500/[0.03] via-card to-red-500/[0.01]"
              }`}
            >
              {/* Card Indicator Top Right */}
              <div className="absolute right-4 top-4">
                <AnimatePresence mode="wait">
                  {isResolved ? (
                    <motion.div
                      key="solved"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="rounded-full bg-brand-green/10 p-1 text-brand-green"
                    >
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="pain"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="rounded-full bg-red-500/10 p-1 text-red-500 animate-pulse"
                    >
                      <AlertTriangle className="h-4.5 w-4.5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-xl p-2.5 ${isResolved ? "bg-brand-green/10 text-brand-green" : "bg-red-500/10 text-red-500"}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base text-foreground pr-6">{point.title}</h3>
              </div>

              {/* Expandable text showing Pain vs Solution */}
              <div className="mt-4 min-h-[90px]">
                <AnimatePresence mode="wait">
                  {isResolved ? (
                    <motion.div
                      key="solution-text"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-xs leading-relaxed text-foreground/90"
                    >
                      <p className="font-bold text-brand-green flex items-center gap-1 mb-1">
                        <CheckCircle2 className="h-3 w-3" /> Solução Caetus:
                      </p>
                      {point.solution}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="pain-text"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-xs leading-relaxed text-muted-foreground"
                    >
                      <p className="font-bold text-red-500 flex items-center gap-1 mb-1">
                        <XCircle className="h-3 w-3" /> A Dor:
                      </p>
                      {point.pain}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Hint */}
              <div className="mt-3 pt-2.5 border-t border-border/40 text-[10px] text-muted-foreground flex justify-between items-center">
                <span>Clique para {isResolved ? "ver o problema" : "ver a solução"}</span>
                <span
                  className={
                    isResolved ? "text-brand-green font-semibold" : "text-red-500/80 font-semibold"
                  }
                >
                  {isResolved ? "Resolvido!" : "Pendente"}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Footer */}
      <div className="mt-2 text-center text-xs text-muted-foreground">
        Resolvidos: <span className="font-bold text-brand-green">{resolvedIds.length}</span> de{" "}
        <span className="font-bold">{painPoints.length}</span> problemas.{" "}
        {resolvedIds.length === painPoints.length && (
          <span className="text-brand-green font-bold ml-1 animate-bounce inline-block">
            🎉 Sua empresa está pronta para escalar!
          </span>
        )}
      </div>
    </div>
  );
}

// Slide 3 Component: Financial Loss Calculator & Timer Leaks
export function Slide3() {
  const [lostChats, setLostChats] = useState<number>(5);
  const [ticketValue, setTicketValue] = useState<number>(150);
  const [closingRate, setClosingRate] = useState<number>(30); // in percent

  // Live clock ticker representing lost money since presentation started
  const [lossCounter, setLossCounter] = useState<number>(0);

  // Dynamic calculations
  const monthlyLostPotentialSales = lostChats * 30; // Chats per month
  const actualMonthlyLostConversions = Math.round(monthlyLostPotentialSales * (closingRate / 100));
  const monthlyFinancialLoss = actualMonthlyLostConversions * ticketValue;
  const annualFinancialLoss = monthlyFinancialLoss * 12;

  // Simulate leakage since meeting began
  useEffect(() => {
    // Estimating cost of wasting business hours
    const secondsRate = monthlyFinancialLoss / (30 * 24 * 60 * 60); // cents leaking per second
    const interval = setInterval(() => {
      setLossCounter((prev) => prev + secondsRate);
    }, 1000);
    return () => clearInterval(interval);
  }, [monthlyFinancialLoss]);

  return (
    <div className="grid h-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 py-2">
      {/* Slider Controls (Left) */}
      <div className="flex flex-col justify-center lg:col-span-5 text-left bg-card/40 border border-border/60 p-5 rounded-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
          Etapa 02: O Custo da Inação
        </span>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Calcule as perdas invisíveis da sua empresa
        </h2>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
          Cada minuto sem atendimento automatizado, cada cliente que não te encontra no Google e
          cada lead perdido representam faturamento real escorrendo pelo ralo.
        </p>

        {/* Input sliders */}
        <div className="mt-6 space-y-5">
          {/* Slider 1: Lost Chats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground/90">
                Contatos perdidos/sem resposta (por dia):
              </span>
              <span className="rounded bg-primary/10 px-2 py-0.5 font-bold text-primary text-sm">
                {lostChats} contatos
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={lostChats}
              onChange={(e) => setLostChats(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-border accent-brand-green"
            />
            <span className="text-[10px] text-muted-foreground block text-right">
              Média de R$ {lostChats * ticketValue} em potencial diário
            </span>
          </div>

          {/* Slider 2: Ticket */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground/90">
                Ticket Médio (Valor médio por venda):
              </span>
              <span className="rounded bg-brand-green/10 px-2 py-0.5 font-bold text-brand-green text-sm">
                R$ {ticketValue}
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="2000"
              step="10"
              value={ticketValue}
              onChange={(e) => setTicketValue(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-border accent-brand-green"
            />
          </div>

          {/* Slider 3: Conversion Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground/90">
                Sua taxa de fechamento (estimada):
              </span>
              <span className="rounded bg-amber-500/10 px-2 py-0.5 font-bold text-amber-500 text-sm">
                {closingRate}% das conversas
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="90"
              step="5"
              value={closingRate}
              onChange={(e) => setClosingRate(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-border accent-brand-green"
            />
          </div>
        </div>
      </div>

      {/* High impact results visual (Right) */}
      <div className="flex flex-col justify-between gap-4 lg:col-span-7 h-full w-full">
        {/* Money dripping dashboard */}
        <div className="flex-1 flex flex-col justify-center items-center rounded-2xl border border-red-500/20 bg-gradient-to-b from-red-500/[0.03] to-transparent p-6 text-center relative overflow-hidden">
          {/* Ticker of wasted money during meeting */}
          <div className="absolute top-3 right-3 text-[10px] bg-red-500/10 text-red-500 font-mono px-2 py-1 rounded-md flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
            <span>Vazando agora: R$ {lossCounter.toFixed(4)}</span>
          </div>

          <Coins className="h-10 w-10 text-red-500/70 animate-bounce mb-3" />

          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-red-500">
            Faturamento Desperdiçado
          </h3>

          <div className="mt-2 flex flex-col">
            <span className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
              R$ {monthlyFinancialLoss.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              perdidos por mês em vendas não fechadas
            </span>
          </div>

          {/* Annual visualizer */}
          <div className="mt-5 w-full max-w-sm rounded-xl bg-card border border-border p-3.5 flex items-center justify-between text-left">
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground">
                Prejuízo acumulado em 1 ano:
              </span>
              <p className="text-lg font-bold text-red-500">
                R$ {annualFinancialLoss.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
              </p>
            </div>
            <div className="text-right text-xs bg-red-500/10 text-red-500 px-2.5 py-1 rounded-lg font-bold">
              - {actualMonthlyLostConversions * 12} clientes perdidos
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground leading-normal max-w-md">
            Com esse valor anual escorrendo pelo ralo, você poderia investir em novos equipamentos,
            contratar mais um funcionário, ou tirar férias tranquilas enquanto a Caetus Systems
            automatiza e estrutura sua empresa por uma fração desse custo.
          </p>
        </div>

        {/* Leaks comparisons cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-border/60 bg-card p-4 rounded-xl flex items-start gap-3 text-left">
            <div className="rounded-lg bg-red-500/10 p-2 text-red-500">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Tempo Desperdiçado</h4>
              <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
                ~15h/semana fazendo tarefas manuais de redes, site e respostas.
              </p>
            </div>
          </div>

          <div className="border border-border/60 bg-card p-4 rounded-xl flex items-start gap-3 text-left">
            <div className="rounded-lg bg-red-500/10 p-2 text-red-500">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Ausência no Google</h4>
              <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
                Empresas fora do Top 3 do Google Maps perdem até 70% das ligações da região.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
