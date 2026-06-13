'use client';
import { useEffect, useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set hidden state in JS only (never in CSS)
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'none';

    const show = () => {
      setTimeout(() => {
        el.style.transition = `opacity .75s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .75s cubic-bezier(.22,1,.36,1) ${delay}ms`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 20);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
    );

    // If already in viewport on mount, show immediately
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      show();
    } else {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
