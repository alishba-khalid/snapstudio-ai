# 🗺️ SnapStudio — Product Roadmap
> From "looks great" to "actually ships and makes money"

---

## 🚨 Phase 0 — Fix Before Launch (URGENT — Week 1)

These are bugs/issues visible RIGHT NOW on your live site. Fix these before showing anyone.

| # | Issue | Priority | Notes |
|---|-------|----------|-------|
| 1 | **"1 Issue" error badge** visible on every page | 🔴 Critical | Kills credibility immediately |
| 2 | **Typo: "Absoultely"** in FAQ section | 🔴 Critical | Should be "Absolutely" |
| 3 | **All gallery images are B&W only** | 🟡 High | Add color examples to show full range |
| 4 | **Demo button** — does it actually work? | 🔴 Critical | Must show real AI output |
| 5 | **Mobile responsiveness** check | 🟡 High | Most Pakistan users are on mobile |

---

## 🏗️ Phase 1 — Build the Real Product (Month 1–2)

### 1.1 AI Backend Integration

Choose ONE to start (recommendation: Fal.ai for speed + cost):

```
Option A: Fal.ai (Recommended for MVP)
- Fastest inference in market right now
- Pay-per-use — no upfront cost
- Great background removal + scene generation models

Option B: Replicate API
- More model variety
- Slightly slower than Fal.ai
- Good documentation

Option C: Stability AI
- More control
- Higher setup complexity
- Better for custom fine-tuning later
```

**Features to build with AI backend:**
- [ ] Background removal (product cutout)
- [ ] White background generation (Daraz compliance)
- [ ] Lifestyle scene generation (from text prompt)
- [ ] Shadow/reflection generation
- [ ] Image upscaling to required resolution

### 1.2 Core User Flow
```
User uploads phone photo
    ↓
AI removes background (< 3 seconds)
    ↓
User picks scene / style
    ↓
AI generates final image (< 10 seconds)
    ↓
User exports in marketplace-ready format
```

### 1.3 Marketplace Compliance Engine 🔥 (Your Killer Feature)

Build auto-export presets for each platform:

**Daraz Pakistan:**
- Minimum: 800 × 800px
- Recommended: 1500 × 1500px
- Format: JPG/PNG
- Background: White preferred for main image
- Max file size: 5MB

**Noon UAE:**
- Minimum: 1000 × 1000px
- White or light background for main image
- Format: JPG
- Max file size: 3MB

**Amazon.ae:**
- Pure white background: RGB (255, 255, 255)
- Product must occupy 85%+ of frame
- Minimum: 1600px on longest side
- Format: JPG/TIFF/PNG

**Shopify:**
- Square format: 2048 × 2048px recommended
- Any background acceptable
- Format: JPG/PNG/WEBP

---

## 🚀 Phase 2 — Differentiation Features (Month 2–3)

### 2.1 Batch Processing
- Upload 10–100 images at once
- Apply same background/scene to all
- Single ZIP download with all marketplace formats
- Progress bar with estimated time

### 2.2 Localization
- [ ] PKR pricing display
- [ ] AED pricing display
- [ ] Urdu language UI option (major differentiator — zero competitors have this)
- [ ] Arabic language UI option (for UAE market)

### 2.3 WhatsApp Integration
- WhatsApp Business API for customer support
- "Send image via WhatsApp" export option
- WhatsApp-optimized image format (under 5MB, JPG)

### 2.4 Mobile Upload Optimization
- Drag-and-drop on desktop
- Direct camera capture on mobile
- Auto-compress oversized phone photos before processing
- No-app-needed — pure web PWA

### 2.5 Style Library (Pinterest Mode Expansion)
Your current site already shows "Pinterest Mode" — expand this:
- 100+ curated scenes organized by product category:
  - Electronics
  - Fashion/Clothing
  - Skincare/Beauty
  - Food/Beverages
  - Jewelry
  - Home Decor
  - Watches
- "Save as Brand DNA" — reuse same style across entire catalog

---

## 🌟 Phase 3 — Growth Features (Month 3–5)

### 3.1 Brand DNA System
- Save your preferred backgrounds, colors, lighting
- One-click apply to new products
- Consistent look across all listings = professional brand identity

### 3.2 A/B Testing Integration
- Generate 3 variants of same product image
- Track which one gets more clicks (if integrated with Daraz/Shopify analytics)
- Auto-recommend winning image

### 3.3 Shopify Plugin
- Direct integration with Shopify store
- Replace existing product images with AI-enhanced ones
- Bulk process entire store catalog

### 3.4 Video Generation (Future 🔮)
- 3-5 second product video from still image
- Optimized for TikTok Shop, Instagram Reels
- Daraz video listing format support

### 3.5 API Access (Enterprise Tier)
- Allow large sellers and agencies to integrate via API
- Usage-based pricing
- Webhook support for automated workflows

---

## 📱 Tech Stack Recommendations

### Frontend (You likely have this)
- Next.js / React
- Tailwind CSS
- Framer Motion for animations

### Backend Recommendations
- Node.js / Express OR Next.js API routes
- PostgreSQL for user data
- AWS S3 / Cloudflare R2 for image storage (R2 is cheaper)
- Redis for job queuing (batch processing)

### AI Integration
- **Fal.ai** — background removal + scene generation
- **Sharp.js** — server-side image resizing/compliance formatting
- **Cloudflare Images** — CDN + transformation

### Payments
- **Stripe** for USD/international
- **JazzCash / Easypaisa API** for PKR payments (critical for Pakistan market)
- **Telr** for UAE/AED payments

### Authentication
- Clerk.dev or NextAuth.js

---

## ✅ Launch Checklist

**Before going live:**
- [ ] Fix all Phase 0 bugs
- [ ] AI backend actually processes real images
- [ ] Demo works and shows impressive results
- [ ] Pricing page live with PKR + USD options
- [ ] Payment integration working
- [ ] Email onboarding sequence set up
- [ ] Mobile experience tested on Android (most Daraz sellers use Android)
- [ ] WhatsApp support number active
- [ ] Terms of Service + Privacy Policy pages
- [ ] Daraz auto-export actually tested with a real Daraz listing
