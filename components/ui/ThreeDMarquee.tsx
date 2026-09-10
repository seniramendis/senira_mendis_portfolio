'use client';

import { useEffect, useState } from 'react';
import styles from './ThreeDMarquee.module.css';

interface ThreeDMarqueeProps {
  /** Image paths (local, from /public) to tile across the marquee. */
  images: string[];
  /** How many vertical columns to render (desktop default). */
  columns?: number;
  /** How many tiles (before duplication for looping) each column gets (desktop default). */
  tilesPerColumn?: number;
}

// Breakpoints mirror the ones in ThreeDMarquee.module.css. Keeping the
// column count in sync with the CSS grid-template-columns is what actually
// matters here — if React renders N columns but the CSS grid only defines
// M < N tracks, the extra column(s) wrap onto a phantom row and the whole
// rotated/perspective grid looks broken. So columns are computed responsively
// in JS and passed to the grid via inline style, rather than relying on CSS
// alone to reshape a fixed number of DOM nodes.
function getResponsiveConfig(width: number, baseColumns: number, baseTiles: number) {
  if (width <= 560) {
    // Phones: fewer, larger columns + more tiles per column so the taller
    // (portrait) viewport is fully covered without blank gaps.
    return { columns: Math.min(baseColumns, 2), tilesPerColumn: Math.max(baseTiles, 7) };
  }
  if (width <= 900) {
    return { columns: Math.min(baseColumns, 3), tilesPerColumn: Math.max(baseTiles, 6) };
  }
  return { columns: baseColumns, tilesPerColumn: baseTiles };
}

function useResponsiveMarqueeConfig(baseColumns: number, baseTiles: number) {
  // Default matches the desktop/base props so SSR output is deterministic;
  // it's corrected immediately on mount once the real viewport is known.
  const [config, setConfig] = useState(() => ({ columns: baseColumns, tilesPerColumn: baseTiles }));

  useEffect(() => {
    const update = () => setConfig(getResponsiveConfig(window.innerWidth, baseColumns, baseTiles));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [baseColumns, baseTiles]);

  return config;
}

export function ThreeDMarquee({
  images,
  columns = 4,
  tilesPerColumn = 5,
}: ThreeDMarqueeProps) {
  const { columns: effectiveColumns, tilesPerColumn: effectiveTiles } =
    useResponsiveMarqueeConfig(columns, tilesPerColumn);

  if (!images.length) return null;

  const cols = Array.from({ length: effectiveColumns }, (_, colIndex) =>
    Array.from(
      { length: effectiveTiles },
      (_, i) => images[(colIndex * effectiveTiles + i) % images.length]
    )
  );

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${effectiveColumns}, 1fr)` }}>
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
