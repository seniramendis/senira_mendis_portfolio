import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import ContactForm from '@/components/sections/ContactForm';
import SocialIcons from '@/components/ui/SocialIcons';
import Reveal from '@/components/ui/Reveal';
import { PERSONAL } from '@/lib/data';
import styles from './contact.module.css';

export const metadata: Metadata = {
  title: 'Contact — Senira Mendis',
  description:
    'Get in touch with Senira Mendis for software development, web, mobile or backend engineering work, or full-time opportunities.',
};

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <Nav />

      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          <span className={styles.arrowBack}>&larr;</span> Back to Home
        </Link>

        <Reveal>
          <span className={styles.heroKicker}>Get in touch</span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className={styles.title}>
            Let&apos;s build <em>something great together.</em>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className={styles.heroSub}>
            Actively seeking Software Developer, Web Developer, Android Developer and Backend
            Developer roles — open to full-time positions, internships and collaborative
            projects. Send a message and I&apos;ll reply as soon as I can.
          </p>
        </Reveal>

        <div className={styles.splitLayout}>
          <Reveal delay={120} className={styles.formCol}>
            <div className={styles.formCard}>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={200} className={styles.infoCol}>
            <div className={styles.infoCard}>
              <p className={styles.infoLabel}>Direct contact</p>

              <a href={`mailto:${PERSONAL.email}`} className={styles.infoLink}>
                <span className={styles.infoLinkLabel}>Email</span>
                <span className={styles.infoLinkValue}>{PERSONAL.email}</span>
              </a>

              <a href={PERSONAL.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                <span className={styles.infoLinkLabel}>WhatsApp</span>
                <span className={styles.infoLinkValue}>{PERSONAL.whatsappDisplay}</span>
              </a>

              <div className={styles.infoLink}>
                <span className={styles.infoLinkLabel}>Location</span>
                <span className={styles.infoLinkValue}>{PERSONAL.location}</span>
              </div>

              {PERSONAL.available && (
                <div className={styles.availability}>
                  <span className={styles.availabilityDot} />
                  Open to opportunities
                </div>
              )}

              <div className={styles.socialsWrap}>
                <p className={styles.infoLabel}>Elsewhere</p>
                <SocialIcons />
              </div>

              <Link href="/#book" className={styles.bookLink}>
                Prefer to talk? Book a call &rsaquo;
              </Link>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
