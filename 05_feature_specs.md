# ⚙️ SnapStudio — Feature Specifications
> Detailed specs for every feature to build

---

## 🎯 MVP Feature Set (Must-Have for Launch)

### Feature 1: Background Removal
**Priority:** P0 (Critical)

**User Story:** As a Daraz seller, I want to remove the messy background from my product photo so my listing looks professional.

**Acceptance Criteria:**
- [ ] User uploads image (JPG, PNG, WEBP up to 20MB)
- [ ] Background removed in under 5 seconds
- [ ] Edges are clean (no fringing, halos)
- [ ] Transparent PNG available for download
- [ ] White background version available instantly
- [ ] Works on: products with glass, fabric, shoes, electronics, jewelry

**Technical Spec:**
```javascript
// Recommended API: Fal.ai background removal
Endpoint: fal.ai/models/birefnet
Input: image_url (string)
Output: image_url with transparent background
Fallback: remove.bg API
```

---

### Feature 2: AI Scene / Background Generation
**Priority:** P0 (Critical)

**User Story:** As a seller, I want to place my product into a professional-looking lifestyle scene without owning a studio.

**Acceptance Criteria:**
- [ ] User selects from preset scene library (minimum 50 scenes at launch)
- [ ] Scene generated in under 10 seconds
- [ ] Product is accurately placed in scene (no distortion)
- [ ] Lighting matches product realistically
- [ ] User can type custom scene prompt (text-to-scene)
- [ ] Scenes organized by product category

**Scene Categories at Launch:**
```
├── Clean/Minimal
│   ├── Pure White
│   ├── Soft Grey
│   └── Cream/Beige
├── Lifestyle — Indoor
│   ├── Modern Kitchen
│   ├── Bedroom Dresser
│   ├── Office Desk
│   └── Luxury Shelf
├── Lifestyle — Outdoor
│   ├── Garden/Nature
│   ├── Urban Street
│   └── Coastal/Beach
├── Luxury/Premium
│   ├── Dark Marble
│   ├── Gold Accent
│   └── Studio Spotlight
└── Regional/Cultural
    ├── Pakistani Home Setting
    ├── Modern Dubai Interior
    └── Bazaar/Market Aesthetic
```

---

### Feature 3: Marketplace Compliance Export
**Priority:** P0 (Critical — Your Unique Value Prop)

**User Story:** As a Daraz seller, I want to export my image in exactly the right format so it never gets rejected by the marketplace.

**Acceptance Criteria:**
- [ ] One-click export for each supported platform
- [ ] Automatic resize to correct dimensions
- [ ] Background auto-corrected to meet compliance (pure white for Amazon)
- [ ] File size compressed to within platform limits
- [ ] File format converted to required type
- [ ] Compliance checklist shown before download

**Platform Export Specs:**

| Platform | Dimensions | Background | Format | Max Size |
|----------|-----------|-----------|--------|---------|
| Daraz Main | 1500×1500px | White preferred | JPG | 5MB |
| Daraz Additional | 1500×1500px | Any | JPG/PNG | 5MB |
| Noon Main | 1000×1000px | White/Light | JPG | 3MB |
| Amazon.ae | 1600×1600px min | RGB(255,255,255) | JPG | 10MB |
| Shopify | 2048×2048px | Any | JPG/PNG/WEBP | 20MB |
| Instagram | 1080×1080px | Any | JPG | 8MB |
| WhatsApp | 800×800px | Any | JPG | 5MB |

---

### Feature 4: User Authentication & Dashboard
**Priority:** P0 (Critical)

**Acceptance Criteria:**
- [ ] Sign up with email / Google
- [ ] Dashboard shows: images generated, credits remaining, recent images
- [ ] Image history (last 30 days)
- [ ] Download past images
- [ ] Account settings (name, email, password, plan)

---

### Feature 5: Credit / Subscription System
**Priority:** P0 (Critical)

**Acceptance Criteria:**
- [ ] Free tier: 10 credits on signup
- [ ] Credits deducted per image generated
- [ ] Subscription upgrades unlock monthly credit allowance
- [ ] Credits reset on billing date
- [ ] Credit balance always visible in header
- [ ] Low credit warning (when < 5 credits remaining)

**Payment Integration:**
```
Pakistan: JazzCash API + Easypaisa API + Card via Stripe
UAE/International: Stripe (card, Apple Pay, Google Pay)
```

---

## 🚀 Phase 2 Features (Post-Launch)

### Feature 6: Batch Processing
**Priority:** P1 (High)

**User Story:** As a seller with 100 products, I want to process all images at once and download them as a ZIP.

**Acceptance Criteria:**
- [ ] Upload up to 100 images at once
- [ ] Apply same background/scene to all
- [ ] Progress bar shows % completion and estimated time
- [ ] Failed images flagged individually (not blocking)
- [ ] ZIP download with all marketplace formats included
- [ ] Batch history saved in dashboard

**Technical Requirement:**
- Redis job queue for batch processing
- Background workers (not blocking main thread)
- Webhook/email notification when batch complete

---

### Feature 7: Brand DNA
**Priority:** P1 (High)

**User Story:** As a brand, I want all my product images to have the same look and feel automatically.

**Acceptance Criteria:**
- [ ] User saves a "Brand DNA" (background, lighting, color tone)
- [ ] Apply Brand DNA to any new image with one click
- [ ] Up to 3 Brand DNAs per account on Growth plan
- [ ] Unlimited Brand DNAs on Pro plan
- [ ] Preview Brand DNA before saving

---

### Feature 8: Urdu Language UI
**Priority:** P1 (High — Differentiation)

**Acceptance Criteria:**
- [ ] Complete UI translated to Urdu
- [ ] RTL layout support
- [ ] Toggle between English/Urdu in settings
- [ ] Error messages in Urdu
- [ ] Help documentation in Urdu

---

### Feature 9: Mobile PWA Optimization
**Priority:** P1 (High)

**Acceptance Criteria:**
- [ ] App installable from browser (PWA)
- [ ] Direct camera capture (no need to go to gallery)
- [ ] Works on 3G connections (auto-compress uploads)
- [ ] Offline mode shows recent images from cache
- [ ] Touch-optimized UI (no tiny buttons)
- [ ] Works on Android 8+ (most Pakistani phones)

---

## 🌟 Phase 3 Features (Growth)

### Feature 10: Shopify Integration
**Priority:** P2 (Medium)

- Direct publish to Shopify product listings
- Bulk replace all product images
- Auto-sync when new products added

### Feature 11: Short Video Generation
**Priority:** P2 (Medium)

- Generate 3–5 second product clip from still image
- Formats: TikTok (9:16), Instagram Reels, Daraz video listing
- Simple pan/zoom/rotate animation with particle effects

### Feature 12: API Access
**Priority:** P2 (Medium — Enterprise Tier)

- REST API with API key authentication
- Rate limiting per plan
- Webhook support
- Documentation site
- Postman collection

### Feature 13: Team / Agency Accounts
**Priority:** P2 (Medium)

- Sub-accounts under one agency account
- Separate credit pools per client
- White-label option (custom domain/branding)
- Monthly usage reports per client

---

## 🐛 Known Issues to Fix (From Current Screenshots)

| Issue | Location | Fix Required |
|-------|----------|-------------|
| "1 Issue" error badge | Bottom left, all pages | Debug and resolve the Nuxt/Next error |
| "Absoultely" typo | FAQ section | Change to "Absolutely" |
| Gallery is all B&W | Image gallery section | Add 6–10 color/vibrant examples |
| Demo button | Hero section | Ensure it shows real AI output, not static |
| Mobile nav | Header | Test hamburger menu on mobile |
