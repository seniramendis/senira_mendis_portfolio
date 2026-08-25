'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useMagnetic } from '@/hooks/useMagnetic';
import styles from './Nav.module.css';

function MagBtn({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  const ref = useMagnetic();
  return (
    <Link ref={ref as any} href={href} className={styles.navBtn} data-mag onClick={onClick}>
      {children}
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape, and auto-close if the viewport is resized back to desktop
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <nav className={styles.nav} id="main-nav">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={close}>Senira Mendis</Link>
        <ul className={styles.links} data-open={open}>
          {/* Added the slash so these links work universally across all pages */}
          <li><Link href="/#about" onClick={close}>About</Link></li>
          <li><Link href="/#skills" onClick={close}>Skills</Link></li>

          {/* The new dedicated projects page link */}
          <li><Link href="/projects" onClick={close}>Work</Link></li>

          <li><Link href="/#book" onClick={close}>Book a call</Link></li>

          <li>
            <MagBtn href="/#contact" onClick={close}>Get in touch</MagBtn>
          </li>
        </ul>
        <button
          className={styles.hamburger}
          aria-label="Menu"
          aria-expanded={open}
          data-open={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
