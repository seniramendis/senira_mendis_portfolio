import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import SocialIcons from '@/components/ui/SocialIcons';
import { PERSONAL } from '@/lib/data';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className={styles.section} style={{ borderBottom: 'none' }}>
      <div className={styles.inner}>
        <Reveal><div className={styles.kicker}>Get in touch</div></Reveal>

        <Reveal delay={60}>
          <h2 className={styles.heading}>
            Let&apos;s build something <em>great together.</em>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className={styles.sub}>
            Actively seeking Software Developer, Web Developer, Android Developer and Backend
            Developer roles — open to full-time positions, internships and collaborative projects.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className={styles.ctaRow}>
            <Link href="/contact" className="mbtn mbtn-dark">Send a message</Link>
            <a href={`mailto:${PERSONAL.email}`} className="mbtn mbtn-light">Email me →</a>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <hr className={styles.divider} />
          <div className={styles.quickLinks}>
            <a href={`mailto:${PERSONAL.email}`}>{PERSONAL.email}</a>
            <span>&middot;</span>
            <a href={PERSONAL.whatsapp} target="_blank" rel="noopener noreferrer">
              {PERSONAL.whatsappDisplay}
            </a>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className={styles.socialWrap}>
            <p className={styles.socialLabel}>Direct Contact</p>
            <SocialIcons />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
