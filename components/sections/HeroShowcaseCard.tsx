'use client';
import Link from 'next/link';
import { PROJECTS } from '@/lib/data';
import styles from './HeroShowcaseCard.module.css';

// Featured build shown in the hero — a real shipped business platform,
// not a personal photo. Swap the num to feature a different project.
const FEATURED = PROJECTS.find((p) => p.num === '04');

/** First clause of a title, e.g. "AgriLease — Agricultural Machinery Platform" -> "AgriLease". */
function shortTitle(title: string) {
  return title.split('—')[0].trim();
}

export default function HeroShowcaseCard() {
  if (!FEATURED) return null;

  return (
    <Link
      href={`/projects/${FEATURED.num}`}
      className={styles.frame}
      aria-label={`View ${shortTitle(FEATURED.title)} case study`}
    >
      {FEATURED.images?.[0] && (
        <img src={FEATURED.images[0]} alt={FEATURED.title} className={styles.img} />
      )}
      <div className={styles.caption}>
        <span className={styles.captionTitle}>{shortTitle(FEATURED.title)}</span>
        <span className={styles.captionSub}>{FEATURED.role}</span>
      </div>
    </Link>
  );
}
