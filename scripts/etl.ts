import fs from "fs";
import path from "path";
import pdf from "pdf-parse";

type Chunk = {
  id: string;
  source: string;
  text: string;
};

const bronzeDir = path.join(process.cwd(), "data", "bronze");
const goldDir = path.join(process.cwd(), "data", "gold");

function chunkText(text: string, size = 800): string[] {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const chunks: string[] = [];

  for (let i = 0; i < cleaned.length; i += size) {
    chunks.push(cleaned.slice(i, i + size));
  }

  return chunks;
}

async function run() {
  if (!fs.existsSync(goldDir)) {
    fs.mkdirSync(goldDir, { recursive: true });
  }

  const files = fs.readdirSync(bronzeDir).filter((f) => f.endsWith(".pdf"));
  const allChunks: Chunk[] = [];

  for (const file of files) {
    const filePath = path.join(bronzeDir, file);
    const buffer = fs.readFileSync(filePath);
    const result = await pdf(buffer);

    const chunks = chunkText(result.text);

    chunks.forEach((text, index) => {
      allChunks.push({
        id: `${file}-${index}`,
        source: file,
        text,
      });
    });
  }

  fs.writeFileSync(
    path.join(goldDir, "chunks.json"),
    JSON.stringify(allChunks, null, 2),
    "utf-8"
  );

  console.log("ETL complete. Chunks saved.");
}

run().catch(console.error);