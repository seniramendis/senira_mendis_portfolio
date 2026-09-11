import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Cursor from '../components/ui/Cursor';// <-- Import the Cursor component
import { PERSONAL } from '@/lib/data';
import { SITE_URL, buildMetadata, personJsonLd, websiteJsonLd } from '@/lib/seo';

// Cloudflare Web Analytics — cookie-free, no personal data collected.
// Set CF_BEACON_TOKEN in your environment (get it from the
// Cloudflare dashboard: Analytics & Logs -> Web Analytics -> Add site).
// Read server-side only, so it doesn't need a NEXT_PUBLIC_ prefix — the
// value is simply rendered into the page's HTML at build/request time.
const CF_BEACON_TOKEN = process.env.CF_BEACON_TOKEN;

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${PERSONAL.name} — Software Engineer`,
    description:
      'Software Engineering undergraduate. Full-stack, mobile & backend developer based in Colombo, Sri Lanka — building production web platforms, mobile apps and backend systems.',
    path: '/',
  }),
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PERSONAL.name} — Software Engineer`,
    template: `%s — ${PERSONAL.name}`,
  },
  keywords: [
    'Senira Mendis',
    'Software Engineer',
    'Full-Stack Developer',
    'Android Developer',
    'Laravel Developer',
    'React Native Developer',
    'Web Developer Sri Lanka',
    'Software Developer Colombo',
  ],
  authors: [{ name: PERSONAL.name, url: SITE_URL }],
  creator: PERSONAL.name,
  publisher: PERSONAL.name,
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
  // Add your Google Search Console verification code here once you register
  // the site (Search Console -> Settings -> Ownership verification -> HTML tag).
  // verification: { google: 'your-verification-code' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Cursor /> {/* <-- Render it here */}
        {children}

        {/* Structured data — helps Google show a rich Knowledge Panel-style
            result and understand this is a Person's professional site. */}
        <Script
          id="ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />

        {/* Cloudflare Turnstile — bot protection for the contact form */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          async
          defer
        />

        {/* Cloudflare Web Analytics */}
        {CF_BEACON_TOKEN && (
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
