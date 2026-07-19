import { MapPin, Globe, ListChecks, Bot, Building2 } from "lucide-react";
import { BlogArticleLayout, BlogSection } from "@/components/BlogArticleLayout";
import {
  Highlight,
  ComparisonGrid,
  BeforeAfterGrid,
  AnimatedChecklist,
  FlowSteps,
  CalloutBlock,
  InlineCta,
} from "@/components/BlogVisuals";

const FAQ = [
  {
    q: "O Perfil da Empresa no Google substitui um site?",
    a: "Não. Ele ajuda sua empresa a aparecer na Pesquisa e no Maps, mas o site ainda é onde você explica melhor seus serviços, passa confiança e organiza as informações que fecham a decisão do cliente.",
  },
  {
    q: "Por que meu Perfil da Empresa recebe visualizações, mas poucos contatos?",
    a: "Porque visibilidade e conversão não são a mesma coisa. O perfil traz atenção; o site, quando está bem feito, transforma essa atenção em pedido de orçamento, ligação ou WhatsApp.",
  },
  {
    q: "Uma empresa pequena realmente precisa de site se já usa Instagram e WhatsApp?",
    a: "Sim, na maioria dos casos. Instagram e WhatsApp são bons canais de contato, mas o site funciona como base oficial da empresa e ajuda o Google e as IAs a entenderem melhor o que você faz.",
  },
  {
    q: "O que não pode faltar em um site para complementar o Google Maps?",
    a: "Página de serviços clara, endereço ou área atendida, telefones, horários, FAQ, prova social e um caminho simples para contato. Isso reduz dúvida e acelera a decisão.",
  },
  {
    q: "Qual é o melhor primeiro passo para quem só tem o perfil no Google?",
    a: "Criar um site simples, rápido e direto, com as informações que o cliente precisa para confiar em você. Depois, conectar esse site ao Perfil da Empresa e manter tudo consistente.",
  },
];

export default function BlogPerfilGoogleNaoSubstituiSite() {
  return (
    <BlogArticleLayout
      url="/blog/perfil-google-nao-substitui-site"
      title="Seu Perfil do Google não substitui um site"
      titleNode={
        <>
          Seu Perfil do Google <Highlight>não substitui um site</Highlight>
        </>
      }
      description="Entenda por que o Perfil da Empresa ajuda na descoberta, mas o site ainda é o que organiza a confiança e converte visitas em contato."
      published="2026-07-18"
      eyebrow="Presença digital • Google Maps e site"
      lead="O Perfil da Empresa ajuda sua empresa a ser encontrada no Maps. O site é o que explica o que você faz, passa confiança e transforma esse achado em contato."
      tags={[
        "Perfil da Empresa no Google",
        "Google Maps",
        "site profissional",
        "presença digital",
        "SEO local",
      ]}
      faq={FAQ}
      references={[
        {
          label: "Ajuda do Perfil da Empresa no Google",
          href: "https://support.google.com/business/answer/7039811?hl=pt-BR",
        },
        {
          label: "Estabelecer os detalhes da empresa com o Google",
          href: "https://developers.google.com/search/docs/appearance/establish-business-details?hl=pt-br",
        },
        {
          label: "Crie seu Perfil da empresa no Google",
          href: "https://www.google.com/intl/pt-br_br/business/",
        },
      ]}
      ctaHref="/#solucoes"
      ctaLabel="Conhecer nossas soluções"
    >
      <BlogSection title="Um padrão comum em pequenas empresas">
        <p>
          Muita empresa pequena investe tempo no Perfil da Empresa, responde avaliações e atualiza
          fotos, mas continua dependendo de um site fraco ou nem tem site. O resultado é comum: a
          pessoa encontra a empresa, mas não encontra motivo suficiente para entrar em contato. O
          problema não é o Perfil — ele deve continuar ativo. É que, sozinho, ele não organiza tudo
          o que o cliente precisa para confiar em você.
        </p>
      </BlogSection>

      <BlogSection eyebrow="Exemplo real" icon={Building2} title="Uma oficina em Lagoa Santa">
        <p>
          No Google Maps ela aparece, recebe ligações e tem boas avaliações. Mas o cliente ainda
          quer saber se faz revisão, suspensão, troca de óleo ou atendimento para frota — perguntas
          que o Perfil não responde bem.
        </p>
        <div className="mt-6">
          <CalloutBlock icon={Globe}>
            Com uma página simples de serviços, cidades atendidas, FAQ e botão de contato, a
            decisão fica muito mais fácil — o mesmo vale para negócios em Vespasiano, Pedro
            Leopoldo e Belo Horizonte.
          </CalloutBlock>
        </div>
      </BlogSection>

      <BlogSection title="Onde cada um entrega valor" muted wide>
        <ComparisonGrid
          items={[
            {
              icon: MapPin,
              title: "Perfil da Empresa",
              subtitle: "descoberta rápida",
              desc: "Aparece no Google Maps, mostra telefone, horário, avaliações e fotos. Ótimo para ser encontrado — mas com espaço curto para explicar serviço, diferencial e processo.",
            },
            {
              icon: Globe,
              title: "Site",
              subtitle: "confiança e decisão",
              desc: "Conta a história do negócio com clareza: serviços, cidades atendidas, dúvidas frequentes e contato em um lugar só. Reduz incerteza e encurta o caminho até a decisão.",
            },
          ]}
        />
      </BlogSection>

      <BlogSection eyebrow="Por onde começar" icon={ListChecks} title="O que colocar no site primeiro">
        <div className="mx-auto max-w-2xl">
          <AnimatedChecklist
            items={[
              "Apresentação clara da empresa",
              "Página de serviços",
              "Prova social (avaliações, casos)",
              "Área atendida ou endereço",
              "Perguntas frequentes",
              "Caminho simples de contato (WhatsApp)",
            ]}
          />
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
          Não precisa começar grande: rápido, bem escrito e fácil de navegar já cumpre o papel.
          Depois dá para evoluir com páginas específicas, artigos e integrações.
        </p>
        <div className="mx-auto mt-6 max-w-2xl">
          <InlineCta
            title="Quer esse site pronto?"
            description="A Caetus Systems monta esse site com tudo isso já incluso, conectado ao seu Perfil da Empresa."
            whatsappMessage="Olá! Vim pelo blog e quero saber mais sobre sites profissionais da Caetus."
          />
        </div>
      </BlogSection>

      <BlogSection
        eyebrow="Sem site ainda"
        icon={ListChecks}
        title="Só perfil no Google vs. perfil + site"
        muted
        wide
      >
        <BeforeAfterGrid
          before={{
            label: "Só Perfil no Google",
            items: [
              "Boa visibilidade no Maps, pouca profundidade de informação",
              "Cliente precisa ligar ou ir até o local para tirar dúvidas simples",
              "Nome, telefone e serviços só existem em um lugar",
              "Nenhuma base própria para o Google e as IAs entenderem seu negócio",
            ],
          }}
          after={{
            label: "Perfil + Site",
            items: [
              "Descoberta rápida no Maps e explicação completa no site",
              "FAQ e página de serviços tiram dúvida antes do primeiro contato",
              "Nome, telefone e serviços consistentes nos dois lugares",
              "Base própria e estruturada, que Google e IAs conseguem citar",
            ],
          }}
        />
      </BlogSection>

      <BlogSection title="Como o Google e a IA usam essa combinação" wide>
        <FlowSteps
          highlightLast
          steps={[
            { icon: MapPin, label: "Perfil da Empresa" },
            { icon: Globe, label: "Site consistente" },
            { icon: Bot, label: "Google e IA entendem" },
          ]}
        />
        <p className="mx-auto mt-8 max-w-2xl text-center text-muted-foreground">
          Quando o perfil e o site falam a mesma língua, sua empresa fica mais fácil de entender —
          e mais fácil de aparecer, ser lembrada e ser citada.
        </p>
      </BlogSection>
    </BlogArticleLayout>
  );
}
