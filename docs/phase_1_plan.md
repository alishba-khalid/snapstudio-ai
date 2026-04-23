# 🚀 Phase 1: Real AI Integration

We are moving from a simulated studio to a functional AI-powered product photography tool.

## 1. Setup & Environment
- [ ] Create `.env.local` in `apps/web` with `FAL_KEY` (User needs to provide this or I'll use a mock for now).
- [ ] Create `apps/web/lib/fal.ts` to configure the Fal.ai client.

## 2. AI Studio Overhaul
- [ ] **Real File Upload**: Update the upload component to handle real files and create local previews.
- [ ] **Fal.ai Storage**: Use `fal.storage.upload` to upload images for processing.
- [ ] **Background Removal**: Implement `fal-ai/fast-remove-bg` for the "Background removal" style.
- [ ] **Lifestyle Generation**: Use `fal-ai/flux-pro/v1.1-gen-fill` or similar models for scene generation based on selected styles.
- [ ] **Prompt Mapping**: Define specific prompts for each aesthetic (Nordic Minimal, Neon Galactic, etc.).

## 3. Marketplace Compliance Engine
- [ ] Create `apps/web/lib/compliance.ts` with specs for Daraz, Noon, Amazon, and Shopify.
- [ ] Implement a processing utility using `Sharp.js` (or a client-side alternative like `canvas` if server-side is not preferred for MVP) to resize and format images.
- [ ] Update the UI to show specific "Download for Daraz", "Download for Amazon" etc. buttons.

## 4. UI/UX Polishing
- [ ] Add real progress indicators for AI processing.
- [ ] Improve the result preview with a Before/After comparison slider.

---

### Questions for USER:
1. Do you have a **Fal.ai API Key** ready? If so, please add it to `apps/web/.env.local`.
2. For the **Marketplace Compliance Engine**, should we do the image transformations on the client-side (using Canvas) or server-side (using a dedicated API route)?
3. Do you want to start with a specific marketplace first? (Implementation plan defaults to Daraz Pakistan).
