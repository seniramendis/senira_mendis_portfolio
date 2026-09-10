'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from '@/components/ui/Reveal';
import styles from './IdeaToProduct.module.css';

export default function IdeaToProduct() {
  const sectionRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const curtain = curtainRef.current;
    const blob = blobRef.current;
    if (!section || !curtain || !blob) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      gsap.set(curtain, { xPercent: 105 });
      gsap.set(blob, { scaleX: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(curtain, { xPercent: 0 });
      gsap.set(blob, { scaleX: 1.18, transformOrigin: '0% 50%' });

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 25%',
          scrub: 0.6,
        },
      })
        .to(curtain, { xPercent: 105, ease: 'power2.inOut', duration: 1 }, 0)
        .to(blob, { scaleX: 1, ease: 'power2.out', duration: 1 }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="idea-to-product" className={styles.section} ref={sectionRef}>
      <svg
        className={styles.blob}
        ref={blobRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 L60,0 C68,8 50,16 58,26 C66,36 48,44 56,54 C64,64 46,72 55,82 C60,88 52,94 58,100 L0,100 Z"
          fill="#fff"
        />
      </svg>

      <div className={styles.wrap}>
        <Reveal className={styles.visualCol}>
          <img
            className={styles.visual}
            src="https://res.cloudinary.com/dukv2otyn/image/upload/v1789056548/mobile_ui_mockuo_serv_foo5bz.png"
            alt="Hand holding a phone with a mobile UI mockup of a product design"
            loading="lazy"
          />
        </Reveal>

        <div className={styles.textCol}>
          <Reveal><div className={styles.kicker}>Process</div></Reveal>
          <Reveal delay={80}>
            <h2 className={styles.heading}>
              From idea <em>to product.</em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className={styles.sub}>
              I design and engineer digital experiences across web, mobile and backend systems.
            </p>
          </Reveal>
        </div>
      </div>

      <div className={styles.curtain} ref={curtainRef} aria-hidden="true" />
    </section>
  );
}
