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
  const toggle = () => setOpen((v) => !v);

  return (
    <nav className={styles.nav} id="main-nav">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={close}>Senira Mendis</Link>

        <ul className={styles.links}>
          {/* Added the slash so these links work universally across all pages */}
          <li><Link href="/#about" onClick={close}>About</Link></li>
          <li><Link href="/#skills" onClick={close}>Skills</Link></li>

          <li><Link href="/#services" onClick={close}>Services</Link></li>

          {/* The new dedicated projects page link */}
          <li><Link href="/projects" onClick={close}>Work</Link></li>

          <li><Link href="/#book" onClick={close}>Book a call</Link></li>

          <li>
            <MagBtn href="/#contact" onClick={close}>Get in touch</MagBtn>
          </li>
        </ul>

        <button
          type="button"
          className={styles.hamburger}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          data-open={open}
          onClick={toggle}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Backdrop — tapping it closes the menu, Apple-menu style */}
      <div
        className={styles.backdrop}
        data-open={open}
        onClick={close}
        aria-hidden="true"
      />

      {/* Dropdown panel */}
      <div className={styles.mobilePanel} id="mobile-menu" data-open={open}>
        <ul className={styles.mobileList}>
          <li style={{ transitionDelay: open ? '60ms' : '0ms' }}>
            <Link href="/#about" onClick={close}><span>About</span><i /></Link>
          </li>
          <li style={{ transitionDelay: open ? '100ms' : '0ms' }}>
            <Link href="/#skills" onClick={close}><span>Skills</span><i /></Link>
          </li>
          <li style={{ transitionDelay: open ? '140ms' : '0ms' }}>
            <Link href="/#services" onClick={close}><span>Services</span><i /></Link>
          </li>
          <li style={{ transitionDelay: open ? '180ms' : '0ms' }}>
            <Link href="/projects" onClick={close}><span>Work</span><i /></Link>
          </li>
          <li style={{ transitionDelay: open ? '220ms' : '0ms' }}>
            <Link href="/#book" onClick={close}><span>Book a call</span><i /></Link>
          </li>
        </ul>
        <div className={styles.mobileCta} style={{ transitionDelay: open ? '260ms' : '0ms' }}>
          <Link href="/#contact" onClick={close} className={styles.mobileCtaBtn}>
            Get in touch
          </Link>
        </div>
      </div>
    </nav>
  );
}
