import { GoogleGenAI } from "@google/genai";

// Declare process to avoid TypeScript errors since @types/node is not installed
declare const process: {
  env: {
    API_KEY: string;
  }
};

export const generateCityGuideResponse = async (userQuery: string): Promise<string> => {
  try {
    // Initialize GoogleGenAI with process.env.API_KEY as per guidelines.
    // The API key must be obtained exclusively from the environment variable process.env.API_KEY.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const systemInstruction = `
      Você é o Guia Virtual Oficial da cidade de Santana (EXPO SANTANA BA).
      Sua persona é acolhedora, entusiasmada e conhecedora profunda da história, cultura, gastronomia e eventos da cidade.
      
      Diretrizes:
      1. Responda sempre em Português do Brasil.
      2. Seja conciso, mas informativo.
      3. Se perguntarem sobre comida, recomende pratos típicos imaginários ou reais da cultura local (peixes amazônicos, tacacá, ou comida mineira, dependendo do contexto 'Santana' que adotarmos - assuma um contexto de cidade histórica brasileira vibrante).
      4. Se perguntarem sobre eventos, mencione o "Festival de Santana" ou "Festa da Padroeira".
      5. Nunca invente fatos perigosos. Se não souber, sugira que o usuário use a página de Contato do site.
      6. Use formatação Markdown (negrito, listas) para facilitar a leitura.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "Desculpe, não consegui processar sua pergunta no momento. Tente novamente.";
  } catch (error) {
    console.error("Erro ao consultar Gemini:", error);
    return "Houve um erro ao conectar com o guia virtual. Por favor, tente novamente mais tarde.";
  }
};