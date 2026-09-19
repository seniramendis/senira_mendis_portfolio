'use client';
import { useEffect, useRef } from 'react';
import styles from './ScrambleText.module.css';

/**
 * Loops through `words`, scrambling each one into the next.
 *
 * Options mirror the data-attributes of the original snippet:
 *   data-scramble-words  -> words
 *   data-scramble-chars  -> chars
 *   data-scramble-speed  -> speed  (1 = normal, <1 slower, >1 faster)
 *   data-scramble-hold   -> hold   (seconds a word stays readable)
 *   data-scramble="loop" -> always loops
 *
 * Notes
 * - The server renders `words[0]` as real text, so SEO / no-JS / first paint
 *   all show a proper word (no random characters, no hydration mismatch).
 * - Animation writes straight to the DOM (no React re-render per frame).
 * - Pauses while off-screen / tab hidden, and is disabled entirely for
 *   users who prefer reduced motion.
 * - Screen readers get the full word list once instead of a stream of noise.
 */

type Props = {
  words: string[];
  chars?: string;
  speed?: number;
  hold?: number;
  className?: string;
};

const DEFAULT_CHARS = '/!<>-_\\[]{}=+*^?#';

type Slot = {
  from: string;
  to: string;
  start: number;
  end: number;
  ch: string;
  nextSwap: number;
};

export default function ScrambleText({
  words,
  chars = DEFAULT_CHARS,
  speed = 0.8,
  hold = 1.5,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || words.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const pool = chars.length ? chars : DEFAULT_CHARS;
    const holdMs = Math.max(0, hold) * 1000;
    const rand = () => pool[Math.floor(Math.random() * pool.length)];

    let idx = 0;
    let phase: 'hold' | 'scramble' = 'hold';
    let phaseStart = performance.now();
    let duration = 0;
    let slots: Slot[] = [];
    let raf = 0;

    el.textContent = words[0];

    const buildSlots = (from: string, to: string): Slot[] => {
      const len = Math.max(from.length, to.length);
      duration = (250 + len * 40) / Math.max(0.1, speed);
      return Array.from({ length: len }, (_, i) => {
        const start = Math.random() * 0.35 * duration;
        return {
          from: from[i] ?? '',
          to: to[i] ?? '',
          start,
          end: start + (0.35 + Math.random() * 0.3) * duration,
          ch: '',
          nextSwap: 0,
        };
      });
    };

    const render = (t: number) => {
      let out = '';
      for (const s of slots) {
        if (t >= s.end) {
          out += s.to;
        } else if (t >= s.start) {
          if (s.to === ' ') {
            out += ' ';
          } else {
            if (!s.ch || t >= s.nextSwap) {
              s.ch = rand();
              s.nextSwap = t + 40 + Math.random() * 40;
            }
            out += s.ch;
          }
        } else {
          out += s.from;
        }
      }
      el.textContent = out;
    };

    const tick = (now: number) => {
      if (phase === 'hold') {
        if (now - phaseStart >= holdMs) {
          const from = words[idx];
          idx = (idx + 1) % words.length;
          slots = buildSlots(from, words[idx]);
          phase = 'scramble';
          phaseStart = now;
        }
      } else {
        const t = now - phaseStart;
        if (t >= duration) {
          el.textContent = words[idx];
          phase = 'hold';
          phaseStart = now;
        } else {
          render(t);
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // Only animate while the word is actually on screen.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        phaseStart = performance.now();
        start();
      } else {
        stop();
      }
    });
    io.observe(el);

    return () => {
      io.disconnect();
      stop();
    };
  }, [words, chars, speed, hold]);

  return (
    <>
      <span className={styles.srOnly}>{words.join(', ')}</span>
      <span ref={ref} className={`${styles.word} ${className ?? ''}`} aria-hidden="true">
        {words[0]}
      </span>
    </>
  );
}
