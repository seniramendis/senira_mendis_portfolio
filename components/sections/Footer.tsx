import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.copy}>© 2026 Senira Mendis. All rights reserved.</span>
      <Link href="/contact" className={styles.contactLink}>Contact</Link>
      <span className={styles.name}>Senira Mendis</span>
    </footer>
  );
}
