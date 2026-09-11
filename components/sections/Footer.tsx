import Link from 'next/link';
import { PERSONAL } from '@/lib/data';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.colTitle}>Explore</div>
            <div className={styles.colList}>
              <Link href="/#about">About</Link>
              <Link href="/#skills">Skills</Link>
              <Link href="/#services">Services</Link>
              <Link href="/projects">Work</Link>
              <Link href="/#book">Book a call</Link>
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>Get in touch</div>
            <div className={styles.colList}>
              <Link href="/contact">Contact</Link>
              <a href={`mailto:${PERSONAL.email}`}>{PERSONAL.email}</a>
              <a href={PERSONAL.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>Elsewhere</div>
            <div className={styles.colList}>
              <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={PERSONAL.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href={PERSONAL.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>Legal</div>
            <div className={styles.colList}>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/cookie-policy">Cookie Policy</Link>
              <span>{PERSONAL.location}</span>
            </div>
          </div>
        </div>

        <hr className={styles.hr} />

        <div className={styles.legalBar}>
          <span className={styles.copy}>
            Copyright &copy; {year} {PERSONAL.name}. All rights reserved.
          </span>
          <div className={styles.legalLinks}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
