import Reveal from '@/components/ui/Reveal';
import SocialIcons from '@/components/ui/SocialIcons';
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
            <div className="mt-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">
                Direct Contact
              </p>
              <SocialIcons />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}