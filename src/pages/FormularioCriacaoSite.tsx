import { useState } from "react";
import { CheckCircle2, Globe, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useDocumentHead } from "@/lib/useDocumentHead";

// Nenhum campo deste formulário é obrigatório — o cliente pode enviar com o
// que tiver em mãos agora e o resto fica para uma conversa depois.

function slugify(s: string) {
  return (
    s
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "site-sem-nome"
  );
}

const OBJETIVOS = [
  "Apresentar minha empresa",
  "Conseguir clientes pelo WhatsApp",
  "Apresentar meus serviços",
  "Receber pedidos de orçamento",
  "Aparecer nas buscas do Google",
];

const BOTOES = [
  { value: "whatsapp", label: "Falar no WhatsApp" },
  { value: "direct", label: "Falar no Direct" },
  { value: "orcamento", label: "Solicitar orçamento" },
  { value: "agendar", label: "Agendar atendimento" },
  { value: "outro", label: "Outro" },
];

type ArquivoCampo = "logo" | "fotos" | "material" | "provaSocial";

function Campo({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {hint && <p className="-mt-1 text-xs text-muted-foreground">{hint}</p>}
      {children}
    </div>
  );
}

function Cartao({
  numero,
  titulo,
  desc,
  children,
}: {
  numero: number;
  titulo: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-start gap-3">
        <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {numero}
        </span>
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{titulo}</h2>
          {desc && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

function SeletorArquivos({
  arquivos,
  onAdicionar,
  onRemover,
  accept,
  multiple,
}: {
  arquivos: File[];
  onAdicionar: (files: FileList) => void;
  onRemover: (i: number) => void;
  accept?: string;
  multiple?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground">
        <Upload className="h-4 w-4" />
        {arquivos.length > 0 ? "Adicionar mais arquivos" : "Escolher arquivo"}
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => {
            if (e.target.files) onAdicionar(e.target.files);
            e.target.value = "";
          }}
        />
      </label>
      {arquivos.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {arquivos.map((f, i) => (
            <div
              key={`${f.name}-${i}`}
              className="flex items-center justify-between gap-3 rounded-md border border-border bg-muted/30 px-3 py-1.5 text-xs"
            >
              <span className="truncate">{f.name}</span>
              <button
                type="button"
                onClick={() => onRemover(i)}
                aria-label={`Remover ${f.name}`}
                className="flex-none text-muted-foreground hover:text-destructive"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FormularioCriacaoSite() {
  useDocumentHead({
    title: "Formulário: criação do seu site, Caetus Systems",
    description: "Conte pra Caetus Systems sobre o seu negócio para começarmos a criação do seu site.",
  });

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);

  // 1. Dados básicos
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [seuNome, setSeuNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [cidade, setCidade] = useState("");

  // 2. Sobre o negócio
  const [segmento, setSegmento] = useState("");
  const [descricaoNegocio, setDescricaoNegocio] = useState("");
  const [servicos, setServicos] = useState("");
  const [servicoDestaque, setServicoDestaque] = useState("");

  // 3. Objetivo do site
  const [objetivos, setObjetivos] = useState<string[]>([]);
  const [objetivoOutro, setObjetivoOutro] = useState("");
  const [botaoPrincipal, setBotaoPrincipal] = useState("");
  const [botaoOutro, setBotaoOutro] = useState("");

  // 4. Conteúdo e identidade
  const [temLogo, setTemLogo] = useState("");
  const [arquivosLogo, setArquivosLogo] = useState<File[]>([]);
  const [arquivosFotos, setArquivosFotos] = useState<File[]>([]);
  const [arquivosMaterial, setArquivosMaterial] = useState<File[]>([]);
  const [cores, setCores] = useState("");

  // 5. Prova social
  const [temProvaSocial, setTemProvaSocial] = useState("");
  const [textoProvaSocial, setTextoProvaSocial] = useState("");
  const [arquivosProvaSocial, setArquivosProvaSocial] = useState<File[]>([]);

  // 6. Referência
  const [siteReferencia, setSiteReferencia] = useState("");
  const [oQueGosta, setOQueGosta] = useState("");

  // 7. Informações adicionais
  const [infoAdicional, setInfoAdicional] = useState("");

  // Confirmação
  const [confirmou, setConfirmou] = useState(false);

  function toggleObjetivo(o: string) {
    setObjetivos((prev) => (prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]));
  }

  function adicionar(campo: ArquivoCampo, files: FileList) {
    const novos = Array.from(files);
    const setters: Record<ArquivoCampo, React.Dispatch<React.SetStateAction<File[]>>> = {
      logo: setArquivosLogo,
      fotos: setArquivosFotos,
      material: setArquivosMaterial,
      provaSocial: setArquivosProvaSocial,
    };
    setters[campo]((prev) => [...prev, ...novos]);
  }

  async function uploadArquivo(slug: string, file: File, sufixo: string) {
    const { upload } = await import("@vercel/blob/client");
    const ext = file.name.includes(".") ? file.name.split(".").pop() : (file.type.split("/")[1] || "bin");
    const caminho = `formulario-criacao-site/${slug}/${sufixo}-${Date.now()}.${ext}`;
    const blob = await upload(caminho, file, { access: "public", handleUploadUrl: "/api/blob-upload" });
    return blob.url;
  }

  async function handleEnviar() {
    setEnviando(true);
    setErro(null);
    try {
      const slug = slugify(nomeEmpresa || seuNome || `envio-${Date.now()}`);

      const uploadTodos = async (arquivos: File[], prefixo: string) => {
        const urls: string[] = [];
        for (let i = 0; i < arquivos.length; i++) {
          urls.push(await uploadArquivo(slug, arquivos[i], `${prefixo}-${i + 1}`));
        }
        return urls;
      };

      const [logoUrls, fotosUrls, materialUrls, provaSocialUrls] = await Promise.all([
        uploadTodos(arquivosLogo, "logo"),
        uploadTodos(arquivosFotos, "foto"),
        uploadTodos(arquivosMaterial, "material"),
        uploadTodos(arquivosProvaSocial, "prova-social"),
      ]);

      const respostas = {
        enviado_em: new Date().toISOString(),
        dados_basicos: {
          nome_empresa: nomeEmpresa || null,
          seu_nome: seuNome || null,
          whatsapp: whatsapp || null,
          instagram: instagram || null,
          cidade_regiao: cidade || null,
        },
        sobre_negocio: {
          segmento: segmento || null,
          descricao: descricaoNegocio || null,
          servicos: servicos || null,
          servico_destaque: servicoDestaque || null,
        },
        objetivo_site: {
          objetivos,
          objetivo_outro: objetivoOutro || null,
          botao_principal: botaoPrincipal || null,
          botao_outro: botaoPrincipal === "outro" ? botaoOutro || null : null,
        },
        conteudo_identidade: {
          tem_logo: temLogo || null,
          logo_urls: logoUrls,
          fotos_urls: fotosUrls,
          material_urls: materialUrls,
          cores: cores || null,
        },
        prova_social: {
          possui: temProvaSocial || null,
          texto: textoProvaSocial || null,
          arquivos_urls: provaSocialUrls,
        },
        referencia: {
          site: siteReferencia || null,
          o_que_gosta: oQueGosta || null,
        },
        informacoes_adicionais: infoAdicional || null,
        confirmou_uso_de_material: confirmou,
      };

      const jsonBlob = new Blob([JSON.stringify(respostas, null, 2)], { type: "application/json" });
      const { upload } = await import("@vercel/blob/client");
      await upload(`formulario-criacao-site/${slug}/respostas-${Date.now()}.json`, jsonBlob, {
        access: "public",
        handleUploadUrl: "/api/blob-upload",
      });

      setEnviado(true);
    } catch (e) {
      setErro(
        `Algo deu errado no envio (${e instanceof Error ? e.message : "erro desconhecido"}). Pode tentar de novo?`,
      );
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 py-20">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">Recebido, obrigado!</h1>
          <p className="mt-3 text-muted-foreground">
            A Caetus Systems já tem o que você preencheu e vai usar isso para começar a criação do
            seu site. A entrega da primeira versão acontece em até 4 dias. Qualquer coisa, a
            gente entra em contato pelo WhatsApp.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="border-b border-border bg-muted/30">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-6 py-14 text-center">
          <img src="/caetus-logo.png" alt="Caetus Systems" className="h-10 w-auto" />
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <Globe className="h-4 w-4" />
            Formulário: criação do seu site
          </span>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Vamos conhecer o seu negócio
          </h1>
          <p className="text-balance text-muted-foreground">
            Nenhum campo aqui é obrigatório, responda o que tiver em mãos agora, no seu ritmo. O
            que faltar, a gente completa numa conversa depois.
          </p>
        </div>
      </header>

      <main className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-12">
        <Cartao numero={1} titulo="Dados básicos">
          <Campo label="Nome da empresa/marca" htmlFor="nomeEmpresa">
            <Input id="nomeEmpresa" value={nomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)} />
          </Campo>
          <Campo label="Seu nome" htmlFor="seuNome">
            <Input id="seuNome" value={seuNome} onChange={(e) => setSeuNome(e.target.value)} />
          </Campo>
          <Campo label="WhatsApp para contato" htmlFor="whatsapp">
            <Input id="whatsapp" type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
          </Campo>
          <Campo label="Instagram" htmlFor="instagram">
            <Input id="instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
          </Campo>
          <Campo label="Cidade e região de atendimento" htmlFor="cidade">
            <Input id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
          </Campo>
        </Cartao>

        <Cartao numero={2} titulo="Sobre o negócio">
          <Campo label="Qual é o seu segmento?" htmlFor="segmento">
            <Input id="segmento" value={segmento} onChange={(e) => setSegmento(e.target.value)} />
          </Campo>
          <Campo
            label="Descreva brevemente seu negócio"
            hint='Ex.: "Trabalho com gestão de tráfego pago para negócios locais, ajudando empresas a gerar mais clientes através da internet."'
            htmlFor="descricaoNegocio"
          >
            <Textarea
              id="descricaoNegocio"
              value={descricaoNegocio}
              onChange={(e) => setDescricaoNegocio(e.target.value)}
            />
          </Campo>
          <Campo label="Quais serviços você oferece?" htmlFor="servicos">
            <Textarea
              id="servicos"
              className="min-h-[120px]"
              value={servicos}
              onChange={(e) => setServicos(e.target.value)}
            />
          </Campo>
          <Campo label="Qual serviço você mais gostaria de destacar no site?" htmlFor="servicoDestaque">
            <Input
              id="servicoDestaque"
              value={servicoDestaque}
              onChange={(e) => setServicoDestaque(e.target.value)}
            />
          </Campo>
        </Cartao>

        <Cartao numero={3} titulo="Objetivo do site">
          <Campo label="O que você espera que o site faça?">
            <div className="flex flex-col gap-2.5">
              {OBJETIVOS.map((o) => (
                <label key={o} className="flex items-center gap-2.5 text-sm">
                  <Checkbox checked={objetivos.includes(o)} onCheckedChange={() => toggleObjetivo(o)} />
                  {o}
                </label>
              ))}
              <div className="flex items-center gap-2.5 text-sm">
                <Checkbox
                  checked={objetivos.includes("Outro")}
                  onCheckedChange={() => toggleObjetivo("Outro")}
                />
                <span>Outro:</span>
                <Input
                  value={objetivoOutro}
                  onChange={(e) => setObjetivoOutro(e.target.value)}
                  className="h-8 max-w-xs"
                />
              </div>
            </div>
          </Campo>

          <Campo label="Qual será o principal botão do site?">
            <RadioGroup value={botaoPrincipal} onValueChange={setBotaoPrincipal} className="gap-2.5">
              {BOTOES.map((b) => (
                <label key={b.value} className="flex items-center gap-2.5 text-sm">
                  <RadioGroupItem value={b.value} id={`botao-${b.value}`} />
                  {b.label}
                </label>
              ))}
              {botaoPrincipal === "outro" && (
                <Input
                  value={botaoOutro}
                  onChange={(e) => setBotaoOutro(e.target.value)}
                  className="ml-6 h-8 max-w-xs"
                  placeholder="Qual?"
                />
              )}
            </RadioGroup>
          </Campo>
        </Cartao>

        <Cartao numero={4} titulo="Conteúdo e identidade">
          <Campo label="Você possui logotipo?">
            <RadioGroup value={temLogo} onValueChange={setTemLogo} className="gap-2.5">
              <label className="flex items-center gap-2.5 text-sm">
                <RadioGroupItem value="sim" id="logo-sim" />
                Sim, vou enviar
              </label>
              <label className="flex items-center gap-2.5 text-sm">
                <RadioGroupItem value="nao" id="logo-nao" />
                Não
              </label>
            </RadioGroup>
          </Campo>
          <Campo label="Envie seu logotipo">
            <SeletorArquivos
              arquivos={arquivosLogo}
              accept="image/*"
              onAdicionar={(files) => adicionar("logo", files)}
              onRemover={(i) => setArquivosLogo((prev) => prev.filter((_, idx) => idx !== i))}
            />
          </Campo>
          <Campo label="Envie fotos que gostaria de utilizar no site">
            <SeletorArquivos
              arquivos={arquivosFotos}
              accept="image/*"
              multiple
              onAdicionar={(files) => adicionar("fotos", files)}
              onRemover={(i) => setArquivosFotos((prev) => prev.filter((_, idx) => idx !== i))}
            />
          </Campo>
          <Campo
            label="Possui algum material que devemos considerar?"
            hint="Ex.: apresentação, catálogo, portfólio, cardápio, PDF etc. Upload opcional."
          >
            <SeletorArquivos
              arquivos={arquivosMaterial}
              accept="image/*,application/pdf"
              multiple
              onAdicionar={(files) => adicionar("material", files)}
              onRemover={(i) => setArquivosMaterial((prev) => prev.filter((_, idx) => idx !== i))}
            />
          </Campo>
          <Campo label="Quais cores você gostaria de utilizar?" htmlFor="cores">
            <Input id="cores" value={cores} onChange={(e) => setCores(e.target.value)} />
          </Campo>
        </Cartao>

        <Cartao
          numero={5}
          titulo="Prova social"
          desc="Essa parte é muito importante para um site comercial."
        >
          <Campo label="Você possui avaliações, depoimentos ou resultados de clientes que gostaria de apresentar?">
            <RadioGroup value={temProvaSocial} onValueChange={setTemProvaSocial} className="gap-2.5">
              <label className="flex items-center gap-2.5 text-sm">
                <RadioGroupItem value="sim" id="prova-sim" />
                Sim
              </label>
              <label className="flex items-center gap-2.5 text-sm">
                <RadioGroupItem value="nao" id="prova-nao" />
                Não
              </label>
            </RadioGroup>
          </Campo>
          <Campo label="Se sim: envie os depoimentos/avaliações que podemos utilizar" hint="Upload ou texto abaixo.">
            <SeletorArquivos
              arquivos={arquivosProvaSocial}
              accept="image/*,application/pdf"
              multiple
              onAdicionar={(files) => adicionar("provaSocial", files)}
              onRemover={(i) => setArquivosProvaSocial((prev) => prev.filter((_, idx) => idx !== i))}
            />
            <Textarea
              value={textoProvaSocial}
              onChange={(e) => setTextoProvaSocial(e.target.value)}
              placeholder="Ou cole aqui o texto dos depoimentos/avaliações..."
            />
          </Campo>
        </Cartao>

        <Cartao numero={6} titulo="Referência">
          <Campo
            label="Existe algum site que você gosta e gostaria de usar como referência?"
            htmlFor="siteReferencia"
          >
            <Input
              id="siteReferencia"
              type="url"
              placeholder="https://..."
              value={siteReferencia}
              onChange={(e) => setSiteReferencia(e.target.value)}
            />
          </Campo>
          <Campo label="O que você gosta nesse site?" htmlFor="oQueGosta">
            <Input id="oQueGosta" value={oQueGosta} onChange={(e) => setOQueGosta(e.target.value)} />
          </Campo>
        </Cartao>

        <Cartao numero={7} titulo="Informações adicionais">
          <Campo
            label="Existe alguma informação importante que você gostaria que aparecesse no site?"
            htmlFor="infoAdicional"
          >
            <Textarea
              id="infoAdicional"
              value={infoAdicional}
              onChange={(e) => setInfoAdicional(e.target.value)}
            />
          </Campo>
        </Cartao>

        <section className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
          <h2 className="text-lg font-semibold tracking-tight">Declaração de responsabilidade pelo conteúdo</h2>
          <label className="mt-4 flex items-start gap-3 text-sm">
            <Checkbox checked={confirmou} onCheckedChange={(v) => setConfirmou(v === true)} className="mt-0.5" />
            <span>
              Confirmo que as informações, imagens, logotipos e demais materiais enviados por mim
              podem ser utilizados na criação do meu site.
            </span>
          </label>
        </section>

        {erro && <p className="text-center text-sm text-destructive">{erro}</p>}

        <Button size="lg" className="rounded-full" onClick={handleEnviar} disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Nenhum campo é obrigatório, pode enviar com o que tiver preenchido agora.
        </p>
      </main>
    </div>
  );
}
