import fs from "fs";
import path from "path";

export type Chunk = {
  id: string;
  source: string;
  text: string;
};

function scoreText(query: string, text: string): number {
  const words = query.toLowerCase().split(/\W+/).filter(Boolean);
  const lowerText = text.toLowerCase();

  let score = 0;

  for (const word of words) {
    if (lowerText.includes(word)) {
      score += 1;
    }
  }

  return score;
}

export function retrieveTopChunks(query: string, limit = 3): Chunk[] {
  const filePath = path.join(process.cwd(), "data", "gold", "chunks.json");
  const chunks: Chunk[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return chunks
    .map((chunk) => ({
      chunk,
      score: scoreText(query, chunk.text),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.chunk);
}