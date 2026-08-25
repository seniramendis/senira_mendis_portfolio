'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SERVICES } from '@/lib/data';
import { ICONS } from './serviceIcons';
import styles from './ServicesCarousel.module.css';

const AUTOPLAY_MS = 5000;

export default function ServicesCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const total = SERVICES.length;

  const goTo = useCallback((i: number) => {
    setIndex(((i % total) + total) % total);
    setProgressKey((k) => k + 1); // restart the timer bar
  }, [total]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay timer — advances one slide every AUTOPLAY_MS, paused on interaction
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % total);
      setProgressKey((k) => k + 1);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, total]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setPaused(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    const delta = touchDeltaX.current;
    const SWIPE_THRESHOLD = 40;
    if (delta > SWIPE_THRESHOLD) prev();
    else if (delta < -SWIPE_THRESHOLD) next();
    else setProgressKey((k) => k + 1); // no swipe — just restart timer
    touchStartX.current = null;
    touchDeltaX.current = 0;
    // resume autoplay shortly after the user lets go
    setTimeout(() => setPaused(false), 300);
  };

  return (
    <div className={styles.carousel}>
      <div
        className={styles.viewport}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <article className={styles.slide} key={s.id}>
                <div className={styles.iconWrap}>
                  <Icon />
                </div>
                <div className={styles.kicker}>{s.kicker}</div>
                <h3 className={styles.headline}>
                  {s.headline} <em>{s.headlineEm}</em>
                </h3>
                <p className={styles.body}>{s.body}</p>
                <ul className={styles.tags}>
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>

      <div className={styles.controls}>
        {SERVICES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={styles.dot}
            data-active={i === index}
            aria-label={`Show ${s.kicker}`}
            onClick={() => { setPaused(true); goTo(i); setTimeout(() => setPaused(false), 300); }}
          >
            {i === index && (
              <span
                key={progressKey}
                className={styles.dotProgress}
                style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
