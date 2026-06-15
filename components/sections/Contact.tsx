import { PERSONAL } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className={styles.section} style={{ borderBottom: 'none' }}>
      <div className={styles.inner}>
        <Reveal>
          <h2 className={styles.heading}>
            Let&apos;s build<br />something<br /><em>great together.</em>
          </h2>
        </Reveal>
        <div>
          <Reveal delay={100}>
            <p className={styles.sub}>
              Actively seeking Software Developer, Web Developer, Android Developer, and Backend Developer roles.
              Open to full-time positions, internships, and collaborative projects.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className={styles.links}>
              <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <div>
                  <span className={styles.linkLbl}>Connect on</span>
                  LinkedIn — Senira Mendis
                </div>
                <span className={styles.arr}>↗</span>
              </a>
              <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <div>
                  <span className={styles.linkLbl}>Explore code on</span>
                  GitHub — seniramendis
                </div>
                <span className={styles.arr}>↗</span>
              </a>
              <a href={`mailto:${PERSONAL.email}`} className={styles.link}>
                <div>
                  <span className={styles.linkLbl}>Send a message</span>
                  Open to remote &amp; Colombo-based roles
                </div>
                <span className={styles.arr}>↗</span>
              </a>
              <a href={PERSONAL.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <div>
                  <span className={styles.linkLbl}>Chat on</span>
                  WhatsApp — {PERSONAL.whatsappDisplay}
                </div>
                <span className={styles.arr}>↗</span>
              </a>
              <a href={PERSONAL.instagram} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <div>
                  <span className={styles.linkLbl}>Follow on</span>
                  Instagram — @senira._mendis
                </div>
                <span className={styles.arr}>↗</span>
              </a>
              <a href={PERSONAL.facebook} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <div>
                  <span className={styles.linkLbl}>Connect on</span>
                  Facebook — Senira Mendis
                </div>
                <span className={styles.arr}>↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
