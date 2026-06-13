import { PROJECTS } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';
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

        <div className={styles.list}>
          {PROJECTS.map((p) => (
            <a key={p.num} href={p.href} target="_blank" rel="noopener noreferrer"
               className={styles.item}>
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
