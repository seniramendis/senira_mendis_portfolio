'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './ImageCarousel.module.css';

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const goTo = useCallback(
    (i: number) => setIndex((i + images.length) % images.length),
    [images.length]
  );
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (images.length < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, images.length]);

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className={styles.wrapper}>
        <img src={images[0]} alt={alt} className={styles.image} loading="lazy" />
      </div>
    );
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 50) {
      touchDeltaX.current < 0 ? next() : prev();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <div
      className={styles.wrapper}
      role="region"
      aria-roledescription="carousel"
      aria-label={alt}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={styles.track}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div className={styles.slide} key={src + i}>
            <img
              src={src}
              alt={`${alt} — ${i + 1} of ${images.length}`}
              className={styles.image}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={prev}
        aria-label="Previous image"
      >
        &larr;
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={next}
        aria-label="Next image"
      >
        &rarr;
      </button>

      <div className={styles.dots}>
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>

      <span className={styles.counter}>
        {index + 1} / {images.length}
      </span>
    </div>
  );
}
