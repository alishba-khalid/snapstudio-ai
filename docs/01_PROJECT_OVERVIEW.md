# SnapStudio AI — Product Photography SaaS
## Master Project Requirements Document (PRD)

> **For Antigravity Agent:** Before writing any code or running any commands, generate a detailed plan artifact (folder tree, all dependencies, implementation steps) and ask for approval. Always plan first.

---

## 1. Project Summary

**Product Name:** SnapStudio AI  
**Type:** B2B SaaS — AI-powered product photography platform  
**Target Market:** E-commerce sellers on Daraz, Shopify, Amazon, Noon (Pakistan, UAE, KSA, India)  
**Core Value Prop:** Turn a raw phone photo into studio-quality, marketplace-ready product images in under 10 seconds — at 95% less cost than a photography studio.

---

## 2. The Problem We Solve

- Traditional product photography costs PKR 500–2000 per image (studio, photographer, editing)
- Sellers waste 2–5 days on photo editing before going live on marketplace
- Every marketplace (Amazon, Daraz, Noon) has different image spec requirements — sellers get rejected
- No AI tool exists that is localized for South Asia / MENA ecom sellers
- Fashion sellers (Pakistan's #1 ecom category) have no affordable ghost mannequin solution

---

## 3. Target Users

| Segment | Description | Pain Point |
|---|---|---|
| Small Daraz/Shopify sellers | 1–50 SKUs, solo operators | Can't afford studio, slow time-to-market |
| Fashion brands | Apparel, footwear, accessories | Ghost mannequin edits expensive and slow |
| Digital agencies | Manage 5–20 brand clients | Need white-label, bulk processing |
| Food delivery partners | Restaurants on Foodpanda/Careem | Poor dish photos = fewer orders |
| Amazon.ae / Noon sellers | Gulf-based ecom businesses | Need marketplace-compliant images fast |

---

## 4. Core User Journey (MVP)

```
User signs up (free trial)
  → Uploads raw product photo (phone photo ok)
    → AI removes background in < 3 seconds
      → User picks lifestyle scene or studio background
        → AI generates polished image with correct lighting + shadows
          → User exports in marketplace format (Amazon / Daraz / Shopify)
            → User upgrades to paid plan
```

---

## 5. Success Metrics

- **Month 3:** 50 paying customers, $2,000 MRR
- **Month 6:** 300 paying customers, $10,000 MRR
- **Month 12:** 1,000 customers, $40,000 MRR
- **Image quality:** Users cannot distinguish output from studio photography (blind test target)
- **Processing speed:** < 10 seconds per image (p95)
- **Retention:** > 85% monthly retention

---

## 6. Full Feature List (MVP → Scale)

### MVP (Month 1–3)
- [ ] User authentication (email + Google OAuth)
- [ ] Dashboard with image upload
- [ ] AI background removal (precision cutout)
- [ ] 20 lifestyle / studio background scenes
- [ ] Basic auto-enhancement (sharpness, exposure, color correction)
- [ ] Image export (JPG, PNG, WebP)
- [ ] Subscription billing (Starter $9, Growth $39)
- [ ] Usage tracking (images used / limit)

### Growth (Month 4–6)
- [ ] Marketplace export packs (Amazon, Daraz, Noon, Shopify specs)
- [ ] Brand style locking (upload 2–3 reference images, AI matches style)
- [ ] Bulk upload (process 50 images at once)
- [ ] Shopify app integration
- [ ] REST API (beta)
- [ ] Ghost mannequin mode (fashion only)
- [ ] Scale plan ($99/mo)

### Scale (Month 7–12)
- [ ] AI video clip generation (product image → 10s video)
- [ ] White-label reseller plan ($199/mo)
- [ ] WooCommerce / Daraz Seller Center plugin
- [ ] On-model placement (diverse AI fashion models)
- [ ] Enterprise plan (custom pricing, SLA)
- [ ] Food photography mode (steam, garnish, plating scenes)
- [ ] 3D / 360-degree product view generation

---

## 7. Non-Functional Requirements

- **Performance:** Image processing p95 < 10 seconds; page load < 2 seconds
- **Uptime:** 99.5% SLA for paid plans
- **Security:** SOC2-ready practices; images deleted from server after 30 days (user configurable)
- **Scalability:** Handle 10,000 concurrent image jobs via async queue
- **Compliance:** GDPR-ready, Pakistan PDPA-compliant
- **Accessibility:** WCAG 2.1 AA on all frontend pages
- **Mobile:** Fully responsive web app; mobile upload via camera

---

## 8. Monetization Model

| Plan | Price | Images/mo | Key Features |
|---|---|---|---|
| Free Trial | $0 | 5 | Background removal only, watermarked |
| Starter | $9/mo | 50 | All backgrounds, standard export |
| Growth | $39/mo | 300 | Brand style lock, bulk 50, marketplace packs, 5 videos |
| Scale | $99/mo | Unlimited | API, bulk 500+, ghost mannequin, 30 videos |
| Enterprise | Custom | Unlimited | White-label, SLA, custom AI models |
| Pay-per-image | $0.15–0.50 | As needed | No subscription |
| API Credits | $10 = 100 credits | — | Developer access |

---

## 9. Competitive Positioning

We win by being:
1. **Cheapest** for South Asia / MENA market (local currency pricing)
2. **Most compliant** — auto-export in Daraz, Noon, Amazon.ae exact specs
3. **Fashion-first** — deepest ghost mannequin + on-model suite in the region
4. **Only white-label** option for agencies in Pakistan / UAE
5. **Fastest to live listing** — upload to marketplace-ready in under 60 seconds

---

## 10. Project File Structure

```
snapstudio/
├── apps/
│   ├── web/              # Next.js 15 frontend
│   └── api/              # Node.js (Fastify) backend
├── services/
│   └── ai-worker/        # Python FastAPI AI microservice
├── packages/
│   ├── ui/               # Shared component library
│   ├── types/            # Shared TypeScript types
│   └── config/           # Shared config (ESLint, Tailwind)
├── infrastructure/
│   ├── docker/
│   └── terraform/
├── docs/
│   ├── 01_PROJECT_OVERVIEW.md    ← this file
│   ├── 02_TECH_STACK.md
│   ├── 03_DATABASE_SCHEMA.md
│   ├── 04_API_SPEC.md
│   ├── 05_FEATURES_SPEC.md
│   └── 06_UI_PAGES_SPEC.md
└── README.md
```
