'use client';

import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SKILLS } from '@/lib/data';
import styles from './SkillsCarousel.module.css';

type Logo = { src: 'skillicons'; slug: string } | { src: 'simple'; slug: string };

// Maps skill labels to a real, verifiable brand logo. skillicons.dev covers most
// dev tools; simple-icons (cdn.simpleicons.org) fills in a few it doesn't have.
// Concepts/methodologies with no actual brand mark (OOP, RBAC, Scrum Master, etc.)
// are intentionally left out and render as plain text.
const LOGO_MAP: Record<string, Logo | Logo[]> = {
  'Java': { src: 'skillicons', slug: 'java' },
  'PHP': { src: 'skillicons', slug: 'php' },
  'JavaScript': { src: 'skillicons', slug: 'js' },
  'Kotlin': { src: 'skillicons', slug: 'kotlin' },
  'C#': { src: 'skillicons', slug: 'cs' },
  'C++': { src: 'skillicons', slug: 'cpp' },
  'R': { src: 'simple', slug: 'r' },
  'HTML / CSS': [
    { src: 'skillicons', slug: 'html' },
    { src: 'skillicons', slug: 'css' },
  ],
  'Laravel': { src: 'skillicons', slug: 'laravel' },
  'React Native': { src: 'skillicons', slug: 'react' },
  'Node.js': { src: 'skillicons', slug: 'nodejs' },
  '.NET': { src: 'skillicons', slug: 'dotnet' },
  'Bootstrap': { src: 'skillicons', slug: 'bootstrap' },
  'jQuery': { src: 'skillicons', slug: 'jquery' },
  'Android Studio': { src: 'skillicons', slug: 'androidstudio' },
  'PostgreSQL': { src: 'skillicons', slug: 'postgres' },
  'MySQL': { src: 'skillicons', slug: 'mysql' },
  'MongoDB': { src: 'skillicons', slug: 'mongodb' },
  'Firebase': { src: 'skillicons', slug: 'firebase' },
  'Supabase': { src: 'skillicons', slug: 'supabase' },
  'SQLite': { src: 'skillicons', slug: 'sqlite' },
  'MSSQL': { src: 'simple', slug: 'microsoftsqlserver' },
  'Docker': { src: 'skillicons', slug: 'docker' },
  'Git': { src: 'skillicons', slug: 'git' },
  'Postman': { src: 'skillicons', slug: 'postman' },
  'Figma': { src: 'skillicons', slug: 'figma' },
  'Jira': { src: 'simple', slug: 'jira' },
  'ClickUp': { src: 'skillicons', slug: 'clickup' },
};

function logoUrl(logo: Logo) {
  return logo.src === 'skillicons'
    ? `https://skillicons.dev/icons?i=${logo.slug}&theme=light`
    : `https://cdn.simpleicons.org/${logo.slug}`;
}

// A distinct, muted tint per card — keeps the site's Apple-pastel language
// while giving each category its own identity as it drifts past.
const TINTS = [
  styles.tintBlue,
  styles.tintViolet,
  styles.tintMint,
  styles.tintPeach,
  styles.tintSlate,
  styles.tintRose,
];

// Constant drift speed, in pixels/second — Apple's own galleries move slowly
// and evenly, closer to a conveyor belt than a "slide".
const DRIFT_SPEED = 36;
// How long to wait after the user stops interacting before drifting resumes.
const RESUME_DELAY = 1800;

function renderCard(col: (typeof SKILLS)[number], tintClass: string, keyPrefix: string) {
  return (
    <div key={keyPrefix} className={`${styles.slide} ${tintClass}`}>
      <div className={styles.slideHead}>
        <h3 className={styles.slideLabel}>{col.category}</h3>
        <span className={styles.slideCount}>{col.items.length} tools</span>
      </div>

      <div className={styles.tileGrid}>
        {col.items.map(item => {
          const entry = LOGO_MAP[item];
          const list = Array.isArray(entry) ? entry : entry ? [entry] : [];
          return (
            <div key={item} className={styles.tile}>
              {list.length > 0 && (
                <div className={styles.tileIconWrap}>
                  {list.map(logo => (
                    <img
                      key={logo.slug}
                      src={logoUrl(logo)}
                      alt=""
                      className={styles.tileIcon}
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
              <span className={styles.tileLabel}>{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SkillsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Plain mutable refs, not state — the animation loop writes directly to the
  // DOM every frame, so nothing here should trigger a React re-render.
  const interacting = useRef(false);
  const inView = useRef(true);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearResumeTimer = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = null;
  };

  const pauseForInteraction = () => {
    interacting.current = true;
    clearResumeTimer();
  };

  const scheduleResume = (delay = RESUME_DELAY) => {
    clearResumeTimer();
    resumeTimer.current = setTimeout(() => {
      interacting.current = false;
    }, delay);
  };

  // Smoothly shift the track by a fixed amount (arrow buttons / keyboard),
  // fully independent of the ambient drift loop below.
  const nudge = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    pauseForInteraction();

    const card = track.querySelector<HTMLElement>(`.${styles.slide}`);
    const gap = 24;
    const distance = ((card?.offsetWidth ?? 400) + gap) * dir;

    const start = track.scrollLeft;
    const startTime = performance.now();
    const duration = 480;

    const frame = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      track.scrollLeft = start + distance * eased;
      if (t < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    scheduleResume();
  };

  // The ambient drift loop — a seamless conveyor belt. The track renders the
  // category list three times back to back; once we've scrolled past exactly
  // one copy's width we silently rewind by that width, which is invisible
  // because the next copy is pixel-identical.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      const setWidth = track.scrollWidth / 3;

      if (!reducedMotion && !interacting.current && inView.current && setWidth > 0) {
        track.scrollLeft += DRIFT_SPEED * dt;
      }

      // Wrap-around keeps the belt perpetually within the middle copy so
      // there's always a full set on either side to scroll into.
      if (setWidth > 0) {
        if (track.scrollLeft >= setWidth * 2) track.scrollLeft -= setWidth;
        else if (track.scrollLeft < setWidth) track.scrollLeft += setWidth;
      }

      raf = requestAnimationFrame(step);
    };

    // Start centered in the middle copy.
    const init = () => {
      const setWidth = track.scrollWidth / 3;
      track.scrollLeft = setWidth;
    };
    init();
    raf = requestAnimationFrame(step);

    const visibility = new IntersectionObserver(
      ([entry]) => { inView.current = entry.isIntersecting; },
      { threshold: 0.15 }
    );
    visibility.observe(track);

    const onEnter = () => pauseForInteraction();
    const onLeave = () => scheduleResume(500);
    const onDown = () => pauseForInteraction();
    const onUp = () => scheduleResume();
    const onWheel = () => { pauseForInteraction(); scheduleResume(); };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); nudge(1); }
    };

    track.addEventListener('pointerenter', onEnter);
    track.addEventListener('pointerleave', onLeave);
    track.addEventListener('pointerdown', onDown);
    track.addEventListener('pointerup', onUp);
    track.addEventListener('touchstart', onDown, { passive: true });
    track.addEventListener('touchend', onUp);
    track.addEventListener('wheel', onWheel, { passive: true });
    track.addEventListener('keydown', onKeyDown);

    const onResize = () => init();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      visibility.disconnect();
      clearResumeTimer();
      track.removeEventListener('pointerenter', onEnter);
      track.removeEventListener('pointerleave', onLeave);
      track.removeEventListener('pointerdown', onDown);
      track.removeEventListener('pointerup', onUp);
      track.removeEventListener('touchstart', onDown);
      track.removeEventListener('touchend', onUp);
      track.removeEventListener('wheel', onWheel);
      track.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.track} ref={trackRef} tabIndex={0} aria-label="Capabilities carousel">
        {['a', 'b', 'c'].map(copy =>
          SKILLS.map((col, i) => renderCard(col, TINTS[i % TINTS.length], `${copy}-${col.category}`))
        )}
      </div>

      <div className={styles.controls}>
        <button aria-label="Scroll capabilities left" className={styles.arrowBtn} onClick={() => nudge(-1)}>
          <ChevronLeft size={18} strokeWidth={2.25} />
        </button>
        <button aria-label="Scroll capabilities right" className={styles.arrowBtn} onClick={() => nudge(1)}>
          <ChevronRight size={18} strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}
