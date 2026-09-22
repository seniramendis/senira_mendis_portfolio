import { createClient } from '@sanity/client';

// ─────────────────────────────────────────────
// SANITY CLIENT
// ─────────────────────────────────────────────
// Reads its project from env vars (see .env.example) rather than a
// hardcoded ID, so this file never needs editing — just set the two
// env vars once after creating your Sanity project.

export const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || '';
export const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
export const SANITY_API_VERSION = '2024-01-01';

/** True once a real project ID has been set — lets the rest of the app
 *  fall back to local content instead of crashing when it hasn't. */
export const isSanityConfigured = Boolean(SANITY_PROJECT_ID);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: true, // fast, cached reads — right tradeoff for a public blog
    })
  : null;
