import {
  Search,
  Instagram,
  Globe,
  ShieldCheck,
  ListChecks,
  ScanSearch,
  Clock,
} from "lucide-react";
import { BlogArticleLayout, BlogSection } from "@/components/BlogArticleLayout";
import {
  Highlight,
  ComparisonGrid,
  AnimatedChecklist,
  BeforeAfterGrid,
  CalloutBlock,
  InlineCta,
} from "@/components/BlogVisuals";

const FAQ = [
  {
    q: "Por que meu Instagram aparece no Google e meu site não?",
    a: "O Instagram é um domínio com bilhões de páginas que o Google já rastreia continuamente há anos — uma conta nova ali entra nesse fluxo quase automaticamente. Um site novo é um domínio desconhecido: o Google só passa a indexá-lo depois que alguém confirma a propriedade (Google Search Console) e envia o sitemap, ou depois que ele encontra links apontando para esse site a partir de outra página já indexada.",
  },
  {
    q: "Como eu sei se meu site está indexado no Google?",
    a: 'Pesquise "site:seudominio.com.br" (sem espaço, sem www se o site não usar) direto na busca do Google. Se não aparecer nenhum resultado, o site não tem nenhuma página indexada — não é um problema de ranking, é ausência total de indexação.',
  },
  {
    q: "Cadastrar o Perfil da Empresa no Google já resolve?",
    a: "Ajuda bastante para aparecer no Google Maps e na aba de mapas da busca, mas é um cadastro separado do seu site — não faz o Google indexar as páginas do seu domínio automaticamente. Os dois precisam ser configurados: Perfil da Empresa para o Maps, Search Console para o site.",
  },
  {
    q: "Quanto tempo demora para o Google indexar um site novo depois da verificação?",
    a: "Normalmente de alguns dias a poucas semanas depois de verificar o domínio no Search Console e enviar o sitemap. Pedir a indexação manual de cada página (Inspeção de URL → Solicitar indexação) costuma acelerar as páginas principais.",
  },
  {
    q: "Só ter Instagram é suficiente para uma pequena empresa?",
    a: "Para quem já é cliente e segue o perfil, sim, o Instagram funciona. O problema é quem ainda não conhece a empresa e pesquisa no Google — sem um site indexado, essa pessoa encontra os concorrentes que têm site antes de encontrar você, mesmo que seu Instagram seja mais ativo que o deles.",
  },
];

export default function BlogInstagramNaoEGoogle() {
  return (
    <BlogArticleLayout
      url="/blog/aparece-no-instagram-mas-nao-no-google"
      title="Sua empresa some no Google, mas aparece no Instagram"
      titleNode={
        <>
          Sua empresa some no Google, <Highlight>mas aparece no Instagram</Highlight>
        </>
      }
      description="Entenda por que o Instagram da sua empresa aparece no Google e o site não — e o passo a passo real para o Google indexar seu site: Search Console, sitemap e Perfil da Empresa."
      published="2026-07-18"
      eyebrow="Presença digital • Google vs. redes sociais"
      lead="Isso acontece porque o Instagram já é rastreado pelo Google o tempo todo, enquanto um site novo só passa a aparecer nas buscas depois de um passo técnico que a maioria das pequenas empresas nunca faz: verificar o domínio no Google Search Console e enviar o sitemap."
      tags={[
        "SEO local",
        "Google Search Console",
        "Google Perfil da Empresa",
        "presença digital",
        "pequenas empresas",
      ]}
      faq={FAQ}
      references={[
        { label: "Google Search Console", href: "https://search.google.com/search-console/about" },
        { label: "Perfil da Empresa no Google", href: "https://www.google.com/business/" },
        {
          label: "Como a Busca do Google funciona",
          href: "https://developers.google.com/search/docs/fundamentals/how-search-works",
        },
      ]}
      ctaHref="/#solucoes"
      ctaLabel="Conhecer nossas soluções"
    >
      <BlogSection title="Por que isso acontece" wide>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Não é falta de sorte, e quase nunca é um problema técnico complicado. É uma diferença de
          ponto de partida entre os dois:
        </p>
        <div className="mt-10">
          <ComparisonGrid
            items={[
              {
                icon: Instagram,
                title: "Instagram",
                subtitle: "domínio já rastreado",
                desc: "Bilhões de páginas que o Google já rastreia continuamente há mais de uma década. Uma conta nova pública entra nesse fluxo quase sem esforço nenhum.",
              },
              {
                icon: Globe,
                title: "Site novo",
                subtitle: "domínio desconhecido",
                desc: "O Google nunca viu esse endereço antes. Só passa a indexar depois que alguém confirma a propriedade (Search Console) e mostra onde estão as páginas (sitemap).",
              },
            ]}
          />
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-muted-foreground">
          Sem esse passo, o site pode estar no ar, bonito, funcionando perfeitamente para quem já
          tem o link — e simplesmente não existir para quem pesquisa no Google.
        </p>
      </BlogSection>

      <BlogSection
        eyebrow="Teste de 10 segundos"
        icon={ScanSearch}
        title="Como saber se o seu site está indexado"
        muted
      >
        <CalloutBlock icon={Search}>
          Pesquise{" "}
          <code className="rounded bg-primary-foreground/15 px-2 py-1 text-lg">
            site:seudominio.com.br
          </code>{" "}
          direto no Google, sem espaço depois dos dois-pontos.
        </CalloutBlock>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
          Se aparecer pelo menos uma página, o site está indexado (o problema aí seria de
          ranqueamento, não de indexação). Se não aparecer nada, é isso: o Google não tem nenhuma
          página sua na base — não importa o quão bom o site seja. Foi exatamente esse teste que
          confirmou o problema que motivou este post: um site novo, bem construído, com toda a
          marcação técnica correta — e zero páginas indexadas, porque ninguém tinha verificado o
          domínio no Search Console ainda.
        </p>
      </BlogSection>

      <BlogSection eyebrow="Checklist Caetus" icon={ListChecks} title="O que realmente resolve isso">
        <div className="mx-auto max-w-2xl">
          <AnimatedChecklist
            items={[
              "Verificar o domínio no Google Search Console",
              "Enviar o sitemap do site pelo Search Console",
              'Pedir indexação manual das páginas principais ("Inspeção de URL")',
              "Criar/reivindicar o Perfil da Empresa no Google com dados idênticos ao site",
              "Registrar o mesmo sitemap no Bing Webmaster Tools",
            ]}
          />
        </div>
      </BlogSection>

      <BlogSection
        eyebrow="Risco silencioso"
        icon={ShieldCheck}
        title="Depender só do Instagram tem um custo escondido"
        muted
        wide
      >
        <BeforeAfterGrid
          before={{
            label: "Só Instagram",
            items: [
              "Só quem já segue o perfil te encontra",
              "Quem pesquisa o serviço no Google acha o concorrente primeiro",
              "A conta é da Meta — suspensão ou mudança de algoritmo foge do seu controle",
              "Nenhum canal seu é indexado como fonte de confiança",
            ],
          }}
          after={{
            label: "Site + Instagram",
            items: [
              "Aparece para quem já conhece e para quem está descobrindo agora",
              "Concorre de igual para igual nas buscas locais",
              "O site é seu — verificado, indexado, sob seu controle",
              "Instagram continua sendo o canal rápido e visual, sem carregar sozinho a presença digital",
            ],
          }}
        />
      </BlogSection>

      <BlogSection eyebrow="Sem site ainda?" icon={Clock} title="Comece pelo básico">
        <p>
          Sem site, não tem o que indexar — o Instagram continua sendo a única porta de entrada
          possível, e o problema descrito aqui nem chega a existir porque não há domínio próprio
          para verificar. Nesse caso o primeiro passo é ter um site profissional; os passos de
          indexação deste post entram logo em seguida.
        </p>
        <div className="mt-6">
          <InlineCta
            title="Ainda não tem site?"
            description="A Caetus Systems cria sites profissionais já prontos para o Google — e cuida da indexação por você."
            whatsappMessage="Olá! Vim pelo blog e quero saber mais sobre sites profissionais da Caetus."
          />
        </div>
      </BlogSection>
    </BlogArticleLayout>
  );
}
