"use client";

import { useState } from "react";

interface ColorPaletteFormProps{
    onResult: (result: string) => void;
}

export default function ColorPalette({ onResult }: ColorPaletteFormProps ) {
  const [prompt, setPrompt] = useState("");
  const [baseColor, setBaseColor] = useState("#fd451c");
  const [colorCount, setColorCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    colors: string[];
    suggestion: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/generate-palette", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          prompt,
          baseColor,
          colorCount,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const parsed = JSON.parse(data.result);
        setResult(parsed);
      } else {
        setError(data.error || "something went terribly wrong");
      }
    } catch (error) {
      setError("Failed to get palette");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Color Palette Generator featuring AI
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block font-medium mb-1">
            Describe your desired vibe:
          </label>
          <input
            type="text"
            placeholder="e.g. Calm beach sunset"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Select base color:</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-10 h-10 border rounded"
            />
            <span>{baseColor}</span>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Number of colors:</label>
          <input
            type="number"
            min={3}
            max={8}
            value={colorCount}
            onChange={(e) => setColorCount(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Generating..." : "Generate Palette"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4"> {error} </p>}

      {result && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Generated Palette:</h3>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {result.colors.map((color, index) => (
              <div
                key={index}
                className="w-full h-16 rounded"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          <p className="text-gray-700 italic">💡 {result.suggestion}</p>
        </div>
      )}
    </div>
  );
}
