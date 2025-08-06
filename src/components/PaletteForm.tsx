"use client";
import { useState } from "react";

interface ColorPaletteFormProps {
  onResult: (result: string) => void;
}

export default function PaletteForm({ onResult }: ColorPaletteFormProps) {
  const [prompt, setPrompt] = useState("");
  const [baseColor, setBaseColor] = useState("#fd451c");
  const [colorCount, setColorCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate-palette", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, baseColor, colorCount }),
      });

      const data = await res.json();

      if (res.ok) {
        onResult(data.result);  
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Palette generation error:", error);
      setError("Failed to get palette");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto  p-6 bg-gradient-to-br from-orange-50 to-gray-50 shadow-xl rounded-xl mt-10" >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Color Palette Generator Featuring AI
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block font-medium mb-1">Describe your desired vibe:</label>
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
          <label className="block font-medium mb-1">Select base color :</label>
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
          className={`w-full py-2 rounded text-black border border-black ${
            loading ? "bg-gray-400" : "bg-orange-50 hover:bg-orange-100"
          }`}
        >
          {loading ? "Generating..." : "Generate Palette"}
        </button>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        
      </form>
    </div>
  );
}
