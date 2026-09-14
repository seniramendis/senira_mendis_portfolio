import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Cursor from '../components/ui/Cursor';// <-- Import the Cursor component
import { SITE_URL, buildMetadata, personJsonLd, websiteJsonLd } from '@/lib/seo';
import { SEO_KEYWORDS } from '@/lib/data';

// Cloudflare Web Analytics — cookie-free, no personal data collected.
// Set CF_BEACON_TOKEN in your environment (get it from the
// Cloudflare dashboard: Analytics & Logs -> Web Analytics -> Add site).
// Read server-side only, so it doesn't need a NEXT_PUBLIC_ prefix — the
// value is simply rendered into the page's HTML at build/request time.
const CF_BEACON_TOKEN = process.env.CF_BEACON_TOKEN;

// metadataBase anchors every relative/og/twitter image URL emitted below
// (and by page-level metadata) to an absolute one — required for social
// previews and silences Next's "metadataBase not set" build warning.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: 'Senira Mendis — Software Engineer in Sri Lanka | Full-Stack & Mobile App Developer',
    description:
      'Senira Mendis — Software Engineer in Sri Lanka available for remote & full-time roles. Full-stack (Laravel, React Native, Node.js), Android/mobile app & backend developer based in Colombo, open worldwide.',
    path: '/',
  }),
  keywords: SEO_KEYWORDS,
  authors: [{ name: 'Senira Mendis', url: SITE_URL }],
  creator: 'Senira Mendis',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [personJsonLd(), websiteJsonLd()];

  return (
    <html lang="en">
      <head>
        {/* schema.org structured data — Person + WebSite, read by search
            engines for rich results (knowledge panel, sitelinks search box). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Cursor /> {/* <-- Render it here */}
        {children}

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