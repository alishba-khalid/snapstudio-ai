# SnapStudio AI — Features Specification

> **For Antigravity Agent:** This file defines the detailed implementation spec for each feature. Read the relevant section before implementing any feature. Always generate a plan artifact first and ask for approval before writing code.

---

## Feature 1: AI Background Removal

### Overview
The #1 core feature. Users upload a product photo → AI removes the background → transparent PNG is returned. Must handle: glass, jewelry, fur, complex hair, transparent packaging.

### Implementation Plan

**Backend (AI Worker — Python FastAPI)**
```python
# services/ai-worker/src/processors/background_removal.py

# Dependencies to install:
# rembg[gpu]==2.0.56 (use CPU version if no GPU: rembg==2.0.56)
# Pillow==10.3.0
# boto3==1.34.0 (for R2 upload)

from rembg import remove, new_session
from PIL import Image
import io

# Use u2net model (best general-purpose, 176MB)
# For fashion/clothing: use 'u2net_cloth_seg'
# For human subjects: use 'isnet-general-use'

session = new_session("u2net")  # loaded once at startup

async def remove_background(input_image_bytes: bytes) -> bytes:
    """
    Remove background from product image.
    Returns: PNG bytes with transparent background
    """
    input_image = Image.open(io.BytesIO(input_image_bytes))
    
    # Preserve EXIF orientation
    input_image = ImageOps.exif_transpose(input_image)
    
    # Remove background
    output_image = remove(
        input_image,
        session=session,
        alpha_matting=True,              # smoother edges
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=10,
    )
    
    # Convert to RGBA PNG
    if output_image.mode != 'RGBA':
        output_image = output_image.convert('RGBA')
    
    # Return PNG bytes
    output_buffer = io.BytesIO()
    output_image.save(output_buffer, format='PNG', optimize=True)
    return output_buffer.getvalue()
```

**Job Queue (BullMQ)**
```typescript
// apps/api/src/queues/image-processor.ts
// Queue name: 'image-processing'
// Concurrency: 5 workers
// Retry: 3 attempts with exponential backoff
// Timeout: 60 seconds per job

// Job data shape:
interface ImageJobData {
  imageId: string
  userId: string
  sourceKey: string          // R2 key for original image
  type: ImageType
  backgroundScene?: string
  brandStyleId?: string
  customPrompt?: string
}
```

**API Endpoint**
- `POST /api/v1/images/upload` (see API spec)
- Returns `jobId` immediately (202 Accepted)
- Client polls `GET /api/v1/images/:id/status` or uses SSE stream

### Edge Cases to Handle
- Image > 20MB → reject with 413 before upload to R2
- Unsupported format → reject with 415
- HEIC/HEIF → convert to JPEG using `sharp` before processing
- Image smaller than 200x200px → reject (too small for quality processing)
- Portrait photos with people → use `isnet-general-use` model instead
- If AI worker returns error → set image status to 'failed', retry 3x

### Quality Thresholds
- Background removal confidence > 85% → auto-proceed
- Confidence 60–85% → add soft edge refinement pass
- Confidence < 60% → flag for manual review (not MVP, log only)

---

## Feature 2: AI Scene Compositor

### Overview
After background removal, place the product into a chosen background scene with:
- Correct perspective and scale
- Realistic drop shadow
- Matching lighting direction
- Natural ambient occlusion

### Background Scene Library
Store 100+ scenes in R2 under `scenes/` prefix. Each scene has:
- `{id}_full.png` — high-res background (3000×3000px)
- `{id}_thumb.jpg` — thumbnail (300×300px)
- `{id}_meta.json` — lighting info, recommended product position

### Implementation

```python
# services/ai-worker/src/processors/scene_compositor.py

from PIL import Image, ImageFilter, ImageEnhance
import numpy as np

async def composite_product_on_scene(
    product_png: Image,      # RGBA, transparent background
    scene_image: Image,      # RGB background scene
    shadow_config: dict,     # from scene metadata
) -> Image:
    """
    Composite product onto background scene.
    """
    # 1. Resize product to fill ~75% of scene width (maintain aspect ratio)
    scene_w, scene_h = scene_image.size
    product_scale = calculate_product_scale(product_png, scene_w, target_fill=0.75)
    product_resized = product_png.resize(
        (int(product_png.width * product_scale), 
         int(product_png.height * product_scale)),
        Image.LANCZOS
    )
    
    # 2. Center product horizontally, position near bottom third
    x = (scene_w - product_resized.width) // 2
    y = int(scene_h * 0.55) - product_resized.height  # sits on bottom third
    
    # 3. Generate drop shadow
    shadow = generate_drop_shadow(
        product_resized,
        blur_radius=shadow_config.get('blur', 20),
        offset_x=shadow_config.get('offset_x', 10),
        offset_y=shadow_config.get('offset_y', 20),
        opacity=shadow_config.get('opacity', 0.4),
    )
    
    # 4. Composite: background → shadow → product
    result = scene_image.copy().convert('RGBA')
    result.paste(shadow, (x + shadow_offset_x, y + shadow_offset_y), shadow)
    result.paste(product_resized, (x, y), product_resized)
    
    return result.convert('RGB')

def generate_drop_shadow(product: Image, blur_radius, offset_x, offset_y, opacity) -> Image:
    """Generate realistic drop shadow from product alpha channel."""
    # Extract alpha channel as shadow base
    alpha = product.split()[-1]
    shadow = Image.new('RGBA', product.size, (0, 0, 0, 0))
    shadow.paste(Image.new('RGBA', product.size, (0, 0, 0, int(255 * opacity))), mask=alpha)
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=blur_radius))
    return shadow
```

### Available Background Categories (MVP — 20 scenes)
```
Studio:
  - studio_white_clean      (pure white, product photography standard)
  - studio_gradient_grey    (grey gradient, premium look)
  - studio_gradient_warm    (warm beige gradient)

Lifestyle — Home:
  - lifestyle_kitchen       (modern kitchen counter)
  - lifestyle_bedroom       (nightstand, soft fabrics)
  - lifestyle_bathroom      (marble surface, clean lines)
  - lifestyle_living_room   (coffee table, soft lighting)

Lifestyle — Outdoor:
  - outdoor_wood_deck       (natural wood, soft bokeh)
  - outdoor_marble_surface  (white marble slab)
  - outdoor_grass_daylight  (green grass, sunlight)

Fashion:
  - fashion_grey_seamless   (seamless grey backdrop)
  - fashion_white_seamless  (pure white seamless)
  - fashion_kraft_paper     (textured craft paper)

Food:
  - food_dark_slate         (dark moody, restaurant vibe)
  - food_bright_marble      (bright marble, cafe style)
  - food_rustic_wood        (rustic wooden table)

Festive (Pakistan market):
  - festive_eid_gold        (gold accents, Eid appropriate)
  - festive_ramadan_lantern (Ramadan aesthetic)

Tech/Electronics:
  - tech_dark_gradient      (dark, premium tech look)
  - tech_geometric          (geometric pattern, modern)
```

---

## Feature 3: Marketplace Export Pack

### Overview
One-click export in any marketplace's exact specification. Handles: resizing, background enforcement, color space, file format, compression.

### Marketplace Specs (seed into DB)

| Marketplace | Size | BG | Format | Product Fill | Max Size |
|---|---|---|---|---|---|
| Amazon.ae | 2000×2000 | #FFFFFF | JPG | 85% | 10MB |
| Amazon main (US) | 2000×2000 | #FFFFFF | JPG | 85% | 10MB |
| Daraz PK | 1000×1000 | #FFFFFF | JPG | 80% | 5MB |
| Noon UAE/KSA | 1200×1200 | #FFFFFF | JPG | 80% | 5MB |
| Shopify | 2048×2048 | any | JPG/PNG | — | 20MB |
| Instagram square | 1080×1080 | any | JPG | — | 8MB |
| TikTok shop | 800×800 | #FFFFFF | JPG | — | 3MB |

### Implementation

```python
# services/ai-worker/src/processors/marketplace_exporter.py

from PIL import Image, ImageOps
import io

MARKETPLACE_SPECS = {
    "amazon_ae": {
        "width": 2000, "height": 2000,
        "bg_color": (255, 255, 255),
        "format": "JPEG", "quality": 95,
        "max_size_bytes": 10 * 1024 * 1024,
        "product_fill": 0.85,
    },
    "daraz_pk": {
        "width": 1000, "height": 1000,
        "bg_color": (255, 255, 255),
        "format": "JPEG", "quality": 90,
        "max_size_bytes": 5 * 1024 * 1024,
        "product_fill": 0.80,
    },
    # ... etc
}

async def export_for_marketplace(
    product_png: Image,   # composited result image
    marketplace: str,
) -> bytes:
    spec = MARKETPLACE_SPECS[marketplace]
    
    # 1. Create white canvas
    canvas = Image.new('RGB', (spec['width'], spec['height']), spec['bg_color'])
    
    # 2. Scale product to fill specified % of canvas
    product_rgb = product_png.convert('RGBA')
    target_w = int(spec['width'] * spec['product_fill'])
    scale = target_w / product_rgb.width
    product_scaled = product_rgb.resize(
        (int(product_rgb.width * scale), int(product_rgb.height * scale)),
        Image.LANCZOS
    )
    
    # 3. Center on canvas
    x = (spec['width'] - product_scaled.width) // 2
    y = (spec['height'] - product_scaled.height) // 2
    canvas.paste(product_scaled, (x, y), product_scaled)
    
    # 4. Compress to meet size limit
    output = compress_to_limit(canvas, spec['format'], spec['quality'], spec['max_size_bytes'])
    
    return output
```

---

## Feature 4: Brand Style Locking

### Overview
Growth+ plan. User uploads 2–5 reference photos → AI extracts visual DNA (lighting, color grading, composition) → applies same style to all future images.

### Implementation

```python
# services/ai-worker/src/processors/brand_style_analyzer.py

async def analyze_brand_style(reference_images: list[Image]) -> dict:
    """
    Extract visual parameters from reference images.
    Returns a style profile that can be applied to future images.
    """
    profiles = []
    for img in reference_images:
        profiles.append({
            "avg_brightness": calculate_avg_brightness(img),
            "avg_saturation": calculate_avg_saturation(img),
            "color_temperature": estimate_color_temperature(img),
            "shadow_direction": estimate_shadow_direction(img),
            "background_tone": classify_background(img),  # 'light', 'dark', 'colorful'
        })
    
    # Aggregate across all reference images
    return {
        "lightingProfile": {
            "direction": most_common([p["shadow_direction"] for p in profiles]),
            "intensity": average([p["avg_brightness"] for p in profiles]),
            "colorTemp": average([p["color_temperature"] for p in profiles]),
        },
        "colorGrade": {
            "saturation": average([p["avg_saturation"] for p in profiles]),
            "shadows": "warm",  # extracted from histogram
            "highlights": "cool",
        },
        "backgroundStyle": most_common([p["background_tone"] for p in profiles]),
    }

async def apply_brand_style(image: Image, style_profile: dict) -> Image:
    """Apply extracted brand style to a new composited image."""
    from PIL import ImageEnhance
    
    # Apply color temperature shift
    image = adjust_color_temperature(image, style_profile["lightingProfile"]["colorTemp"])
    
    # Apply saturation
    enhancer = ImageEnhance.Color(image)
    image = enhancer.enhance(style_profile["colorGrade"]["saturation"])
    
    # Apply brightness
    enhancer = ImageEnhance.Brightness(image)
    image = enhancer.enhance(style_profile["lightingProfile"]["intensity"])
    
    return image
```

---

## Feature 5: Bulk Upload Processing

### Overview
Growth: 50 images at once. Scale: 500 images. All images get same background scene + brand style. Uses BullMQ priority queue.

### Implementation

```typescript
// apps/api/src/routes/images/bulk.ts

// Agent: implement bulk upload with these rules:
// 1. Receive all files via multipart/form-data
// 2. Upload ALL originals to R2 first (parallel, max 10 concurrent)
// 3. Create image records in DB (status: queued)
// 4. Add jobs to BullMQ queue with PRIORITY based on user plan:
//    - Scale: priority 1 (highest)
//    - Growth: priority 5
//    - Starter: priority 10
// 5. Return bulkJobId immediately (don't wait for processing)
// 6. Track progress in Redis: key = "bulk:{bulkJobId}"

// BullMQ concurrency config:
const worker = new Worker('image-processing', processJob, {
  connection: redis,
  concurrency: 5,          // 5 images processed simultaneously
  limiter: {
    max: 10,              // max 10 jobs per 5 seconds globally
    duration: 5000,
  },
})
```

---

## Feature 6: Ghost Mannequin Mode (Fashion)

### Overview
Growth+ plan. For clothing/apparel. Removes the mannequin or hanger, creating the "invisible mannequin" effect where clothes appear to be worn by an invisible body.

### Implementation Approach (Phase 2)
```python
# Use specialized model for clothing segmentation
# rembg with 'u2net_cloth_seg' model handles this well
# For advanced results, use Fal.ai's inpainting API

# Process:
# 1. Segment garment from mannequin using u2net_cloth_seg
# 2. Identify mannequin regions (collar inside, sleeve ends)
# 3. Use inpainting to fill interior collar area
# 4. Composite onto white/grey background
# 5. Add subtle inner shadow to maintain 3D illusion
```

---

## Feature 7: Subscription & Usage Enforcement

### Middleware (must be on every image processing route)

```typescript
// apps/api/src/middleware/usage-check.ts

export async function checkUsageLimit(request, reply) {
  const { userId } = request.user
  const currentPeriod = getCurrentPeriod() // '2026-04'
  
  // Get usage for current period
  const usage = await db
    .select({ count: count() })
    .from(usageLogs)
    .where(and(
      eq(usageLogs.userId, userId),
      eq(usageLogs.billingPeriod, currentPeriod),
      eq(usageLogs.action, 'image_processed')
    ))
  
  // Get user's plan limit
  const subscription = await getSubscription(userId)
  const limit = subscription.imagesPerMonth
  
  if (usage[0].count >= limit) {
    return reply.status(429).send({
      error: {
        code: 'USAGE_LIMIT_REACHED',
        message: `You've used all ${limit} images in your ${subscription.plan} plan this month.`,
        statusCode: 429,
        upgradeUrl: 'https://snapstudio.ai/pricing',
        resetDate: subscription.currentPeriodEnd,
      }
    })
  }
}
```

---

## Feature 8: Real-Time Status Updates (SSE)

```typescript
// apps/api/src/routes/images/stream.ts
// Server-Sent Events for real-time job progress

export async function imageStatusStream(request, reply) {
  const { id: imageId } = request.params
  
  reply.raw.setHeader('Content-Type', 'text/event-stream')
  reply.raw.setHeader('Cache-Control', 'no-cache')
  reply.raw.setHeader('Connection', 'keep-alive')
  
  const sendEvent = (event: string, data: object) => {
    reply.raw.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
  }
  
  // Poll DB every 500ms and emit updates
  const interval = setInterval(async () => {
    const image = await getImage(imageId)
    
    if (image.status === 'processing') {
      sendEvent('status_update', { status: 'processing', progress: estimateProgress(image) })
    }
    
    if (image.status === 'completed') {
      sendEvent('completed', {
        status: 'completed',
        processedUrl: image.processedUrl,
        durationMs: image.processingDurationMs,
      })
      clearInterval(interval)
      reply.raw.end()
    }
    
    if (image.status === 'failed') {
      sendEvent('failed', { status: 'failed', error: image.errorMessage })
      clearInterval(interval)
      reply.raw.end()
    }
  }, 500)
  
  // Cleanup on client disconnect
  request.raw.on('close', () => clearInterval(interval))
}
```
