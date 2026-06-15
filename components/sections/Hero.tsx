'use client';
import { useEffect, useRef, useState } from 'react';
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
  const [activeSlide, setActiveSlide] = useState(0);

  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const tagRef     = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);
  const introRef   = useRef<HTMLDivElement>(null);
  const techRef    = useRef<HTMLDivElement>(null);
  const techWordRef = useRef<HTMLSpanElement>(null);
  const slideRef   = useRef<HTMLDivElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  const SKILLS = [
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'PHP', icon: '🐘' },
    { name: 'MySQL', icon: '🐬' },
    { name: 'Java', icon: '☕' },
    { name: 'Kotlin', icon: '📱' },
  ];

  // Auto-play Slideshow (5 seconds per slide)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  // Canvas grain field
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
    const slideBox = slideRef.current;
    const bottom = bottomRef.current;
    const scroll = scrollRef.current;
    if (!tag || !head || !intro || !tech || !slideBox || !bottom || !scroll) return;

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

    animate(intro, { opacity: '1', transform: 'translateY(0)' }, 1500);
    animate(tech,  { opacity: '1', transform: 'translateY(0)' }, 2150);

    // Fade in the new right-side container
    animate(slideBox, { opacity: '1', transform: 'translateY(0)' }, 2600);
    
    animate(bottom, { opacity: '1', transform: 'translateY(0)' }, 3050);
    animate(scroll, { opacity: '1' }, 3350);

    const onScroll = () => {
      if (head) head.style.transform = `translateY(${window.scrollY * -0.07}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Tech-stack typewriter
  useEffect(() => {
    const el = techWordRef.current;
    if (!el) return;

    const TYPE_SPEED   = 70;
    const DELETE_SPEED = 40;
    const HOLD_TIME    = 1500;
    const START_DELAY  = 2500;

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
      
      {/* Desktop Video */}
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

      {/* Mobile Video */}
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

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.glow} aria-hidden="true">
        <span className={styles.glowSpot} />
        <span className={styles.glowSpot} />
      </div>

      <canvas id="grain" ref={canvasRef} aria-hidden="true" className={styles.grain} />

      <div className={styles.heroTop}>
        <div className={styles.heroGrid}>
          
          {/* Left Column: Titles */}
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
          </div>

          {/* Right Column: Advanced Slideshow */}
          <div className={styles.heroRight} ref={slideRef} style={{ opacity: 0, transform: 'translateY(24px)' }}>
            
            {/* Slide 1: Description */}
            <div className={`${styles.slide} ${activeSlide === 0 ? styles.slideActive : ''}`}>
              <h3 className={styles.slideTitle}>
                <span className={styles.slideTitleText}>01 // The Mission</span>
              </h3>
              <p className={styles.sub}>{PERSONAL.sub}</p>
            </div>

            {/* Slide 2: Skills with Glowing Tech Chips */}
            <div className={`${styles.slide} ${activeSlide === 1 ? styles.slideActive : ''}`}>
              <h3 className={styles.slideTitle}>
                <span className={styles.slideTitleText}>02 // Core Stack</span>
              </h3>
              <div className={styles.skillsGrid}>
                {SKILLS.map((skill, index) => (
                  <div 
                    key={skill.name} 
                    className={styles.skillBadge}
                    style={{ animationDelay: `${index * 0.05}s` }} /* Staggered entrance */
                  >
                    <span className={styles.skillIcon}>{skill.icon}</span>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Slide 3: Contacts & Booking */}
            <div className={`${styles.slide} ${activeSlide === 2 ? styles.slideActive : ''}`}>
              <h3 className={styles.slideTitle}>
                <span className={styles.slideTitleText}>03 // Connect</span>
              </h3>
              <div className={styles.acts}>
                <MagBtn href="#work" className={styles.btnPrimary}>View my work ↓</MagBtn>
                <MagBtn href={PERSONAL.github} external className={styles.btnGhost}>GitHub ↗</MagBtn>
                <MagBtn href="#book" className={styles.btnPrimary}>Book Appointment 📅</MagBtn>
              </div>
            </div>

            {/* Story-style Progress Navigation */}
            <div className={styles.storyNav}>
              {[0, 1, 2].map((i) => (
                <div 
                  key={i} 
                  className={styles.storyTrack}
                  onClick={() => setActiveSlide(i)}
                >
                  <div 
                    className={`${styles.storyFill} ${
                      activeSlide === i ? styles.storyFillActive : 
                      activeSlide > i ? styles.storyFillComplete : ''
                    }`} 
                  />
                </div>
              ))}
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