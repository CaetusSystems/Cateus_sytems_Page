import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Sparkles,
  Search,
  Zap,
  Check,
  X,
  FileText,
  Clock,
  Briefcase,
  Wrench,
  UtensilsCrossed,
  Stethoscope,
  ShoppingBag,
  HelpCircle,
  MapPin,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  Award,
} from "lucide-react";

// Slide 8 Component: Active Monthly Maintenance Operations Hub
export function Slide8() {
  const activities = [
    {
      label: "Publicações Semanais",
      desc: "Desenvolvemos posts estratégicos para manter suas redes ativas sem esforço.",
      cat: "Marketing",
    },
    {
      label: "Treinamento Contínuo da IA",
      desc: "Ajustamos as respostas da IA com base nas perguntas dos seus clientes reais.",
      cat: "Atendimento",
    },
    {
      label: "Otimização Mensal de SEO Local",
      desc: "Garantimos sua liderança contínua no Google Maps e buscas na região.",
      cat: "Google",
    },
    {
      label: "Backups & Segurança Semanais",
      desc: "Monitoramento de velocidade e blindagem contra invasões.",
      cat: "Tecnologia",
    },
    {
      label: "Relatório de Leads & Métricas",
      desc: "Resumo mensal transparente mostrando quantos clientes novos atraímos.",
      cat: "Transparência",
    },
    {
      label: "Melhorias de Novas Automacões",
      desc: "Adicionamos novas integrações de sistemas de forma contínua conforme você cresce.",
      cat: "Evolução",
    },
  ];

  return (
    <div className="flex flex-col h-full justify-between gap-6 py-2">
      {/* Header */}
      <div className="text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#68D391]">
          Fase 02: A Operação
        </span>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          O que continua acontecendo todos os meses?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Criar um site e sumir é coisa do passado. A Caetus trabalha continuamente para que seu
          motor digital nunca pare de vender.
        </p>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-h-[60vh] overflow-y-auto pr-1">
        {activities.map((act, idx) => (
          <motion.div
            key={act.label}
            whileHover={{ scale: 1.02, y: -2 }}
            className="rounded-xl border border-border/50 bg-card p-4.5 text-left relative overflow-hidden"
          >
            <div className="absolute right-3 top-3 text-[9px] font-bold bg-[#68D391]/15 text-[#68D391] px-2 py-0.5 rounded-full uppercase tracking-wider">
              {act.cat}
            </div>
            <div className="mt-2 h-7 w-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-[#68D391]">
              <Check className="h-4 w-4 stroke-[2.5]" />
            </div>
            <h3 className="mt-3.5 font-bold text-sm text-foreground">{act.label}</h3>
            <p className="mt-1.5 text-xs text-muted-foreground leading-normal">{act.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Status Bar */}
      <div className="rounded-xl bg-card border border-border p-3 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
        <Sparkles className="h-4.5 w-4.5 text-[#68D391] animate-pulse" />
        <span>
          Tudo incluso na mesma assinatura mensal. Sem surpresas, sem cobranças extras por
          atualizações de texto ou imagem.
        </span>
      </div>
    </div>
  );
}

// Slide 9 Component: Traditional Agency VS Caetus Systems
export function Slide9() {
  const traditionalPoints = [
    "Preço altíssimo cobrado no setup inicial",
    "Entrega o site e some: você fica sem suporte técnico",
    "Código engessado que você não consegue atualizar sozinho",
    "Não integra com WhatsApp, redes sociais ou IA",
    "Você precisa pagar uma agência de marketing separada",
    "Falta de relatórios: você não sabe se dá resultado",
  ];

  const caetusPoints = [
    "Implantação acessível e transparente",
    "Parceria de longo prazo com suporte diário incluso",
    "Sua estrutura em evolução contínua, nunca fica obsoleta",
    "Automações nativas, IA e sistemas integrados em tempo real",
    "Tudo unificado: site, marketing local, IA e design sob o mesmo teto",
    "Foco total em resultado comercial com relatórios claros",
  ];

  return (
    <div className="flex flex-col h-full justify-between gap-6 py-2">
      {/* Header */}
      <div className="text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          O Comparativo
        </span>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Por que somos diferentes das agências tradicionais?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Nós não criamos apenas arquivos. Nós operamos a estrutura digital de vendas do seu negócio
          de ponta a ponta.
        </p>
      </div>

      {/* Side by Side Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[58vh] overflow-y-auto">
        {/* Traditional */}
        <div className="border border-red-500/20 bg-gradient-to-br from-red-500/[0.02] to-transparent rounded-2xl p-6 text-left">
          <div className="flex items-center gap-2.5 mb-5 text-red-500">
            <div className="rounded-full bg-red-500/10 p-2">
              <X className="h-5 w-5 stroke-[2.5]" />
            </div>
            <h3 className="font-extrabold text-base tracking-tight uppercase">
              Modelo Tradicional
            </h3>
          </div>

          <div className="space-y-3">
            {traditionalPoints.map((pt) => (
              <div key={pt} className="flex items-start gap-2.5">
                <div className="rounded-full bg-red-500/10 p-0.5 shrink-0 mt-0.5 text-red-500">
                  <X className="h-3 w-3" />
                </div>
                <span className="text-xs text-muted-foreground leading-normal">{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Caetus */}
        <div className="border border-brand-green/30 bg-gradient-to-br from-brand-green/[0.04] to-transparent rounded-2xl p-6 text-left shadow-lg shadow-brand-green/2">
          <div className="flex items-center gap-2.5 mb-5 text-brand-green">
            <div className="rounded-full bg-brand-green/10 p-2 animate-pulse">
              <Check className="h-5 w-5 stroke-[2.5]" />
            </div>
            <h3 className="font-extrabold text-base tracking-tight uppercase">
              Operação Digital Caetus
            </h3>
          </div>

          <div className="space-y-3">
            {caetusPoints.map((pt) => (
              <div key={pt} className="flex items-start gap-2.5">
                <div className="rounded-full bg-brand-green/10 p-0.5 shrink-0 mt-0.5 text-brand-green">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-xs font-semibold text-foreground/90 leading-normal">
                  {pt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Nós alinhamos nossos incentivos com os seus: só crescemos se a sua operação digital der
        resultados reais.
      </p>
    </div>
  );
}

// Slide 10 Component: Real Industry Use Cases
export function Slide10() {
  const [activeSegment, setActiveSegment] = useState<string>("oficina");

  const segments = [
    { id: "oficina", label: "Oficinas Mecânicas", icon: Wrench },
    { id: "clinica", label: "Clínicas & Estética", icon: Stethoscope },
    { id: "restaurante", label: "Delivery & Restaurantes", icon: UtensilsCrossed },
    { id: "loja", label: "Lojas & E-commerce", icon: ShoppingBag },
  ];

  const automationFlows: Record<string, { title: string; flow: string[]; benefit: string }> = {
    oficina: {
      title: "Orçamentação e Agendamento Inteligente",
      flow: [
        "Cliente envia mensagem no WhatsApp pedindo revisão de suspensão.",
        "IA responde na hora com simpatia e pergunta modelo e ano do carro.",
        "IA envia lista de horários livres integrados com a agenda do mecânico.",
        "Agendamento confirmado no Google Agenda + Lembrete automático enviado 1 dia antes.",
      ],
      benefit:
        "Reduz ociosidade de box, elimina ligações desnecessárias e garante orçamentos mais rápidos.",
    },
    clinica: {
      title: "Reserva de Consultas e Check-in Automatizado",
      flow: [
        "Paciente clica no botão do Instagram querendo marcar uma consulta.",
        "IA qualifica o lead: convênio ou particular, especialidade necessária.",
        "IA oferece horários disponíveis e solicita dados cadastrais.",
        "Agendamento fechado com envio de mapa do local e orientações de preparo.",
      ],
      benefit:
        "Atendimento 24h sem sobrecarregar a recepcionista, aumentando agendamentos em até 40%.",
    },
    restaurante: {
      title: "Atendimento e Cardápio Interativo",
      flow: [
        "Cliente manda WhatsApp 'Quero fazer um pedido' de noite.",
        "IA envia link do cardápio digital atualizado.",
        "Cliente escolhe os itens e a IA soma e calcula a taxa de entrega automaticamente.",
        "Pedido enviado direto para a cozinha e chave pix enviada para pagamento rápido.",
      ],
      benefit:
        "Fim das filas de atendimento telefônico no horário de pico, reduzindo erros de pedidos a zero.",
    },
    loja: {
      title: "Suporte e Recuperação de Carrinho",
      flow: [
        "Cliente tira dúvidas sobre prazos de entrega e tamanhos disponíveis.",
        "IA consulta o banco de dados de estoque do e-commerce em tempo real.",
        "Recomenda itens adicionais complementares em promoção.",
        "Gera link de checkout direto, recuperando vendas abandonadas automaticamente.",
      ],
      benefit:
        "Redução de tempo de resposta em dúvidas básicas, melhorando a conversão de e-commerce.",
    },
  };

  return (
    <div className="flex flex-col h-full justify-between gap-6 py-2">
      {/* Header */}
      <div className="text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Aplicações Práticas
        </span>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Como a automação funciona no seu setor?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Seja qual for seu nicho, nós desenhamos fluxos de trabalho que poupam tempo e multiplicam
          vendas.
        </p>
      </div>

      {/* Segments Interactive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[58vh] overflow-y-auto lg:overflow-visible">
        {/* Horizontal scroll selector (Mobile) or vertical rail (Desktop) */}
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:col-span-4 pb-2 lg:pb-0 shrink-0">
          {segments.map((seg) => {
            const Icon = seg.icon;
            const isActive = activeSegment === seg.id;

            return (
              <button
                key={seg.id}
                onClick={() => setActiveSegment(seg.id)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all shrink-0 w-[180px] lg:w-full select-none ${
                  isActive
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border/60 bg-transparent hover:border-border"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span
                  className={`text-xs font-bold ${isActive ? "text-primary" : "text-foreground"}`}
                >
                  {seg.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed flow (Right) */}
        <div className="lg:col-span-8 flex flex-col justify-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSegment}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-card/40 border border-border/60 rounded-2xl p-5.5 text-left flex flex-col h-full"
            >
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-brand-green" />
                {automationFlows[activeSegment].title}
              </h3>

              {/* Dynamic steps bullet line */}
              <div className="space-y-3.5 relative pl-4 border-l border-border/80">
                {automationFlows[activeSegment].flow.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Floating number dot */}
                    <span className="absolute -left-[24px] top-0 h-4.5 w-4.5 bg-background border border-primary/50 text-primary rounded-full flex items-center justify-center font-bold text-[9px]">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-foreground/90 font-medium pl-1 leading-normal">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {/* Benefit Card */}
              <div className="mt-6 border border-brand-green/20 bg-brand-green/[0.02] p-3 rounded-xl flex items-center gap-3">
                <Award className="h-5 w-5 text-brand-green shrink-0" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green">
                    Benefício Comercial:
                  </span>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                    {automationFlows[activeSegment].benefit}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Slide 11 Component: Who We Are & Team
export function Slide11() {
  return (
    <div className="grid h-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 py-2">
      {/* Content Left */}
      <div className="flex flex-col justify-center lg:col-span-6 text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Nossa História
        </span>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Quem está por trás da Caetus Systems?
        </h2>
        <p className="mt-3.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Fundada por <strong className="text-foreground">Henrique Caetano</strong>, profissional
          com mais de 5 anos de experiência no mercado de engenharia de software e arquitetura de
          sistemas corporativos.
        </p>

        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Sólida Experiência</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-normal">
                Sistemas criados sob medida com tecnologia de ponta utilizada por gigantes do
                mercado como Linear e Vercel.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-brand-green/10 p-2 text-brand-green shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Atendimento Regional Próximo</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-normal">
                Baseados em Lagoa Santa / BH. Oferecemos atendimento presencial diferenciado para
                criar uma parceria de confiança real com você.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Photo (Right) */}
      <div className="lg:col-span-6 flex items-center justify-center">
        <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-muted/60 via-card to-muted/40 shadow-lg">
          <img
            src="/Henrique Caetano.jpeg"
            alt="Henrique Caetano"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute bottom-3 left-3 right-3 bg-background/90 backdrop-blur-md border border-border p-3.5 rounded-xl text-left">
            <h4 className="text-xs font-bold text-foreground">Henrique Caetano</h4>
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
              Fundador & Diretor de Tecnologia
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Slide 12 Component: Next Steps & Call to Action
export function Slide12() {
  const WHATSAPP_NUMBER = "5531972131824";
  const WHATSAPP_MESSAGE =
    "Olá! Acabei de assistir à apresentação comercial da Caetus Systems e gostaria de agendar nosso diagnóstico gratuito de operação digital.";
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="flex flex-col h-full justify-between items-center text-center py-4">
      {/* Container middle */}
      <div className="my-auto max-w-2xl flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="inline-flex items-center gap-1 rounded-full bg-brand-green/10 border border-brand-green/30 px-3 py-1 text-[11px] font-bold text-brand-green uppercase tracking-wider"
        >
          <Sparkles className="h-3 w-3" />
          Comece Hoje Mesmo
        </motion.div>

        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Pronto para descomplicar a tecnologia da sua empresa?
        </h2>

        <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
          Vamos fazer um diagnóstico 100% gratuito da presença digital do seu negócio. Identificamos
          onde você está perdendo vendas e montamos o plano de ação ideal.
        </p>

        {/* Action Steps Visual */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-8 text-left">
          <div className="border border-border/80 bg-card p-3.5 rounded-xl">
            <span className="text-[10px] font-extrabold text-primary uppercase">Passo 01</span>
            <h4 className="text-xs font-bold text-foreground mt-0.5">Diagnóstico Grátis</h4>
            <p className="text-[10px] text-muted-foreground mt-1">
              Análise completa das suas redes, site e Google.
            </p>
          </div>

          <div className="border border-border/80 bg-card p-3.5 rounded-xl">
            <span className="text-[10px] font-extrabold text-brand-green uppercase">Passo 02</span>
            <h4 className="text-xs font-bold text-foreground mt-0.5">Setup & Treino</h4>
            <p className="text-[10px] text-muted-foreground mt-1">
              Desenvolvemos seu site, sistemas e treinamos a IA.
            </p>
          </div>

          <div className="border border-border/80 bg-card p-3.5 rounded-xl">
            <span className="text-[10px] font-extrabold text-amber-500 uppercase">Passo 03</span>
            <h4 className="text-xs font-bold text-foreground mt-0.5">Escala Contínua</h4>
            <p className="text-[10px] text-muted-foreground mt-1">
              Nós operamos os bastidores e você foca em vender.
            </p>
          </div>
        </div>

        {/* Main CTA Trigger */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3.5 items-center justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-green px-7 text-sm font-bold text-white shadow-lg shadow-brand-green/20 hover:scale-[1.03] transition-all"
          >
            Falar no WhatsApp & Agendar Diagnóstico
            <ArrowRight className="h-4.5 w-4.5 ml-2" />
          </a>
          <span className="text-xs text-muted-foreground">
            Diagnóstico de 20 minutos sem compromisso.
          </span>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="text-xs text-muted-foreground/60">
        Caetus Systems — Você cuida do seu negócio. A gente cuida do digital.
      </div>
    </div>
  );
}
