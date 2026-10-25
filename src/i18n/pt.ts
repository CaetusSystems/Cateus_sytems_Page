/**
 * Textos da interface em português. É a fonte do tipo `Messages`: en.ts e es.ts
 * precisam ter exatamente as mesmas chaves.
 */
export const pt = {
  skipToContent: "Pular para o conteúdo",
  hours: ["Segunda a sexta, das 18h às 21h", "Sábado, das 8h às 19h", "Domingo, das 8h às 12h"],
  whatsapp: {
    aria: "Falar no WhatsApp",
    message: "Olá! Vim pelo site da Caetus Systems e gostaria de conversar.",
  },
  nav: {
    homeAria: "Caetus Systems, início",
    mainAria: "Principal",
    home: "Início",
    sites: "Sites",
    assistant: "Atendente",
    enrollment: "Matrícula",
    blog: "Blog",
    cta: "Agendar demonstração",
    language: "Idioma",
  },
  footer: {
    questions: "Dúvidas? WhatsApp",
    blogHeading: "Do nosso blog",
    seeAll: "Ver tudo",
    readArticle: "Ler artigo",
    tagline: "Sua operação digital funcionando todos os dias.",
  },
  splash: {
    prelude: "Sua empresa merece…",
    words: ["mais tempo.", "mais clientes.", "mais presença.", "mais resultados."],
    final: "Tecnologia que trabalha pela sua empresa.",
    skip: "Pular animação",
  },
  hero: {
    title: "Seu negócio achado no Google, atendendo no WhatsApp e organizado.",
    subtitle:
      "Site, atendente e sistema para pequenos negócios. Você vê funcionando no seu caso antes de decidir.",
    priceCaption: "Site profissional",
    cta: "Agendar demonstração",
    seePrices: "Ver preços",
    noCommitment: "Sem compromisso. Você escolhe o horário.",
    chips: ["Achado no Google", "Cliente chamou no WhatsApp", "Matrícula recebida"],
  },
  reviews: {
    badge: "Avaliações de clientes no Google",
    title: "Quem já trabalhou com a gente conta como foi.",
    source: "Avaliação no Google,",
    seeAll: "Ver todas no Google",
    languageNote: "",
    when: {
      "Rafaela Batista": "outubro de 2026",
      "Espaço Festa Joá": "agosto de 2026",
    } as Record<string, string>,
  },
  cards: {
    title: "Três soluções, preço claro.",
    subtitle: "Comece pela que mais resolve hoje. As outras entram quando fizer sentido.",
    cta: "Agendar demonstração",
    more: {
      sites: "Saiba mais sobre sites",
      atendente: "Saiba mais sobre o atendente",
      matricula: "Exemplo: sistema de matrícula para escolas",
    } as Record<string, string>,
    fromLabel: "a partir de",
  },
  delivered: {
    badge: "Sites no ar",
    title: "Sites que já entregamos.",
    subtitle: "Negócios de verdade, cada um com a cara da própria marca. O seu pode ser o próximo.",
    seeAll: "Ver todos",
    segments: {
      "mls-festa": "Locação de mobiliário e decoração",
      "comercial-prazeres": "Materiais de construção",
      "espaco-prata-inlove": "Espaço de eventos",
      "hotelzinho-tia-ju": "Recreativo infantil",
      "espaco-de-festa-joa": "Espaço de festas",
      "personalize-ls": "Gráfica e personalizados",
    } as Record<string, string>,
    altPrefix: "Site de",
  },
  how: {
    title: "Do primeiro contato ao seu negócio no ar.",
    step: "Passo",
    booked: "Horário marcado",
    live: "No ar",
    steps: [
      {
        title: "Você agenda a demonstração",
        text: "Conta rápido sobre o seu negócio e escolhe o melhor horário.",
      },
      {
        title: "Vê como ficaria",
        text: "Mostramos a solução funcionando no seu caso, antes de você decidir.",
      },
      {
        title: "Seu negócio no ar",
        text: "Você aprova e a gente coloca tudo para funcionar e cuida do resto.",
      },
    ],
  },
  faq: {
    title: "Perguntas frequentes",
    items: [
      {
        q: "Quanto custa?",
        a: "Site: R$ 247 para criar e R$ 24,90 por mês. Atendente no WhatsApp: R$ 87 por mês. Sistema de matrícula: R$ 297 para implantar e R$ 96 por mês.",
      },
      {
        q: "Como é a demonstração?",
        a: "Uma conversa curta, no horário que você escolher, em que mostramos a solução funcionando no seu caso. Sem compromisso.",
      },
      {
        q: "O que eu preciso mandar?",
        a: "O nome do negócio, endereço, horários, fotos e o link do Instagram ou da página do Google. Se faltar algo, a gente ajuda a montar.",
      },
      {
        q: "Preciso entender de tecnologia?",
        a: "Não. A Caetus monta, mantém e evolui tudo para você. Você só vê o resultado: cliente respondido, negócio organizado e tempo de volta.",
      },
      {
        q: "Preciso contratar tudo de uma vez?",
        a: "Não. Comece pelo que mais resolve hoje. As outras soluções entram quando fizer sentido para o seu negócio.",
      },
      {
        q: "Vocês atendem na minha cidade?",
        a: "Presencialmente em Lagoa Santa e região metropolitana de Belo Horizonte. Para o resto do Brasil, o atendimento é 100% remoto.",
      },
    ],
  },
  finalCta: {
    title: "Veja funcionando no seu negócio.",
    text: "Conte rápido o que você faz e marque a demonstração no horário que preferir.",
  },
  homeHead: {
    title: "Caetus Systems: site, atendente no WhatsApp e sistema de matrícula",
    description:
      "Site a partir de R$ 247, atendente no WhatsApp por R$ 87 por mês e sistema de matrícula para escolas. Agende uma demonstração e veja funcionando no seu negócio.",
  },
  form: {
    stepOf: "Passo {n} de 2",
    whatToSee: "O que você quer ver?",
    choices: {
      sites: "Criação de sites",
      atendente: "Atendente no WhatsApp",
      matricula: "Sistema de matrícula ou sob medida",
      "nao-sei": "Ainda não sei",
    } as Record<string, string>,
    businessLabel: "Qual é o seu negócio?",
    businessPlaceholder: "Ex.: barbearia, escola infantil, loja",
    next: "Continuar",
    whereToSend: "Para onde enviamos o horário?",
    nameLabel: "Seu nome",
    phoneLabel: "WhatsApp com DDD",
    phonePlaceholder: "(31) 99999-9999",
    linkLabel: "Instagram ou página do Google do negócio",
    linkPlaceholder: "@seunegocio ou link",
    optional: "(opcional)",
    emailLabel: "E-mail",
    honeypot: "Não preencha",
    failed: "Não conseguimos enviar agora. Seus dados não se perderam.",
    failedWhatsApp: "Falar no WhatsApp com tudo preenchido",
    submit: "Agendar demonstração",
    sending: "Enviando",
    back: "Voltar",
    errors: {
      product: "Escolha o que você quer ver",
      business: "Conte o nome ou o tipo do negócio",
      name: "Informe seu nome",
      phone: "Informe um WhatsApp com DDD",
      email: "E-mail inválido",
    } as Record<string, string>,
  },
  agendar: {
    title: "Agende sua demonstração",
    text: "Conte rápido sobre o seu negócio. Depois você escolhe o melhor horário e vemos juntos, sem compromisso.",
    steps: [
      { title: "Você agenda", text: "Responde duas perguntas rápidas." },
      { title: "Vê a solução funcionando", text: "Mostramos no caso do seu negócio." },
      { title: "Decide com calma", text: "Sem compromisso e sem pressão." },
    ],
    hoursTitle: "Horários das demonstrações",
    headTitle: "Agendar demonstração | Caetus Systems",
    headDescription:
      "Escolha o que você quer ver, deixe seu WhatsApp e marque uma demonstração de site, atendente no WhatsApp ou sistema de matrícula.",
  },
  thanks: {
    headTitle: "Recebemos seus dados | Caetus Systems",
    headDescription: "Escolha o horário da sua demonstração.",
    titleNamed: "Recebemos seus dados, {name}!",
    title: "Recebemos seus dados!",
    pickTime: "Agora escolha o melhor horário para a sua demonstração.",
    willCall: "Vamos te chamar no WhatsApp para combinar o melhor horário.",
    iframeTitle: "Agenda para marcar a demonstração",
    hoursTitle: "Horários das demonstrações",
    preferNow: "Prefere falar agora?",
    whatsapp: "Chamar no WhatsApp",
  },
  offers: {
    sites: {
      name: "Criação de sites",
      promise: "Seu negócio encontrado no Google, com um site pronto para receber clientes.",
      priceLabel: "pagamento único",
      monthly: "+ R$ 24,90 por mês de manutenção",
      imageAlt: "Site de uma escola infantil aberto em um notebook",
    },
    atendente: {
      name: "Atendente no WhatsApp",
      promise:
        "Seu WhatsApp respondendo sozinho, com preço, horário e endereço, sem deixar ninguém no vácuo.",
      priceLabel: "por mês",
      monthly: "",
      imageAlt: "Atendente virtual de uma barbearia respondendo um cliente no WhatsApp",
    },
    matricula: {
      name: "Sistema de matrícula",
      promise: "Matrículas, famílias e cobranças da sua escola organizadas num só lugar.",
      priceLabel: "pagamento único",
      monthly: "+ R$ 96 por mês de manutenção",
      imageAlt: "Painel de gestão no notebook e avisos no celular, sobre uma mesa de cafeteria",
    },
    custom: {
      name: "Sistema sob medida",
      promise:
        "Cadastros, matrículas, cobranças e o que a sua operação precisar, num sistema feito para o seu jeito de trabalhar.",
    },
  },
  productPage: {
    includes: "O que está incluso",
    clients: "O que dizem os clientes",
    how: "Como funciona",
    faq: "Perguntas frequentes",
    formTitle: "Veja funcionando no seu negócio.",
    formText: "Conte rápido o que você faz e marque a demonstração no horário que preferir.",
    combine: "Combine com",
    noCommitment: "Sem compromisso. Você escolhe o horário.",
    source: "Avaliação no Google,",
    seeGoogle: "Ver no Google",
    step: "Passo",
  },
  products: {
    sites: {
      title: "Criação de sites para pequenos negócios",
      description:
        "Site profissional para o seu negócio ser achado no Google e receber clientes. R$ 247 para criar e R$ 24,90 por mês. Agende uma demonstração.",
      promise: "Um site profissional para o seu negócio ser achado no Google e receber clientes.",
      support:
        "Você vê a prévia antes de decidir. Pagamento da criação uma vez, e uma mensalidade pequena para manter no ar.",
      ctaLabel: "Agendar demonstração",
      includes: [
        "Site que abre bem no celular",
        "Identidade visual a partir do que você já tem",
        "Publicação e hospedagem",
        "Um ajuste pequeno por mês incluso (texto, preço, horário ou foto)",
      ],
      steps: [
        {
          title: "Você agenda a demonstração",
          text: "Conta rápido sobre o negócio e manda o básico: nome, endereço, horários e fotos.",
        },
        {
          title: "Recebe a prévia",
          text: "Montamos o site e você vê como ficou antes de aprovar.",
        },
        {
          title: "Seu site no ar",
          text: "Aprovou? Publicamos e cuidamos de mantê-lo funcionando.",
        },
      ],
      faq: [
        {
          q: "Quanto custa?",
          a: "R$ 247 para criar o site, pagos uma vez, e R$ 24,90 por mês para mantê-lo no ar.",
        },
        {
          q: "O que a mensalidade inclui?",
          a: "Manter o site no ar e um ajuste pequeno por mês, como trocar um texto, um preço, um horário ou uma foto.",
        },
        {
          q: "Eu já tenho Instagram. Preciso de um site?",
          a: "O Instagram mostra o seu negócio para quem já te segue. O site ajuda quem procura no Google a te encontrar e a decidir. Explicamos a diferença no artigo sobre quem aparece no Instagram mas não no Google.",
        },
        {
          q: "O que eu preciso mandar?",
          a: "O nome do negócio, endereço, horários, fotos e o link do Instagram ou da página do Google. Se faltar algo, a gente ajuda a montar.",
        },
        {
          q: "Vocês cuidam também do WhatsApp?",
          a: "É outra solução: o atendente no WhatsApp, por R$ 87 por mês. Mostramos como funciona na demonstração.",
        },
      ],
      combineText: {
        atendente:
          "Seu site atrai o cliente e o atendente responde no WhatsApp sem deixar ninguém esperando.",
        matricula:
          "Para escolas: o site apresenta a escola e o sistema organiza matrículas e famílias.",
      } as Record<string, string>,
    },
    atendente: {
      title: "Atendente no WhatsApp para pequenos negócios",
      description:
        "Atendente com inteligência artificial no WhatsApp do seu negócio: responde horário, endereço e preço e chama você quando precisa. R$ 87 por mês.",
      promise:
        "Seu WhatsApp respondendo sozinho, com horário, endereço e preço, sem deixar ninguém no vácuo.",
      support:
        "Configurado com as informações do seu negócio. Quando não sabe responder, chama uma pessoa.",
      ctaLabel: "Agendar demonstração",
      includes: [
        "Horário de funcionamento",
        "Endereço e como chegar",
        "Perguntas frequentes do seu negócio",
        "Encaminha para uma pessoa quando não sabe responder",
        "Respostas com inteligência artificial, ajustadas ao seu negócio",
      ],
      steps: [
        {
          title: "Você conta como atende hoje",
          text: "Horários, endereço, preços e as perguntas que mais chegam.",
        },
        {
          title: "A gente configura",
          text: "Montamos o atendente com as informações do seu negócio e o jeito de falar com seus clientes.",
        },
        {
          title: "Ligamos no seu WhatsApp",
          text: "Depois de testar com você, ele começa a responder.",
        },
      ],
      faq: [
        { q: "Quanto custa?", a: "R$ 87 por mês, sem cobrança de configuração à parte." },
        {
          q: "O que ele responde?",
          a: "Horário, endereço, preços e as perguntas frequentes do seu negócio. Quando não sabe, ele chama uma pessoa em vez de inventar.",
        },
        {
          q: "Ele substitui a minha equipe?",
          a: "Não. Ele cuida das perguntas repetidas e da primeira resposta, e a sua equipe assume o que precisa de conversa.",
        },
        {
          q: "E a IA que o próprio WhatsApp Business lançou?",
          a: "A IA do aplicativo responde com base no seu catálogo. O atendente da Caetus é configurado para o seu negócio, com as regras que você definir. No artigo sobre a IA do WhatsApp Business explicamos quando cada uma faz sentido.",
        },
        {
          q: "O que eu preciso mandar?",
          a: "Horários, endereço, preços e uma lista das perguntas que mais chegam no seu WhatsApp. Se faltar algo, a gente ajuda a montar.",
        },
      ],
      combineText: {
        sites:
          "O site mostra o seu negócio a quem procura no Google e leva a pessoa direto para o WhatsApp.",
        matricula:
          "Para escolas: o atendente responde as famílias e o sistema registra as matrículas.",
      } as Record<string, string>,
    },
    matricula: {
      title: "Sistema de matrícula e gestão para escolas",
      description:
        "Sistema para a escola organizar matrículas, famílias, contratos e cobranças. Implantação de R$ 297 e R$ 96 por mês. Agende uma demonstração.",
      promise: "Matrículas, famílias e cobranças da sua escola organizadas num só lugar.",
      support: "Implantação feita pela Caetus. Você vê o sistema funcionando antes de decidir.",
      ctaLabel: "Agendar demonstração",
      includes: [
        "Matrícula online pelo celular da família",
        "Cadastro organizado de famílias e alunos",
        "Contrato com aceite digital",
        "Cobranças e lembretes",
        "Painel da escola para acompanhar tudo",
      ],
      steps: [
        {
          title: "Conversamos sobre a rotina da escola",
          text: "Como é a matrícula hoje, quem cuida e onde as coisas se perdem.",
        },
        {
          title: "Implantamos e configuramos",
          text: "Deixamos o sistema pronto com os dados e as regras da sua escola.",
        },
        { title: "As famílias passam a usar", text: "A secretaria acompanha tudo em um só lugar." },
      ],
      faq: [
        { q: "Quanto custa?", a: "R$ 297 de implantação, pagos uma vez, e R$ 96 por mês." },
        {
          q: "Serve para a minha escola?",
          a: "Mostramos o sistema na demonstração, com o seu caso, para você decidir se faz sentido. Sem compromisso.",
        },
        {
          q: "O que as famílias fazem no sistema?",
          a: "Acessam pelo celular para fazer a matrícula e aceitar o contrato, sem precisar ir até a secretaria.",
        },
        {
          q: "Posso ter também o site e o atendente?",
          a: "Sim. O site apresenta a escola e o atendente no WhatsApp responde as famílias. Cada um é uma solução separada, e você contrata só o que precisar.",
        },
        {
          q: "Preciso entender de tecnologia?",
          a: "Não. A Caetus implanta, mantém e evolui o sistema para você.",
        },
      ],
      combineText: {
        sites: "O site apresenta a escola e leva as famílias até a matrícula.",
        atendente:
          "O atendente responde as famílias no WhatsApp a qualquer hora, sem sobrecarregar a secretaria.",
      } as Record<string, string>,
    },
  },
};

type DeepString<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? DeepString<U>[]
    : T extends object
      ? { [K in keyof T]: DeepString<T[K]> }
      : T;

export type Messages = DeepString<typeof pt>;
