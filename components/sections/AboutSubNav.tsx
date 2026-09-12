'use client';
import { useEffect, useState } from 'react';
import styles from './AboutSubNav.module.css';

const LINKS = [
  { id: 'story', label: 'Story' },
  { id: 'build', label: 'What I Do' },
  { id: 'products', label: 'Products' },
  { id: 'dopmin', label: 'Dopmin' },
  { id: 'connect', label: 'Connect' },
];

export default function AboutSubNav() {
  const [active, setActive] = useState(LINKS[0].id);
  const [visible, setVisible] = useState(false);

  // Only reveal this bar once the hero section has scrolled out of view —
  // it stays hidden (and out of the layout, via position:fixed) while the
  // hero is on screen so it never sits on top of it.
  useEffect(() => {
    const hero = document.getElementById('about-hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0, rootMargin: '0px' }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(id);
  };

  return (
    <div className={styles.bar} data-visible={visible}>
      <nav className={styles.inner} aria-label="About page sections">
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={styles.link}
            data-active={active === link.id}
            onClick={(e) => handleClick(e, link.id)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
