import { PROJECTS, PERSONAL } from '@/lib/data';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

// ─────────────────────────────────────────────
// AUTOMATIC RSS FEED
// ─────────────────────────────────────────────
// This is a Next.js Route Handler, not a static file. It runs on every
// request and builds the XML straight from PROJECTS in lib/data.ts.
//
// That means it is fully automatic: add, edit, or reorder a project in
// lib/data.ts and this feed updates itself the next time it's requested
// — nothing here needs to be touched.
//
// Live at:  https://<your-domain>/feed.xml
// Also discoverable automatically by feed readers/browsers via the
// <link rel="alternate" type="application/rss+xml"> tag in app/layout.tsx.

export const dynamic = 'force-dynamic'; // always reflect the latest data.ts content

/** Escapes text for safe inclusion inside RSS XML nodes. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Turns a project's own link ("#" for private/unpublished work) into a
 *  safe, always-valid item URL — falling back to the project's own case
 *  study page on this site. */
function resolveProjectUrl(href: string, num: string): string {
  if (!href || href === '#') return `${SITE_URL}/projects/${num}`;
  return href;
}

export async function GET() {
  const items = [...PROJECTS]
    // Newest first. Projects without a `date` sort to the bottom instead
    // of crashing the build — so this never breaks if one is added
    // without a date set.
    .sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : 0;
      const bTime = b.date ? new Date(b.date).getTime() : 0;
      return bTime - aTime;
    })
    .map((project) => {
      const url = resolveProjectUrl(project.href, project.num);
      const caseStudyUrl = `${SITE_URL}/projects/${project.num}`;
      const pubDate = new Date(project.date ?? Date.now()).toUTCString();

      return `
    <item>
      <title>${escapeXml(project.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(caseStudyUrl)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(project.description)}</description>
      ${project.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`;
    })
    .join('');

  const lastBuildDate = new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Projects</title>
    <link>${escapeXml(SITE_URL)}</link>
    <atom:link href="${escapeXml(SITE_URL)}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Latest projects and case studies from ${escapeXml(PERSONAL.name)}, ${escapeXml(PERSONAL.tagline)}.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // Feed readers poll this URL repeatedly — a short cache keeps
      // that cheap while still reflecting new projects quickly.
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
