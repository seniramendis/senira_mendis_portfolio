'use client';
import { useEffect, useRef } from 'react';
import { PERSONAL, HERO_TECH_WORDS } from '@/lib/data';
import { useMagnetic } from '@/hooks/useMagnetic';
import styles from './Hero.module.css';

const TOOLS = [
  { name: 'React',    icon: '⚛️', pos: styles.tool1 },
  { name: 'Next.js',  icon: '▲',  pos: styles.tool2 },
  { name: 'Node.js',  icon: '🟢', pos: styles.tool3 },
  { name: 'PHP',      icon: '🐘', pos: styles.tool4 },
  { name: 'MySQL',    icon: '🐬', pos: styles.tool5 },
  { name: 'Java',     icon: '☕', pos: styles.tool6 },
  { name: 'Kotlin',   icon: '📱', pos: styles.tool7 },
  { name: 'Docker',   icon: '🐳', pos: styles.tool8 },
];

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
  const subRef    = useRef<HTMLParagraphElement>(null);
  const actsRef   = useRef<HTMLDivElement>(null);
  const techRef   = useRef<HTMLDivElement>(null);
  const techWordRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);

  // Entrance animations — simple staggered fade/rise, Apple-style restraint
  useEffect(() => {
    const tag = tagRef.current;
    const head = headRef.current;
    const sub = subRef.current;
    const acts = actsRef.current;
    const tech = techRef.current;
    const scroll = scrollRef.current;
    const sticker = stickerRef.current;
    if (!tag || !head || !sub || !acts || !tech || !scroll || !sticker) return;

    const animate = (el: HTMLElement, delay: number) => {
      setTimeout(() => {
        el.style.transition = 'opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    };

    animate(tag, 100);
    animate(head, 250);
    animate(sub, 500);
    animate(acts, 700);
    animate(tech, 900);
    animate(sticker, 400);
    animate(scroll, 1300);
  }, []);

  // Tech-stack typewriter
  useEffect(() => {
    const el = techWordRef.current;
    if (!el) return;

    const TYPE_SPEED   = 70;
    const DELETE_SPEED = 40;
    const HOLD_TIME    = 1500;
    const START_DELAY  = 1800;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting  = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = HERO_TECH_WORDS[wordIndex];

      if (!deleting) {
        charIndex++;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          timeoutId = setTimeout(() => { deleting = true; tick(); }, HOLD_TIME);
          return;
        }
        timeoutId = setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % HERO_TECH_WORDS.length;
          timeoutId = setTimeout(tick, 350);
          return;
        }
        timeoutId = setTimeout(tick, DELETE_SPEED);
      }
    };

    const startId = setTimeout(tick, START_DELAY);
    return () => { clearTimeout(startId); clearTimeout(timeoutId); };
  }, []);

  return (
    <section className={styles.hero} style={{ borderBottom: 'none', padding: 0, paddingTop: 'var(--nav-h)' }}>
      <div className={styles.heroGrid}>
        <div className={styles.heroCenter}>
          <div className={styles.heroTag} ref={tagRef} style={{ opacity: 0, transform: 'translateY(12px)' }}>
            {PERSONAL.tagline}
          </div>

          <h1 className={styles.h1} ref={headRef} style={{ opacity: 0, transform: 'translateY(18px)' }}>
            Senira Mendis.
          </h1>

          <p className={styles.sub} ref={subRef} style={{ opacity: 0, transform: 'translateY(16px)' }}>
            {PERSONAL.sub}
          </p>

          <div className={styles.acts} ref={actsRef} style={{ opacity: 0, transform: 'translateY(14px)' }}>
            <MagBtn href="#work" className={`${styles.btnPrimary} mbtn mbtn-dark`}>View my work</MagBtn>
            <MagBtn href="#contact" className={`${styles.btnGhost} mbtn mbtn-light`}>Get in touch &rsaquo;</MagBtn>
          </div>

          <div className={styles.techRow} ref={techRef} style={{ opacity: 0, transform: 'translateY(10px)' }}>
            <span className={styles.techLabel}>Currently building with</span>
            <span className={styles.techWordWrap}><span className={styles.techWord} ref={techWordRef} /><span className={styles.techCursor} aria-hidden="true" /></span>
          </div>
        </div>

        <div className={styles.heroSticker} ref={stickerRef} style={{ opacity: 0, transform: 'translateY(24px)' }}>
          <div className={styles.stickerStage}>
            {TOOLS.map(t => (
              <span key={t.name} className={`${styles.toolBadge} ${t.pos}`}>
                <span className={styles.toolIcon}>{t.icon}</span> {t.name}
              </span>
            ))}
            <img
              src="https://res.cloudinary.com/dukv2otyn/image/upload/v1787525935/Senira_Mendis_Sticker_pzv1cv.png"
              alt="Senira Mendis"
              className={styles.stickerImg}
            />
          </div>
        </div>
      </div>

      <div className={styles.scrollInd} ref={scrollRef} style={{ opacity: 0 }}>
        <div className={styles.scrollTrack}><div className={styles.scrollFill} /></div>
        <span className={styles.scrollLbl}>Scroll</span>
      </div>
    </section>
  );
}
