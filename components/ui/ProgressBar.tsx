'use client';
import { useEffect, useRef } from 'react';

export default function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const pct = Math.min(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100,
        100
      );
      el.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div id="pb" ref={ref} />;
}
