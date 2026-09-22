import { BLOG_POSTS, PERSONAL } from '@/lib/data';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

// ─────────────────────────────────────────────
// AUTOMATIC RSS FEED — now driven by the blog
// ─────────────────────────────────────────────
// This is a Next.js Route Handler, not a static file. It runs on every
// request and builds the XML straight from BLOG_POSTS in lib/data.ts.
//
// That means it is fully automatic: add a new post object to BLOG_POSTS
// and this feed includes it the next time it's requested — nothing here
// needs to be touched.
//
// Live at:  https://<your-domain>/feed.xml
// Also discoverable automatically by feed readers/browsers via the
// <link rel="alternate" type="application/rss+xml"> tag in app/layout.tsx
// and app/blog/layout.tsx.

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

export async function GET() {
  const items = [...BLOG_POSTS]
    // Newest first — same rule the /blog index page uses, so what a
    // reader sees in their feed app always matches the site itself.
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const body = post.content.map((p) => `<p>${escapeXml(p)}</p>`).join('');

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <content:encoded><![CDATA[${body}]]></content:encoded>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`;
    })
    .join('');

  const lastBuildDate = new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Blog</title>
    <link>${escapeXml(SITE_URL)}/blog</link>
    <atom:link href="${escapeXml(SITE_URL)}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Engineering write-ups from ${escapeXml(PERSONAL.name)}, ${escapeXml(PERSONAL.tagline)}.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // Feed readers poll this URL repeatedly — a short cache keeps
      // that cheap while still reflecting new posts quickly.
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
