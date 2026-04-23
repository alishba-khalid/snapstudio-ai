export type MarketplaceSpec = {
  name: string;
  minWidth: number;
  minHeight: number;
  recommendedWidth: number;
  recommendedHeight: number;
  format: 'image/jpeg' | 'image/png' | 'image/webp';
  backgroundColor?: string;
  description: string;
};

export const MARKETPLACE_SPECS: Record<string, MarketplaceSpec> = {
  "Daraz": {
    name: "Daraz",
    minWidth: 800,
    minHeight: 800,
    recommendedWidth: 1500,
    recommendedHeight: 1500,
    format: 'image/jpeg',
    backgroundColor: '#FFFFFF',
    description: "Optimized for Daraz.pk listings. 1500x1500px JPEG.",
  },
  "Amazon.ae": {
    name: "Amazon.ae",
    minWidth: 1600,
    minHeight: 1600,
    recommendedWidth: 2048,
    recommendedHeight: 2048,
    format: 'image/jpeg',
    backgroundColor: '#FFFFFF',
    description: "Pure white background (255,255,255). 2048px square.",
  },
  "Shopify": {
    name: "Shopify",
    minWidth: 1024,
    minHeight: 1024,
    recommendedWidth: 2048,
    recommendedHeight: 2048,
    format: 'image/png',
    description: "High resolution PNG for Shopify storefronts.",
  },
  "Noon": {
    name: "Noon",
    minWidth: 1000,
    minHeight: 1000,
    recommendedWidth: 1500,
    recommendedHeight: 1500,
    format: 'image/jpeg',
    backgroundColor: '#FFFFFF',
    description: "Standard Noon format with white background.",
  }
};

export async function processImageForMarketplace(
  imageSrc: string,
  spec: MarketplaceSpec
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error("Could not create canvas context"));
        return;
      }

      // Set to recommended size
      canvas.width = spec.recommendedWidth;
      canvas.height = spec.recommendedHeight;

      // Fill background if specified
      if (spec.backgroundColor) {
        ctx.fillStyle = spec.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Calculate scaling to fit product
      // For Amazon, product must occupy 85%+ of frame
      const paddingScale = spec.name === "Amazon.ae" ? 0.85 : 0.95;
      const targetWidth = canvas.width * paddingScale;
      const targetHeight = canvas.height * paddingScale;
      
      const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      resolve(canvas.toDataURL(spec.format, 0.9));
    };
    img.onerror = () => reject(new Error("Failed to load image for processing"));
    img.src = imageSrc;
  });
}

export function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
