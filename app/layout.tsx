import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
