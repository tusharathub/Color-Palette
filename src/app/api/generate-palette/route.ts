import openai from '@/lib/apenai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt, baseColor, colorCount } = await request.json();

  try {
    const completion = await openai.chat.completions.create({
      model : "gpt-4o",
      messages: [
        {
          role: 'system',
          content: 'You are an expert AI in generating color palettes. Return a JSON array of HEX color codes with a small comment suggesting which color is more relevant for design, given the user\'s input.',
        },
        {
          role: 'user',
          content: `Prompt: ${prompt}. Base Color: ${baseColor}. Number of colors: ${colorCount}. Return only JSON.`,
        },
      ],
    });

    const aiResponse = completion.choices[0].message.content;
    return NextResponse.json({ result: aiResponse });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Palette generation failed.' }, { status: 500 });
  }
}
