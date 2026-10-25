/**
 * Avaliações reais do Google da Caetus. Texto copiado como foi publicado.
 * Nunca acrescentar nota, número ou depoimento que não esteja no Google.
 */
export type RealReview = {
  name: string;
  when: string;
  text: string;
  photo: string;
};

export const REAL_REVIEWS: RealReview[] = [
  {
    name: "Rafaela Batista",
    when: "outubro de 2026",
    text: "A Caetus Systems tem feito um excelente trabalho com a criação do site e sistema para minha escola. Estou muito satisfeita com o serviço e atendimento prestado. No primeiro atendimento, o Henrique foi muito solicito ao nos atender, e rapidamente nos enviou uma prévia do site. Todas as solicitações são atendidas com rapidez e qualidade. Recomendo este serviço.",
    photo: "/img/avaliacao-rafaela.webp",
  },
  {
    name: "Espaço Festa Joá",
    when: "agosto de 2026",
    text: "Ótimo serviço! Me ajudaram a criar meu site e também estão criando um atendente virtual para meu whatsapp.",
    photo: "/img/avaliacao-espaco-joa.webp",
  },
];

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=caetus+systems#lrd=0x8f425dcfdbd59a5b:0x538102b28490db66,1,,,,";
