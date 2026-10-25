import {
  Bot,
  CalendarClock,
  ClipboardCheck,
  Gavel,
  Scale,
  Sparkles,
  Store,
  Wrench,
} from "lucide-react";
import { BlogArticleLayout, BlogSection } from "@/components/BlogArticleLayout";
import {
  AnimatedChecklist,
  CalloutBlock,
  ComparisonGrid,
  Highlight,
  InlineCta,
  Timeline,
} from "@/components/BlogVisuals";
import { OFFERS } from "@/data/offers";

const FAQ = [
  {
    q: "O que é a IA do WhatsApp Business?",
    a: "É o Business AI, um agente de inteligência artificial da própria Meta dentro do WhatsApp Business. Ele responde clientes automaticamente, indica produtos do catálogo e continua atendendo fora do horário comercial. A liberação no Brasil é gradual.",
  },
  {
    q: "Como ativar a IA do WhatsApp Business?",
    a: "Segundo a Exame, a ativação é pela aba Ferramentas, na opção IA para empresas, quando a sua conta já foi liberada. É preciso usar o WhatsApp Business em português e ter pelo menos um item cadastrado no catálogo.",
  },
  {
    q: "A IA do WhatsApp Business é paga?",
    a: "A matéria da Exame sobre o lançamento no Brasil não informa preço nem condições de cobrança. Confira as condições dentro da própria ferramenta antes de ativar e acompanhe os avisos da Meta.",
  },
  {
    q: "O ChatGPT foi proibido no WhatsApp?",
    a: "A Meta mudou os termos da API do WhatsApp Business para barrar assistentes de IA de terceiros a partir de 15 de janeiro de 2026. No Brasil, o Cade suspendeu essa regra e, em 4 de março de 2026, o tribunal do órgão manteve a suspensão. A situação pode ter mudado desde então, por isso vale checar a notícia mais recente.",
  },
  {
    q: "O chatbot de atendimento da minha empresa é afetado por essa regra?",
    a: "Segundo reportagens sobre o caso, a restrição mira bots cuja função principal é dar acesso a uma IA geral, e não o atendimento de uma empresa. Mesmo assim, confirme com quem opera o seu atendente como ele se encaixa nos termos atuais.",
  },
  {
    q: "A IA do app basta ou preciso de um atendente próprio?",
    a: "Para perguntas simples sobre catálogo e horário, a IA do app pode bastar. Um atendente próprio costuma compensar quando há agenda, regras específicas do negócio, vários canais ou necessidade de ajustar o tom e acompanhar o que foi respondido.",
  },
];

export default function BlogIaWhatsAppBusiness2026() {
  return (
    <BlogArticleLayout
      url="/blog/ia-whatsapp-business-2026"
      title="IA do WhatsApp Business: o que faz e quando não basta"
      titleNode={
        <>
          IA do WhatsApp Business: <Highlight>o que faz e quando não basta</Highlight>
        </>
      }
      description="A Meta liberou a IA do WhatsApp Business no Brasil. Veja como ela funciona, o que mudou nas regras para chatbots e quando vale ter um atendente próprio."
      published="2026-10-25"
      eyebrow="Atendimento digital • IA no WhatsApp Business"
      lead="A Meta liberou no Brasil a IA do WhatsApp Business, que responde clientes 24 horas com base no seu catálogo. Ela ajuda quando as perguntas são simples. Quando o atendimento envolve agenda, regras próprias ou outros canais, um atendente próprio ainda faz diferença."
      tags={[
        "IA do WhatsApp Business",
        "Business AI",
        "chatbot para WhatsApp",
        "atendente virtual",
        "Cade e WhatsApp",
      ]}
      faq={FAQ}
      references={[
        {
          label: "Exame: WhatsApp Business lança IA para PMEs atenderem clientes 24 horas por dia",
          href: "https://exame.com/negocios/whatsapp-business-lanca-ia-para-pmes-atenderem-clientes-24-horas-por-dia/",
        },
        {
          label:
            "MacMagazine: tribunal do Cade mantém liminar contra termos de IA do WhatsApp no Brasil",
          href: "https://macmagazine.com.br/post/2026/03/04/tribunal-do-cade-mantem-liminar-contra-termos-de-ia-do-whatsapp-no-brasil/",
        },
      ]}
      ctaHref={OFFERS.atendente.path}
      ctaLabel="Agendar demonstração do atendente"
    >
      <BlogSection
        eyebrow="O que chegou"
        icon={Sparkles}
        title="Como funciona a IA do WhatsApp Business?"
        lead="O Business AI é um agente de IA dentro do próprio aplicativo. Ele responde clientes, indica produtos do catálogo e segue atendendo quando você está fora do horário."
        wide
      >
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Segundo a Exame, em 24 de fevereiro de 2026, o recurso começou a ser liberado para
          pequenas e médias empresas no Brasil, depois de testes no México. A liberação é gradual,
          então nem toda conta tem acesso ainda. Para usar, é preciso ter o WhatsApp Business em
          português e pelo menos um item no catálogo.
        </p>
        <div className="mt-8">
          <ComparisonGrid
            items={[
              {
                icon: Store,
                title: "Usa o seu catálogo",
                subtitle: "base das respostas",
                desc: "Responde com o que está cadastrado: catálogo, horários e perguntas frequentes do seu negócio.",
              },
              {
                icon: Bot,
                title: "Atende o dia todo",
                subtitle: "24 horas, 7 dias",
                desc: "Mantém a conversa fora do horário comercial e conduz as primeiras etapas do atendimento.",
              },
              {
                icon: ClipboardCheck,
                title: "Você tem o controle",
                subtitle: "assume quando quiser",
                desc: "Dá para assumir a conversa, revisar e editar respostas, definir horários e escolher quais clientes serão atendidos.",
              },
            ]}
          />
        </div>
      </BlogSection>

      <BlogSection eyebrow="Dúvida comum" icon={Scale} title="É pago? Como ativar?" muted>
        <p className="text-muted-foreground">
          A ativação fica na aba Ferramentas, na opção IA para empresas, quando a sua conta já foi
          liberada. Sobre preço, a matéria do lançamento não informa cobrança nem condições. Confira
          as condições dentro da própria ferramenta antes de ligar e releia sempre que a Meta avisar
          mudanças.
        </p>
      </BlogSection>

      <BlogSection
        eyebrow="Regras em disputa"
        icon={Gavel}
        title="O que aconteceu com os chatbots de IA de terceiros?"
        lead="A Meta mudou os termos da API para barrar assistentes de IA de terceiros, e o Cade suspendeu essa regra no Brasil. O caso teve idas e vindas na Justiça."
        wide
      >
        <div className="mx-auto max-w-3xl">
          <Timeline
            steps={[
              {
                tag: "13/01/2026",
                title: "Cade suspende a mudança",
                desc: "O órgão investiga a Meta e suspende os novos termos que barravam IAs de terceiros na plataforma de negócios.",
                icon: Gavel,
              },
              {
                tag: "23/01/2026",
                title: "Justiça derruba a liminar",
                desc: "A Justiça Federal do Distrito Federal suspende a medida do Cade e os termos voltam a valer.",
                icon: Scale,
              },
              {
                tag: "03/03/2026",
                title: "Decisão é revertida",
                desc: "A decisão judicial é revertida em favor do andamento da investigação.",
                icon: Scale,
              },
              {
                tag: "04/03/2026",
                title: "Cade mantém a suspensão",
                desc: "O tribunal do Cade mantém a medida preventiva. A empresa diz que vai cumprir e atualizar termos e preços onde for obrigada.",
                icon: Gavel,
              },
            ]}
          />
        </div>
        <div className="mt-8">
          <CalloutBlock icon={Scale}>
            Atendimento de uma empresa e acesso a uma IA geral são coisas diferentes. A regra em
            disputa mira o segundo caso.
          </CalloutBlock>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-sm text-muted-foreground">
          As datas acima vão até março de 2026. O caso pode ter avançado desde então, então confira
          a notícia mais recente antes de decidir.
        </p>
      </BlogSection>

      <BlogSection
        eyebrow="Na prática"
        icon={Wrench}
        title="IA do app ou atendente próprio?"
        muted
        wide
      >
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Imagine uma barbearia em Lagoa Santa com seis serviços e horários diferentes por
          profissional. Responder o endereço e o horário de abertura a IA do app resolve. Marcar o
          corte com o barbeiro certo, no horário livre, já depende de regras que são só dela.
        </p>
        <div className="mt-8">
          <ComparisonGrid
            items={[
              {
                icon: Sparkles,
                title: "A IA do app costuma bastar",
                subtitle: "perguntas simples",
                desc: "Quando há poucos produtos, o catálogo do WhatsApp está completo e o principal problema é responder fora do horário.",
              },
              {
                icon: CalendarClock,
                title: "Vale avaliar um atendente próprio",
                subtitle: "regras do seu negócio",
                desc: "Quando o cliente precisa marcar horário, as perguntas são específicas (matrícula, orçamento, pacotes) ou você quer o mesmo atendimento no site e no WhatsApp, com tom ajustado e acompanhamento do que foi respondido.",
              },
            ]}
          />
        </div>
        <div className="mt-8">
          <InlineCta
            title="Quer ver um atendente funcionando no seu negócio?"
            description="A gente mostra o atendente respondendo com as informações da sua empresa, sem compromisso."
            whatsappMessage="Olá! Li o artigo sobre a IA do WhatsApp Business e quero ver um atendente funcionando no meu negócio."
            productHref={OFFERS.atendente.path}
            productLabel="Agendar demonstração"
          />
        </div>
      </BlogSection>

      <BlogSection
        eyebrow="Checklist Caetus"
        icon={CalendarClock}
        title="O que conferir antes de ligar qualquer IA no WhatsApp"
      >
        <div className="mx-auto max-w-2xl">
          <AnimatedChecklist
            items={[
              "Revise catálogo, preços e horários: a IA só responde bem com informação certa",
              "Defina quando a conversa passa para uma pessoa",
              "Teste com perguntas reais dos seus clientes",
              "Confira as condições e a política atual da Meta",
              "Acompanhe as primeiras conversas e corrija o que errar",
            ]}
          />
        </div>
      </BlogSection>
    </BlogArticleLayout>
  );
}
