export const WHATSAPP_NUMBER = "5531972131824";
export const WHATSAPP_DISPLAY = "(31) 97213-1824";
export const WHATSAPP_MESSAGE = "Olá! Vim pelo site da Caetus Systems e gostaria de conversar.";

export function waUrl(message: string = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_URL = waUrl();

// Configure only this URL to point to a different Instagram profile.
export const INSTAGRAM_URL = "https://www.instagram.com/Caetus_Systems";

/** Horários em que a demonstração pode ser marcada (a agenda do Google segue os mesmos). */
export const HORARIOS_DEMO = [
  "Segunda a sexta, das 18h às 21h",
  "Sábado, das 8h às 19h",
  "Domingo, das 8h às 12h",
];
