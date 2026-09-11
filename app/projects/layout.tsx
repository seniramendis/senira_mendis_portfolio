import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

// app/projects/page.tsx is a client component ('use client'), so it can't
// export its own `metadata` — Next.js only reads that export from server
// components. This layout supplies it instead, giving /projects a unique
// title, description and canonical URL rather than silently inheriting
// the homepage's.
export const metadata: Metadata = buildMetadata({
  title: 'Projects — Senira Mendis',
  description:
    'A collection of full-stack, mobile and backend builds by Senira Mendis — production platforms, solo experiments in geospatial systems, and AI.',
  path: '/projects',
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
