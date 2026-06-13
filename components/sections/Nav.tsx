'use client';
import Link from 'next/link';
import { useMagnetic } from '@/hooks/useMagnetic';
import styles from './Nav.module.css';

function MagBtn({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useMagnetic();
  return (
    <a ref={ref} href={href} className={`${styles.navBtn} mbtn mbtn-dark`} data-mag>
      {children}
    </a>
  );
}

export default function Nav() {
  return (
    <nav className={styles.nav} id="main-nav">
      <Link href="/" className={styles.logo}>Senira Mendis</Link>
      <ul className={styles.links}>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#work">Work</a></li>
        <li>
          <MagBtn href="#contact">Get in touch</MagBtn>
        </li>
      </ul>
      <button className={styles.hamburger} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}
