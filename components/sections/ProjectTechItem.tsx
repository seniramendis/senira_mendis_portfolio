'use client';
import { useState } from 'react';
import { getTechIconUrl } from '@/lib/techIcons';
import styles from '@/app/projects/projects.module.css';

/* Single tech-stack row item: real brand logo (Simple Icons API) + plain
   text label — no border, no chip, no background. If the icon 404s we
   just quietly fall back to text-only rather than showing a broken image. */
export default function ProjectTechItem({ tag }: { tag: string }) {
  const iconUrl = getTechIconUrl(tag);
  const [failed, setFailed] = useState(false);

  return (
    <div className={styles.techItem}>
      {iconUrl && !failed && (
        <img
          src={iconUrl}
          alt=""
          aria-hidden="true"
          className={styles.techIcon}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      <span className={styles.techLabel}>{tag}</span>
    </div>
  );
}
