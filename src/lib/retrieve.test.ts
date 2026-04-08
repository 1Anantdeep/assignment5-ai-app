import { describe, it, expect, vi, beforeEach } from "vitest";
import fs from "fs";
import { retrieveTopChunks } from "./retrieve";

vi.mock("fs");

describe("retrieveTopChunks", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns the most relevant chunks first", () => {
    vi.mocked(fs.readFileSync).mockReturnValue(
      JSON.stringify([
        { id: "1", source: "a.pdf", text: "bus safety data in London" },
        { id: "2", source: "b.pdf", text: "marketing notes" },
        { id: "3", source: "c.pdf", text: "gender and safety analysis" }
      ]) as any
    );

    const result = retrieveTopChunks("gender safety", 2);

    expect(result.length).toBe(2);
    expect(result[0].source).toBe("c.pdf");
  });
});