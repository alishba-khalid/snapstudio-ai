# SnapStudio AI — DETAILED EXECUTION PLAN

**Date Created:** April 16, 2026  
**Project:** B2B SaaS AI-powered product photography platform  
**Target Markets:** Pakistan, UAE, South Asia

---

## EXECUTIVE SUMMARY

This is a full-stack Turborepo monorepo with:
- **Frontend:** Next.js 15 + Tailwind + shadcn/ui
- **Backend API:** Fastify + TypeScript + PostgreSQL + Drizzle ORM
- **AI Worker:** Python FastAPI with rembg, Pillow, OpenCV
- **Job Queue:** BullMQ + Redis
- **Storage:** Cloudflare R2
- **Payments:** Stripe
- **Total Estimated Time:** 80–100 hours (4–5 weeks)

---

## PART A: FOLDER STRUCTURE

```
snapstudio/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Run linting, type-check, tests
│       ├── deploy-web.yml         # Deploy to Vercel on main push
│       └── deploy-api.yml         # Deploy to Railway on main push
│
├── .gitignore
├── .nvmrc                         # Node 20 LTS
├── README.md
├── pnpm-workspace.yaml
│
├── apps/
│   ├── web/                       # Next.js 15 frontend
│   │   ├── app/
│   │   │   ├── (marketing)/
│   │   │   │   ├── page.tsx       # Landing page
│   │   │   │   ├── pricing/page.tsx
│   │   │   │   ├── about/page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── components/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/page.tsx
│   │   │   │   ├── register/page.tsx
│   │   │   │   ├── forgot-password/page.tsx
│   │   │   │   └── layout.tsx
│   │   │   ├── (app)/
│   │   │   │   ├── dashboard/page.tsx
│   │   │   │   ├── studio/page.tsx      # ⭐ MAIN PAGE
│   │   │   │   ├── gallery/page.tsx
│   │   │   │   ├── projects/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/page.tsx
│   │   │   │   ├── brand-styles/page.tsx
│   │   │   │   ├── settings/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── billing/page.tsx
│   │   │   │   │   └── api-keys/page.tsx
│   │   │   │   ├── layout.tsx     # App layout (sidebar)
│   │   │   │   └── middleware.ts  # Auth check
│   │   │   ├── api/
│   │   │   │   └── auth/[...nextauth]/route.ts
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── marketing/
│   │   │   │   ├── navbar.tsx
│   │   │   │   ├── footer.tsx
│   │   │   │   ├── before-after-slider.tsx
│   │   │   │   ├── pricing-card.tsx
│   │   │   │   └── faq-accordion.tsx
│   │   │   ├── studio/
│   │   │   │   ├── upload-zone.tsx
│   │   │   │   ├── scene-grid.tsx
│   │   │   │   ├── processing-status.tsx
│   │   │   │   ├── before-after-result.tsx
│   │   │   │   └── export-modal.tsx
│   │   │   ├── shared/
│   │   │   │   ├── app-sidebar.tsx
│   │   │   │   ├── app-topbar.tsx
│   │   │   │   ├── usage-progress-bar.tsx
│   │   │   │   ├── image-card.tsx
│   │   │   │   ├── plan-badge.tsx
│   │   │   │   └── upgrade-gate.tsx
│   │   │   └── ui/                # shadcn/ui components (auto-generated)
│   │   ├── lib/
│   │   │   ├── api-client.ts      # Fetch wrapper with JWT
│   │   │   ├── auth.ts            # NextAuth config
│   │   │   ├── utils.ts
│   │   │   └── hooks/
│   │   │       ├── useAuth.ts
│   │   │       ├── useImage.ts
│   │   │       └── useScenes.ts
│   │   ├── stores/
│   │   │   └── studio-store.ts    # Zustand state
│   │   ├── public/
│   │   │   ├── logo.svg
│   │   │   └── hero-image.webp
│   │   ├── .env.example
│   │   ├── .env.local             # (git-ignored)
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── api/                       # Fastify backend
│       ├── src/
│       │   ├── index.ts           # Server entry
│       │   ├── config/
│       │   │   ├── env.ts         # Environment validation (zod)
│       │   │   └── constants.ts
│       │   ├── db/
│       │   │   ├── schema.ts      # ⭐ DRIZZLE ORM SCHEMA
│       │   │   ├── seed.ts
│       │   │   └── index.ts
│       │   ├── middleware/
│       │   │   ├── auth.ts        # JWT verification
│       │   │   ├── rate-limit.ts
│       │   │   └── error-handler.ts
│       │   ├── routes/
│       │   │   ├── auth.ts        # POST /auth/register, login, etc.
│       │   │   ├── user.ts        # GET /user/me, PATCH /user/me
│       │   │   ├── images.ts      # POST /images/upload, GET /images/:id/status
│       │   │   ├── export.ts      # POST /images/:id/export
│       │   │   ├── scenes.ts      # GET /scenes
│       │   │   ├── billing.ts     # POST /billing/checkout, webhook
│       │   │   └── admin.ts       # GET /admin/stats (super admin)
│       │   ├── queues/
│       │   │   └── image-processor.ts  # BullMQ queue setup
│       │   ├── services/
│       │   │   ├── auth.ts        # Register, login logic
│       │   │   ├── image.ts       # Image creation, job dispatch
│       │   │   ├── stripe.ts      # Subscription, webhook handling
│       │   │   ├── r2.ts          # Cloudflare R2 upload/download
│       │   │   └── email.ts       # Resend transactional emails
│       │   └── types/
│       │       └── index.ts       # Shared types
│       ├── migrations/            # Drizzle auto-generated
│       ├── .env.example
│       ├── .env.local
│       ├── package.json
│       ├── tsconfig.json
│       ├── drizzle.config.ts
│       └── README.md
│
├── services/
│   └── ai-worker/                 # Python FastAPI
│       ├── src/
│       │   ├── main.py            # FastAPI app entry
│       │   ├── processors/
│       │   │   ├── background_removal.py     # rembg
│       │   │   ├── scene_compositor.py       # PIL + OpenCV
│       │   │   ├── marketplace_exporter.py   # Resize + crop per spec
│       │   │   └── brand_style_analyzer.py   # Extract visual DNA
│       │   ├── models/
│       │   │   ├── jobs.py        # Pydantic models for job data
│       │   │   └── response.py
│       │   └── utils/
│       │       ├── r2.py          # R2 upload/download
│       │       └── image_utils.py
│       ├── tests/
│       │   └── test_background_removal.py
│       ├── requirements.txt
│       ├── .env.example
│       ├── Dockerfile
│       ├── docker-compose.yml
│       └── README.md
│
├── packages/
│   ├── types/
│   │   ├── src/
│   │   │   ├── index.ts           # Shared TypeScript types
│   │   │   ├── api.ts             # Request/Response types
│   │   │   ├── database.ts        # DB model types
│   │   │   └── auth.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── ui/
│   │   ├── src/
│   │   │   └── components/
│   │   │       └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── config/
│       ├── eslint-config/
│       ├── tailwind-config/
│       └── typescript-config/
│
├── infrastructure/
│   ├── docker-compose.yml         # PostgreSQL 16 + Redis 7 local dev
│   ├── docker/
│   │   └── ai-worker.Dockerfile
│   └── terraform/                 # Production IaC (optional Phase 2)
│
└── turbo.json
```

---

## PART B: DEPENDENCIES & VERSIONS

### Root Level
```json
{
  "engines": {
    "node": "20.x",
    "pnpm": "9.x"
  },
  "devDependencies": {
    "turbo": "^2.1.0",
    "typescript": "^5.5.4",
    "eslint": "^9.0.0",
    "prettier": "^3.3.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0"
  }
}
```

### Frontend (`apps/web/package.json`)
```json
{
  "dependencies": {
    "next": "15.1.0",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "typescript": "^5.5.4",
    "tailwindcss": "4.0.0",
    "@tailwindcss/forms": "^0.5.0",
    "clsx": "^2.1.1",
    "class-variance-authority": "^0.7.0",
    "shadcn-ui": "latest",
    "zustand": "^4.5.5",
    "@tanstack/react-query": "^5.50.0",
    "react-hook-form": "^7.52.0",
    "zod": "^3.23.0",
    "@hookform/resolvers": "^3.3.0",
    "uploadthing": "^7.0.0",
    "uppy": "^3.21.0",
    "@uppy/core": "^3.21.0",
    "@uppy/dashboard": "^3.21.0",
    "@uppy/xhr-upload": "^3.21.0",
    "react-compare-slider": "^2.6.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.408.0",
    "sonner": "^1.4.0",
    "next-auth": "5.0.0",
    "@auth/core": "^0.37.0",
    "@auth/nextjs": "^1.0.0",
    "stripe": "^14.0.0",
    "posthog-js": "^1.140.0",
    "@sentry/nextjs": "^8.0.0"
  },
  "devDependencies": {
    "eslint": "^9.0.0",
    "lint-staged": "^15.0.0",
    "husky": "^9.0.0"
  }
}
```

### Backend API (`apps/api/package.json`)
```json
{
  "dependencies": {
    "fastify": "5.0.0",
    "typescript": "^5.5.4",
    "@fastify/cors": "^9.0.0",
    "@fastify/helmet": "^12.0.0",
    "@fastify/rate-limit": "^10.0.0",
    "zod": "^3.23.0",
    "drizzle-orm": "^0.31.0",
    "drizzle-kit": "^0.24.0",
    "pg": "^8.12.0",
    "postgres": "^3.4.0",
    "bullmq": "^5.0.0",
    "redis": "^4.7.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.1.0",
    "dotenv": "^16.4.0",
    "resend": "^1.4.0",
    "react-email": "^2.1.0",
    "stripe": "^14.0.0",
    "pino": "^9.2.0",
    "@sentry/node": "^8.0.0",
    "better-auth": "^1.0.0",
    "sharp": "^0.33.0",
    "aws-sdk": "^2.1400.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.6"
  }
}
```

### AI Worker (`services/ai-worker/requirements.txt`)
```
fastapi==0.111.0
uvicorn==0.29.0
python-multipart==0.0.6
rembg==2.0.56
# rembg[gpu]==2.0.56  # if GPU available
Pillow==10.3.0
opencv-python==4.9.0
numpy==1.26.0
boto3==1.34.0
pydantic==2.6.0
pydantic-settings==2.2.0
httpx==0.27.0
aiofiles==23.2.0
fal-client==0.3.0
redis==5.0.0
```

### Shared Types (`packages/types/package.json`)
```json
{
  "dependencies": {
    "typescript": "^5.5.4"
  }
}
```

---

## PART C: IMPLEMENTATION PHASES & STEPS

### **PHASE 0: Project Initialization** (2–3 hours)

#### Step 1: Initialize Turborepo monorepo
```bash
# Create new Turborepo
pnpm dlx create-turbo@latest snapstudio --package-manager pnpm
cd snapstudio
pnpm install
```

**Deliverables:**
- ✅ Root `package.json` with workspaces
- ✅ `turbo.json` configured
- ✅ `.gitignore` + `.nvmrc` (Node 20 LTS)
- **Time:** 30 mins

---

#### Step 2: Create app/monorepo structure
```bash
# Create folder structure
mkdir -p apps/{web,api}
mkdir -p services/ai-worker
mkdir -p packages/{types,ui,config}
```

**Deliverables:**
- ✅ All folders scaffolded
- **Time:** 15 mins

---

#### Step 3: Setup Next.js 15 in `apps/web`
```bash
cd apps/web
pnpm create next-app@latest . --typescript --tailwind --eslint --src-dir --app
```

**Deliverables:**
- ✅ Next.js 15 + App Router + TypeScript + Tailwind + ESLint
- ✅ Basic layout structure
- **Time:** 30 mins

---

#### Step 4: Setup Fastify in `apps/api`
```bash
cd apps/api
pnpm add fastify zod drizzle-orm
pnpm add -D @types/node typescript
```

**Deliverables:**
- ✅ Basic Fastify server scaffold in `src/index.ts`
- ✅ Environment validation with Zod
- **Time:** 30 mins

---

#### Step 5: Setup Python FastAPI worker
```bash
cd services/ai-worker
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**Deliverables:**
- ✅ Python environment + dependencies
- ✅ Basic FastAPI app scaffold
- **Time:** 45 mins

---

#### Step 6: Setup Docker Compose for local dev
Create `docker-compose.yml` at root with PostgreSQL 16 + Redis 7

**Deliverables:**
- ✅ `docker-compose.yml` configured
- ✅ Volumes for data persistence
- ✅ PgBouncer connection pooling for PostgreSQL
- **Time:** 20 mins

---

#### Step 7: Setup ESLint + Prettier for monorepo
```bash
pnpm add -D eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

**Deliverables:**
- ✅ Root `.eslintrc.json` + `.prettierrc`
- ✅ Workspace-specific linting configs
- **Time:** 20 mins

---

#### Step 8: Setup GitHub Actions CI/CD
Create `.github/workflows/` with:
- `ci.yml` — Type check, lint, test on PR
- `deploy-web.yml` — Deploy to Vercel on main
- `deploy-api.yml` — Deploy to Railway on main

**Deliverables:**
- ✅ GitHub Actions configured
- **Time:** 30 mins

---

**Phase 0 TOTAL: 3 hours**

---

### **PHASE 1: Database & Core Backend** (12–14 hours)

#### Step 9: Setup Drizzle ORM + migrations
```bash
cd apps/api
pnpm add drizzle-orm drizzle-kit pg
```

**Deliverables:**
- ✅ `drizzle.config.ts` configured
- ✅ `src/db/schema.ts` with FULL schema from spec
- ✅ Generated initial migration file
- **Time:** 1.5 hours

---

#### Step 10: Create database seed file
```typescript
// apps/api/src/db/seed.ts
// Insert marketplace specs + sample scenes
```

**Deliverables:**
- ✅ Seed script that populates `marketplace_specs` table
- ✅ Seed script runs: `pnpm db:seed`
- **Time:** 30 mins

---

#### Step 11: Setup authentication routes (Backend)
Implement all routes from API spec Section 1:
- `POST /auth/register` — Email + password registration with bcrypt
- `POST /auth/login` — JWT token generation (7-day expiry)
- `POST /auth/google` — Google OAuth
- `POST /auth/logout`
- `POST /auth/forgot-password` — Email token sent via Resend
- `POST /auth/reset-password`

**Deliverables:**
- ✅ All 6 auth endpoints working
- ✅ JWT stored in `sessions` table
- ✅ Rate limiting: 5 attempts/15 min
- ✅ Email verification via Resend
- **Time:** 2.5 hours

---

#### Step 12: Setup user profile routes
- `GET /user/me` — Return user + subscription info
- `PATCH /user/me` — Update profile
- `GET /user/usage` — Usage stats for period

**Deliverables:**
- ✅ All user routes working
- ✅ Usage aggregation from `usage_logs` table
- **Time:** 1 hour

---

#### Step 13: Setup Stripe integration
- Setup Stripe products/prices for Starter/Growth/Scale
- Implement `POST /billing/checkout`
- Implement `POST /billing/portal`
- Implement webhook handler for subscription events

**Deliverables:**
- ✅ Stripe products created
- ✅ Webhook handler signs requests correctly
- ✅ User plan updates on webhook
- **Time:** 2 hours

---

#### Step 14: Setup basic image routes (Backend)
- `POST /images/upload` — Accept multipart upload, validate, save to R2, create job
- `GET /images/:id/status` — Return processing status from DB
- `GET /images/:id/stream` — SSE endpoint for real-time updates

**Deliverables:**
- ✅ Image upload to R2 working
- ✅ BullMQ job created for each upload
- ✅ SSE streaming status updates
- **Time:** 1.5 hours

---

#### Step 15: Setup BullMQ job queue
- Create `image-processing` queue
- Configure concurrency: 5 workers
- Setup retry: 3 attempts with exponential backoff

**Deliverables:**
- ✅ BullMQ worker listening to queue
- ✅ Job tracking in Redis
- **Time:** 1 hour

---

**Phase 1 TOTAL: 13.5 hours**

---

### **PHASE 2: AI Worker — Background Removal** (8–10 hours)

#### Step 16: Setup FastAPI + rembg
```python
# services/ai-worker/src/main.py
# HTTP endpoint: POST /process/remove-bg
# Input: image bytes or R2 key
# Output: PNG with transparent background
```

**Deliverables:**
- ✅ Background removal working on 5 test product photos
- ✅ Edge case handling (HEIC, small images, complex items)
- ✅ Response time < 5 seconds per image
- **Time:** 3 hours

---

#### Step 17: Setup scene compositor (Python)
Implement drop shadow generation + product placement

**Deliverables:**
- ✅ Place product on white background with shadow
- ✅ Respects product scale (75% canvas fill)
- **Time:** 2 hours

---

#### Step 18: Setup marketplace exporter
Implement resizing + cropping for each marketplace spec

**Deliverables:**
- ✅ Export in exact Amazon.ae / Daraz specs
- ✅ Image size optimization to stay under limit
- **Time:** 2 hours

---

#### Step 19: Setup brand style analyzer (Python)
Extract lighting + color profiles from reference images

**Deliverables:**
- ✅ Analyze reference images → extract JSON profile
- ✅ Not required for MVP but scaffolded
- **Time:** 1.5 hours

---

#### Step 20: Dockerfile for AI worker
Build + test Docker image locally

**Deliverables:**
- ✅ `services/ai-worker/Dockerfile` working
- ✅ Image builds and runs: `docker build . -t ai-worker:latest`
- **Time:** 1 hour

---

**Phase 2 TOTAL: 9.5 hours**

---

### **PHASE 3: API ↔ AI Worker Integration** (5–6 hours)

#### Step 21: Connect API to AI worker via HTTP
When BullMQ job is dequeued:
1. Fetch original image from R2
2. Call `POST http://ai-worker:8000/process/remove-bg`
3. Save result back to R2
4. Update `images` table with processed URL
5. Emit SSE event

**Deliverables:**
- ✅ Full pipeline working: upload → process → export
- ✅ Error handling on AI worker failure
- ✅ Retry logic on timeout
- **Time:** 2 hours

---

#### Step 22: Implement scene selection + composition
Add scene selector to upload flow
- `GET /scenes` — List all available scenes
- When scene selected, call AI worker with scene ID
- Composite product onto scene

**Deliverables:**
- ✅ Users can select from 20 scenes
- ✅ Composition working end-to-end
- **Time:** 2 hours

---

#### Step 23: Implement marketplace export endpoint
- `POST /images/:id/export` — Export in marketplace format
- Handle custom specs

**Deliverables:**
- ✅ Export to Amazon.ae / Daraz specs
- ✅ File downloaded to user's computer
- **Time:** 1.5 hours

---

**Phase 3 TOTAL: 5.5 hours**

---

### **PHASE 4: Frontend — Authentication** (6–8 hours)

#### Step 24: Setup NextAuth.js v5
```typescript
// apps/web/lib/auth.ts
// Configure login provider + JWT callback
```

**Deliverables:**
- ✅ NextAuth.js configured with custom API callback
- ✅ JWT token passed to API requests
- **Time:** 1.5 hours

---

#### Step 25: Build `/login` page
- Email + password input
- Google OAuth button
- "Don't have an account?" → `/register`
- "Forgot password?" link

**Deliverables:**
- ✅ Login page fully styled
- ✅ Form validation with React Hook Form
- ✅ Error handling
- **Time:** 1.5 hours

---

#### Step 26: Build `/register` page
- Email, password, name inputs
- Password strength meter
- Terms acceptance checkbox
- Redirect to `/dashboard` on success

**Deliverables:**
- ✅ Registration page with validation
- ✅ Duplicate email detection
- **Time:** 1 hour

---

#### Step 27: Build `/forgot-password` page
- Email input
- "Check your email" message
- Link to reset password (from email)

**Deliverables:**
- ✅ Password reset flow working
- **Time:** 45 mins

---

#### Step 28: Setup auth middleware for `(app)/*` routes
Protect all `/dashboard`, `/studio`, etc. with auth check

**Deliverables:**
- ✅ Unauthenticated users redirected to `/login`
- ✅ JWT attached to all API requests
- **Time:** 1 hour

---

**Phase 4 TOTAL: 6 hours**

---

### **PHASE 5: Frontend — Studio Page (Main Feature)** (12–14 hours)

#### Step 29: Build upload component with Uppy
- Drag-and-drop zone
- Click to upload
- Camera button on mobile
- Progress bar during upload
- File validation (type, size)

**Deliverables:**
- ✅ Uppy zone configured
- ✅ Files upload directly to R2 via presigned URL
- ✅ Progress visible to user
- **Time:** 2 hours

---

#### Step 30: Build processing type selector
- Radio buttons: Background Removal / Lifestyle Scene / Studio White / Ghost Mannequin

**Deliverables:**
- ✅ Type selector UI
- ✅ Zustand store updated on selection
- **Time:** 45 mins

---

#### Step 31: Build scene grid selector
- Lazy-loaded grid of 20 scenes (thumbnails)
- Search / filter by category
- Selected scene highlighted with checkmark

**Deliverables:**
- ✅ Scene grid rendering
- ✅ Hover states + animations
- **Time:** 1.5 hours

---

#### Step 32: Build processing status component
- Connect to SSE stream: `GET /api/v1/images/:id/stream`
- Show animated progress bar
- Estimated time remaining
- Transition to results on completion

**Deliverables:**
- ✅ SSE streaming working
- ✅ Progress bar animating
- ✅ Status transitions smooth
- **Time:** 2 hours

---

#### Step 33: Build before/after result viewer
- Use `react-compare-slider` to show before/after
- Slider can be dragged left/right
- Touch-friendly on mobile

**Deliverables:**
- ✅ Before/after slider working
- ✅ Responsive on mobile
- **Time:** 1.5 hours

---

#### Step 34: Build export modal
- Dropdown of marketplace options: Amazon / Daraz / Noon / Shopify
- Each shows spec: size, bg color, max file size
- Download button for each

**Deliverables:**
- ✅ Export modal displaying specs
- ✅ Download button working
- **Time:** 1.5 hours

---

#### Step 35: Build Zustand store for studio state
- Upload state
- Processing type
- Selected scene
- Current image ID + status
- Results URLs

**Deliverables:**
- ✅ Zustand store fully typed
- ✅ All components reading/writing to store
- **Time:** 1 hour

---

#### Step 36: Build 3-column desktop layout
- Left: Upload zone + type selector
- Center: Preview canvas (before/after)
- Right: Scene grid + export

**Deliverables:**
- ✅ Desktop layout fully responsive
- **Time:** 1 hour

---

#### Step 37: Build mobile-friendly layout
- Step-by-step wizard on mobile
- Full-width sections stacked
- Bottom navigation visible

**Deliverables:**
- ✅ Mobile layout tested at 375px viewport
- **Time:** 1.5 hours

---

**Phase 5 TOTAL: 13.5 hours**

---

### **PHASE 6: Frontend — Dashboard + Gallery** (6–8 hours)

#### Step 38: Build `/dashboard` page
- Welcome banner
- Usage summary cards (images used, videos, storage)
- Quick actions row
- Recent images masonry grid

**Deliverables:**
- ✅ Dashboard page styled
- ✅ Usage data fetched from API
- ✅ Recent images displayed
- **Time:** 2 hours

---

#### Step 39: Build `/gallery` page
- Filter bar (search, status, type)
- Sort options
- Masonry grid (4 columns desktop, 2 mobile)
- Infinite scroll (20 images per load)
- Image card component with download/export actions

**Deliverables:**
- ✅ Gallery page with filters
- ✅ Infinite scroll working
- ✅ Image card component reusable
- **Time:** 2.5 hours

---

#### Step 40: Build components: ImageCard, UpgradeGate, PlanBadge
- Reusable for gallery + dashboard
- Hover states, animations
- Error states

**Deliverables:**
- ✅ All shared components built
- **Time:** 1.5 hours

---

**Phase 6 TOTAL: 6 hours**

---

### **PHASE 7: Frontend — Pricing + Settings** (6–7 hours)

#### Step 41: Build `/pricing` page
- Monthly/yearly toggle
- 3 plan cards (Starter / Growth / Scale)
- Feature comparison table
- FAQ accordion

**Deliverables:**
- ✅ Pricing page fully styled
- ✅ Toggle between monthly/yearly
- **Time:** 2 hours

---

#### Step 42: Build `/settings` page (General)
- Profile picture upload
- Name, email, timezone
- Business type selector
- Password change

**Deliverables:**
- ✅ Settings page working
- **Time:** 1.5 hours

---

#### Step 43: Build `/settings/billing` page
- Current plan breakdown
- [Manage Subscription] button → Stripe portal
- Invoice history table
- Payment method display

**Deliverables:**
- ✅ Billing page displaying Stripe data
- **Time:** 1.5 hours

---

#### Step 44: Build `/settings/api-keys` page (Scale plan only)
- Create new API key form
- List existing keys (prefix, last used, created)
- Revoke button
- Code snippet example

**Deliverables:**
- ✅ API keys page working
- ✅ Only visible for Scale plan users
- **Time:** 1.5 hours

---

**Phase 7 TOTAL: 6.5 hours**

---

### **PHASE 8: Frontend — Marketing Pages** (5–6 hours)

#### Step 45: Build landing page (`/`)
- Navbar with login/register CTA
- Hero section with before/after slider
- "How It Works" 3-step section
- Feature cards
- Social proof testimonials
- FAQ accordion
- Footer

**Deliverables:**
- ✅ Landing page fully styled
- ✅ Before/after slider on hero
- ✅ Responsive on mobile
- **Time:** 3 hours

---

#### Step 46: Build `/about` page
- Company story
- Mission statement
- Team (optional for MVP, just text + 2 photos)

**Deliverables:**
- ✅ About page basic version
- **Time:** 1.5 hours

---

#### Step 47: Build shared marketing components
- Navbar
- Footer
- Before/after slider (reusable)
- Pricing card (reusable)
- FAQ accordion

**Deliverables:**
- ✅ All marketing components reusable
- **Time:** 1 hour

---

**Phase 8 TOTAL: 5.5 hours**

---

### **PHASE 9: Integration & End-to-End Testing** (6–8 hours)

#### Step 48: Integration test — Full flow
1. User registers
2. Logs in
3. Uploads image
4. Selects scene
5. Waits for processing
6. Views before/after
7. Exports for marketplace

**Deliverables:**
- ✅ Full flow tested and working
- ✅ Screenshots/video of happy path
- **Time:** 2 hours

---

#### Step 49: Test on multiple devices
- Desktop (Chrome, Firefox, Safari)
- Tablet (iPad)
- Mobile (iPhone 12, Galaxy S21)
- Verify responsive breakpoints

**Deliverables:**
- ✅ Cross-browser testing complete
- ✅ Screenshots for each device
- **Time:** 2 hours

---

#### Step 50: Performance optimization
- Image lazy loading in gallery
- Code splitting for routes
- LCP optimization (< 2 seconds target)
- Lighthouse score > 90

**Deliverables:**
- ✅ Lighthouse audit results
- **Time:** 2 hours

---

#### Step 51: Security audit
- ✅ All queries parameterized (Drizzle handles)
- ✅ User can only access their own resources
- ✅ Rate limiting on auth endpoints
- ✅ File upload validation (type + size)
- ✅ API keys hashed in DB
- ✅ Stripe webhook signature verification
- ✅ SQL injection impossible (ORM)

**Deliverables:**
- ✅ Security checklist all green
- **Time:** 2 hours

---

**Phase 9 TOTAL: 8 hours**

---

### **PHASE 10: Deployment & Launch Prep** (4–5 hours)

#### Step 52: Deploy frontend to Vercel
- Push to main branch
- GitHub Actions triggers Vercel deploy
- Verify deployment successful

**Deliverables:**
- ✅ Frontend live at `snapstudio.vercel.app`
- **Time:** 1 hour

---

#### Step 53: Deploy API to Railway
- Signal Railway to redeploy on main
- Verify API endpoints responding

**Deliverables:**
- ✅ API live at `api.snapstudio.ai` (or Railway URL)
- **Time:** 1 hour

---

#### Step 54: Deploy AI worker to Modal / RunPod (optional Phase 2)
For MVP, keep locally or on your own server

**Deliverables:**
- ✅ AI worker accessible at consistent URL
- **Time:** 1 hour (optional)

---

#### Step 55: Final QA + Launch
- Smoke testing on production
- Create `.env.example` files with all vars
- Documentation in README
- Celebrate! 🎉

**Deliverables:**
- ✅ Project fully deployed and tested
- ✅ README with setup instructions
- **Time:** 1 hour

---

**Phase 10 TOTAL: 4 hours**

---

## PART D: TOTAL TIME ESTIMATE

| Phase | Task | Hours |
|-------|------|-------|
| 0 | Project Init | 3 |
| 1 | DB + Core Backend | 13.5 |
| 2 | AI Worker | 9.5 |
| 3 | API ↔ AI Integration | 5.5 |
| 4 | Frontend Auth | 6 |
| 5 | Studio Page (Main) | 13.5 |
| 6 | Dashboard + Gallery | 6 |
| 7 | Pricing + Settings | 6.5 |
| 8 | Marketing Pages | 5.5 |
| 9 | E2E Testing | 8 |
| 10 | Deployment | 4 |
| **TOTAL** | | **80.5 hours** |

**Estimated Timeline:** 4–5 weeks (20 hours/week developer time)

---

## PART E: RISKS & MITIGATION

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| Rembg background removal fails on tough products (glass, jewelry) | High — core feature fails | Medium | Pre-test with 5 product types; fallback to manual review flag |
| R2 upload timeouts for large files | Medium | Low | Implement chunked uploads; set 60s timeout with retry |
| BullMQ job queue bottleneck (5 concurrent) | Medium | Low | Monitor queue depth; scale to 10 workers if needed |
| Stripe webhook signature verification fails | High — payments broken | Low | Test webhook signing locally; log every failure |
| NextAuth.js session expiry issues | Medium | Low | Use Redis for session store; set 7-day session expiry |
| Database migration fails in production | High — app breaks | Low | Always test `drizzle-kit generate` + `migrate` locally first |
| AI worker image processing out of memory | High — crashes | Medium | Add memory limit in Docker; implement image size pre-check |
| User accidentally deletes image in gallery | Low | High | Soft delete images (add `deletedAt` timestamp); 30-day retention |
| CORS issues between local services | Medium | High | Use `docker-compose` hostnames; verify `@fastify/cors` config |
| TypeScript strict mode catches types mid-development | Low — good sign! | High | Accept this as feature; use `as any` sparingly only for 3rd party |
| Marketplace spec changes (Amazon updates size) | Low | Low | Version specs in DB; add `version` column to `marketplace_specs` |
| Rate limiting too aggressive, blocks real users | Medium | Low | Start at 5 req/min; monitor and adjust based on usage |
| SSE stream doesn't close properly, leaves socket open | Low | Medium | Cleanup on `request.raw.on('close')` event; test memory leaks |

---

## PART F: SUCCESS CRITERIA (BEFORE LAUNCH)

- [ ] All 55 steps completed
- [ ] No TypeScript errors (strict mode)
- [ ] All API endpoints tested with curl/Postman
- [ ] Frontend fully responsive (mobile 375px, desktop 1440px)
- [ ] Authentication flow working (register → login → protected route)
- [ ] Image upload → processing → export working end-to-end
- [ ] Stripe checkout redirects working
- [ ] Email verification sent (check Resend logs)
- [ ] 5+ product photos processed with visible results
- [ ] Gallery page shows all processed images
- [ ] No console errors in browser DevTools
- [ ] Lighthouse score > 90
- [ ] Cross-browser tested (Chrome, Firefox, Safari)
- [ ] Security checklist all green
- [ ] Deployed to Vercel + Railway (or production servers)
- [ ] Custom domain SSL certificate working
- [ ] README.md complete with setup instructions

---

## PART G: OPTIONAL PHASE 2+ FEATURES

These are explicitly NOT in Phase 1 but documented for later:

- [ ] Bulk upload (50–500 images at once)
- [ ] Brand style locking (extract lighting + color profiles)
- [ ] Ghost mannequin mode for fashion
- [ ] Video clip generation (image → 10s video)
- [ ] Shopify app integration
- [ ] REST API for Scale plan users
- [ ] White-label reseller plan
- [ ] On-model clothing placement
- [ ] Daraz Seller Center direct export
- [ ] WooCommerce plugin

---

## PART H: TECH DECISIONS LOCKED IN

These are NOT negotiable per tech-stack spec — only proceed if approved:
- ✅ Turborepo (not Yarn, Lerna)
- ✅ pnpm (not npm, yarn)
- ✅ Next.js 15 App Router (not Pages Router, Remix, SvelteKit)
- ✅ Tailwind v4 (not Bootstrap, Styled Components)
- ✅ shadcn/ui (not Material-UI, Chakra)
- ✅ Fastify (not Express, Hono)
- ✅ Drizzle ORM (not Prisma, TypeORM)
- ✅ PostgreSQL (not MongoDB, MySQL)
- ✅ FastAPI (not Flask, Django)
- ✅ Rembg (not remove.bg API)
- ✅ BullMQ (not Celery, RabbitMQ)
- ✅ Cloudflare R2 (not AWS S3, Firebase)

---

## APPROVAL CHECKLIST

Before proceeding to **EXECUTION**, get sign-off on:

1. **Folder structure** — All paths correct?
2. **Dependencies** — All versions locked?
3. **Timeline** — 80.5 hours realistic for your team?
4. **Phases** — Sequence makes sense?
5. **Risks** — Mitigation plans adequate?
6. **Scope** — All 10 phases included in Phase 1 MVP?

Type `APPROVED` when ready to start → Step 1 begins!

---

**Plan Created:** April 16, 2026  
**By:** Antigravity Agent  
**Status:** ⏳ AWAITING APPROVAL
