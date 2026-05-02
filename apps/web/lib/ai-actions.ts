import { falClient } from "./fal";

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
  const useInternal = process.env.NEXT_PUBLIC_USE_INTERNAL_AI === "true";
  const workerUrl = process.env.NEXT_PUBLIC_AI_WORKER_URL || "http://localhost:8000";

  if (useInternal) {
    console.log("🚀 SnapStudio: Using Internal AI Worker (rembg)...");
    try {
      const response = await fetch(`${workerUrl}/remove-bg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_url: imageUrl }),
      });

      if (!response.ok) {
        throw new Error(`Internal worker responded with ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ SnapStudio: Internal background removal successful");
      return data.image_base64;
    } catch (error) {
      console.error("⚠️ SnapStudio: Internal AI Worker failed. Falling back to Fal.ai...", error);
      // Fall through to Fal.ai
    }
  }

  const hasFalKey = process.env.FAL_KEY && process.env.FAL_KEY !== 'fake_key_for_testing' && process.env.FAL_KEY !== 'your-fal-key-here';
  const shouldSimulate = process.env.NEXT_PUBLIC_SIMULATE_AI === 'true' || !hasFalKey;
  
  if (shouldSimulate) {
    console.log("🧪 SnapStudio: Simulating background removal...");
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Return a transparent PNG placeholder (base64) or a dummy URL
    // For demo, let's return the original image but log that it's a simulation
    return imageUrl; 
  }

  console.log("🌐 SnapStudio: Using Fal.ai External API...");
  const result = await falClient.subscribe("fal-ai/fast-remove-bg", {
    input: {
      image_url: imageUrl,
    },
  });
  console.log("✅ SnapStudio: Fal.ai background removal successful");
  return result.data.image.url;
}

export async function generateLifestyle(imageUrl: string, style: string) {
  const preset = STYLE_PRESETS[style];
  if (!preset) throw new Error(`Style ${style} not found`);

  if (preset.model === "fal-ai/fast-remove-bg") {
    return removeBackground(imageUrl);
  }

  // Check if we have a valid Fal.ai key
  const hasFalKey = process.env.FAL_KEY && process.env.FAL_KEY !== 'fake_key_for_testing' && process.env.FAL_KEY !== 'your-fal-key-here';
  const shouldSimulate = process.env.NEXT_PUBLIC_SIMULATE_AI === 'true' || !hasFalKey;
  
  if (shouldSimulate) {
    console.log(`🧪 SnapStudio: Simulating ${style} generation...`);
    // Return a beautiful themed placeholder based on style
    const placeholders: Record<string, string> = {
      "Studio White": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000",
      "Nordic Minimal": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
      "Neon Galactic": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000",
      "Golden Hour": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000",
      "Botanical Zen": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1000",
      "Industrial Raw": "https://images.unsplash.com/photo-1585333120167-081824d74551?auto=format&fit=crop&q=80&w=1000"
    };
    
    // Artificial delay for realism
    await new Promise(resolve => setTimeout(resolve, 2000));
    return placeholders[style] || placeholders["Studio White"];
  }

  console.log(`🌐 SnapStudio: Generating ${style} with Fal.ai...`);
  const result = await falClient.subscribe(preset.model, {
    input: {
      image_url: imageUrl,
      prompt: preset.prompt,
      sync_mode: true,
    },
  });
  
  return result.data.images[0].url;
}
