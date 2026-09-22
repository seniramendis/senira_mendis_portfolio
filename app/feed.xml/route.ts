import { getAllPosts, bodyToPlainParagraphs } from '@/lib/blog';
import { PERSONAL } from '@/lib/data';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

// ─────────────────────────────────────────────
// AUTOMATIC RSS FEED — reads through lib/blog.ts
// ─────────────────────────────────────────────
// getAllPosts() pulls from Sanity when it's configured and reachable,
// and falls back to the local BLOG_POSTS array otherwise — so this feed
// updates itself the moment a post is published in Sanity Studio
// (/studio), with nothing here to touch.
//
// Live at:  https://<your-domain>/feed.xml

export const dynamic = 'force-dynamic'; // always reflect the latest content

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
  const posts = await getAllPosts(); // already sorted newest-first

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const paragraphs = bodyToPlainParagraphs(post);
      const body = paragraphs.map((p) => `<p>${escapeXml(p)}</p>`).join('');

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
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
