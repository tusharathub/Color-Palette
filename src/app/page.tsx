"use client"
import PaletteForm from "@/components/PaletteForm";
import PaletteResult from "@/components/PaletteResult";
import { useState } from "react";

export default function Home() {
  const[result, setResult] = useState("");

  return (
    <main >
      <h1 className="text-3xl font-bold text-center mt-6"> Color Palette Generator featuring AI</h1>
      <PaletteForm onResult={setResult}/>
      {result && <PaletteResult data={result} />}
    </main>
  );
}
