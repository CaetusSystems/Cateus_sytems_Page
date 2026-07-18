import { Link } from "react-router-dom";
import { BlogArticleLayout, BlogSection } from "@/components/BlogArticleLayout";

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
      <BlogSection title="Por que isso acontece">
        <p>
          Não é falta de sorte, e quase nunca é um problema técnico complicado. O Instagram é um
          domínio gigante que o Google já rastreia continuamente há mais de uma década — quando
          você cria uma conta e ela fica pública, ela entra nesse fluxo de rastreamento quase sem
          esforço nenhum da sua parte.
        </p>
        <p>
          Um site novo é o oposto: é um domínio que o Google nunca viu antes. Ele só passa a
          indexar as páginas depois que alguém confirma a propriedade daquele domínio (isso se faz
          no Google Search Console) e mostra ao Google onde estão as páginas — normalmente enviando
          um arquivo chamado sitemap. Sem esse passo, o site pode estar no ar, bonito, funcionando
          perfeitamente para quem já tem o link — e simplesmente não existir para quem pesquisa no
          Google.
        </p>
      </BlogSection>

      <BlogSection title="Como saber se o seu site está indexado" muted>
        <p>
          Existe um teste de 10 segundos: pesquise{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            site:seudominio.com.br
          </code>{" "}
          direto na busca do Google, sem espaço depois dos dois-pontos. Se aparecer pelo menos uma
          página do seu site, ele está indexado (o problema aí seria de ranqueamento, não de
          indexação). Se não aparecer nada, é isso: o Google simplesmente não tem nenhuma página
          sua na base — não importa o quão bom o site seja.
        </p>
        <p>
          Foi exatamente esse teste que confirmou o problema que motivou este post: um site novo,
          bem construído, com toda a marcação técnica correta — e zero páginas indexadas, porque
          ninguém tinha verificado o domínio no Search Console ainda.
        </p>
      </BlogSection>

      <BlogSection title="O que realmente resolve isso">
        <p>Nenhum desses passos é caro nem exige conhecimento técnico avançado — a maioria leva minutos:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Verificar o domínio no{" "}
            <a
              href="https://search.google.com/search-console/about"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Google Search Console
            </a>{" "}
            (por tag no site ou registro DNS).
          </li>
          <li>Enviar o sitemap do site pelo próprio Search Console.</li>
          <li>
            Pedir a indexação manual das páginas principais ("Inspeção de URL → Solicitar
            indexação") em vez de esperar o Google encontrar sozinho.
          </li>
          <li>
            Criar ou reivindicar o Perfil da Empresa no Google (Google Meu Negócio), com nome,
            endereço e telefone idênticos aos do site — essa consistência conta para o Google.
          </li>
          <li>Registrar o mesmo sitemap no Bing Webmaster Tools — é o índice que alimenta o Copilot.</li>
        </ul>
      </BlogSection>

      <BlogSection title="Depender só do Instagram é um risco silencioso" muted>
        <p>
          Para quem já é cliente e já segue o perfil, o Instagram funciona bem — é rápido, visual,
          direto. O problema aparece com quem <em>ainda não conhece</em> a empresa: essa pessoa não
          pesquisa "@suaempresa" no Instagram, ela pesquisa o serviço que precisa no Google ("oficina
          em Lagoa Santa", "clínica em Vespasiano"). Se só o concorrente tem site indexado, é ele
          quem aparece — mesmo que o Instagram da sua empresa seja mais ativo e mais bonito.
        </p>
        <p>
          Tem também o risco de plataforma: o Instagram é propriedade da Meta, não sua. Uma
          mudança de algoritmo, uma suspensão de conta por engano, uma troca de usuário
          responsável — nada disso afeta um site que é seu, verificado e indexado no Google.
        </p>
      </BlogSection>

      <BlogSection title="Se você não tem site ainda">
        <p>
          Sem site, não tem o que indexar — o Instagram continua sendo a única porta de entrada
          possível, e o problema descrito aqui nem chega a existir porque não há domínio próprio
          para verificar. Nesse caso o primeiro passo é ter um site profissional; os passos de
          indexação deste post entram logo em seguida.{" "}
          <Link to="/#solucoes" className="underline hover:text-foreground">
            Veja as soluções de site da Caetus Systems
          </Link>
          .
        </p>
      </BlogSection>
    </BlogArticleLayout>
  );
}
