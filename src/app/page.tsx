"use client";

import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    setLoading(true);
    setAnswer("");
    setSources([]);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (data.error) {
        setAnswer(data.error);
      } else {
        setAnswer(data.answer);
        setSources(data.sources || []);
      }
    } catch {
      setAnswer("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Smart PDF Helper</h1>
      <p className="mb-4">Ask questions about the PDFs in this project.</p>

      <textarea
        className="w-full border rounded p-3 mb-4"
        rows={5}
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleAsk}
        disabled={loading || !question.trim()}
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      {answer && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Answer</h2>
          <p className="mb-4 whitespace-pre-wrap">{answer}</p>

          <h3 className="text-xl font-semibold mb-2">Sources</h3>
          <ul className="list-disc pl-6">
            {sources.map((source, index) => (
              <li key={`${source}-${index}`}>{source}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}