# SnapStudio AI — Antigravity Agent Master Prompt

> **COPY THIS ENTIRE FILE AND PASTE IT AS YOUR FIRST PROMPT INTO GOOGLE ANTIGRAVITY.**
> This is structured to work with Antigravity's agent-first architecture.

---

## MISSION

You are building **SnapStudio AI** — a full-stack B2B SaaS platform for AI-powered product photography, targeted at e-commerce sellers in Pakistan, UAE, and South Asia.

Before writing ANY code or running ANY commands, generate a **detailed plan artifact** that includes:
- Complete folder/file tree for the project
- All npm/pip packages to install with exact versions
- Implementation steps in order
- Estimated time per step
- Potential risks and how to handle them

**Ask for my approval on the plan before proceeding.**

---

## DOCUMENTATION TO READ FIRST

All 6 specification files are in the `/docs` folder. Read them in this order before starting:
1. `01_PROJECT_OVERVIEW.md` — What we're building and why
2. `02_TECH_STACK.md` — Exact technologies to use (do not deviate)
3. `03_DATABASE_SCHEMA.md` — Complete Drizzle ORM schema
4. `04_API_SPEC.md` — All API endpoints with request/response shapes
5. `05_FEATURES_SPEC.md` — Detailed feature implementation code
6. `06_UI_PAGES_SPEC.md` — Frontend pages and component specs

---

## PHASE 1 TASKS (Do These In Order)

### Task 1: Project Scaffold
- Init Turborepo monorepo with pnpm workspaces
- Create `apps/web` (Next.js 15), `apps/api` (Fastify), `services/ai-worker` (FastAPI)
- Set up shared packages: `packages/types`, `packages/ui`
- Configure TypeScript strict mode for all packages
- Set up ESLint + Prettier across monorepo
- Create `.env.example` files for all apps
- Create `docker-compose.yml` for local PostgreSQL + Redis

### Task 2: Database Setup
- Install Drizzle ORM + drizzle-kit in `apps/api`
- Implement the FULL schema from `03_DATABASE_SCHEMA.md` in `src/db/schema.ts`
- Generate initial migration
- Create seed file with marketplace specs data
- Set up Supabase connection

### Task 3: Authentication (Backend)
- Implement all auth routes from `04_API_SPEC.md` Section 1
- Email + password registration with bcrypt
- JWT session tokens (7-day expiry, stored in sessions table)
- Google OAuth flow
- Email verification (using Resend)
- Password reset flow

### Task 4: Authentication (Frontend)
- Build `/login` page with email + Google OAuth button
- Build `/register` page
- Build `/forgot-password` page
- Protect `(app)/*` routes with auth middleware
- Add JWT to all API requests via TanStack Query

### Task 5: File Upload + R2 Storage
- Set up Cloudflare R2 bucket
- Create presigned URL endpoint in API (for direct browser upload to R2)
- Implement Uppy upload zone component in frontend
- Handle upload progress, file validation (type, size)

### Task 6: AI Worker — Background Removal
- Set up FastAPI project in `services/ai-worker`
- Install rembg, Pillow, OpenCV
- Implement background removal endpoint: `POST /process/remove-bg`
- Implement health check endpoint: `GET /health`
- Create Dockerfile for AI worker
- Test with 5 different product photos (show screenshots)

### Task 7: Job Queue
- Set up BullMQ in `apps/api`
- Create `image-processing` queue
- Connect API to AI worker via HTTP
- Implement: upload → create job → process → update DB → notify via SSE
- Test full flow end-to-end

### Task 8: Studio Page (Frontend)
- Build the 3-column studio layout from `06_UI_PAGES_SPEC.md`
- Upload zone, type selector, scene grid
- SSE connection for real-time processing status
- Before/after slider for results
- Export modal with marketplace options

### Task 9: Billing (Stripe)
- Create Stripe products + prices for Starter ($9), Growth ($39), Scale ($99)
- Implement checkout session endpoint
- Implement Stripe webhook handler
- Build billing settings page
- Enforce usage limits middleware

### Task 10: Dashboard + Gallery
- Build `/dashboard` page
- Build `/gallery` page with infinite scroll
- Build image card component with download/export actions

---

## QUALITY REQUIREMENTS

Every feature must:
- Have TypeScript types (no `any`)
- Handle loading states in the UI
- Handle error states with user-friendly messages
- Work on mobile (320px+) and desktop (1440px)
- Pass ESLint without warnings

---

## BROWSER TESTING

After each UI task, use Antigravity's browser to:
1. Verify the page renders correctly
2. Check responsive layout on mobile viewport (375px)
3. Test the happy path user flow
4. Take a screenshot as an artifact for review

---

## SECURITY CHECKLIST

Before completing each backend task, verify:
- [ ] All DB queries use parameterized statements (Drizzle handles this)
- [ ] User can only access their own resources (add `userId` check to every query)
- [ ] Rate limiting applied to auth endpoints (5 attempts/15 min)
- [ ] File uploads validated for type AND size before processing
- [ ] API keys hashed with bcrypt before storage
- [ ] Stripe webhooks verified with signature

---

## START COMMAND

Begin with this exact task:

```
Task: Project Scaffold

Create the full Turborepo monorepo for SnapStudio AI following the 
structure in 01_PROJECT_OVERVIEW.md and tech choices in 02_TECH_STACK.md.

Steps:
1. Init Turborepo with pnpm
2. Create apps/web (Next.js 15 with TypeScript, Tailwind, shadcn/ui)
3. Create apps/api (Fastify + TypeScript)
4. Create services/ai-worker (Python FastAPI — just scaffold, no AI code yet)
5. Set up shared packages/types with basic TypeScript types
6. Configure root ESLint + Prettier
7. Create docker-compose.yml with PostgreSQL 16 + Redis 7
8. Create .env.example for each app

Before running any commands: generate a plan artifact showing the full 
file tree and all dependencies, then ask for approval.
After completion: run `pnpm dev` and take a browser screenshot showing 
all services running.
```
