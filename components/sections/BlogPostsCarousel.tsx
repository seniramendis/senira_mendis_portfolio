'use client';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import styles from './BlogPostsCarousel.module.css';

export type CarouselPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
};

// Apple's own editorial cards (App Store "Today" stories, Apple Card
// spending categories, apple.com feature tiles) lean on a vivid
// abstract gradient per story rather than a literal photo whenever
// there's no photoshoot to draw from. Posts here don't have cover art
// yet, so each card gets one of these — picked deterministically from
// the slug so a given post always wears the same color, not a random
// one on every reload.
const GRADIENTS = [
  'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
  'linear-gradient(135deg, #3ba9ff 0%, #6a5bff 100%)',
  'linear-gradient(135deg, #7c5cff 0%, #ff6ec7 100%)',
  'linear-gradient(135deg, #00c6a2 0%, #37d67a 100%)',
  'linear-gradient(135deg, #ffb238 0%, #ff5f6d 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00d4c8 100%)',
];

function gradientFor(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  return GRADIENTS[hash % GRADIENTS.length];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Apple-style, swipeable/arrow-driven card carousel for the post
 *  index — same visual grammar as the tech-news photo carousel
 *  (rounded cards, bottom-weighted content, blurred pill controls),
 *  but manual rather than auto-advancing since these are things people
 *  stop to read rather than a ticking headline feed. */
export default function BlogPostsCarousel({ posts }: { posts: CarouselPost[] }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>('[data-card]');
    const card = cards[i];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    setActive(i);
  }, []);

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

  if (posts.length === 0) return null;

  return (
    <div className={styles.carousel}>
      <div className={styles.track} ref={trackRef} onScroll={onScroll}>
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={styles.card}
            style={{ background: gradientFor(post.slug) }}
            data-card
          >
            <div className={styles.cardTop}>
              <span className={styles.cardMeta}>
                <span>{formatDate(post.date)}</span>
                <span>&middot;</span>
                <span>{post.readTime} min read</span>
              </span>
            </div>

            <h3 className={styles.cardTitle}>{post.title}</h3>
            <p className={styles.cardExcerpt}>{post.excerpt}</p>

            <div className={styles.cardBottom}>
              <div className={styles.tags}>
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <span className={styles.readLink}>
                Read post <span className={styles.arrow}>&rarr;</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {posts.length > 1 && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => scrollToIndex((active - 1 + posts.length) % posts.length)}
            aria-label="Previous post"
          >
            &larr;
          </button>
          <div className={styles.dots}>
            {posts.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to post ${i + 1}`}
                aria-current={i === active}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => scrollToIndex((active + 1) % posts.length)}
            aria-label="Next post"
          >
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
