import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';

// ─────────────────────────────────────────────
// SANITY STUDIO CONFIG
// ─────────────────────────────────────────────
// This powers the writing dashboard embedded at /studio on your own
// deployed site — no separate hosting or account for the Studio itself.
//
// Required before this works: create a free project at sanity.io/manage,
// then set these two env vars (see .env.example):
//   SANITY_PROJECT_ID
//   SANITY_DATASET   (usually "production")

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || '';
const dataset = process.env.SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'Senira Mendis — Blog Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
