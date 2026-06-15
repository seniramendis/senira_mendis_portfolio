'use client';
import { useEffect, useRef } from 'react';
import { PERSONAL, STATS, HERO_TECH_WORDS } from '@/lib/data';
import { useMagnetic } from '@/hooks/useMagnetic';
import { useCounter } from '@/hooks/useCounter';
import styles from './Hero.module.css';

function StatCounter({ num, label }: { num: number; label: string }) {
  const { ref, display } = useCounter(num);
  return (
    <div className={styles.stat}>
      <span className={styles.statNum} ref={ref}>{display}</span>
      <span className={styles.statLbl}>{label}</span>
    </div>
  );
}

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
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const tagRef     = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);
  const introRef   = useRef<HTMLDivElement>(null);
  const techRef    = useRef<HTMLDivElement>(null);
  const techWordRef = useRef<HTMLSpanElement>(null);
  const subRef     = useRef<HTMLDivElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  // Canvas grain field (light particles)
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d')!;
    let W: number, H: number;
    const pts: Particle[] = [];
    let raf: number;

    class Particle {
      x = 0; y = 0; r = 0; vx = 0; vy = 0; a = 0;
      constructor() { this.reset(); }
      reset() {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.r  = Math.random() * 1.4 + 0.4;
        this.vx = (Math.random() - 0.5) * 0.28;
        this.vy = (Math.random() - 0.5) * 0.28;
        this.a  = Math.random() * 0.18 + 0.04;
      }
      step() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${this.a})`;
        ctx.fill();
      }
    }

    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 70; i++) pts.push(new Particle());

    const lines = () => {
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 115) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.05 * (1 - d / 115)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => { p.step(); p.draw(); });
      lines();
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  // Entrance animations
  useEffect(() => {
    const tag    = tagRef.current;
    const head   = headRef.current;
    const intro  = introRef.current;
    const tech   = techRef.current;
    const sub    = subRef.current;
    const bottom = bottomRef.current;
    const scroll = scrollRef.current;
    if (!tag || !head || !intro || !tech || !sub || !bottom || !scroll) return;

    const inners = head.querySelectorAll<HTMLSpanElement>('.inner');

    const animate = (el: HTMLElement, props: Partial<CSSStyleDeclaration>, delay: number) => {
      setTimeout(() => {
        el.style.transition = 'opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1)';
        Object.assign(el.style, props);
      }, delay);
    };

    animate(tag, { opacity: '1', transform: 'translateY(0)' }, 50);
    inners.forEach((inner, i) => {
      setTimeout(() => {
        inner.style.transition = `transform 1.1s cubic-bezier(.22,1,.36,1)`;
        inner.style.transform = 'translateY(0%)';
      }, 100 + i * 120);
    });

    // After the headline has fully settled, introduce the "Hey, I'm Senira" line
    animate(intro, { opacity: '1', transform: 'translateY(0)' }, 1500);
    // Then reveal the tech-stack typewriter row
    animate(tech,  { opacity: '1', transform: 'translateY(0)' }, 2150);

    // Remaining content follows once the intro beats have had time to be read
    animate(sub,    { opacity: '1', transform: 'translateY(0)' }, 2900);
    animate(bottom, { opacity: '1', transform: 'translateY(0)' }, 3050);
    animate(scroll, { opacity: '1' }, 3350);

    // Parallax on scroll
    const onScroll = () => {
      if (head) head.style.transform = `translateY(${window.scrollY * -0.07}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Tech-stack typewriter — cycles through HERO_TECH_WORDS
  useEffect(() => {
    const el = techWordRef.current;
    if (!el) return;

    const TYPE_SPEED   = 70;   // ms per character while typing
    const DELETE_SPEED = 40;   // ms per character while deleting
    const HOLD_TIME    = 1500; // ms to pause once a word is fully typed
    const START_DELAY  = 2500; // sync with techRow reveal (2150ms + settle)

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
      
      {/* Desktop Video (Hidden on mobile) */}
      <video
        className={`${styles.bgVideo} ${styles.desktopVideo}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/Home_Hero_Page/hero-poster.jpg" 
      >
        <source src="https://res.cloudinary.com/dukv2otyn/video/upload/f_auto,q_auto/v1781517951/hero-bg_anzt23.mp4" type="video/mp4" />
      </video>

      {/* Mobile Video (Hidden on desktop) */}
      <video
        className={`${styles.bgVideo} ${styles.mobileVideo}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/Home_Hero_Page/hero-poster.jpg" 
      >
        <source src="https://res.cloudinary.com/dukv2otyn/video/upload/f_auto,q_auto/v1781518706/hero-bg-mobile_gxv4wm.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient overlay for readability */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Soft drifting color glow */}
      <div className={styles.glow} aria-hidden="true">
        <span className={styles.glowSpot} />
        <span className={styles.glowSpot} />
      </div>

      <canvas id="grain" ref={canvasRef} aria-hidden="true" className={styles.grain} />

      <div className={styles.heroTop}>
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <div className={styles.heroTag} ref={tagRef} style={{ opacity: 0, transform: 'translateY(12px)' }}>
              <span className={styles.tagDot} />
              {PERSONAL.tagline}
            </div>

            <h1 className={styles.h1} id="hero-h1" ref={headRef}>
              <span className={styles.line}><span className="inner" style={{ display: 'block', transform: 'translateY(110%)' }}>Building software</span></span>
              <span className={styles.line}><span className="inner" style={{ display: 'block', transform: 'translateY(110%)' }}>that <em>solves real-world</em></span></span>
              <span className={styles.line}><span className="inner" style={{ display: 'block', transform: 'translateY(110%)' }}>problems.</span></span>
            </h1>

            <div className={styles.introLine} ref={introRef} style={{ opacity: 0, transform: 'translateY(14px)' }}>
              <span className={styles.wave} aria-hidden="true">👋</span>
              <span>Hey, I&apos;m <span className={styles.introName}>Senira Mendis</span></span>
            </div>

            <div className={styles.techRow} ref={techRef} style={{ opacity: 0, transform: 'translateY(10px)' }}>
              <span className={styles.techLabel}>Currently building with</span>
              <span className={styles.techWordWrap}>
                <span className={styles.techWord} ref={techWordRef} />
                <span className={styles.techCursor} aria-hidden="true" />
              </span>
            </div>

            <div className={styles.subRow} ref={subRef} id="hero-sub" style={{ opacity: 0, transform: 'translateY(16px)' }}>
              <p className={styles.sub}>{PERSONAL.sub}</p>
              <div className={styles.acts}>
                <MagBtn href="#work" className={styles.btnPrimary}>View my work ↓</MagBtn>
                <MagBtn href={PERSONAL.github} external className={styles.btnGhost}>GitHub ↗</MagBtn>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.heroBottom} ref={bottomRef} id="hero-bottom" style={{ opacity: 0, transform: 'translateY(12px)' }}>
        {STATS.map(s => <StatCounter key={s.label} {...s} />)}
      </div>

      <div className={styles.scrollInd} ref={scrollRef} id="scroll-ind" style={{ opacity: 0 }}>
        <div className={styles.scrollTrack}><div className={styles.scrollFill} /></div>
        <span className={styles.scrollLbl}>Scroll</span>
      </div>
    </section>
  );
}