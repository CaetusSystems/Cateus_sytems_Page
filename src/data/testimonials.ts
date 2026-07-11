/**
 * Depoimentos de clientes.
 *
 * Estrutura pronta para receber depoimentos reais: preencha `quote`, `name`,
 * `role` e defina `placeholder: false`. Enquanto `placeholder: true`, o card
 * exibe o estado honesto de "em breve" — nunca inventamos depoimento.
 */
export type Testimonial = {
  quote: string;
  name: string;
  /** ex.: "Restaurante em Lagoa Santa" */
  role: string;
  placeholder: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "",
    name: "Seu nome aqui",
    role: "Restaurante · Lagoa Santa",
    placeholder: true,
  },
  {
    quote: "",
    name: "Seu nome aqui",
    role: "Clínica · Vespasiano",
    placeholder: true,
  },
  {
    quote: "",
    name: "Seu nome aqui",
    role: "Loja · Belo Horizonte",
    placeholder: true,
  },
];

/** true enquanto não houver nenhum depoimento real — a seção se apresenta como convite. */
export const ALL_PLACEHOLDERS = TESTIMONIALS.every((t) => t.placeholder);
