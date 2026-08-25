'use client';
import Reveal from '@/components/ui/Reveal';
import SocialIcons from '@/components/ui/SocialIcons';
import GithubContributions from '@/components/ui/GithubContributions';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="si">
        <Reveal><div className="sec-label">About</div></Reveal>

        <Reveal>
          <h2 className={styles.statement}>
            Undergraduate engineer — <em>driven by curiosity,</em><br />
            craft, and real-world impact.
          </h2>
        </Reveal>

        <div className={styles.cols}>
          <div className={styles.bioCol}>
            <Reveal>
              <p className={styles.body}>
                I&apos;m Senira Mendis, a full-stack developer based in Mount Lavinia, Colombo.
                My work spans full-stack web applications, native Android development,
                and complex backend systems.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.body}>
                Beyond code, I bring leadership — acting as Scrum Master and Product Owner in Agile teams,
                bridging technology and business goals. I care about systems that last, not just demos that impress.
              </p>
            </Reveal>

          </div>

          <Reveal delay={100} className={styles.infoCol}>
            <div>
              <div className={styles.eduList}>
                <div className={styles.eduRow}>
                  <div>
                    <div className={styles.eduSchool}>Available now</div>
                    <div className={styles.eduDeg}>Software · Web · Android · Backend roles</div>
                  </div>
                  <div className={styles.eduYr}>LK / Remote</div>
                </div>
              </div>
              <div style={{ marginTop: '40px' }}>
                <p className="text-sm font-semibold text-gray-900">Connect & Explore</p>
                <SocialIcons />
              </div>
            </div>
          </Reveal>

          <Reveal delay={140} className={styles.githubWide}>
            <GithubContributions />
          </Reveal>
        </div>
      </div>
    </section>
  );
}