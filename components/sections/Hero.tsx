'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PERSONAL, STATS } from '@/lib/data';
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
  const subRef     = useRef<HTMLDivElement>(null);
  const stageRef   = useRef<HTMLDivElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  // Crossfade between the two profile photos
  const [activeImg, setActiveImg] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActiveImg(i => (i === 0 ? 1 : 0)), 5000);
    return () => clearInterval(id);
  }, []);

  // Canvas grain field (light particles, sits above the video)
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

  // Entrance animations (pure CSS/JS, no GSAP dependency on server)
  useEffect(() => {
    const tag    = tagRef.current;
    const head   = headRef.current;
    const sub    = subRef.current;
    const stage  = stageRef.current;
    const bottom = bottomRef.current;
    const scroll = scrollRef.current;
    if (!tag || !head || !sub || !stage || !bottom || !scroll) return;

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
    animate(sub,    { opacity: '1', transform: 'translateY(0)' }, 500);
    animate(stage,  { opacity: '1', transform: 'translateY(0) scale(1)' }, 350);
    animate(bottom, { opacity: '1', transform: 'translateY(0)' }, 650);
    animate(scroll, { opacity: '1' }, 1000);

    // Parallax on scroll
    const onScroll = () => {
      if (head) head.style.transform = `translateY(${window.scrollY * -0.07}px)`;
      if (stage) stage.style.transform = `translateY(${window.scrollY * 0.04}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className={styles.hero} style={{ borderBottom: 'none', padding: 0, paddingTop: 'var(--nav-h)' }}>
      {/* Background video */}
      <video
        className={styles.bgVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/Home_Hero_Page/1.jpg"
      >
        <source src="/images/Home_Hero_Page/hero-bg.mp4" type="video/mp4" />
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

            <div className={styles.subRow} ref={subRef} id="hero-sub" style={{ opacity: 0, transform: 'translateY(16px)' }}>
              <p className={styles.sub}>{PERSONAL.sub}</p>
              <div className={styles.acts}>
                <MagBtn href="#work" className={styles.btnPrimary}>View my work ↓</MagBtn>
                <MagBtn href={PERSONAL.github} external className={styles.btnGhost}>GitHub ↗</MagBtn>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div
              className={styles.imageStage}
              ref={stageRef}
              style={{ opacity: 0, transform: 'translateY(24px) scale(.97)' }}
            >
              <div className={styles.ring} aria-hidden="true" />

              <div className={styles.frameMain}>
                <div className={`${styles.frameImg} ${activeImg === 0 ? styles.show : ''}`}>
                  <Image src="/images/Home_Hero_Page/1.jpg" alt="Senira Mendis" fill sizes="380px" priority />
                </div>
                <div className={`${styles.frameImg} ${activeImg === 1 ? styles.show : ''}`}>
                  <Image src="/images/Home_Hero_Page/2.jpg" alt="Senira Mendis at the beach" fill sizes="380px" />
                </div>
                <div className={styles.frameShade} aria-hidden="true" />

                <div className={styles.badge}>
                  <span className={styles.badgeDot} />
                  Available
                </div>

                <div className={styles.caption}>Hi, I&apos;m Senira 👋</div>
              </div>

              <div className={styles.frameAccent}>
                <div className={`${styles.frameImg} ${activeImg === 1 ? styles.show : ''}`}>
                  <Image src="/images/Home_Hero_Page/1.jpg" alt="" fill sizes="200px" aria-hidden="true" />
                </div>
                <div className={`${styles.frameImg} ${activeImg === 0 ? styles.show : ''}`}>
                  <Image src="/images/Home_Hero_Page/2.jpg" alt="" fill sizes="200px" aria-hidden="true" />
                </div>
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