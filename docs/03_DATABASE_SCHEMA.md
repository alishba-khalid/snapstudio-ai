# SnapStudio AI — Database Schema

> **For Antigravity Agent:** Implement this schema exactly using Drizzle ORM with PostgreSQL. Generate migration files with `drizzle-kit generate`. Do not use Prisma. Create a `db/schema.ts` file in `apps/api/src/`.

---

## Schema Overview

```
users
  └─ subscriptions (1:1)
  └─ api_keys (1:many)
  └─ projects (1:many)
       └─ images (1:many)
            └─ image_exports (1:many)
  └─ usage_logs (1:many)
  └─ reseller_accounts (1:1, optional)
```

---

## Full Drizzle ORM Schema

```typescript
// apps/api/src/db/schema.ts
import {
  pgTable, uuid, text, integer, boolean, timestamp,
  pgEnum, jsonb, index, uniqueIndex
} from 'drizzle-orm/pg-core'

// ─── Enums ───────────────────────────────────────────────────────────────────

export const planEnum = pgEnum('plan', [
  'free', 'starter', 'growth', 'scale', 'enterprise'
])

export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'active', 'trialing', 'past_due', 'canceled', 'incomplete'
])

export const imageStatusEnum = pgEnum('image_status', [
  'uploading', 'queued', 'processing', 'completed', 'failed'
])

export const imageTypeEnum = pgEnum('image_type', [
  'background_removal', 'lifestyle_scene', 'studio_white',
  'ghost_mannequin', 'on_model', 'food_photography', 'video_clip'
])

export const exportFormatEnum = pgEnum('export_format', [
  'amazon_main', 'amazon_additional', 'daraz', 'noon', 'shopify',
  'instagram', 'tiktok', 'custom'
])

// ─── Users ────────────────────────────────────────────────────────────────────

export const users = pgTable('users', {
  id:              uuid('id').primaryKey().defaultRandom(),
  email:           text('email').notNull().unique(),
  name:            text('name'),
  avatarUrl:       text('avatar_url'),
  passwordHash:    text('password_hash'), // null if OAuth only
  emailVerified:   boolean('email_verified').default(false),
  plan:            planEnum('plan').default('free').notNull(),
  isActive:        boolean('is_active').default(true),
  isSuperAdmin:    boolean('is_super_admin').default(false),
  // Localization
  country:         text('country').default('PK'), // ISO 3166-1 alpha-2
  currency:        text('currency').default('USD'),
  timezone:        text('timezone').default('Asia/Karachi'),
  // Onboarding
  onboardingDone:  boolean('onboarding_done').default(false),
  businessType:    text('business_type'), // 'fashion', 'electronics', 'food', etc.
  // Timestamps
  createdAt:       timestamp('created_at').defaultNow().notNull(),
  updatedAt:       timestamp('updated_at').defaultNow().notNull(),
}, (t) => ({
  emailIdx: uniqueIndex('users_email_idx').on(t.email),
}))

// ─── OAuth Accounts ───────────────────────────────────────────────────────────

export const oauthAccounts = pgTable('oauth_accounts', {
  id:           uuid('id').primaryKey().defaultRandom(),
  userId:       uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  provider:     text('provider').notNull(), // 'google', 'github'
  providerAccountId: text('provider_account_id').notNull(),
  accessToken:  text('access_token'),
  refreshToken: text('refresh_token'),
  expiresAt:    timestamp('expires_at'),
  createdAt:    timestamp('created_at').defaultNow().notNull(),
}, (t) => ({
  providerIdx: uniqueIndex('oauth_provider_idx').on(t.provider, t.providerAccountId),
}))

// ─── Sessions ─────────────────────────────────────────────────────────────────

export const sessions = pgTable('sessions', {
  id:           uuid('id').primaryKey().defaultRandom(),
  userId:       uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token:        text('token').notNull().unique(),
  expiresAt:    timestamp('expires_at').notNull(),
  userAgent:    text('user_agent'),
  ipAddress:    text('ip_address'),
  createdAt:    timestamp('created_at').defaultNow().notNull(),
})

// ─── Subscriptions ────────────────────────────────────────────────────────────

export const subscriptions = pgTable('subscriptions', {
  id:                   uuid('id').primaryKey().defaultRandom(),
  userId:               uuid('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  stripeCustomerId:     text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripePriceId:        text('stripe_price_id'),
  status:               subscriptionStatusEnum('status').default('trialing'),
  plan:                 planEnum('plan').default('free'),
  // Usage limits
  imagesPerMonth:       integer('images_per_month').default(5),
  videosPerMonth:       integer('videos_per_month').default(0),
  bulkUploadLimit:      integer('bulk_upload_limit').default(1), // max files per batch
  apiAccess:            boolean('api_access').default(false),
  whitelabelEnabled:    boolean('whitelabel_enabled').default(false),
  // Billing cycle
  currentPeriodStart:   timestamp('current_period_start'),
  currentPeriodEnd:     timestamp('current_period_end'),
  cancelAtPeriodEnd:    boolean('cancel_at_period_end').default(false),
  // Timestamps
  createdAt:            timestamp('created_at').defaultNow().notNull(),
  updatedAt:            timestamp('updated_at').defaultNow().notNull(),
})

// ─── API Keys ─────────────────────────────────────────────────────────────────

export const apiKeys = pgTable('api_keys', {
  id:          uuid('id').primaryKey().defaultRandom(),
  userId:      uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name:        text('name').notNull(), // user-given label e.g. "Production"
  keyHash:     text('key_hash').notNull().unique(), // bcrypt hash
  keyPrefix:   text('key_prefix').notNull(), // first 8 chars for display e.g. "sk_live_"
  lastUsedAt:  timestamp('last_used_at'),
  expiresAt:   timestamp('expires_at'), // null = never expires
  isActive:    boolean('is_active').default(true),
  createdAt:   timestamp('created_at').defaultNow().notNull(),
})

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects = pgTable('projects', {
  id:          uuid('id').primaryKey().defaultRandom(),
  userId:      uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name:        text('name').notNull().default('My Project'),
  description: text('description'),
  // Brand style locking
  brandStyleId: uuid('brand_style_id'), // FK to brand_styles
  // Timestamps
  createdAt:   timestamp('created_at').defaultNow().notNull(),
  updatedAt:   timestamp('updated_at').defaultNow().notNull(),
}, (t) => ({
  userIdx: index('projects_user_idx').on(t.userId),
}))

// ─── Brand Styles ─────────────────────────────────────────────────────────────

export const brandStyles = pgTable('brand_styles', {
  id:              uuid('id').primaryKey().defaultRandom(),
  userId:          uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name:            text('name').notNull(),
  referenceImageUrls: jsonb('reference_image_urls').$type<string[]>().default([]),
  // Extracted style parameters (populated after AI analysis)
  lightingProfile: jsonb('lighting_profile'), // { direction, intensity, color_temp }
  colorGrade:      jsonb('color_grade'),      // { shadows, highlights, saturation }
  backgroundStyle: text('background_style'),  // 'studio_white', 'gradient', 'lifestyle'
  compositionRules: jsonb('composition_rules'), // { product_scale, position, margins }
  isAnalyzed:      boolean('is_analyzed').default(false),
  createdAt:       timestamp('created_at').defaultNow().notNull(),
})

// ─── Images ───────────────────────────────────────────────────────────────────

export const images = pgTable('images', {
  id:             uuid('id').primaryKey().defaultRandom(),
  userId:         uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  projectId:      uuid('project_id').references(() => projects.id, { onDelete: 'set null' }),
  // Source image
  originalKey:    text('original_key').notNull(), // R2 object key
  originalUrl:    text('original_url').notNull(),
  originalWidth:  integer('original_width'),
  originalHeight: integer('original_height'),
  originalSizeBytes: integer('original_size_bytes'),
  mimeType:       text('mime_type').default('image/jpeg'),
  // Processing config
  type:           imageTypeEnum('type').notNull().default('background_removal'),
  backgroundScene: text('background_scene'), // e.g. 'lifestyle_kitchen', 'studio_white'
  customPrompt:   text('custom_prompt'),     // for advanced users
  brandStyleId:   uuid('brand_style_id').references(() => brandStyles.id),
  // Processing results
  status:         imageStatusEnum('status').default('uploading'),
  processedKey:   text('processed_key'),   // R2 object key for result
  processedUrl:   text('processed_url'),
  processedWidth: integer('processed_width'),
  processedHeight: integer('processed_height'),
  removedBgKey:   text('removed_bg_key'), // intermediate transparent PNG
  // Job tracking
  jobId:          text('job_id'),           // BullMQ job ID
  processingStartedAt: timestamp('processing_started_at'),
  processingCompletedAt: timestamp('processing_completed_at'),
  processingDurationMs: integer('processing_duration_ms'),
  errorMessage:   text('error_message'),
  // Metadata
  isFavorite:     boolean('is_favorite').default(false),
  tags:           jsonb('tags').$type<string[]>().default([]),
  createdAt:      timestamp('created_at').defaultNow().notNull(),
  updatedAt:      timestamp('updated_at').defaultNow().notNull(),
}, (t) => ({
  userIdx:    index('images_user_idx').on(t.userId),
  projectIdx: index('images_project_idx').on(t.projectId),
  statusIdx:  index('images_status_idx').on(t.status),
}))

// ─── Image Exports ────────────────────────────────────────────────────────────

export const imageExports = pgTable('image_exports', {
  id:           uuid('id').primaryKey().defaultRandom(),
  imageId:      uuid('image_id').notNull().references(() => images.id, { onDelete: 'cascade' }),
  userId:       uuid('user_id').notNull().references(() => users.id),
  format:       exportFormatEnum('format').notNull(),
  // Export spec applied
  width:        integer('width').notNull(),
  height:       integer('height').notNull(),
  dpi:          integer('dpi').default(72),
  fileFormat:   text('file_format').default('jpg'), // jpg | png | webp
  maxSizeBytes: integer('max_size_bytes'),
  bgColor:      text('bg_color'), // '#FFFFFF' for Amazon
  // Output
  exportedKey:  text('exported_key').notNull(),
  exportedUrl:  text('exported_url').notNull(),
  fileSizeBytes: integer('file_size_bytes'),
  createdAt:    timestamp('created_at').defaultNow().notNull(),
})

// ─── Usage Logs ───────────────────────────────────────────────────────────────

export const usageLogs = pgTable('usage_logs', {
  id:        uuid('id').primaryKey().defaultRandom(),
  userId:    uuid('user_id').notNull().references(() => users.id),
  action:    text('action').notNull(), // 'image_processed', 'video_generated', 'api_call'
  imageId:   uuid('image_id').references(() => images.id),
  billingPeriod: text('billing_period').notNull(), // '2026-04' (YYYY-MM)
  creditCost: integer('credit_cost').default(1),
  metadata:  jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => ({
  userPeriodIdx: index('usage_user_period_idx').on(t.userId, t.billingPeriod),
}))

// ─── Marketplace Specs (reference table) ─────────────────────────────────────

export const marketplaceSpecs = pgTable('marketplace_specs', {
  id:           uuid('id').primaryKey().defaultRandom(),
  marketplace:  text('marketplace').notNull().unique(), // 'amazon_ae', 'daraz_pk', etc.
  displayName:  text('display_name').notNull(),
  // Main image requirements
  mainWidth:    integer('main_width').notNull(),
  mainHeight:   integer('main_height').notNull(),
  mainBgColor:  text('main_bg_color'), // '#FFFFFF'
  minDpi:       integer('min_dpi').default(72),
  maxFileSizeKb: integer('max_file_size_kb'),
  allowedFormats: jsonb('allowed_formats').$type<string[]>(),
  productFillPercent: integer('product_fill_percent'), // 85 for Amazon
  noTextAllowed: boolean('no_text_allowed').default(true),
  // Additional image options
  additionalSpecs: jsonb('additional_specs'),
  updatedAt:    timestamp('updated_at').defaultNow().notNull(),
})

// ─── Reseller Accounts ────────────────────────────────────────────────────────

export const resellerAccounts = pgTable('reseller_accounts', {
  id:             uuid('id').primaryKey().defaultRandom(),
  userId:         uuid('user_id').notNull().unique().references(() => users.id),
  brandName:      text('brand_name').notNull(),
  brandDomain:    text('brand_domain'),
  logoUrl:        text('logo_url'),
  primaryColor:   text('primary_color').default('#000000'),
  customEmailFrom: text('custom_email_from'),
  revenueSharePct: integer('revenue_share_pct').default(20), // 20%
  isActive:       boolean('is_active').default(true),
  createdAt:      timestamp('created_at').defaultNow().notNull(),
})

// ─── Waitlist ─────────────────────────────────────────────────────────────────

export const waitlist = pgTable('waitlist', {
  id:          uuid('id').primaryKey().defaultRandom(),
  email:       text('email').notNull().unique(),
  name:        text('name'),
  businessType: text('business_type'),
  marketplace: text('marketplace'), // 'daraz', 'shopify', 'amazon', etc.
  referrer:    text('referrer'),
  createdAt:   timestamp('created_at').defaultNow().notNull(),
})
```

---

## Seed Data for Marketplace Specs

```typescript
// apps/api/src/db/seed.ts
// Agent: Run this after migration with: npx tsx src/db/seed.ts

const marketplaces = [
  {
    marketplace: 'amazon_ae',
    displayName: 'Amazon.ae (UAE)',
    mainWidth: 2000, mainHeight: 2000,
    mainBgColor: '#FFFFFF',
    minDpi: 72, maxFileSizeKb: 10240,
    allowedFormats: ['jpg', 'png', 'gif', 'tif'],
    productFillPercent: 85,
    noTextAllowed: true,
  },
  {
    marketplace: 'daraz_pk',
    displayName: 'Daraz (Pakistan)',
    mainWidth: 1000, mainHeight: 1000,
    mainBgColor: '#FFFFFF',
    minDpi: 72, maxFileSizeKb: 5120,
    allowedFormats: ['jpg', 'jpeg', 'png'],
    productFillPercent: 80,
    noTextAllowed: false,
  },
  {
    marketplace: 'noon_ae',
    displayName: 'Noon (UAE/KSA)',
    mainWidth: 1200, mainHeight: 1200,
    mainBgColor: '#FFFFFF',
    minDpi: 72, maxFileSizeKb: 5120,
    allowedFormats: ['jpg', 'png'],
    productFillPercent: 80,
    noTextAllowed: true,
  },
  {
    marketplace: 'shopify',
    displayName: 'Shopify',
    mainWidth: 2048, mainHeight: 2048,
    mainBgColor: null,
    minDpi: 72, maxFileSizeKb: 20480,
    allowedFormats: ['jpg', 'png', 'gif', 'webp'],
    productFillPercent: null,
    noTextAllowed: false,
  },
  {
    marketplace: 'instagram',
    displayName: 'Instagram (Square)',
    mainWidth: 1080, mainHeight: 1080,
    mainBgColor: null,
    minDpi: 72, maxFileSizeKb: 8192,
    allowedFormats: ['jpg', 'png'],
    productFillPercent: null,
    noTextAllowed: false,
  },
]
```
