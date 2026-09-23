import Parser from 'rss-parser';

// ─────────────────────────────────────────────
// AUTOMATIC TECH NEWS AGGREGATOR
// ─────────────────────────────────────────────
// Pulls live headlines from Hacker News — nothing here is written by
// hand and nothing needs an API key. Hacker News itself has no RSS
// feed of its own, so this uses hnrss.org, a long-running, widely used
// free community proxy that turns HN's public Firebase API into plain
// RSS. No account, no key, no cost.
//
// HN's feed only gives a title + a link to the story's original
// article — it never includes a photo. So for every story, this file
// also fetches that linked article's page and pulls its real lead
// image straight out of the page's own Open Graph / Twitter Card meta
// tags (the same image the article itself would show if you shared its
// link on social media). That's what lets the Apple-style carousel on
// the blog page show a genuine picture per story instead of a generic
// placeholder — and why a story without a usable image is simply
// skipped rather than shown blank.

const TECH_NEWS_FEEDS: { name: string; url: string }[] = [
  { name: 'Hacker News', url: 'https://hnrss.org/frontpage' },
  { name: 'Hacker News · Best', url: 'https://hnrss.org/best' },
];

export type TechNewsItem = {
  title: string;
  link: string;
  source: string;
  isoDate: string;
  image: string | null;
};

type RawItem = {
  title?: string;
  link?: string;
  isoDate?: string;
  pubDate?: string;
};

const parser = new Parser({ timeout: 8000 });

const FETCH_TIMEOUT_MS = 6000;
const UA =
  'Mozilla/5.0 (compatible; SeniraMendisPortfolioBot/1.0; +https://senira-mendis.com)';

/** Resolves a possibly-relative image URL (e.g. "/img/hero.jpg")
 *  against the page it was found on. */
function resolveImageUrl(raw: string, pageUrl: string): string | null {
  try {
    return new URL(raw, pageUrl).toString();
  } catch {
    return null;
  }
}

/** Fetches a story's linked article and pulls its real lead image out
 *  of the page's own <meta property="og:image"> / twitter:image tags —
 *  the exact photo that article uses to represent itself. Only the
 *  first chunk of HTML is read (the meta tags live in <head>), and a
 *  slow or blocking site is simply skipped rather than stalling the
 *  whole aggregation. */
async function fetchArticleImage(pageUrl: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(pageUrl, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': UA,
        Accept: 'text/html,application/xhtml+xml',
      },
    });
    if (!res.ok) return null;

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) return null;

    // Meta tags always live in <head>, at the top of the document —
    // reading the first ~150KB avoids downloading huge pages in full.
    const reader = res.body?.getReader();
    let html = '';
    if (reader) {
      const decoder = new TextDecoder();
      while (html.length < 150_000) {
        const { done, value } = await reader.read();
        if (done) break;
        html += decoder.decode(value, { stream: true });
      }
      reader.cancel().catch(() => {});
    } else {
      html = await res.text();
    }

    const metaPatterns = [
      /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["']/i,
      /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i,
    ];

    for (const pattern of metaPatterns) {
      const match = html.match(pattern);
      if (match?.[1]) {
        const resolved = resolveImageUrl(match[1], pageUrl);
        if (resolved) return resolved;
      }
    }

    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Fetches all configured HN feeds in parallel, merges + de-dupes by
 *  link, sorts newest-first, then — for a generous candidate pool —
 *  visits each story's article page to grab its real photo. Only
 *  stories where that succeeded make it into the final list, since the
 *  carousel is photo-first. */
export async function getTechNews(limit = 9): Promise<TechNewsItem[]> {
  const results = await Promise.allSettled(
    TECH_NEWS_FEEDS.map(async ({ name, url }) => {
      const feed = await parser.parseURL(url);
      return ((feed.items as RawItem[]) || [])
        .filter((item) => item.title && item.link)
        .slice(0, 12)
        .map((item) => ({
          title: item.title as string,
          link: item.link as string,
          source: name,
          isoDate: item.isoDate || item.pubDate || new Date().toISOString(),
        }));
    })
  );

  const seen = new Set<string>();
  const candidates = results
    .filter(
      (r): r is PromiseFulfilledResult<Omit<TechNewsItem, 'image'>[]> =>
        r.status === 'fulfilled'
    )
    .flatMap((r) => r.value)
    .filter((item) => {
      if (seen.has(item.link)) return false;
      seen.add(item.link);
      return true;
    })
    .sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime())
    // Fetch images for a wider pool than `limit` needs, since not
    // every linked site publishes an og:image — this keeps the final
    // carousel full even after the ones without a real photo drop out.
    .slice(0, limit * 3);

  const withImages = await Promise.all(
    candidates.map(async (item) => ({
      ...item,
      image: await fetchArticleImage(item.link),
    }))
  );

  return withImages.filter((item): item is TechNewsItem => Boolean(item.image)).slice(0, limit);
}
