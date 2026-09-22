import type { Metadata } from 'next';
import { buildMetadata, SITE_URL } from '@/lib/seo';

// app/blog/page.tsx is a client component ('use client'), so it can't
// export its own `metadata` — Next.js only reads that export from server
// components. This layout supplies it instead, same pattern as
// app/projects/layout.tsx.
export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Blog — Senira Mendis',
    description:
      'Write-ups on real engineering problems from Senira Mendis\u2019 projects: concurrency, architecture decisions, and running Agile sprints on small teams.',
    path: '/blog',
  }),
  alternates: {
    canonical: `${SITE_URL}/blog`,
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
