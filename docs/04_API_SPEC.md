# SnapStudio AI — REST API Specification

> **For Antigravity Agent:** Implement all endpoints in Fastify v5 with TypeScript. Use Zod for request/response validation on every route. Every protected route must verify JWT from Authorization header. Follow REST conventions exactly as specified here.

---

## Base URL & Versioning

```
Development:  http://localhost:3001/api/v1
Production:   https://api.snapstudio.ai/api/v1
```

## Authentication

All protected routes require:
```
Authorization: Bearer <jwt_token>
```

API plan users may also use:
```
X-API-Key: sk_live_<key>
```

---

## 1. Auth Routes (`/auth`)

### POST `/auth/register`
Register new user with email + password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "Ahmed Khan"
}
```
**Response 201:**
```json
{
  "user": { "id": "uuid", "email": "...", "name": "...", "plan": "free" },
  "token": "jwt_token",
  "message": "Verify your email to activate your account"
}
```

### POST `/auth/login`
**Request:**
```json
{ "email": "user@example.com", "password": "SecurePass123!" }
```
**Response 200:**
```json
{
  "user": { "id": "uuid", "email": "...", "plan": "starter" },
  "token": "jwt_token"
}
```

### POST `/auth/google`
OAuth with Google ID token.
**Request:** `{ "idToken": "google_id_token" }`
**Response 200:** Same as login response.

### POST `/auth/logout`
Invalidates current session token.
**Protected:** Yes
**Response 200:** `{ "success": true }`

### POST `/auth/forgot-password`
**Request:** `{ "email": "user@example.com" }`
**Response 200:** `{ "message": "Reset email sent" }`

### POST `/auth/reset-password`
**Request:** `{ "token": "reset_token", "password": "NewPass123!" }`
**Response 200:** `{ "message": "Password updated" }`

---

## 2. User Routes (`/user`)

### GET `/user/me`
**Protected:** Yes
**Response 200:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "Ahmed Khan",
  "plan": "growth",
  "avatarUrl": "https://...",
  "subscription": {
    "status": "active",
    "imagesPerMonth": 300,
    "imagesUsedThisMonth": 47,
    "videosPerMonth": 5,
    "videosUsed": 1,
    "currentPeriodEnd": "2026-05-14T00:00:00Z"
  },
  "onboardingDone": true,
  "businessType": "fashion"
}
```

### PATCH `/user/me`
**Protected:** Yes
**Request:** `{ "name": "Ahmed K.", "businessType": "fashion", "timezone": "Asia/Karachi" }`
**Response 200:** Updated user object.

### GET `/user/usage`
**Protected:** Yes
**Query params:** `?period=2026-04` (defaults to current month)
**Response 200:**
```json
{
  "period": "2026-04",
  "imagesProcessed": 47,
  "imagesLimit": 300,
  "videosGenerated": 1,
  "videosLimit": 5,
  "apiCallsMade": 0,
  "dailyBreakdown": [
    { "date": "2026-04-01", "images": 5, "videos": 0 }
  ]
}
```

---

## 3. Image Routes (`/images`)

### POST `/images/upload`
Upload source image and start processing job.
**Protected:** Yes
**Content-Type:** `multipart/form-data`
**Form fields:**
```
file: <image file> (required, max 20MB, jpg/png/webp/heic)
projectId: uuid (optional)
type: "background_removal" | "lifestyle_scene" | "studio_white" | "ghost_mannequin" (required)
backgroundScene: string (required if type = lifestyle_scene)
customPrompt: string (optional, Scale plan only)
brandStyleId: uuid (optional)
```
**Response 202:**
```json
{
  "imageId": "uuid",
  "jobId": "bullmq-job-id",
  "status": "queued",
  "estimatedSeconds": 8,
  "statusUrl": "/api/v1/images/uuid/status"
}
```

### GET `/images/:id/status`
Poll processing status. Use SSE endpoint for real-time.
**Protected:** Yes
**Response 200:**
```json
{
  "imageId": "uuid",
  "status": "completed",
  "processedUrl": "https://images.snapstudio.ai/...",
  "processingDurationMs": 4200
}
```
**Status values:** `uploading | queued | processing | completed | failed`

### GET `/images/:id/stream`
Server-Sent Events stream for real-time status updates.
**Protected:** Yes
**Events:**
```
event: status_update
data: { "status": "processing", "progress": 40 }

event: completed
data: { "status": "completed", "processedUrl": "https://..." }

event: failed
data: { "status": "failed", "error": "Processing failed: ..." }
```

### GET `/images`
List user's images with pagination.
**Protected:** Yes
**Query params:** `?page=1&limit=20&projectId=uuid&status=completed&type=lifestyle_scene`
**Response 200:**
```json
{
  "images": [
    {
      "id": "uuid",
      "originalUrl": "https://...",
      "processedUrl": "https://...",
      "type": "lifestyle_scene",
      "backgroundScene": "lifestyle_kitchen",
      "status": "completed",
      "createdAt": "2026-04-14T10:00:00Z"
    }
  ],
  "total": 47,
  "page": 1,
  "totalPages": 3
}
```

### DELETE `/images/:id`
**Protected:** Yes (must own image)
**Response 200:** `{ "success": true }`

### POST `/images/:id/favorite`
Toggle favorite status.
**Protected:** Yes
**Response 200:** `{ "isFavorite": true }`

### POST `/images/bulk`
Submit bulk processing job (Growth+ plan).
**Protected:** Yes
**Content-Type:** `multipart/form-data`
**Form fields:**
```
files[]: <image files> (max 50 for Growth, 500 for Scale)
type: string
backgroundScene: string
brandStyleId: uuid (optional)
projectId: uuid (optional)
```
**Response 202:**
```json
{
  "bulkJobId": "uuid",
  "totalImages": 23,
  "status": "queued",
  "statusUrl": "/api/v1/images/bulk/uuid/status"
}
```

### GET `/images/bulk/:bulkJobId/status`
**Protected:** Yes
**Response 200:**
```json
{
  "bulkJobId": "uuid",
  "totalImages": 23,
  "completed": 18,
  "failed": 0,
  "inProgress": 5,
  "status": "processing",
  "images": [
    { "imageId": "uuid", "status": "completed", "processedUrl": "https://..." }
  ]
}
```

---

## 4. Export Routes (`/images/:id/export`)

### POST `/images/:id/export`
Export image in marketplace-specific format.
**Protected:** Yes
**Request:**
```json
{
  "format": "amazon_ae",
  "customSpec": null
}
```
Or with custom spec:
```json
{
  "format": "custom",
  "customSpec": {
    "width": 1500,
    "height": 1500,
    "bgColor": "#FFFFFF",
    "fileFormat": "jpg",
    "maxSizeKb": 5000,
    "dpi": 72
  }
}
```
**Response 200:**
```json
{
  "exportId": "uuid",
  "exportedUrl": "https://images.snapstudio.ai/exports/...",
  "fileSizeBytes": 243200,
  "width": 2000,
  "height": 2000,
  "format": "amazon_ae"
}
```

---

## 5. Background Scenes (`/scenes`)

### GET `/scenes`
List all available background scenes.
**Protected:** Yes
**Query params:** `?category=lifestyle&search=kitchen`
**Response 200:**
```json
{
  "scenes": [
    {
      "id": "lifestyle_kitchen",
      "name": "Modern Kitchen",
      "category": "lifestyle",
      "thumbnailUrl": "https://...",
      "isPremium": false,
      "tags": ["kitchen", "modern", "food", "cooking"]
    }
  ],
  "categories": ["lifestyle", "studio", "outdoor", "fashion", "food"]
}
```

---

## 6. Brand Styles (`/brand-styles`)

### POST `/brand-styles`
Create brand style from reference images.
**Protected:** Yes (Growth+ plan)
**Content-Type:** `multipart/form-data`
**Form fields:**
```
name: string
referenceImages[]: 2–5 image files
```
**Response 202:**
```json
{
  "brandStyleId": "uuid",
  "status": "analyzing",
  "message": "AI is analyzing your brand style. Ready in ~30 seconds."
}
```

### GET `/brand-styles`
**Protected:** Yes
**Response 200:** `{ "brandStyles": [...] }`

### DELETE `/brand-styles/:id`
**Protected:** Yes
**Response 200:** `{ "success": true }`

---

## 7. Projects (`/projects`)

### POST `/projects`
**Protected:** Yes
**Request:** `{ "name": "Summer Collection", "description": "..." }`
**Response 201:** `{ "project": { "id": "uuid", "name": "..." } }`

### GET `/projects`
**Protected:** Yes
**Response 200:** `{ "projects": [...] }`

### DELETE `/projects/:id`
**Protected:** Yes
**Response 200:** `{ "success": true }`

---

## 8. Billing Routes (`/billing`)

### POST `/billing/checkout`
Create Stripe checkout session.
**Protected:** Yes
**Request:** `{ "plan": "growth", "billingCycle": "monthly" }`
**Response 200:**
```json
{ "checkoutUrl": "https://checkout.stripe.com/..." }
```

### POST `/billing/portal`
Create Stripe customer portal session (manage/cancel subscription).
**Protected:** Yes
**Response 200:** `{ "portalUrl": "https://billing.stripe.com/..." }`

### GET `/billing/invoices`
**Protected:** Yes
**Response 200:**
```json
{
  "invoices": [
    {
      "id": "in_...",
      "amount": 3900,
      "currency": "usd",
      "status": "paid",
      "date": "2026-04-01",
      "pdfUrl": "https://..."
    }
  ]
}
```

### POST `/billing/webhook`
Stripe webhook handler (no auth, verified by Stripe signature).
**Events handled:**
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

---

## 9. API Keys (`/api-keys`) — Scale plan only

### POST `/api-keys`
**Protected:** Yes (Scale plan)
**Request:** `{ "name": "Production" }`
**Response 201:**
```json
{
  "id": "uuid",
  "name": "Production",
  "key": "sk_live_xxxxxxxxxxxxxxxx",  // Only shown once!
  "prefix": "sk_live_xx",
  "createdAt": "2026-04-14T..."
}
```

### GET `/api-keys`
**Protected:** Yes
**Response 200:** `{ "apiKeys": [{ "id", "name", "prefix", "lastUsedAt", "createdAt" }] }` (no actual keys)

### DELETE `/api-keys/:id`
**Protected:** Yes
**Response 200:** `{ "success": true }`

---

## 10. Marketplace Specs (`/marketplace-specs`) — Public

### GET `/marketplace-specs`
**Response 200:**
```json
{
  "specs": [
    {
      "marketplace": "amazon_ae",
      "displayName": "Amazon.ae (UAE)",
      "mainWidth": 2000,
      "mainHeight": 2000,
      "mainBgColor": "#FFFFFF",
      "productFillPercent": 85,
      "allowedFormats": ["jpg", "png"],
      "noTextAllowed": true
    }
  ]
}
```

---

## 11. Admin Routes (`/admin`) — Super admin only

### GET `/admin/stats`
```json
{
  "totalUsers": 342,
  "activeSubscriptions": 89,
  "mrr": 3510,
  "imagesProcessedToday": 1204,
  "imagesProcessedThisMonth": 18930,
  "failedJobs": 3,
  "avgProcessingMs": 4200
}
```

### GET `/admin/users`
Paginated user list with plan + usage.

### POST `/admin/users/:id/grant-plan`
Override plan for specific user (for sales/support).

---

## Error Response Format

All errors follow this format:
```json
{
  "error": {
    "code": "USAGE_LIMIT_REACHED",
    "message": "You've used all 50 images in your Starter plan this month.",
    "statusCode": 429,
    "upgradeUrl": "https://snapstudio.ai/pricing"
  }
}
```

**Error codes:**
- `UNAUTHORIZED` (401) — Missing or invalid token
- `FORBIDDEN` (403) — Action not allowed for current plan
- `NOT_FOUND` (404) — Resource not found
- `USAGE_LIMIT_REACHED` (429) — Monthly image limit hit
- `FILE_TOO_LARGE` (413) — Upload exceeds 20MB
- `UNSUPPORTED_FORMAT` (415) — Invalid file type
- `PROCESSING_FAILED` (422) — AI processing error
- `VALIDATION_ERROR` (400) — Request validation failed
