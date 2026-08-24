'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/data';
import styles from './ProjectsStickerRow.module.css';

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

const TILTS = [-4, 3, -3, 5, -2, 4, -5, 2, -3, 3];

function statusFor(project: Project) {
  if (!project.href || project.href === '#') {
    return { label: 'Case study', archived: true };
  }
  if (project.href.includes('github.com')) {
    return { label: 'View on GitHub', archived: true };
  }
  return { label: 'Live project', archived: false };
}

export default function ProjectsStickerRow({ projects }: { projects: Project[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const interval = setInterval(() => {
      if (!isPaused && row) {
        const maxScroll = row.scrollWidth - row.clientWidth;
        if (maxScroll <= 0) return;

        const firstItem = row.children[0] as HTMLElement | null;
        const gap = parseInt(getComputedStyle(row).gap) || 28;
        const step = firstItem ? firstItem.offsetWidth + gap : 320;

        if (row.scrollLeft >= maxScroll - 5) {
          row.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          row.scrollBy({ left: step, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className={styles.wrap}>
      <div
        className={styles.row}
        ref={rowRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {projects.map((project, i) => {
          const status = statusFor(project);
          const isInternal = !project.href || project.href === '#' || project.href.includes('github.com');
          return (
            <Link
              key={project.num}
              href={isInternal ? `/projects/${project.num}` : `/projects/${project.num}`}
              className={styles.item}
            >
              <div
                className={styles.sticker}
                style={{ ['--r' as any]: `${TILTS[i % TILTS.length]}deg` }}
              >
                {project.images && project.images[0] ? (
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className={styles.frameImg}
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={styles.framePlaceholder}
                    style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                  >
                    {project.num}
                  </div>
                )}
              </div>

              <div className={styles.caption}>
                <span className={styles.capNum}>Project {project.num}</span>
                <h3 className={styles.capTitle}>{project.title}</h3>
                <div className={styles.capStatus}>
                  <span className={`${styles.statusDot} ${status.archived ? styles.isArchived : ''}`} />
                  {status.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
