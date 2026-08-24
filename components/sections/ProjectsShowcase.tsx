'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/data';
import styles from './ProjectsShowcase.module.css';

/* Vivid gradient tiles used as cover art for projects that don't have
   screenshots yet — keeps every card feeling designed, Apple-card style. */
const GRADIENTS = [
  'linear-gradient(140deg,#ff5f6d 0%,#ffc371 100%)',
  'linear-gradient(140deg,#667eea 0%,#764ba2 100%)',
  'linear-gradient(140deg,#0ba360 0%,#3cba92 100%)',
  'linear-gradient(140deg,#fc466b 0%,#3f5efb 100%)',
  'linear-gradient(140deg,#f7971e 0%,#ffd200 100%)',
  'linear-gradient(140deg,#00c6ff 0%,#0072ff 100%)',
  'linear-gradient(140deg,#a18cd1 0%,#fbc2eb 100%)',
  'linear-gradient(140deg,#ff9a9e 0%,#f45d5d 100%)',
  'linear-gradient(140deg,#4facfe 0%,#00f2fe 100%)',
  'linear-gradient(140deg,#43e97b 0%,#2ecc9c 100%)',
];

function gradientFor(index: number) {
  return GRADIENTS[index % GRADIENTS.length];
}

/* ─────────────────────────────────────────────
   Tracks which card is centred in a snap-scroll
   row so the caption above it can update live.
───────────────────────────────────────────── */
function useActiveIndex(ref: React.RefObject<HTMLDivElement>, count: number) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const measure = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      if (!kids.length) return;
      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let min = Infinity;
      kids.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(childCenter - center);
        if (dist < min) {
          min = dist;
          closest = i;
        }
      });
      setActive(closest);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    measure();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, count]);

  return active;
}

function scrollToChild(el: HTMLDivElement, index: number) {
  const child = el.children[index] as HTMLElement | undefined;
  if (!child) return;
  const target = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2;
  el.scrollTo({ left: target, behavior: 'smooth' });
}

/* ─────────────────────────────────────────────
   CAROUSEL 1 — Featured, large-format, one
   hero card at a time with a big interactive
   caption block above it (Apple Services style)
───────────────────────────────────────────── */
export function FeaturedCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const active = useActiveIndex(trackRef, projects.length);
  const current = projects[active] ?? projects[0];

  const go = useCallback(
    (dir: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      const next = Math.min(Math.max(active + dir, 0), projects.length - 1);
      scrollToChild(el, next);
    },
    [active, projects.length]
  );

  return (
    <div className={styles.block}>
      <div className={styles.captionBar}>
        <div className={styles.captionText}>
          <span className={styles.captionIndex}>
            {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <h3 key={`ft-${current.num}`} className={styles.captionTitle}>
            {current.title}
          </h3>
          {current.role && (
            <p key={`fr-${current.num}`} className={styles.captionRole}>
              {current.role}
            </p>
          )}
        </div>
        <div className={styles.captionActions}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => go(-1)}
            disabled={active === 0}
            aria-label="Previous project"
          >
            &#8249;
          </button>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => go(1)}
            disabled={active === projects.length - 1}
            aria-label="Next project"
          >
            &#8250;
          </button>
        </div>
      </div>

      <div className={styles.featuredTrack} ref={trackRef}>
        {projects.map((project, i) => (
          <Link
            key={project.num}
            href={`/projects/${project.num}`}
            className={styles.featuredCard}
          >
            <div className={styles.featuredMedia}>
              {project.images && project.images[0] ? (
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className={styles.featuredImg}
                  loading="lazy"
                />
              ) : (
                <div
                  className={styles.featuredPlaceholder}
                  style={{ background: gradientFor(i) }}
                >
                  <span>{project.num}</span>
                </div>
              )}
              <div className={styles.featuredGradientOverlay} />
              <div className={styles.featuredOverlayText}>
                <span className={styles.overlayTag}>Project {project.num}</span>
                <span className={styles.overlayTitle}>{project.title}</span>
                <span className={styles.overlayCta}>
                  View project <span className={styles.overlayArrow}>&rarr;</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.dots}>
        {projects.map((p, i) => (
          <button
            key={p.num}
            type="button"
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            aria-label={`Go to ${p.title}`}
            onClick={() => trackRef.current && scrollToChild(trackRef.current, i)}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CAROUSEL 2 — Compact, multi-up row of every
   project, its own independent live caption
───────────────────────────────────────────── */
function CompactCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const active = useActiveIndex(trackRef, projects.length);
  const current = projects[active] ?? projects[0];

  const go = useCallback(
    (dir: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      const next = Math.min(Math.max(active + dir, 0), projects.length - 1);
      scrollToChild(el, next);
    },
    [active, projects.length]
  );

  return (
    <div className={styles.block}>
      <div className={styles.captionBar}>
        <div className={styles.captionText}>
          <span className={styles.captionIndexSmall}>All projects</span>
          <h3 key={`ct-${current.num}`} className={styles.captionTitleSmall}>
            {current.title}
          </h3>
          <p key={`cd-${current.num}`} className={styles.captionDesc}>
            {current.description}
          </p>
        </div>
        <div className={styles.captionActions}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => go(-1)}
            disabled={active === 0}
            aria-label="Previous project"
          >
            &#8249;
          </button>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => go(1)}
            disabled={active === projects.length - 1}
            aria-label="Next project"
          >
            &#8250;
          </button>
        </div>
      </div>

      <div className={styles.compactTrack} ref={trackRef}>
        {projects.map((project, i) => (
          <Link
            key={project.num}
            href={`/projects/${project.num}`}
            className={`${styles.compactCard} ${i === active ? styles.compactCardActive : ''}`}
          >
            <div className={styles.compactMedia}>
              {project.images && project.images[0] ? (
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className={styles.compactImg}
                  loading="lazy"
                />
              ) : (
                <div
                  className={styles.compactPlaceholder}
                  style={{ background: gradientFor(i + 3) }}
                >
                  <span>{project.num}</span>
                </div>
              )}
            </div>
            <div className={styles.compactInfo}>
              <span className={styles.compactNum}>Project {project.num}</span>
              <h4 className={styles.compactTitle}>{project.title}</h4>
              <div className={styles.compactTags}>
                {project.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className={styles.compactTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.dots}>
        {projects.map((p, i) => (
          <button
            key={p.num}
            type="button"
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            aria-label={`Go to ${p.title}`}
            onClick={() => trackRef.current && scrollToChild(trackRef.current, i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsShowcase({ projects }: { projects: Project[] }) {
  return (
    <div className={styles.showcase}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionKicker}>Featured work</span>
        <h2 className={styles.sectionHeading}>
          A closer look at <em>what I&rsquo;ve built.</em>
        </h2>
      </div>
      <FeaturedCarousel projects={projects} />

      <div className={styles.sectionHead}>
        <span className={styles.sectionKicker}>The full archive</span>
        <h2 className={styles.sectionHeading}>
          Every project, <em>start to finish.</em>
        </h2>
      </div>
      <CompactCarousel projects={projects} />
    </div>
  );
}
