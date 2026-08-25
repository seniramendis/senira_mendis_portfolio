import type { Service } from '@/lib/data';
import styles from './Services.module.css';

/* ─────────────────────────────────────────────
   Custom "mockup" illustrations — no stock photos,
   no external images. Every device/browser/phone
   frame below is hand-built SVG so it inherits the
   brand palette, stays crisp at any size, and never
   breaks or needs licensing.
───────────────────────────────────────────── */

export function CodeMockup() {
  return (
    <svg viewBox="0 0 640 380" className={styles.heroSvg} aria-hidden="true">
      <defs>
        <linearGradient id="svc-code-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eef4ff" />
          <stop offset="100%" stopColor="#dce9ff" />
        </linearGradient>
        <linearGradient id="svc-code-line1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0071e3" />
          <stop offset="100%" stopColor="#5ac8fa" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="640" height="380" rx="24" fill="url(#svc-code-bg)" />
      <circle cx="540" cy="60" r="90" fill="#0071e3" opacity="0.12" />
      <circle cx="70" cy="330" r="70" fill="#0071e3" opacity="0.10" />

      <g transform="translate(64,48)">
        <rect x="0" y="0" width="512" height="284" rx="14" fill="#1d1d1f" />
        <rect x="0" y="0" width="512" height="34" rx="14" fill="#2c2c2e" />
        <circle cx="20" cy="17" r="5" fill="#ff5f57" />
        <circle cx="38" cy="17" r="5" fill="#febc2e" />
        <circle cx="56" cy="17" r="5" fill="#28c840" />
        <rect x="200" y="11" width="112" height="12" rx="6" fill="#3a3a3c" />

        <g transform="translate(28,58)" fontFamily="ui-monospace, monospace">
          <rect x="0" y="0" width="26" height="10" rx="3" fill="url(#svc-code-line1)" />
          <rect x="34" y="0" width="70" height="10" rx="3" fill="#98989d" />
          <rect x="112" y="0" width="120" height="10" rx="3" fill="#5ac8fa" opacity="0.85" />
          <rect x="18" y="28" width="150" height="10" rx="3" fill="#98989d" opacity="0.85" />
          <rect x="176" y="28" width="60" height="10" rx="3" fill="#ff9f0a" opacity="0.85" />
          <rect x="18" y="56" width="90" height="10" rx="3" fill="#bf5af2" opacity="0.85" />
          <rect x="116" y="56" width="150" height="10" rx="3" fill="#98989d" opacity="0.6" />
          <rect x="36" y="84" width="200" height="10" rx="3" fill="#30d158" opacity="0.8" />
          <rect x="18" y="112" width="40" height="10" rx="3" fill="#98989d" opacity="0.6" />
          <rect x="66" y="112" width="180" height="10" rx="3" fill="url(#svc-code-line1)" opacity="0.9" />
          <rect x="0" y="140" width="26" height="10" rx="3" fill="#98989d" opacity="0.5" />
          <rect x="34" y="140" width="130" height="10" rx="3" fill="#5ac8fa" opacity="0.7" />
          <rect x="18" y="168" width="220" height="10" rx="3" fill="#98989d" opacity="0.4" />
        </g>
      </g>
    </svg>
  );
}

/* Browser-window mockup — a real landing page layout */
export function WebIcon() {
  return (
    <svg viewBox="0 0 320 240" className={styles.icon} aria-hidden="true">
      <defs>
        <linearGradient id="svc-web-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eaf4ff" />
          <stop offset="100%" stopColor="#dcecff" />
        </linearGradient>
        <linearGradient id="svc-web-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0071e3" />
          <stop offset="100%" stopColor="#5ac8fa" />
        </linearGradient>
        <filter id="svc-web-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#0071e3" floodOpacity="0.18" />
        </filter>
      </defs>

      <rect x="0" y="0" width="320" height="240" rx="22" fill="url(#svc-web-bg)" />
      <circle cx="270" cy="40" r="46" fill="#0071e3" opacity="0.10" />

      <g filter="url(#svc-web-shadow)">
        <rect x="26" y="30" width="268" height="178" rx="12" fill="#ffffff" />
        {/* chrome bar */}
        <rect x="26" y="30" width="268" height="26" rx="12" fill="#f0f0f2" />
        <circle cx="42" cy="43" r="4" fill="#ff5f57" />
        <circle cx="56" cy="43" r="4" fill="#febc2e" />
        <circle cx="70" cy="43" r="4" fill="#28c840" />
        <rect x="130" y="38" width="130" height="10" rx="5" fill="#ffffff" stroke="#e2e2e6" />

        {/* nav row */}
        <circle cx="42" cy="72" r="5" fill="url(#svc-web-g)" />
        <rect x="230" y="68" width="46" height="8" rx="4" fill="url(#svc-web-g)" />

        {/* hero copy */}
        <rect x="42" y="94" width="120" height="12" rx="4" fill="#1d1d1f" opacity="0.85" />
        <rect x="42" y="112" width="90" height="12" rx="4" fill="#1d1d1f" opacity="0.55" />
        <rect x="42" y="136" width="72" height="20" rx="10" fill="url(#svc-web-g)" />

        {/* hero image block */}
        <rect x="196" y="92" width="80" height="72" rx="10" fill="url(#svc-web-g)" opacity="0.16" />
        <rect x="210" y="112" width="52" height="8" rx="4" fill="url(#svc-web-g)" opacity="0.55" />
        <rect x="210" y="126" width="36" height="8" rx="4" fill="url(#svc-web-g)" opacity="0.35" />

        {/* footer cards */}
        <rect x="42" y="176" width="70" height="20" rx="6" fill="#f0f0f2" />
        <rect x="122" y="176" width="70" height="20" rx="6" fill="#f0f0f2" />
        <rect x="202" y="176" width="70" height="20" rx="6" fill="#f0f0f2" />
      </g>
    </svg>
  );
}

/* Monitor + dashboard mockup */
export function DataIcon() {
  return (
    <svg viewBox="0 0 320 240" className={styles.icon} aria-hidden="true">
      <defs>
        <linearGradient id="svc-data-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eafaf0" />
          <stop offset="100%" stopColor="#dff6ff" />
        </linearGradient>
        <linearGradient id="svc-data-g" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#30d158" />
          <stop offset="100%" stopColor="#5ac8fa" />
        </linearGradient>
        <filter id="svc-data-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#30d158" floodOpacity="0.16" />
        </filter>
      </defs>

      <rect x="0" y="0" width="320" height="240" rx="22" fill="url(#svc-data-bg)" />
      <circle cx="60" cy="200" r="50" fill="#30d158" opacity="0.10" />

      {/* monitor stand */}
      <rect x="148" y="184" width="24" height="18" rx="3" fill="#c9c9cc" />
      <rect x="122" y="200" width="76" height="10" rx="5" fill="#b6b6ba" />

      <g filter="url(#svc-data-shadow)">
        <rect x="40" y="30" width="240" height="152" rx="12" fill="#1d1d1f" />
        <rect x="52" y="42" width="216" height="128" rx="6" fill="#ffffff" />

        {/* header row */}
        <circle cx="66" cy="56" r="4" fill="#30d158" />
        <rect x="76" y="52" width="56" height="8" rx="4" fill="#1d1d1f" opacity="0.7" />
        <rect x="208" y="50" width="48" height="16" rx="8" fill="#30d158" opacity="0.14" />
        <rect x="214" y="55" width="36" height="6" rx="3" fill="#128a3e" />

        {/* bars + trend line */}
        <line x1="66" y1="150" x2="256" y2="150" stroke="#e2e2e6" strokeWidth="1.5" />
        <rect x="74" y="120" width="18" height="30" rx="3" fill="url(#svc-data-g)" opacity="0.55" />
        <rect x="104" y="100" width="18" height="50" rx="3" fill="url(#svc-data-g)" opacity="0.75" />
        <rect x="134" y="80" width="18" height="70" rx="3" fill="url(#svc-data-g)" />
        <rect x="164" y="112" width="18" height="38" rx="3" fill="url(#svc-data-g)" opacity="0.65" />
        <rect x="194" y="94" width="18" height="56" rx="3" fill="url(#svc-data-g)" opacity="0.8" />
        <rect x="224" y="104" width="18" height="46" rx="3" fill="url(#svc-data-g)" opacity="0.6" />
        <path d="M74 132 L104 112 L134 90 L164 122 L194 100 L224 116"
          fill="none" stroke="#0071e3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        <circle cx="134" cy="90" r="4" fill="#0071e3" />
      </g>
    </svg>
  );
}

/* Browser → automated pipeline → database mockup */
export function ScrapeIcon() {
  return (
    <svg viewBox="0 0 320 240" className={styles.icon} aria-hidden="true">
      <defs>
        <linearGradient id="svc-scrape-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff3e8" />
          <stop offset="100%" stopColor="#ffe9ee" />
        </linearGradient>
        <linearGradient id="svc-scrape-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff9f0a" />
          <stop offset="100%" stopColor="#ff375f" />
        </linearGradient>
        <filter id="svc-scrape-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#ff375f" floodOpacity="0.16" />
        </filter>
      </defs>

      <rect x="0" y="0" width="320" height="240" rx="22" fill="url(#svc-scrape-bg)" />
      <circle cx="260" cy="50" r="46" fill="#ff375f" opacity="0.10" />

      {/* source browser windows */}
      <g filter="url(#svc-scrape-shadow)">
        <rect x="24" y="30" width="120" height="82" rx="10" fill="#ffffff" />
        <rect x="24" y="30" width="120" height="18" rx="10" fill="#f0f0f2" />
        <circle cx="36" cy="39" r="3" fill="#ff5f57" />
        <circle cx="46" cy="39" r="3" fill="#febc2e" />
        <circle cx="56" cy="39" r="3" fill="#28c840" />
        <rect x="36" y="60" width="80" height="7" rx="3.5" fill="#e2e2e6" />
        <rect x="36" y="74" width="60" height="7" rx="3.5" fill="#e2e2e6" />
        <rect x="36" y="88" width="70" height="7" rx="3.5" fill="#e2e2e6" />
      </g>
      <g filter="url(#svc-scrape-shadow)">
        <rect x="164" y="20" width="100" height="66" rx="10" fill="#ffffff" />
        <rect x="164" y="20" width="100" height="16" rx="10" fill="#f0f0f2" />
        <circle cx="174" cy="28" r="2.6" fill="#ff5f57" />
        <circle cx="182" cy="28" r="2.6" fill="#febc2e" />
        <circle cx="190" cy="28" r="2.6" fill="#28c840" />
        <rect x="174" y="46" width="66" height="6" rx="3" fill="#e2e2e6" />
        <rect x="174" y="58" width="48" height="6" rx="3" fill="#e2e2e6" />
      </g>

      {/* flow lines into the pipeline */}
      <path d="M110 118 C 140 150, 170 150, 190 150" fill="none" stroke="url(#svc-scrape-g)" strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round" opacity="0.85" />
      <path d="M214 92 C 210 120, 200 140, 190 150" fill="none" stroke="url(#svc-scrape-g)" strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round" opacity="0.85" />
      <circle cx="190" cy="150" r="14" fill="url(#svc-scrape-g)" opacity="0.16" />
      <path d="M184 150 l4 5 8 -9" fill="none" stroke="url(#svc-scrape-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* database cylinder */}
      <g filter="url(#svc-scrape-shadow)">
        <path d="M96 170 a34 10 0 1 0 68 0 v28 a34 10 0 1 1 -68 0 z" fill="#ffffff" />
        <ellipse cx="130" cy="170" rx="34" ry="10" fill="#ffffff" stroke="url(#svc-scrape-g)" strokeWidth="2" />
        <ellipse cx="130" cy="170" rx="34" ry="10" fill="url(#svc-scrape-g)" opacity="0.14" />
      </g>
    </svg>
  );
}

/* Phone + chat-agent mockup */
export function AiIcon() {
  return (
    <svg viewBox="0 0 320 240" className={styles.icon} aria-hidden="true">
      <defs>
        <linearGradient id="svc-ai-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3ebff" />
          <stop offset="100%" stopColor="#e8f1ff" />
        </linearGradient>
        <linearGradient id="svc-ai-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#bf5af2" />
          <stop offset="100%" stopColor="#0071e3" />
        </linearGradient>
        <filter id="svc-ai-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#bf5af2" floodOpacity="0.18" />
        </filter>
      </defs>

      <rect x="0" y="0" width="320" height="240" rx="22" fill="url(#svc-ai-bg)" />
      <circle cx="70" cy="40" r="44" fill="#bf5af2" opacity="0.10" />

      <g filter="url(#svc-ai-shadow)">
        {/* phone frame */}
        <rect x="108" y="18" width="104" height="204" rx="20" fill="#1d1d1f" />
        <rect x="116" y="30" width="88" height="180" rx="4" fill="#ffffff" />
        <rect x="150" y="22" width="20" height="5" rx="2.5" fill="#3a3a3c" />

        {/* chat bubbles */}
        <rect x="124" y="46" width="52" height="16" rx="8" fill="#f0f0f2" />
        <rect x="140" y="70" width="56" height="22" rx="11" fill="url(#svc-ai-g)" opacity="0.9" />
        <rect x="124" y="100" width="60" height="16" rx="8" fill="#f0f0f2" />

        {/* agent avatar + "typing" bubble */}
        <circle cx="132" cy="132" r="9" fill="url(#svc-ai-g)" />
        <path d="M132 127 l1.6 3.4 3.4 1.6 -3.4 1.6 -1.6 3.4 -1.6 -3.4 -3.4 -1.6 3.4 -1.6z" fill="#fff" />
        <rect x="146" y="124" width="50" height="18" rx="9" fill="#f0f0f2" />
        <circle cx="156" cy="133" r="2.4" fill="#a0a0a5" />
        <circle cx="164" cy="133" r="2.4" fill="#a0a0a5" />
        <circle cx="172" cy="133" r="2.4" fill="#a0a0a5" />

        {/* input bar */}
        <rect x="124" y="188" width="72" height="14" rx="7" fill="#f0f0f2" />
        <circle cx="188" cy="195" r="4" fill="url(#svc-ai-g)" />
      </g>

      {/* floating automation nodes */}
      <circle cx="60" cy="120" r="7" fill="url(#svc-ai-g)" opacity="0.8" />
      <circle cx="86" cy="160" r="5" fill="url(#svc-ai-g)" opacity="0.55" />
      <circle cx="52" cy="176" r="4.5" fill="url(#svc-ai-g)" opacity="0.4" />
      <path d="M60 120 L86 160 M86 160 L52 176" stroke="url(#svc-ai-g)" strokeWidth="1.6" opacity="0.45" />
    </svg>
  );
}

export const ICONS: Record<Service['icon'], React.ComponentType> = {
  code: CodeMockup,
  web: WebIcon,
  data: DataIcon,
  scrape: ScrapeIcon,
  ai: AiIcon,
};
