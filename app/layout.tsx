import type { Metadata } from 'next';
import './globals.css';
import Cursor from '../components/ui/Cursor';// <-- Import the Cursor component

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
      </body>
    </html>
  );
}