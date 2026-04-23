# SnapStudio AI — UI Pages & Components Specification

> **For Antigravity Agent:** Build the frontend using Next.js 15 App Router, Tailwind CSS v4, and shadcn/ui. Every page must be fully responsive (mobile-first). Follow the design system defined here. Generate a plan artifact before coding any page.

---

## Design System

### Brand Colors
```css
/* Add to tailwind.config.ts */
colors: {
  brand: {
    50:  '#F0F4FF',
    100: '#E0E9FF',
    500: '#4361EE',   /* Primary — electric blue */
    600: '#3451D1',   /* Hover */
    700: '#2941B8',   /* Active */
    900: '#0F1B6B',   /* Dark */
  },
  surface: {
    50:  '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
  }
}
```

### Typography Scale
```
Heading XL:  48px / 52px / font-bold   — Hero headlines
Heading L:   36px / 40px / font-bold   — Page titles
Heading M:   24px / 28px / font-semibold — Section titles
Heading S:   18px / 24px / font-semibold — Card titles
Body L:      16px / 24px / font-normal  — Primary body text
Body S:      14px / 20px / font-normal  — Secondary text
Caption:     12px / 16px / font-normal  — Labels, metadata
```

### Component Tokens
```
Border radius: rounded-xl (12px) for cards, rounded-lg (8px) for buttons
Shadow: shadow-sm for cards, shadow-md for modals
Border: border border-surface-200
```

---

## App Router File Structure

```
apps/web/app/
├── (marketing)/              # Public pages (no auth)
│   ├── page.tsx              # Landing page (/)
│   ├── pricing/page.tsx
│   ├── about/page.tsx
│   └── layout.tsx            # Marketing layout (navbar + footer)
│
├── (auth)/                   # Auth pages
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── forgot-password/page.tsx
│   └── layout.tsx            # Centered card layout
│
├── (app)/                    # Protected app pages
│   ├── dashboard/page.tsx    # Main dashboard
│   ├── studio/page.tsx       # Image editor / upload
│   ├── gallery/page.tsx      # All processed images
│   ├── projects/
│   │   ├── page.tsx          # Projects list
│   │   └── [id]/page.tsx     # Single project
│   ├── brand-styles/page.tsx
│   ├── settings/
│   │   ├── page.tsx          # General settings
│   │   ├── billing/page.tsx
│   │   └── api-keys/page.tsx
│   └── layout.tsx            # App layout (sidebar + topbar)
│
└── api/                      # Next.js API routes (auth callbacks only)
    └── auth/[...nextauth]/route.ts
```

---

## Page 1: Landing Page (`/`)

### Layout
```
[Navbar]
  Logo | Features | Pricing | Blog | Sign In | Start Free →

[Hero Section]
  Headline: "Studio-Quality Product Photos. In 10 Seconds."
  Subline: "Upload your product photo. AI removes the background, adds a 
            professional scene, and exports it ready for Amazon, Daraz & Shopify."
  CTA: [Start Free — No Credit Card] [Watch 60s Demo]
  
  [Before/After Slider — React Compare Slider]
    Left: Raw phone photo of perfume bottle on white table
    Right: AI-processed studio shot on marble background
  
  Social proof: "Trusted by 1,000+ sellers on Daraz, Amazon & Shopify"
  Logos: Daraz | Shopify | Amazon.ae | Noon

[How It Works — 3 Steps]
  1. Upload → 2. Choose Scene → 3. Export
  Each step has animated illustration

[Feature Cards — 3 Column Grid]
  - Background Removal (icon: scissors)
  - 100+ Lifestyle Scenes (icon: image)
  - Marketplace Export (icon: shopping bag)
  - Brand Style Locking (icon: palette)
  - Bulk Processing (icon: layers)
  - Ghost Mannequin (icon: shirt)

[Pricing Preview]
  3 plan cards (Starter / Growth / Scale) with Start Free CTA

[Social Proof]
  3 testimonial cards from Pakistani/Gulf ecom sellers
  With real metrics: "Cut my photography cost from Rs. 1500 to Rs. 15 per image"

[FAQ Accordion]
  - Is it really cheaper than a photographer?
  - Does it work for clothing/fashion?
  - Which marketplaces are supported?
  - Can I use it for food photography?
  - Is my data private?

[Footer]
  Links | Social | Contact | Privacy Policy | Terms
```

### Key Components to Build
```tsx
// components/marketing/before-after-slider.tsx
// Use: react-compare-slider
// Show real product transformation on the hero

// components/marketing/pricing-card.tsx
// Props: plan name, price, features[], isPopular, ctaText

// components/marketing/faq-accordion.tsx
// Use: shadcn Accordion component
```

---

## Page 2: Studio (Main App Page) — `/studio`

This is the most important page. Users upload images and see results here.

### Layout (Desktop — 3 Column)
```
[Left Sidebar — Upload & Settings]    [Center — Preview Canvas]    [Right — Scenes & Export]
  
  Upload Zone (drag & drop)            Before/After toggle            Scene Selector
  ┌─────────────────────┐             ┌──────────────────┐           Search scenes
  │  Drag & drop or     │             │                  │           [Grid of scene thumbnails]
  │  click to upload    │             │  [Product Image] │
  │  📷 Or use camera  │             │                  │           Export Panel
  └─────────────────────┘             └──────────────────┘           ─────────────────
                                                                       [Amazon.ae] [Daraz]
  Processing Type:                    Status bar:                      [Noon] [Shopify]
  ○ Background Removal               ████████░░ Processing... 40%     [Custom size]
  ○ Studio White                      
  ○ Lifestyle Scene                                                     [↓ Download All]
  ○ Ghost Mannequin
  
  Brand Style:
  [Select style ▼] or [+ New]
  
  [Process Image →]
```

### Layout (Mobile — Full Width Stacked)
```
[Upload Zone] → [Type selector] → [Scene selector] → [Preview] → [Export]
(Step-based mobile wizard)
```

### Key Components to Build
```tsx
// components/studio/upload-zone.tsx
// Uses Uppy for upload
// Shows drag-drop area + camera button on mobile
// Progress bar during S3 upload

// components/studio/scene-grid.tsx
// Grid of 100+ scene thumbnails
// Search/filter by category
// Lazy load images (intersection observer)
// Selected scene highlighted with checkmark

// components/studio/processing-status.tsx
// Connects to SSE stream: /api/v1/images/:id/stream
// Shows animated progress bar
// Transitions to before/after result view on completion

// components/studio/before-after-result.tsx
// Uses react-compare-slider
// "Download" button + "Export for marketplace" dropdown

// components/studio/export-modal.tsx
// Shows all marketplace options
// Each with preview of spec (size, format, bg color)
// Downloads exported file on click
```

### State Management (Zustand store)
```typescript
// stores/studio-store.ts
interface StudioState {
  // Upload
  uploadedFile: File | null
  uploadedImageUrl: string | null
  
  // Processing config
  processingType: ImageType
  selectedScene: string | null
  selectedBrandStyle: string | null
  
  // Job tracking
  currentImageId: string | null
  currentJobId: string | null
  processingStatus: ImageStatus
  processingProgress: number
  
  // Results
  originalUrl: string | null
  processedUrl: string | null
  
  // Actions
  setUploadedFile: (file: File) => void
  setProcessingType: (type: ImageType) => void
  setSelectedScene: (scene: string) => void
  startProcessing: () => Promise<void>
  resetStudio: () => void
}
```

---

## Page 3: Dashboard — `/dashboard`

### Layout
```
[Welcome banner: "Good morning, Ahmed 👋"]

[Usage Summary Row — 4 Metric Cards]
  Images this month: 47/300 (progress bar)
  Videos this month: 1/5
  Next reset: 14 days
  Plan: Growth ⭐

[Quick Actions Row]
  [+ New Image] [↑ Bulk Upload] [📁 New Project] [🎨 Brand Style]

[Recent Images — Masonry Grid]
  Last 12 processed images
  Each card: thumbnail | type badge | download button | menu (delete, favorite)

[Quick Stats]
  Total images processed: 184
  Images favorited: 23
  Projects: 4
  Storage used: 2.3 GB
```

---

## Page 4: Gallery — `/gallery`

### Layout
```
[Filters Bar]
  Search | Status: All/Completed/Processing | Type: All/Lifestyle/Studio/Fashion
  Sort: Newest/Oldest/Favorites | View: Grid/List

[Image Grid — Masonry, 4 columns desktop / 2 mobile]
  Each card:
    [Thumbnail (hover shows processed version)]
    [Project badge] [Type badge]
    [Download ↓] [Export ▼] [⋮ More]
  
  Infinite scroll (load 20 more on scroll)

[Empty State]
  Illustration + "No images yet" + [Upload your first product →]
```

---

## Page 5: Pricing Page — `/pricing`

### Layout
```
[Toggle: Monthly / Yearly (save 20%)]

[3 Plan Cards]
  Starter $9 | Growth $39 (highlighted) | Scale $99

[Comparison Table]
  Feature | Starter | Growth | Scale
  Images/mo | 50 | 300 | Unlimited
  Background removal | ✓ | ✓ | ✓
  Lifestyle scenes | ✓ | ✓ | ✓
  Brand style locking | ✗ | ✓ | ✓
  Bulk upload | ✗ | 50 | 500
  Ghost mannequin | ✗ | ✓ | ✓
  AI video clips | ✗ | 5/mo | 30/mo
  API access | ✗ | ✗ | ✓
  White-label | ✗ | ✗ | Add-on
  Priority support | ✗ | ✓ | ✓

[Payment methods: Visa, Mastercard, JazzCash, EasyPaisa (coming soon)]

[FAQ section]
```

---

## Page 6: Settings — `/settings`

### Sub-pages

**General** (`/settings`)
- Profile picture upload
- Name, email, timezone
- Business type selector (Fashion / Electronics / Food / Other)
- Password change

**Billing** (`/settings/billing`)
- Current plan card with usage bar
- [Upgrade Plan] / [Manage Subscription] buttons → Stripe portal
- Invoice history table
- Payment method display

**API Keys** (`/settings/api-keys`) — Scale plan only
- Create new API key (with name)
- List existing keys (prefix, last used, created)
- Revoke key button
- Usage docs link
- Code snippet: `curl -H "X-API-Key: sk_live_..." https://api.snapstudio.ai/...`

---

## Shared Components to Build

```tsx
// components/shared/
├── navbar.tsx               # Marketing navbar
├── app-sidebar.tsx          # App sidebar with nav items
├── app-topbar.tsx           # App topbar with user menu
├── usage-progress-bar.tsx   # Shows X/Y images used with color coding
├── image-card.tsx           # Reusable image card (gallery, dashboard)
├── plan-badge.tsx           # Free | Starter | Growth | Scale badge
├── upgrade-gate.tsx         # Wrapper that shows upgrade prompt for locked features
└── empty-state.tsx          # Reusable empty state with illustration + CTA
```

---

## Onboarding Flow (New Users)

After registration, show a 4-step modal wizard:
```
Step 1: "What do you sell?"
  [Fashion] [Electronics] [Food] [Home Decor] [Beauty] [Other]

Step 2: "Where do you sell?"
  [Daraz] [Shopify] [Amazon.ae] [Noon] [Instagram] [Multiple]

Step 3: "Upload your first product photo"
  Mini upload zone with example images as prompts

Step 4: "Your first AI photo is ready! 🎉"
  Shows processed result with download + share buttons
  [Start exploring →]
```

---

## Loading States

Every async action needs a loading state:
- Upload: Progress bar (0–100% from upload bytes)
- Processing: Animated skeleton + "AI is working..." with estimated time
- Scene loading: Skeleton grid for thumbnails
- Export: Spinner on button

## Error States

- Upload failed: Toast with retry button
- Processing failed: Red status badge + "Try again" button
- Quota exceeded: Banner with upgrade CTA (not just toast)
- Network error: Full-page offline indicator if app can't reach API

---

## Mobile-Specific Considerations

- Studio page becomes a step-by-step wizard on mobile
- Camera upload button prominent (not hidden)
- Scene grid is 2 columns on mobile (lazy loaded)
- Bottom navigation bar instead of sidebar on mobile
- Export modal is a bottom sheet on mobile
- Touch-friendly drag handles on before/after slider
