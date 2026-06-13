import { LEADERSHIP } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';
import styles from './Leadership.module.css';

export default function Leadership() {
  return (
    <section className={styles.section}>
      <div className="si">
        <Reveal><div className="sec-label">Leadership &amp; Volunteering</div></Reveal>
        <div className={styles.grid}>
          {LEADERSHIP.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className={styles.card}>
                <span className={styles.icon} aria-hidden="true">{item.icon}</span>
                <div className={styles.title}>{item.title}</div>
                <p className={styles.body}>{item.body}</p>
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
