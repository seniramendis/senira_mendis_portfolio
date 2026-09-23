'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './TechNewsWidget.module.css';

type TechNewsItem = {
  title: string;
  link: string;
  source: string;
  isoDate: string;
  image: string | null;
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
 *  it as an Apple-style, self-advancing photo carousel. All aggregation
 *  (including pulling each story's lead image) lives in lib/techNews.ts
 *  + app/api/tech-news — this component is pure presentation. */
export default function TechNewsWidget({ limit = 8 }: { limit?: number }) {
  const [items, setItems] = useState<TechNewsItem[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

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

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>('[data-card]');
    const card = cards[i];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    setActive(i);
  }, []);

  // Auto-advance, like Apple's own product/story carousels — pauses the
  // moment a visitor hovers, touches, or drags it.
  useEffect(() => {
    if (!items || items.length < 2) return;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setActive((prev) => {
        const next = (prev + 1) % items.length;
        scrollToIndex(next);
        return next;
      });
    }, 4500);
    return () => clearInterval(id);
  }, [items, scrollToIndex]);

  // Keep the active dot in sync if the visitor swipes/drags manually.
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-card]'));
    let closest = 0;
    let min = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (d < min) {
        min = d;
        closest = i;
      }
    });
    setActive(closest);
  }, []);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  if (failed) {
    return <p className={styles.state}>Couldn&apos;t load tech news right now.</p>;
  }

  if (!items) {
    return (
      <div className={styles.track}>
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className={styles.skeletonCard} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <p className={styles.state}>No headlines available right now — check back soon.</p>;
  }

  return (
    <div
      className={styles.carousel}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      <div className={styles.track} ref={trackRef} onScroll={onScroll}>
        {items.map((item, i) => (
          <a
            key={item.link}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            data-card
          >
            {item.image ? (
              <img
                src={item.image}
                alt=""
                className={styles.cardImage}
                loading={i < 2 ? 'eager' : 'lazy'}
              />
            ) : (
              <div className={styles.cardImageFallback} />
            )}
            <div className={styles.cardGradient} />
            <div className={styles.cardContent}>
              <span className={styles.cardEyebrow}>{item.source}</span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <span className={styles.cardMeta}>{timeAgo(item.isoDate)}</span>
            </div>
          </a>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => scrollToIndex((active - 1 + items.length) % items.length)}
          aria-label="Previous story"
        >
          &larr;
        </button>
        <div className={styles.dots}>
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to story ${i + 1}`}
              aria-current={i === active}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => scrollToIndex((active + 1) % items.length)}
          aria-label="Next story"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
