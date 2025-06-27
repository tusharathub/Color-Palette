import groq from "@/lib/groq";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt, baseColor, colorCount } = await request.json();

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: `
            You are an expert AI for generating color palettes.
            Your output format must ALWAYS be strict JSON with EXACTLY these two keys:

            1. "colors": An array of HEX color strings. Example: ["#FF5733", "#33FF57", "#3357FF"]

            2. "suggestion": A short string explaining which color from the array is most relevant for the user's design intent.

            DO NOT include markdown, explanations, or any text outside JSON.
          `,
        },
        {
          role: "user",
          content: `
            Generate a color palette for the following:

            - Prompt: ${prompt}
            - Base Color: ${baseColor}
            - Number of Colors: ${colorCount}

            Return only strict JSON as described.
          `,
        },
      ],
    });

    const aiResponse = completion.choices[0].message.content;

    return NextResponse.json({ result: aiResponse });
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: "Palette generation failed." },
      { status: 500 }
    );
  }
}
