'use client';
import { PROJECTS } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';
import Link from 'next/link';
import ProjectsStickerRow from './ProjectsStickerRow';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section id="work">
      <div className="si">
        <Reveal><div className="sec-label">Selected Work</div></Reveal>
        <Reveal>
          <h2 className={styles.heading}>
            Featured projects &amp;<br /><em>real-world builds.</em>
          </h2>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <ProjectsStickerRow projects={PROJECTS} />
      </Reveal>

      <div className="si">
        <Reveal delay={200}>
          <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
            <Link href="/projects" className="mbtn mbtn-dark" style={{ padding: '16px 32px', fontSize: '14px' }}>
              View Full Archive ↗
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
