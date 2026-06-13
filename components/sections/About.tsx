'use client';
import { PERSONAL, ABOUT_STATS, EDUCATION } from '@/lib/data';
import { useCounter } from '@/hooks/useCounter';
import { useMagnetic } from '@/hooks/useMagnetic';
import Reveal from '@/components/ui/Reveal';
import styles from './About.module.css';

function StatNum({ num, suffix, label, delay = 0 }: { num: number; suffix: string; label: string; delay?: number }) {
  const { ref, display } = useCounter(num, suffix);
  return (
    <Reveal delay={delay}>
      <div className={styles.statItem}>
        <div className={styles.sNum} ref={ref}>{display}</div>
        <div className={styles.sLbl}>{label}</div>
      </div>
    </Reveal>
  );
}

function MagLink({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useMagnetic();
  return (
    <a ref={ref} href={href} target="_blank" rel="noopener noreferrer"
       className="mbtn mbtn-light" style={{ fontSize: '12px', padding: '10px 20px' }} data-mag>
      {children}
    </a>
  );
}

export default function About() {
  return (
    <section id="about">
      <div className="si">
        <Reveal><div className="sec-label">About</div></Reveal>

        <Reveal>
          <h2 className={styles.statement}>
            Undergraduate engineer — <em>driven by curiosity,</em><br />
            craft, and real-world impact.
          </h2>
        </Reveal>

        <div className={styles.cols}>
          <div>
            <Reveal>
              <p className={styles.body}>
                I&apos;m Senira Mendis, a Computer Software Engineering student at ICBT Campus / Cardiff Metropolitan University,
                based in Mount Lavinia, Colombo. My work spans full-stack web applications, native Android development,
                and complex backend systems.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.body}>
                Beyond code, I bring leadership — acting as Scrum Master and Product Owner in Agile teams,
                bridging technology and business goals. I care about systems that last, not just demos that impress.
              </p>
            </Reveal>

            <div className={styles.statGrid}>
              {ABOUT_STATS.map((s, i) => (
                <StatNum key={s.label} num={s.num} suffix={s.suffix} label={s.label} delay={i * 70} />
              ))}
            </div>
          </div>

          <Reveal delay={100}>
            <div>
              <div className={styles.eduList}>
                {EDUCATION.map(e => (
                  <div key={e.school} className={styles.eduRow}>
                    <div>
                      <div className={styles.eduSchool}>{e.school}</div>
                      <div className={styles.eduDeg}>{e.degree}</div>
                    </div>
                    <div className={styles.eduYr}>{e.year}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '40px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <MagLink href={PERSONAL.linkedin}>LinkedIn ↗</MagLink>
                <MagLink href={PERSONAL.github}>GitHub ↗</MagLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
