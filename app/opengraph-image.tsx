import { ImageResponse } from 'next/og';
import { PERSONAL } from '@/lib/data';

export const alt = `${PERSONAL.name} — Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 96px',
          background: '#000',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: 28,
            display: 'flex',
          }}
        >
          {PERSONAL.location}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: -2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>{PERSONAL.name}</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            lineHeight: 1.4,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 920,
            display: 'flex',
          }}
        >
          Full-stack, mobile &amp; backend developer — building software that solves real-world problems.
        </div>
      </div>
    ),
    { ...size }
  );
}
