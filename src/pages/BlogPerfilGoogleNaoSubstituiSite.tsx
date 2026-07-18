import { BlogArticleLayout, BlogSection } from "@/components/BlogArticleLayout";

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
      description="Entenda por que o Perfil da Empresa ajuda na descoberta, mas o site ainda é o que organiza a confiança e converte visitas em contato."
      published="2026-07-18"
      eyebrow="Presença digital • Google Maps e site"
      lead="O Perfil da Empresa no Google ajuda sua empresa a ser encontrada. O site é o que explica melhor o que você faz, passa confiança e transforma interesse em contato."
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
      <BlogSection title="Por que esse assunto importa?">
        <p>
          Muita empresa pequena investe tempo no Perfil da Empresa, responde avaliações e atualiza
          fotos, mas continua dependendo de um site fraco ou nem tem site. O resultado é comum: a
          pessoa encontra a empresa, mas não encontra motivo suficiente para entrar em contato.
        </p>
        <p>
          O problema não é o Perfil da Empresa. Ele é útil e deve continuar ativo. O ponto é que,
          sozinho, ele não organiza tudo o que o cliente precisa para confiar em você.
        </p>
      </BlogSection>

      <BlogSection title="O que o perfil faz bem e onde ele para" muted>
        <p>
          O perfil ajuda a aparecer no Google Maps, mostra telefone, horário, avaliações e fotos.
          Isso é ótimo para descoberta rápida. Mas ele tem espaço limitado para explicar serviço,
          diferencial, processo e contexto.
        </p>
        <p>
          Já o site permite contar a história do seu negócio com clareza. Você mostra serviços,
          cidades atendidas, dúvidas frequentes e formas de contato em um lugar só. Isso reduz a
          incerteza e encurta o caminho até a decisão.
        </p>
      </BlogSection>

      <BlogSection title="Por que o site ainda pesa na decisão?">
        <p>
          Quando alguém está escolhendo uma empresa de confiança, ela quer respostas simples:
          quem atende, o que faz, onde atende e como falar com você. O site é o lugar ideal para
          responder isso sem depender de vários links soltos.
        </p>
        <p>
          Ele também ajuda sua presença digital a ficar mais consistente. Se o nome, telefone,
          endereço e serviços aparecem do mesmo jeito no site e no Perfil da Empresa, o Google e o
          cliente entendem sua operação com mais facilidade.
        </p>
      </BlogSection>

      <BlogSection title="Exemplo real de negócio local" muted>
        <p>
          Pense em uma oficina em Lagoa Santa. No Google Maps, ela aparece, recebe ligações e tem
          boas avaliações. Mas o cliente ainda quer saber se faz revisão, suspensão, troca de óleo
          ou atendimento para frota.
        </p>
        <p>
          Se o site tiver uma página simples com serviços, cidades atendidas, perguntas frequentes e
          botão de contato, a decisão fica muito mais fácil. O mesmo vale para negócios em
          Vespasiano, Pedro Leopoldo e Belo Horizonte que dependem de confiança antes da primeira
          conversa.
        </p>
      </BlogSection>

      <BlogSection title="O que colocar no site primeiro?">
        <p>
          Não comece tentando fazer um site grande. Comece com o essencial: apresentação clara da
          empresa, serviços, prova social, contato, mapa ou área atendida e respostas às dúvidas
          mais comuns.
        </p>
        <p>
          Se o site estiver rápido, bem escrito e fácil de navegar, ele já cumpre seu papel. Depois
          você pode evoluir com páginas específicas, artigos e integrações com WhatsApp ou sistemas
          internos.
        </p>
      </BlogSection>

      <BlogSection title="Como o Google e a IA usam essa combinação?" muted>
        <p>
          O Google usa sinais do site e do Perfil da Empresa para entender se sua empresa é real,
          local e confiável. Já as inteligências artificiais procuram informações organizadas para
          responder perguntas com mais segurança.
        </p>
        <p>
          Quando o perfil e o site falam a mesma língua, sua empresa fica mais fácil de entender.
          Isso melhora a chance de aparecer, ser lembrada e ser citada.
        </p>
      </BlogSection>
    </BlogArticleLayout>
  );
}
