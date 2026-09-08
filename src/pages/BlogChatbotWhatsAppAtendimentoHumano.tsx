import {
  Bot,
  CheckCircle2,
  Clock3,
  MessageCircle,
  ShieldCheck,
  UserRound,
  UsersRound,
  Workflow,
} from "lucide-react";
import { BlogArticleLayout, BlogSection } from "@/components/BlogArticleLayout";
import {
  AnimatedChecklist,
  BeforeAfterGrid,
  CalloutBlock,
  ComparisonGrid,
  FlowSteps,
  Highlight,
  InlineCta,
} from "@/components/BlogVisuals";

const FAQ = [
  {
    q: "O que é um atendente digital no WhatsApp?",
    a: "É um sistema que responde as primeiras mensagens, consulta as informações da empresa, entende a intenção do cliente e organiza o próximo passo. Quando a conversa precisa de julgamento ou negociação, ele encaminha para uma pessoa.",
  },
  {
    q: "Qual é a diferença entre chatbot e inteligência artificial no WhatsApp?",
    a: "Um chatbot tradicional costuma seguir menus e palavras-chave pré-configuradas. Um atendente com IA consegue interpretar a pergunta escrita de formas diferentes, desde que tenha uma base confiável sobre a empresa e regras claras para agir.",
  },
  {
    q: "A IA vai substituir o atendente da minha empresa?",
    a: "Não deveria. O melhor uso é cuidar das dúvidas repetidas e da triagem, enquanto a equipe assume casos complexos, negociações e situações que pedem sensibilidade. O resultado é menos interrupção para a equipe e mais continuidade para o cliente.",
  },
  {
    q: "A IA consegue marcar horários pelo WhatsApp?",
    a: "Consegue, desde que o fluxo esteja conectado à agenda ou siga regras bem definidas de disponibilidade. Antes de automatizar, é importante mapear duração dos serviços, horários, profissionais e o que acontece quando o cliente precisa alterar o agendamento.",
  },
  {
    q: "Como evitar que o chatbot dê uma resposta errada?",
    a: "Comece com uma base revisada de serviços, preços, horários e políticas. Também configure limites: a IA não deve inventar informações, prometer o que a empresa não entrega nem insistir quando a pessoa pedir atendimento humano.",
  },
];

export default function BlogChatbotWhatsAppAtendimentoHumano() {
  return (
    <BlogArticleLayout
      url="/blog/chatbot-para-whatsapp-atendimento-humano"
      title="Chatbot para WhatsApp: quando ele ajuda de verdade"
      titleNode={
        <>
          Chatbot para WhatsApp: <Highlight>quando ele ajuda de verdade</Highlight>
        </>
      }
      description="Entenda como um atendente digital com IA pode responder no WhatsApp, organizar a triagem e passar a conversa para uma pessoa na hora certa, hoje."
      published="2026-09-08"
      eyebrow="Atendimento digital • WhatsApp com IA"
      lead="Um bom atendente digital não tenta esconder que existe tecnologia. Ele responde o básico rapidamente, entende o pedido do cliente e chama sua equipe quando a conversa realmente precisa de uma pessoa."
      tags={[
        "chatbot para WhatsApp",
        "atendente digital",
        "IA no atendimento",
        "WhatsApp para empresas",
        "automação de atendimento",
      ]}
      faq={FAQ}
      references={[
        {
          label: "Sebrae: IA para pequenos negócios",
          href: "https://sebrae.com.br/Sebrae/Portal%20Sebrae/UFs/MS/Anexos/2026/IA%20para%20Pequenos%20Negocios.pdf",
        },
        {
          label: "Sebrae: como vender pelo WhatsApp sem perder cliente",
          href: "https://sebrae.com.br/content/dam/portal-sebrae/na/midias/documentos/pdfs/ebook_como-vender-whatsapp-sem-perder-cliente.pdf",
        },
        {
          label: "Estudo sobre mensagens de atendimento no WhatsApp",
          href: "https://atendize.com/blog/estudo-100-mil-mensagens-whatsapp.html",
        },
      ]}
      ctaHref="/produtos/bot-whatsapp"
      ctaLabel="Conhecer o atendente virtual"
    >
      <BlogSection
        eyebrow="O problema real"
        icon={Clock3}
        title="Por que tantas mensagens ficam sem resposta?"
        lead="Na pequena empresa, o WhatsApp costuma ficar junto do caixa, da agenda, das entregas e da rotina do dono. Uma nova mensagem chega justamente quando ninguém consegue parar para responder."
        wide
      >
        <p className="mx-auto max-w-2xl text-muted-foreground">
          O cliente não enxerga essa correria. Ele só vê que perguntou sobre um preço, um horário ou
          um orçamento e continua esperando. Quando a resposta chega tarde, ele pode já ter procurado
          outra empresa, mesmo que o seu serviço fosse a melhor opção.
        </p>
        <div className="mt-8">
          <FlowSteps
            steps={[
              { icon: MessageCircle, label: "Cliente pergunta" },
              { icon: Clock3, label: "A equipe está ocupada" },
              { icon: UsersRound, label: "A conversa se perde" },
              { icon: CheckCircle2, label: "Outra empresa responde" },
            ]}
          />
        </div>
      </BlogSection>

      <BlogSection
        eyebrow="Não é tudo a mesma coisa"
        icon={Bot}
        title="Chatbot ou atendente digital: qual é a diferença?"
        muted
        wide
      >
        <p className="mx-auto max-w-2xl text-muted-foreground">
          A palavra chatbot descreve muita coisa. Pode ser um menu que pede para digitar 1, 2 ou 3,
          ou pode ser uma inteligência artificial capaz de entender uma frase natural. O que importa é
          se o fluxo resolve a dúvida ou apenas cria mais uma etapa.
        </p>
        <div className="mt-8">
          <ComparisonGrid
            items={[
              {
                icon: Workflow,
                title: "Menu engessado",
                subtitle: "responde opções",
                desc: "Funciona bem para caminhos curtos e previsíveis, mas trava quando o cliente escreve algo diferente do roteiro.",
              },
              {
                icon: Bot,
                title: "IA com contexto",
                subtitle: "entende a pergunta",
                desc: "Lê a intenção, consulta as informações disponíveis e responde de forma mais próxima da conversa real.",
              },
              {
                icon: UserRound,
                title: "Equipe humana",
                subtitle: "resolve exceções",
                desc: "Assume negociações, reclamações, decisões e qualquer situação em que confiança e julgamento importam.",
              },
            ]}
          />
        </div>
      </BlogSection>

      <BlogSection
        eyebrow="Checklist Caetus"
        icon={ShieldCheck}
        title="O que um atendente digital precisa fazer"
        lead="Automatizar não é colocar uma resposta automática no número da empresa. É organizar o caminho do cliente para que cada mensagem tenha um próximo passo claro."
      >
        <AnimatedChecklist
          items={[
            "Responder perguntas frequentes sem deixar o cliente esperando",
            "Informar horários, endereço, serviços e condições corretas",
            "Entender se a pessoa quer orçamento, agendamento ou informação",
            "Pedir os dados necessários sem fazer o cliente repetir tudo",
            "Registrar ou encaminhar o pedido para a equipe certa",
            "Chamar uma pessoa quando houver dúvida, urgência ou negociação",
          ]}
        />
      </BlogSection>

      <BlogSection title="Quando a conversa precisa passar para uma pessoa" wide>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          O atendimento fica melhor quando a IA conhece os próprios limites. Uma resposta automática
          não deve ser usada para empurrar uma reclamação, discutir um caso delicado ou insistir em
          vender depois que o cliente pediu ajuda humana.
        </p>
        <div className="mt-8">
          <BeforeAfterGrid
            before={{
              label: "IA sem limite claro",
              items: [
                "Repete a mesma resposta quando não entende",
                "Faz o cliente procurar a opção certa no menu",
                "Esconde o caminho para falar com alguém",
              ],
            }}
            after={{
              label: "IA com passagem humana",
              items: [
                "Reconhece quando não tem informação suficiente",
                "Entrega o contexto para a equipe continuar",
                "Mantém o cliente dentro de um fluxo organizado",
              ],
            }}
          />
        </div>
        <div className="mx-auto mt-8 max-w-2xl">
          <InlineCta
            title="Quer organizar o atendimento do seu WhatsApp?"
            description="A gente pode mapear as perguntas repetidas e montar um fluxo que respeita os limites da sua equipe."
            whatsappMessage="Olá! Quero entender como um atendente digital pode organizar o WhatsApp da minha empresa."
            productHref="/produtos/bot-whatsapp"
            productLabel="Ver solução"
          />
        </div>
      </BlogSection>

      <BlogSection eyebrow="Exemplo local" icon={MessageCircle} title="Uma oficina em Lagoa Santa" muted wide>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Imagine uma oficina que recebe mensagens sobre revisão, troca de óleo, pneus e orçamento.
          Durante o dia, alguém responde quando consegue. À noite, as perguntas ficam acumuladas e,
          na manhã seguinte, a equipe tenta lembrar quem pediu o quê.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Um atendente digital pode informar os serviços, perguntar o modelo do carro, entender se o
          cliente quer agendar ou apenas consultar um valor e deixar tudo pronto para a equipe. A
          pessoa continua importante, mas deixa de gastar o dia inteiro repetindo as mesmas respostas.
        </p>
        <div className="mt-8">
          <CalloutBlock icon={ShieldCheck}>
            A melhor automação é a que devolve tempo para a equipe sem fazer o cliente se sentir abandonado.
          </CalloutBlock>
        </div>
      </BlogSection>

      <BlogSection
        eyebrow="Comece pelo que se repete"
        icon={UsersRound}
        title="Como começar sem complicar"
        lead="Você não precisa automatizar todas as conversas no primeiro dia. Comece pelas perguntas que mais interrompem a rotina e evolua com o que a operação aprende."
      >
        <p>
          Liste as dez perguntas que mais chegam no WhatsApp. Depois, separe o que pode ser respondido
          com segurança, o que precisa de uma regra e o que deve sempre ir para uma pessoa. Esse mapa
          já mostra onde um atendente digital pode ajudar e onde a sua operação ainda precisa de uma
          decisão humana.
        </p>
        <p>
          Para uma pequena empresa de Vespasiano, Pedro Leopoldo, Belo Horizonte ou qualquer cidade da
          região, o ganho não está em parecer uma grande central de atendimento. Está em não perder uma
          conversa importante porque todos estavam ocupados ao mesmo tempo.
        </p>
        <p>
          A Caetus Systems cria soluções de WhatsApp com IA pensando na rotina real da empresa: o que
          responder, quando encaminhar e como manter a equipe no controle. Tecnologia trabalhando em
          segundo plano, enquanto você cuida do seu negócio.
        </p>
      </BlogSection>
    </BlogArticleLayout>
  );
}
