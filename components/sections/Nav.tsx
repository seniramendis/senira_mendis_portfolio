'use client';
import Link from 'next/link';
import { useMagnetic } from '@/hooks/useMagnetic';
import styles from './Nav.module.css';

function MagBtn({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useMagnetic();
  return (
    <Link ref={ref as any} href={href} className={`${styles.navBtn} mbtn mbtn-dark`} data-mag>
      {children}
    </Link>
  );
}

export default function Nav() {
  return (
    <nav className={styles.nav} id="main-nav">
      <Link href="/" className={styles.logo}>Senira Mendis</Link>
      <ul className={styles.links}>
        {/* Added the slash so these links work universally across all pages */}
        <li><Link href="/#about">About</Link></li>
        <li><Link href="/#skills">Skills</Link></li>
        
        {/* The new dedicated projects page link */}
        <li><Link href="/projects">Work</Link></li>
        
        <li>
          <MagBtn href="/#contact">Get in touch</MagBtn>
        </li>
      </ul>
      <button className={styles.hamburger} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}