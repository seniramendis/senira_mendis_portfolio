'use client';
import { useEffect, useState } from 'react';
import styles from './TechNewsWidget.module.css';

type TechNewsItem = {
  title: string;
  link: string;
  source: string;
  isoDate: string;
};

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / 3_600_000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/** Fetches /api/tech-news (itself cached hourly server-side) and renders
 *  the merged, live headline list. Pure presentation — all the actual
 *  aggregation logic lives in lib/techNews.ts + app/api/tech-news. */
export default function TechNewsWidget({ limit = 6 }: { limit?: number }) {
  const [items, setItems] = useState<TechNewsItem[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/tech-news')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setItems((data.items || []).slice(0, limit));
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [limit]);

  if (failed) {
    return <p className={styles.state}>Couldn&apos;t load tech news right now.</p>;
  }

  if (!items) {
    return (
      <div className={styles.list}>
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className={styles.skeleton} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <p className={styles.state}>No headlines available right now — check back soon.</p>;
  }

  return (
    <div className={styles.list}>
      {items.map((item) => (
        <a
          key={item.link}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.item}
        >
          <span className={styles.itemLeft}>
            <span className={styles.itemTitle}>{item.title}</span>
            <span className={styles.itemMeta}>
              {item.source} &middot; {timeAgo(item.isoDate)}
            </span>
          </span>
          <span className={styles.itemArrow}>&rarr;</span>
        </a>
      ))}
    </div>
  );
}
