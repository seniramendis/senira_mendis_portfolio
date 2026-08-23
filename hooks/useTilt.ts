'use client';
import { useEffect, useRef } from 'react';

/**
 * Subtle 3D tilt that follows the cursor, like Apple's product-image hover.
 * Returns a ref to attach to the element that should tilt.
 */
export function useTilt(maxTilt = 10) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onEnter = () => {
      el.style.transition = 'transform .15s ease-out';
    };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform =
        `perspective(1000px) rotateY(${px * maxTilt}deg) rotateX(${-py * maxTilt}deg) scale(1.04)`;
    };

    const onLeave = () => {
      el.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
      el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [maxTilt]);

  return ref;
}
