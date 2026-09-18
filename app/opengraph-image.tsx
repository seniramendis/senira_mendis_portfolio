import { PERSONAL } from '@/lib/data';

export const alt = `${PERSONAL.name} — Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/svg+xml';

export default async function Image() {
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#050505"/>
      <rect x="60" y="60" width="1080" height="510" rx="26" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
      <text x="96" y="175" fill="rgba(255,255,255,0.7)" font-size="26" font-weight="600" letter-spacing="3" font-family="Arial, Helvetica, sans-serif">${PERSONAL.location}</text>
      <text x="96" y="290" fill="white" font-size="82" font-weight="700" font-family="Arial, Helvetica, sans-serif">${PERSONAL.name}</text>
      <text x="96" y="390" fill="rgba(255,255,255,0.8)" font-size="30" font-family="Arial, Helvetica, sans-serif">Full-stack, mobile &amp; backend developer — building software that solves real-world problems.</text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
