import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

// app/projects/page.tsx is a client component ('use client'), so it can't
// export its own `metadata` — Next.js only reads that export from server
// components. This layout supplies it instead, giving /projects a unique
// title, description and canonical URL rather than silently inheriting
// the homepage's.
export const metadata: Metadata = buildMetadata({
  title: 'Projects — Software Engineering Portfolio | Senira Mendis',
  description:
    'Full-stack, mobile (Android/React Native) and backend projects by Senira Mendis, a software engineer in Sri Lanka — production platforms, geospatial systems, and AI builds.',
  path: '/projects',
  keywords: [
    'Software Engineer Portfolio Sri Lanka',
    'Full Stack Developer Projects',
    'Android Developer Portfolio',
    'React Native Projects',
    'Laravel Projects Sri Lanka',
    'Backend Developer Portfolio',
  ],
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
