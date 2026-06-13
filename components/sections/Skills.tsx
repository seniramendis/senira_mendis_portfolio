'use client';
import { useEffect, useRef } from 'react';
import { SKILLS } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';
import styles from './Skills.module.css';

export default function Skills() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sc = scrollerRef.current;
    if (!sc) return;
    let down = false, sx = 0, sl = 0;

    const onDown = (e: MouseEvent) => {
      down = true; sc.style.cursor = 'grabbing';
      sx = e.pageX - sc.offsetLeft; sl = sc.scrollLeft;
    };
    const onUp   = () => { down = false; sc.style.cursor = 'grab'; };
    const onMove = (e: MouseEvent) => {
      if (!down) return;
      e.preventDefault();
      sc.scrollLeft = sl - (e.pageX - sc.offsetLeft - sx) * 1.2;
    };

    sc.style.cursor = 'grab';
    sc.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    sc.addEventListener('mouseleave', onUp);
    sc.addEventListener('mousemove', onMove);

    let tSx = 0, tSl = 0;
    const onTouchStart = (e: TouchEvent) => { tSx = e.touches[0].pageX; tSl = sc.scrollLeft; };
    const onTouchMove  = (e: TouchEvent) => { sc.scrollLeft = tSl - (e.touches[0].pageX - tSx); };
    sc.addEventListener('touchstart', onTouchStart);
    sc.addEventListener('touchmove', onTouchMove);

    return () => {
      sc.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      sc.removeEventListener('mouseleave', onUp);
      sc.removeEventListener('mousemove', onMove);
      sc.removeEventListener('touchstart', onTouchStart);
      sc.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <section id="skills" className={styles.section}>
      <div className="si">
        <Reveal><div className="sec-label">Capabilities</div></Reveal>
        <Reveal>
          <h2 className={styles.heading}>
            A wide stack, applied with <em>precision</em><br />and purpose.
          </h2>
        </Reveal>
      </div>
      <div className={styles.outer}>
        <div className={styles.scroller} ref={scrollerRef} id="skills-scroller">
          {SKILLS.map(col => (
            <div key={col.category} className={styles.col}>
              <div className={styles.cat}>{col.category}</div>
              <div className={styles.pills}>
                {col.items.map(item => (
                  <span key={item} className={`${styles.pill} sk-pill`}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
