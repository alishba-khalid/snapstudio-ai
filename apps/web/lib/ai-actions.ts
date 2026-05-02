export type StylePreset = {
  name: string;
  prompt: string;
  negative_prompt?: string;
  model: "fal-ai/flux-pro/kontext" | "fal-ai/fast-remove-bg";
};

export const STYLE_PRESETS: Record<string, StylePreset> = {
  "Background removal": {
    name: "Background removal",
    prompt: "",
    model: "fal-ai/fast-remove-bg",
  },
  "Studio White": {
    name: "Studio White",
    prompt: "Product photography on a pure white background, professional studio lighting, high resolution, minimalist aesthetic",
    model: "fal-ai/flux-pro/kontext",
  },
  "Nordic Minimal": {
    name: "Nordic Minimal",
    prompt: "Product photography in a minimalist Nordic style room, light wood textures, soft natural lighting, neutral colors, high quality",
    model: "fal-ai/flux-pro/kontext",
  },
  "Neon Galactic": {
    name: "Neon Galactic",
    prompt: "Product photography in a cyberpunk neon environment, vibrant purple and cyan lighting, futuristic background, reflections, high resolution",
    model: "fal-ai/flux-pro/kontext",
  },
  "Golden Hour": {
    name: "Golden Hour",
    prompt: "Product photography during golden hour, warm sunlight, long shadows, outdoor setting, luxury feel, high resolution",
    model: "fal-ai/flux-pro/kontext",
  },
  "Botanical Zen": {
    name: "Botanical Zen",
    prompt: "Product photography surrounded by lush green tropical leaves, soft diffused sunlight, organic textures, zen atmosphere, high resolution",
    model: "fal-ai/flux-pro/kontext",
  },
  "Industrial Raw": {
    name: "Industrial Raw",
    prompt: "Product photography in a raw industrial setting, concrete backgrounds, metallic accents, harsh professional lighting, moody atmosphere",
    model: "fal-ai/flux-pro/kontext",
  },
};

export async function removeBackground(imageUrl: string) {
  const res = await fetch("/api/fal/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imageUrl,
      style: "Background removal",
      preset: STYLE_PRESETS["Background removal"],
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.imageUrl;
}

export async function generateLifestyle(imageUrl: string, style: string) {
  const preset = STYLE_PRESETS[style];
  if (!preset) throw new Error(`Style ${style} not found`);

  if (preset.model === "fal-ai/fast-remove-bg") {
    return removeBackground(imageUrl);
  }

  const res = await fetch("/api/fal/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageUrl, style, preset }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.imageUrl;
}
