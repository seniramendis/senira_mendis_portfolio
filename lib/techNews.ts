import Parser from 'rss-parser';

// ─────────────────────────────────────────────
// AUTOMATIC TECH NEWS AGGREGATOR
// ─────────────────────────────────────────────
// Pulls live headlines from free, no-signup sources — nothing here is
// written by hand and nothing needs an API key. Add or remove a source
// by editing this one list.
//
// Hacker News itself has no RSS feed of its own, so this uses hnrss.org
// — a long-running, widely used free community proxy that turns HN's
// public Firebase API into plain RSS. No account, no key, no cost.

const TECH_NEWS_FEEDS: { name: string; url: string }[] = [
  { name: 'Hacker News', url: 'https://hnrss.org/frontpage' },
  { name: 'Hacker News · Best', url: 'https://hnrss.org/best' },
];

export type TechNewsItem = {
  title: string;
  link: string;
  source: string;
  isoDate: string;
};

const parser = new Parser({ timeout: 8000 });

/** Fetches all configured feeds in parallel, merges, sorts newest-first,
 *  and returns the top `limit` items. A feed that's down or slow is
 *  simply skipped rather than failing the whole aggregation. */
export async function getTechNews(limit = 10): Promise<TechNewsItem[]> {
  const results = await Promise.allSettled(
    TECH_NEWS_FEEDS.map(async ({ name, url }) => {
      const feed = await parser.parseURL(url);
      return (feed.items || [])
        .filter((item) => item.title && item.link)
        .slice(0, 8)
        .map((item) => ({
          title: item.title as string,
          link: item.link as string,
          source: name,
          isoDate: item.isoDate || item.pubDate || new Date().toISOString(),
        }));
    })
  );

  const items = results
    .filter((r): r is PromiseFulfilledResult<TechNewsItem[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value);

  return items
    .sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime())
    .slice(0, limit);
}
