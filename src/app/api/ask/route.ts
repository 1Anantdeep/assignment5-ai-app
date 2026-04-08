import { NextRequest, NextResponse } from "next/server";
import { retrieveTopChunks } from "../../../lib/retrieve";
import { askGemini } from "../../../lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const question = body.question?.trim();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    const chunks = retrieveTopChunks(question, 3);

    const context = chunks
      .map(
        (chunk, index) =>
          `Source ${index + 1} (${chunk.source}):\n${chunk.text}`
      )
      .join("\n\n");

    const answer = await askGemini(question, context);

    return NextResponse.json({
      answer,
      sources: chunks.map((chunk) => chunk.source),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to answer question." },
      { status: 500 }
    );
  }
}