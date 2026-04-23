import { falClient } from "./fal";

export type StylePreset = {
  name: string;
  prompt: string;
  negative_prompt?: string;
  model: "fal-ai/flux-pro/v1.1-gen-fill" | "fal-ai/fast-remove-bg";
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
    model: "fal-ai/flux-pro/v1.1-gen-fill",
  },
  "Nordic Minimal": {
    name: "Nordic Minimal",
    prompt: "Product photography in a minimalist Nordic style room, light wood textures, soft natural lighting, neutral colors, high quality",
    model: "fal-ai/flux-pro/v1.1-gen-fill",
  },
  "Neon Galactic": {
    name: "Neon Galactic",
    prompt: "Product photography in a cyberpunk neon environment, vibrant purple and cyan lighting, futuristic background, reflections, high resolution",
    model: "fal-ai/flux-pro/v1.1-gen-fill",
  },
  "Golden Hour": {
    name: "Golden Hour",
    prompt: "Product photography during golden hour, warm sunlight, long shadows, outdoor setting, luxury feel, high resolution",
    model: "fal-ai/flux-pro/v1.1-gen-fill",
  },
  "Botanical Zen": {
    name: "Botanical Zen",
    prompt: "Product photography surrounded by lush green tropical leaves, soft diffused sunlight, organic textures, zen atmosphere, high resolution",
    model: "fal-ai/flux-pro/v1.1-gen-fill",
  },
  "Industrial Raw": {
    name: "Industrial Raw",
    prompt: "Product photography in a raw industrial setting, concrete backgrounds, metallic accents, harsh professional lighting, moody atmosphere",
    model: "fal-ai/flux-pro/v1.1-gen-fill",
  },
};

export async function removeBackground(imageUrl: string) {
  const result = await falClient.subscribe("fal-ai/fast-remove-bg", {
    input: {
      image_url: imageUrl,
    },
  });
  return result.data.image.url;
}

export async function generateLifestyle(imageUrl: string, style: string) {
  const preset = STYLE_PRESETS[style];
  if (!preset) throw new Error(`Style ${style} not found`);

  if (preset.model === "fal-ai/fast-remove-bg") {
    return removeBackground(imageUrl);
  }

  // First remove background to get the product mask/cutout (optional but better for some models)
  // For Flux Gen Fill, we might need a mask.
  // For simplicity in MVP, let's assume we use a model that takes image + prompt.
  
  const result = await falClient.subscribe(preset.model, {
    input: {
      image_url: imageUrl,
      prompt: preset.prompt,
      sync_mode: true,
    },
  });
  
  return result.data.images[0].url;
}
