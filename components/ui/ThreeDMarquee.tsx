'use client';

import styles from './ThreeDMarquee.module.css';

interface ThreeDMarqueeProps {
  /** Image paths (local, from /public) to tile across the marquee. */
  images: string[];
  /** How many vertical columns to render. */
  columns?: number;
  /** How many tiles (before duplication for looping) each column gets. */
  tilesPerColumn?: number;
}

export function ThreeDMarquee({
  images,
  columns = 4,
  tilesPerColumn = 5,
}: ThreeDMarqueeProps) {
  if (!images.length) return null;

  const cols = Array.from({ length: columns }, (_, colIndex) =>
    Array.from(
      { length: tilesPerColumn },
      (_, i) => images[(colIndex * tilesPerColumn + i) % images.length]
    )
  );

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.grid}>
        {cols.map((col, i) => (
          <div
            key={i}
            className={`${styles.column} ${i % 2 === 0 ? styles.scrollDown : styles.scrollUp}`}
            style={{ animationDuration: `${22 + i * 6}s` }}
          >
            {/* duplicate the column so the loop is seamless */}
            {[...col, ...col].map((src, j) => (
              <div className={styles.tile} key={j}>
                <img src={src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
