'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SERVICES } from '@/lib/data';
import styles from './WhatIDoCarousel.module.css';

export default function WhatIDoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      el.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
    };
  }, [updateEdges]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(`.${styles.card}`) as HTMLElement | null;
    const amount = (card?.offsetWidth ?? 300) + 20;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.arrows}>
        <button
          type="button"
          className={styles.arrowBtn}
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label="Previous"
        >
          <ChevronLeft size={18} strokeWidth={2} />
        </button>
        <button
          type="button"
          className={styles.arrowBtn}
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label="Next"
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>

      <div className={styles.track} ref={trackRef}>
        {SERVICES.map((s) => (
          <article className={styles.card} key={s.id}>
            <div className={styles.cardTop}>
              <span className={styles.cardKicker}>{s.kicker}</span>
              <h3 className={styles.cardHeadline}>
                {s.headline} <em>{s.headlineEm}</em>
              </h3>
              <p className={styles.cardDesc}>{s.body}</p>
            </div>
            <div className={styles.cardArt}>
              <Image
                src={s.image}
                alt={s.kicker}
                fill
                sizes="(max-width: 640px) 78vw, 320px"
                className={styles.cardImg}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
