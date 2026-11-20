import { waUrl } from "@/lib/constants";

/**
 * Página de vendas do sistema de matrícula (só em português).
 *
 * Preço: R$ 297 de implantação e R$ 87/mês líquidos para a Caetus, com a taxa da
 * Cakto (cartão: 4,99% + R$ 2,49, conferir no painel) repassada no preço:
 *   317 × 0,9501 − 2,49 = 298,69   ·   94,90 × 0,9501 − 2,49 = 87,67
 * Para mudar o preço, mude só aqui.
 */
export const PRECO_IMPLANTACAO = "R$ 317";
export const PRECO_IMPLANTACAO_NUMERO = 317;
export const PRECO_MENSAL = "R$ 94,90";

/**
 * Checkout da Cakto (só a implantação). Enquanto o produto não existir na Cakto,
 * o botão abre o WhatsApp com a mensagem pronta.
 */
export const CHECKOUT_MATRICULA_URL: string = import.meta.env.VITE_CHECKOUT_MATRICULA_URL || "";

export const WHATSAPP_MATRICULA = waUrl(
  "Olá! Vi a página do sistema de matrícula e quero na minha escola. Como funciona a implantação?",
);

export const WHATSAPP_POS_COMPRA = waUrl(
  "Olá! Acabei de pagar a implantação do sistema de matrícula. Quero começar a configuração da minha escola.",
);

export const CTA_MATRICULA_URL = CHECKOUT_MATRICULA_URL || WHATSAPP_MATRICULA;

/** O que sai da secretaria (riscado na seção "o que acaba"). */
export const SAI_DA_SECRETARIA = [
  "Ficha de papel preenchida pela metade",
  "Foto de RG e comprovante perdida na conversa do WhatsApp",
  "Contrato impresso, assinado, escaneado e guardado na pasta",
  "Ligação para lembrar a família do documento que faltou",
  "Caderno com quem está esperando vaga em cada turma",
];

/** Passo a passo real da família (telas do sistema). */
export const PASSOS_FAMILIA = [
  {
    titulo: "Recebe o link da escola",
    texto: "Pelo WhatsApp, pelo Instagram ou pelo site. Abre no navegador do celular, sem instalar nada.",
  },
  {
    titulo: "Preenche os dados",
    texto: "Responsável e criança, com a turma certa para a idade. Se parar no meio, continua depois do mesmo ponto.",
  },
  {
    titulo: "Envia os documentos pela câmera",
    texto: "RG, CPF e comprovante de residência, direto do celular. A escola vê na hora o que falta.",
  },
  {
    titulo: "Lê e assina o contrato",
    texto: "O contrato da sua escola, com os valores e descontos daquela família, assinado na tela.",
  },
  {
    titulo: "Recebe a confirmação",
    texto: "A matrícula aparece no painel da escola e a família acompanha tudo pelo portal dela.",
  },
];

/** Módulos que existem hoje no sistema (conferidos nas telas em 19/11/2026). */
export const MODULOS: { grupo: string; itens: string[] }[] = [
  {
    grupo: "Matrícula",
    itens: [
      "Ficha completa da criança e da família",
      "Contrato digital com valores e descontos",
      "Fila de espera por turma",
      "Agenda de visitas à escola",
      "Pré-visualizar a matrícula antes de mandar o link",
    ],
  },
  {
    grupo: "Família",
    itens: [
      "Portal da família com matrículas e documentos",
      "Documentos enviados pelo celular",
      "Rematrícula do ano seguinte pelo mesmo portal",
    ],
  },
  {
    grupo: "Gestão",
    itens: [
      "Financeiro da escola",
      "Relacionamento com interessados",
      "Calendário escolar",
      "Usuários por função: direção, secretaria e professoras",
    ],
  },
  {
    grupo: "Sala de aula",
    itens: ["Turmas de cada professora", "Notas e acompanhamento", "Envios da professora"],
  },
  {
    grupo: "A cara da sua escola",
    itens: [
      "Nome, logo e cores da escola em todas as telas",
      "Letra maior e cores fortes para quem precisa",
      "Assistente de IA para a equipe",
    ],
  },
];

export const PASSOS_IMPLANTACAO = [
  {
    titulo: "Você paga a implantação",
    texto: `${PRECO_IMPLANTACAO}, uma vez só. Na hora você recebe o nosso contato para começar.`,
  },
  {
    titulo: "Você manda o que a escola já usa",
    texto: "Turmas, valores, descontos e o contrato atual. Pode ser em foto, PDF ou planilha.",
  },
  {
    titulo: "A gente instala na conta da escola",
    texto: "Criamos a conta própria da escola e configuramos o sistema com o nome, o logo e as cores dela.",
  },
  {
    titulo: "Você testa uma matrícula",
    texto: "Faz uma matrícula de teste do começo ao fim e pede os ajustes que quiser.",
  },
  {
    titulo: "O link vai para as famílias",
    texto: `A partir daqui começa a mensalidade de ${PRECO_MENSAL}.`,
  },
];

export const INCLUSO = [
  "Instalação na conta própria da escola",
  "Turmas, valores, descontos e contrato configurados",
  "Cópia de segurança automática todos os dias",
  "Atualizações do sistema",
  "Suporte pelo WhatsApp",
];

export const DUVIDAS: { q: string; a: string }[] = [
  {
    q: "Quando começo a pagar a mensalidade?",
    a: `Só quando o sistema estiver funcionando na escola, ou seja, quando o link da matrícula for para as famílias. Antes disso você paga só a implantação de ${PRECO_IMPLANTACAO}.`,
  },
  {
    q: "As famílias precisam instalar um aplicativo?",
    a: "Não. A matrícula abre pelo link, no navegador do celular. Funciona em Android e iPhone.",
  },
  {
    q: "Dá para usar o contrato que a escola já tem?",
    a: "Sim. Na implantação a gente passa o seu contrato para o sistema, com os campos que mudam de família para família, como valores e descontos.",
  },
  {
    q: "Os dados das crianças ficam seguros?",
    a: "O sistema da sua escola roda numa instalação só dela, separada das outras escolas, com acesso por função (direção, secretaria, professora) e cópia de segurança automática todos os dias.",
  },
  {
    q: "Os dados são da escola?",
    a: "São. O sistema e o banco de dados ficam numa conta em nome da escola, não misturados com os de outras escolas.",
  },
  {
    q: "Preciso de computador na secretaria?",
    a: "Não é obrigatório. O painel da escola abre no computador e no celular.",
  },
  {
    q: "E se eu me arrepender?",
    a: "Você tem 7 dias depois da compra para desistir da implantação e receber o dinheiro de volta.",
  },
  {
    q: "Tem prazo mínimo de contrato?",
    a: "Não. A mensalidade é mês a mês.",
  },
  {
    q: "Já tem escola usando?",
    a: "Sim. O sistema roda hoje no CELD Centro Educacional e na Escola Infantil Passo a Passo.",
  },
];
