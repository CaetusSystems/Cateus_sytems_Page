import { handleUpload } from "@vercel/blob/client";

// Endpoint de upload do formulário de criação de site (/formulario_criacao_sites):
// emite um token assinado de curta duração pro navegador subir o arquivo
// direto pro Vercel Blob, sem passar o binário por esta function — evita o
// limite de ~4.5MB de corpo de request das Serverless Functions, importante
// pra catálogos/PDFs maiores.
export default async function handler(request, response) {
  try {
    const jsonResponse = await handleUpload({
      body: request.body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("formulario-criacao-site/")) {
          throw new Error("Caminho de upload inválido");
        }
        return {
          allowedContentTypes: [
            "image/png",
            "image/jpeg",
            "image/webp",
            "image/gif",
            "application/pdf",
            "application/json",
          ],
          addRandomSuffix: true,
          maximumSizeInBytes: 200 * 1024 * 1024,
        };
      },
      onUploadCompleted: async () => {
        // Nada a fazer aqui — a Caetus lê o Blob Store manualmente depois.
      },
    });
    return response.status(200).json(jsonResponse);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
}
