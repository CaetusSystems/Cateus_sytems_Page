import { MousePointerClick, MessageSquareText, Search, ShieldCheck, Target, Workflow } from "lucide-react";
import { BlogArticleLayout, BlogSection } from "@/components/BlogArticleLayout";
import {
  Highlight,
  ComparisonGrid,
  BeforeAfterGrid,
  AnimatedChecklist,
  Timeline,
  CalloutBlock,
  InlineCta,
} from "@/components/BlogVisuals";

const FAQ = [
  {
    q: "Por que meu site recebe visita e não gera contato?",
    a: "Na maioria dos casos, o site responde mal às dúvidas básicas do cliente: o que a empresa faz, para quem atende, quanto custa em termos gerais e como falar com alguém agora. Se a página não entrega essa resposta em poucos segundos, a pessoa sai sem deixar contato.",
  },
  {
    q: "O problema é o tráfego ou a página?",
    a: "Nem sempre é falta de visita. Muitas vezes o visitante até chegou, mas a página não criou confiança nem deixou o próximo passo claro. O gargalo está na conversão, não na entrada.",
  },
  {
    q: "O que um site de pequena empresa precisa mostrar primeiro?",
    a: "Serviços, área atendida, prova de que a empresa existe de verdade, dúvidas frequentes e um botão de contato visível. Isso reduz atrito e faz o cliente entender rápido se vale a pena falar com você.",
  },
  {
    q: "WhatsApp no site resolve sozinho?",
    a: "Ajuda, mas não resolve sozinho. Se o site não explicar bem o serviço e não gerar confiança, o botão de WhatsApp vira só mais um elemento na página. O caminho precisa estar claro antes do clique.",
  },
  {
    q: "Um site simples já pode converter bem?",
    a: "Sim. Site simples não significa site vazio. Uma estrutura enxuta, rápida e objetiva costuma converter melhor do que páginas longas que tentam falar de tudo e não convencem em nada.",
  },
];

const TIMELINE_STEPS = [
  {
    tag: "01",
    title: "A pessoa chega",
    desc: "Ela veio do Google, do Instagram ou de um link enviado por alguém. Ainda não está convencida.",
    icon: Search,
  },
  {
    tag: "02",
    title: "Ela procura resposta",
    desc: "Em poucos segundos, quer saber o que a empresa faz, se atende a região e se é confiável.",
    icon: MessageSquareText,
  },
  {
    tag: "03",
    title: "Ela compara mentalmente",
    desc: "Se a página estiver vaga, o visitante compara com outro site mais claro e segue adiante.",
    icon: Workflow,
  },
  {
    tag: "04",
    title: "Ela chama ou sai",
    desc: "Quando encontra clareza e segurança, ela clica no WhatsApp ou no formulário. Quando não encontra, fecha a aba.",
    icon: MousePointerClick,
  },
];

export default function BlogSiteNaoConverte() {
  return (
    <BlogArticleLayout
      url="/blog/site-nao-converte-em-contato"
      title="Seu site recebe visitas, mas não gera contato"
      titleNode={
        <>
          Seu site recebe visitas, <Highlight>mas não gera contato</Highlight>
        </>
      }
      description="Entenda por que um site pode receber visitas e ainda assim não gerar contato, e veja o que ajustar para transformar acesso em WhatsApp."
      published="2026-07-19"
      eyebrow="Presença digital • Conversão do site"
      lead="Quando o site recebe visita e não gera contato, o problema quase nunca é só tráfego. Normalmente falta clareza, confiança ou um próximo passo simples demais para o cliente agir."
      tags={[
        "conversão de site",
        "site institucional",
        "WhatsApp no site",
        "pequenas empresas",
        "presença digital",
      ]}
      faq={FAQ}
      references={[
        {
          label: "Creating helpful, reliable, people-first content",
          href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
        },
        {
          label: "Top ways to ensure your content performs well in Google's AI experiences",
          href: "https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search",
        },
        {
          label: "Better page titles in search results",
          href: "https://developers.google.com/search/blog/2012/01/better-page-titles-in-search-results",
        },
      ]}
      ctaHref="/#solucoes"
      ctaLabel="Conhecer nossas soluções"
    >
      <BlogSection title="Onde a conversão se perde" wide>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          O visitante não decide em uma única frase. Ele faz uma checagem rápida: “entendi o que
          esta empresa faz?”, “parece confiável?” e “consigo falar com alguém sem esforço?”.
        </p>
        <div className="mt-8">
          <Timeline steps={TIMELINE_STEPS} />
        </div>
      </BlogSection>

      <BlogSection eyebrow="Comparação prática" icon={Target} title="O que muda quando a página ajuda de verdade" muted wide>
        <ComparisonGrid
          items={[
            {
              icon: Search,
              title: "Página vaga",
              subtitle: "muito texto, pouca resposta",
              desc: "Fala da empresa de forma genérica, mas não deixa claro serviço, região atendida nem por que a pessoa deveria agir agora.",
            },
            {
              icon: ShieldCheck,
              title: "Página clara",
              subtitle: "resposta rápida",
              desc: "Mostra o essencial logo no início: serviço, benefício, prova de confiança e contato. Isso reduz dúvida e encurta a decisão.",
            },
          ]}
        />
        <div className="mt-8">
          <CalloutBlock icon={Target}>
            Se o visitante precisa pensar demais para entender o que fazer, ele normalmente não faz
            nada.
          </CalloutBlock>
        </div>
      </BlogSection>

      <BlogSection eyebrow="Exemplo local" title="Uma clínica em Lagoa Santa" wide>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          A clínica até recebia visitas no site. O problema era que a página falava da história da
          empresa, mas escondia o que o paciente realmente queria saber: quais serviços existiam,
          se atendia convênio, como agendar e qual o tempo de resposta.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Quando a home passou a abrir com serviços, perguntas frequentes, cidades atendidas e um
          botão de WhatsApp em destaque, o site deixou de ser só uma vitrine e começou a virar
          canal de contato. O mesmo padrão vale para negócios em Vespasiano, Pedro Leopoldo e Belo
          Horizonte.
        </p>
        <div className="mt-6">
          <InlineCta
            title="Seu site também está assim?"
            description="A Caetus Systems ajusta estrutura, conteúdo e caminho de contato para o site trabalhar a favor da conversão."
            whatsappMessage="Olá! Vim pelo blog e quero saber como melhorar a conversão do meu site."
            productHref="/#solucoes"
            productLabel="Ver soluções"
          />
        </div>
      </BlogSection>

      <BlogSection eyebrow="Checklist Caetus" icon={Workflow} title="O que revisar primeiro" muted>
        <div className="mx-auto max-w-2xl">
          <AnimatedChecklist
            items={[
              "Deixar o serviço principal claro no primeiro bloco",
              "Mostrar cidade ou região atendida",
              "Colocar prova de confiança visível",
              "Reduzir o formulário ou usar WhatsApp",
              "Responder dúvidas antes que o cliente precise perguntar",
              "Repetir o contato em pontos estratégicos da página",
            ]}
          />
        </div>
      </BlogSection>

      <BlogSection title="Sem isso, o site vira só visita" muted wide>
        <BeforeAfterGrid
          before={{
            label: "Sem estrutura de conversão",
            items: [
              "A visita entra e sai rápido",
              "O cliente não entende o próximo passo",
              "O botão de contato fica escondido",
              "A página não tira dúvidas básicas",
            ],
          }}
          after={{
            label: "Com estrutura de conversão",
            items: [
              "A mensagem principal aparece cedo",
              "O visitante entende o valor da empresa",
              "O contato fica óbvio e fácil",
              "A página ajuda a tomar decisão",
            ],
          }}
        />
      </BlogSection>

      <BlogSection eyebrow="Próximo passo" icon={MousePointerClick} title="Se o site já existe, comece por aqui">
        <p>
          Não precisa refazer tudo de uma vez. Em muitos casos, ajustar a ordem das informações,
          melhorar a proposta acima da dobra e deixar o contato mais acessível já muda o resultado.
          A base é a mesma lógica de um atendimento bom: responder rápido, com clareza e sem
          complicar.
        </p>
        <div className="mt-6">
          <InlineCta
            title="Quer transformar visita em contato?"
            description="Fale com a Caetus Systems e veja o que precisa mudar no seu site para ele vender melhor."
            whatsappMessage="Olá! Vim pelo blog e quero transformar visitas do site em contatos."
          />
        </div>
      </BlogSection>
    </BlogArticleLayout>
  );
}
