'use client';
import { useEffect, useRef } from 'react';
import { PERSONAL } from '@/lib/data';
import { useMagnetic } from '@/hooks/useMagnetic';
import HeroProjectFan from './HeroProjectFan';
import styles from './Hero.module.css';

function MagBtn({ href, children, external, className }: {
  href: string; children: React.ReactNode; external?: boolean; className: string;
}) {
  const ref = useMagnetic();
  return (
    <a ref={ref} href={href} className={className} data-mag
       {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  );
}

export default function Hero() {
  const tagRef    = useRef<HTMLDivElement>(null);
  const headRef   = useRef<HTMLHeadingElement>(null);
  const actsRef   = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);

  // Entrance animations — simple staggered fade/rise, Apple-style restraint
  useEffect(() => {
    const tag = tagRef.current;
    const head = headRef.current;
    const acts = actsRef.current;
    const sticker = stickerRef.current;
    if (!tag || !head || !acts || !sticker) return;

    const animate = (el: HTMLElement, delay: number) => {
      setTimeout(() => {
        el.style.transition = 'opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    };

    animate(tag, 100);
    animate(head, 250);
    animate(acts, 500);
    animate(sticker, 400);
  }, []);

  return (
    <section className={styles.hero} style={{ borderBottom: 'none', padding: 0 }}>
      <div className={styles.heroBg} />
      <div className={styles.heroBgOverlay} />

      <div className={styles.heroGrid}>
        <div className={styles.heroCenter}>
          <div className={styles.heroMeta} ref={tagRef} style={{ opacity: 0, transform: 'translateY(12px)' }} />

          <h1 className={styles.h1} ref={headRef} style={{ opacity: 0, transform: 'translateY(18px)' }}>
            {PERSONAL.headline.map((line, i) => (
              <span className={styles.h1Line} key={i}>{line}</span>
            ))}
          </h1>

          <div className={styles.acts} ref={actsRef} style={{ opacity: 0, transform: 'translateY(14px)' }}>
            <MagBtn href="#work" className={`${styles.btnPrimary} mbtn mbtn-dark`}>View my work</MagBtn>
            <MagBtn href="/contact" className={`${styles.btnGhost} mbtn mbtn-light`}>Start a project &rsaquo;</MagBtn>
          </div>
        </div>

        <div className={styles.heroSticker} ref={stickerRef} style={{ opacity: 0, transform: 'translateY(24px)' }}>
          <HeroProjectFan />
        </div>
      </div>
    </section>
  );
}
