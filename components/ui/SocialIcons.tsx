'use client';

import Link from 'next/link';

const socials = [
  {
    label: 'Email',
    href: 'mailto:seniramendis41@gmail.com',
    svg: <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/senira-mendis/',
    svg: (
      <>
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/seniramendis',
    svg: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/94753356254',
    svg: <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/senira._mendis/',
    svg: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/seniramendis/',
    svg: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
  },
];

interface SocialIconsProps {
  vertical?: boolean;
}

export default function SocialIcons({ vertical = false }: SocialIconsProps) {
  if (vertical) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {socials.map(({ label, href, svg }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.45)',
              transition: 'color 0.3s, transform 0.3s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#c49a45';
              (e.currentTarget as HTMLElement).style.transform = 'translateX(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)';
              (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {svg}
            </svg>
          </Link>
        ))}
      </div>
    );
  }

  // Horizontal (default — used in About/Contact sections)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '16px' }}>
      {socials.map(({ label, href, svg }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280',
            transition: 'color 0.3s, transform 0.3s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = '#c49a45';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = '#6b7280';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {svg}
          </svg>
        </Link>
      ))}
    </div>
  );
}
