import { PROJECTS } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';
import Link from 'next/link';
import styles from './Projects.module.css';

export default function Projects() {
  // Only display the top 4 projects on the home page
  const featuredProjects = PROJECTS.slice(0, 4);

  return (
    <section id="work">
      <div className="si">
        <Reveal><div className="sec-label">Selected Work</div></Reveal>
        <Reveal>
          <h2 className={styles.heading}>
            Featured projects &amp;<br /><em>real-world builds.</em>
          </h2>
        </Reveal>

        <div className={styles.list}>
          {featuredProjects.map((p) => (
            // Changed from <a> to <Link> to use Next.js routing to the dynamic page
            <Link key={p.num} href={`/projects/${p.num}`} className={styles.item}>
              <span className={styles.num}>{p.num}</span>
              <div>
                {p.role && <div className={styles.roleTag}>{p.role}</div>}
                <div className={styles.title}>{p.title}</div>
                <p className={styles.desc}>{p.description}</p>
                <div className={styles.tags}>
                  {p.tags.map(t => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
              <span className={styles.arr}>↗</span>
            </Link>
          ))}
        </div>

        <Reveal delay={200}>
          <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'center' }}>
            <Link href="/projects" className="mbtn mbtn-dark" style={{ padding: '16px 32px', fontSize: '14px' }}>
              View Full Archive ↗
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}