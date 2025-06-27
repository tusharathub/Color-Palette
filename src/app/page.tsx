"use client"
import PaletteForm from "@/components/PaletteForm";
import PaletteResult from "@/components/PaletteResult";
import { useState } from "react";

export default function Home() {
  const[result, setResult] = useState<string>("");

  return (
    <main >
      <PaletteForm onResult={setResult}/>
      {result && <PaletteResult data={result} />}
    </main>
  );
}
