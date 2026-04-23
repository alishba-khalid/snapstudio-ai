import { fal } from "@fal-ai/client";

fal.config({
  proxyUrl: "/api/fal/proxy", // This matches our API route
});

export const falClient = fal;
