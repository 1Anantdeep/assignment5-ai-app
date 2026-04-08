import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function askGemini(question: string, context: string) {
  const prompt = `
You answer only from the context below.

Rules:
- If the answer is not in the context, say: "I could not find that in the provided documents."
- Keep the answer short and clear.
- Use only the context.

Question:
${question}

Context:
${context}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text ?? "No answer generated.";
}