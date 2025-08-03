"use client";

import { useState } from "react";
import PaletteForm from "@/components/PaletteForm";
import PaletteResult from "@/components/PaletteResult";

export default function Home() {
  const [result, setResult] = useState<string>("");

  return (
    <main className="min-h-screen w-full  bg-gradient-to-br from-lime-50 to-green-100 text-gray-900 px-6 py-10 flex flex-col items-center">
      {/* Hero Section */}
      <section className="max-w-4xl text-center mb-16">
        <h1 className="text-5xl font-bold leading-tight mb-4">
          🎨 AI Color Palette Generator
        </h1>
        <p className="text-xl text-gray-900">
          No More Guessing: Instantly generate harmonious color palettes with
          the help of AI. Whether you are designing a brand or website, skip the
          manual palette curation and let AI inspire you at a click.
        </p>
      </section>

      {/* Form Section */}
      <section className="w-full max-w-2xl border border-gray-200 bg-gradient-to-br from-lime-50 to-green-200 shadow-xl rounded-2xl p-8 mb-12">
        <PaletteForm onResult={setResult} />
      </section>

      {/* Result Section */}
      {result && (
        <section className="w-full max-w-3xl">
          <PaletteResult data={result} />
        </section>
      )}

      {/* Why Use This Section */}
      <section className="mt-20 max-w-5xl text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Why use this AI Palette Generator?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-lime-50 to-green-200 p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-2">For Everyone</h3>
            <p className="text-gray-900">
              Designers, developers, marketers, or hobbyists – no design degree
              needed.
            </p>
          </div>
          <div className="bg-gradient-to-br from-lime-50 to-green-200 p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-2">Mood-driven output:</h3>
            <p className="text-gray-900">
              Just describe a feeling, scene, or product (“cozy winter cabin”,
              “fresh app launch”), and AI does the rest!
            </p>
          </div>
          <div className="bg-gradient-to-br from-lime-50 to-green-200 p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-2">Unique Every Time</h3>
            <p className="text-gray-900">
              No recycled color sets. Every prompt returns fresh, context-aware
              palettes.
            </p>
          </div>
        </div>
      </section>
      <div className="max-w-xl mx-auto my-10 text-center">
        <a
          href="https://github.com/tusharathub"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-400 text-white font-semibold rounded-lg shadow hover:bg-green-500 transition duration-200"
        >
          Liked it ?
          <svg
            width="24"
            height="24"
            fill="currentColor"
            className="inline-block"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 .297c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.4.6.1.8-.2.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.1-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8 2.1 2.6 2.7.7-.6 1.9-1.2 3.1-2.5-2.5-.3-5.1-1.3-5.1-6 .1-1.3.6-2.1 1.2-2.7-.1-.2-.5-1.2.1-2.7 0 0 1-.3 3.2 1.2A11 11 0 0112 6.8a10.9 10.9 0 012.9.4c2.2-1.6 3.2-1.2 3.2-1.2.6 1.5.2 2.5.1 2.7.7.7 1.1 1.5 1.2 2.7 0 4.7-2.6 5.7-5.1 6A4.3 4.3 0 0016 20v2c0 .4.2.7.8.6C20.6 22.1 24 17.6 24 12.3c0-6.6-5.4-12-12-12z" />
          </svg>
        </a>
      </div>
    </main>
  );
}
