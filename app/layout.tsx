import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Cursor from '../components/ui/Cursor';// <-- Import the Cursor component

// Cloudflare Web Analytics — cookie-free, no personal data collected.
// Set CF_BEACON_TOKEN in your environment (get it from the
// Cloudflare dashboard: Analytics & Logs -> Web Analytics -> Add site).
// Read server-side only, so it doesn't need a NEXT_PUBLIC_ prefix — the
// value is simply rendered into the page's HTML at build/request time.
const CF_BEACON_TOKEN = process.env.CF_BEACON_TOKEN;

export const metadata: Metadata = {
  title: 'Senira Mendis — Software Engineer',
  description: 'Software Engineering undergraduate. Full-stack, mobile & backend developer based in Colombo, Sri Lanka.',
  keywords: ['Software Engineer', 'Full-Stack', 'Android Developer', 'Laravel', 'React Native', 'Colombo', 'Sri Lanka'],
  openGraph: {
    title: 'Senira Mendis — Software Engineer',
    description: 'Building software that solves real-world problems.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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