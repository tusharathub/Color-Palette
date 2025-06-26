"use client"
import { useState } from "react";


// takes user input
// Local state for prompt, color, count → on submit → call API
export default function PaletteForm({onResult} : {onResult : (data: any) => void} ) {

    const [promt, setPromt] = useState("");
    const [baseColor, setBaseColor] = useState("#800080");
    const [colorCount, setColorCount] = useState(4);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/generate-palette", {
            method: "POST",
            body: JSON.stringify({promt, baseColor, colorCount}),
        });

        const data = await res.json();
        setLoading(false);
        onResult(data.result)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-10">
            <input type="text" 
            placeholder="Describe the vibe you want"
            value={promt}
            onChange={(e) => setPromt(e.target.value) }
            className="border p-2 rounded"
            />
            <input type="color" 
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value) }
            className="w-16 h-10"
            />
            <input type="number" 
            min={3}
            max={8}
            value={colorCount}
            onChange={(e) => setColorCount(Number(e.target.value)) }
            className="border p-2 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-300" >
                {loading ? "workring on it" : "Generate Palette"}
            </button>
         
        </form>
    )
}