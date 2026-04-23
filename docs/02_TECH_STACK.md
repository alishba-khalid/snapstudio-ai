# SnapStudio AI — Tech Stack Specification

> **For Antigravity Agent:** Read this entire file before generating any code. Follow these technology choices exactly. Do not substitute libraries unless explicitly instructed.

---

## 1. Monorepo Setup

```
Tool: Turborepo
Package manager: pnpm (workspaces)
Node version: 20 LTS (use .nvmrc)
TypeScript: 5.5+ (strict mode everywhere)
```

### Init Command for Agent
```bash
# Agent should run this first
pnpm dlx create-turbo@latest snapstudio --package-manager pnpm
cd snapstudio
```

---

## 2. Frontend — `apps/web`

| Layer | Technology | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router) | SSR for SEO, fast, Vercel-native |
| Language | **TypeScript** (strict) | Type safety across monorepo |
| Styling | **Tailwind CSS v4** | Utility-first, fast iteration |
| Components | **shadcn/ui** | Accessible, unstyled, customizable |
| State | **Zustand** | Lightweight global state |
| Server State | **TanStack Query v5** | API data fetching + caching |
| Forms | **React Hook Form + Zod** | Validation + type-safe forms |
| File Upload | **Uppy** | Multi-file, drag-drop, camera support |
| Image Preview | **react-compare-slider** | Before/after slider for image results |
| Auth Client | **NextAuth.js v5** | Session management, OAuth |
| Payments | **Stripe.js** | Checkout, subscription management |
| Animations | **Framer Motion** | Smooth UI transitions |
| Icons | **Lucide React** | Consistent icon set |
| Toast | **Sonner** | Clean notification system |
| Analytics | **PostHog** | Product analytics, feature flags |
| Error tracking | **Sentry** | Frontend error monitoring |
| Deployment | **Vercel** | Zero-config Next.js deployment |

### Frontend Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_KEY=pk_...
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

---

## 3. Backend API — `apps/api`

| Layer | Technology | Why |
|---|---|---|
| Runtime | **Node.js 20** | Fast, great ecosystem |
| Framework | **Fastify v5** | 3x faster than Express, schema-first |
| Language | **TypeScript** | Type safety |
| ORM | **Drizzle ORM** | Type-safe SQL, fast, lightweight |
| Validation | **Zod** | Shared schemas with frontend |
| Auth | **better-auth** | Modern auth library with 2FA |
| Job Queue | **BullMQ + Redis** | Async image processing queue |
| File Storage | **Cloudflare R2** (S3-compatible) | No egress fees, global CDN |
| Email | **Resend + React Email** | Transactional emails |
| Payments | **Stripe Node SDK** | Subscription webhooks |
| Logging | **Pino** | Structured JSON logging |
| Error tracking | **Sentry** | Backend error monitoring |
| Rate limiting | **@fastify/rate-limit** | Protect API endpoints |
| CORS | **@fastify/cors** | Cross-origin configuration |
| Deployment | **Railway** or **Fly.io** | Simple container deployment |

### Backend Environment Variables
```env
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=snapstudio-images
R2_PUBLIC_URL=https://images.snapstudio.ai
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
AI_WORKER_URL=http://localhost:8000
AI_WORKER_SECRET=...
SENTRY_DSN=...
```

---

## 4. AI Worker Service — `services/ai-worker`

| Layer | Technology | Why |
|---|---|---|
| Runtime | **Python 3.11** | Best ML ecosystem |
| Framework | **FastAPI** | Async, fast, OpenAPI auto-docs |
| BG Removal | **rembg** (u2net model) | Best open-source background removal |
| Image Gen | **Fal.ai SDK** | Serverless GPU for SDXL/ControlNet |
| Enhancement | **Pillow + OpenCV** | Color correction, sharpness, exposure |
| Shadow Gen | **Custom (OpenCV)** | Synthetic shadow/reflection generation |
| Upscaling | **Real-ESRGAN (via Fal.ai)** | 2x/4x upscaling |
| Task Queue | **Celery + Redis** | Distributed task processing |
| Containerization | **Docker** | Consistent deployment |
| Deployment | **Modal** or **RunPod** | GPU inference at scale |

### AI Worker Environment Variables
```env
FAL_KEY=...
REDIS_URL=redis://...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=snapstudio-images
R2_ENDPOINT_URL=https://<account_id>.r2.cloudflarestorage.com
API_SECRET=...  # shared secret with main API
```

### AI Pipeline Flow
```
Input image (from R2)
  → rembg (background removal) → PNG with transparent bg
    → Shadow generator (OpenCV) → adds realistic drop shadow
      → Scene compositor (Pillow) → merges product onto background scene
        → Enhancement pass (Pillow) → sharpness, color, exposure
          → Upscaler (Real-ESRGAN via Fal.ai) → 2K resolution
            → Marketplace formatter → crop/resize per spec
              → Upload to R2 → return URL to API
```

---

## 5. Database — PostgreSQL via Supabase

```
Provider: Supabase (managed PostgreSQL 16)
ORM: Drizzle ORM
Migrations: drizzle-kit
Connection: Supabase connection string (pooled via PgBouncer)
```

See `03_DATABASE_SCHEMA.md` for full schema.

---

## 6. Infrastructure & DevOps

```
CDN / Edge:     Cloudflare (DNS, WAF, CDN for images)
Storage:        Cloudflare R2 (image storage, no egress fees)
Queue/Cache:    Redis (Upstash managed, serverless Redis)
Monitoring:     Datadog (infrastructure), Sentry (errors), PostHog (product)
CI/CD:          GitHub Actions → Vercel (frontend), Railway (backend)
Secrets:        Doppler (secret management across environments)
Docker:         Docker Compose for local dev, Dockerfile for production
```

### Local Development
```bash
# Start all services locally
docker compose up -d   # Redis, PostgreSQL
pnpm dev               # Turborepo runs web + api in parallel
cd services/ai-worker && uvicorn main:app --reload  # AI worker
```

---

## 7. Third-Party Integrations (Phase 2+)

| Integration | SDK | Purpose |
|---|---|---|
| Shopify | `@shopify/shopify-api` | Push images directly to product listings |
| WooCommerce | REST API (wp-json) | WordPress product image sync |
| Stripe | `stripe` (node) | Subscriptions, usage billing, payouts |
| JazzCash | REST API | Pakistan local payment method |
| EasyPaisa | REST API | Pakistan local payment method |
| Zapier | Webhook triggers | No-code automation for users |
| Slack | Webhook | Internal alerts for errors/signups |

---

## 8. Security Requirements

- All API endpoints require authentication (JWT Bearer token)
- Rate limiting: 100 req/min per IP for public endpoints; 1000 req/min for authenticated
- Images are stored with random UUIDs — no predictable URLs
- User images are isolated by user ID in R2 bucket paths: `users/{userId}/images/{imageId}.png`
- API keys (for API plan users) must be hashed with bcrypt before storage
- Stripe webhooks verified with signature validation
- CORS restricted to frontend domain only in production
- All environment variables loaded via Doppler (never committed to git)
- SQL injection protection via Drizzle ORM parameterized queries

---

## 9. Performance Targets

| Metric | Target |
|---|---|
| Image processing (p50) | < 5 seconds |
| Image processing (p95) | < 10 seconds |
| API response (non-image) | < 200ms |
| Frontend page load (LCP) | < 2 seconds |
| Concurrent image jobs | 10,000 via BullMQ |
| Uptime SLA | 99.5% |

---

## 10. Development Scripts

```json
// Root package.json scripts — Agent should add these
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "type-check": "turbo type-check",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio"
  }
}
```
