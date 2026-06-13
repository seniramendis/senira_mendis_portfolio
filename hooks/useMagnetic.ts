'use client';
import { useEffect, useRef } from 'react';

export function useMagnetic() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const btn = ref.current;
    if (!btn) return;

    const onMove = (e: MouseEvent) => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * 0.35;
      const dy = (e.clientY - r.top  - r.height / 2) * 0.35;
      btn.style.transform = `translate(${dx}px,${dy}px)`;
    };

    const onLeave = () => {
      btn.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
      btn.style.transform  = 'translate(0,0)';
      setTimeout(() => { btn.style.transition = ''; }, 500);
    };

    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
    return () => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return ref;
}
