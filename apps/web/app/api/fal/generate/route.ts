import { NextRequest, NextResponse } from "next/server";

const FAL_KEY = process.env.FAL_KEY;

async function callFal(model: string, input: any) {
  const response = await fetch(`https://fal.run/${model}`, {
    method: "POST",
    headers: {
      "Authorization": `Key ${FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return response.json();
}

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, style, preset } = await req.json();

    if (!FAL_KEY || FAL_KEY === 'fake_key_for_testing') {
      return NextResponse.json({
        simulated: true,
        imageUrl: getPlaceholder(style),
      });
    }

    if (preset.model === "fal-ai/fast-remove-bg") {
      const data = await callFal("fal-ai/fast-remove-bg", {
        image_url: imageUrl,
      });
      return NextResponse.json({ imageUrl: data.image.url });
    }

    const data = await callFal("fal-ai/flux-pro/kontext", {
      image_url: imageUrl,
      prompt: preset.prompt,
      sync_mode: true,
    });

    return NextResponse.json({ imageUrl: data.images[0].url });
  } catch (error: any) {
    console.error("Fal.ai generation failed:", error);
    return NextResponse.json(
      { error: error.message || "Generation failed" },
      { status: 500 }
    );
  }
}

function getPlaceholder(style: string): string {
  const placeholders: Record<string, string> = {
    "Studio White": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000",
    "Nordic Minimal": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
    "Neon Galactic": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000",
    "Golden Hour": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000",
    "Botanical Zen": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1000",
    "Industrial Raw": "https://images.unsplash.com/photo-1585333120167-081824d74551?auto=format&fit=crop&q=80&w=1000",
  };
  return placeholders[style] || placeholders["Studio White"];
}
