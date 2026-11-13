import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StudyPilot AI — The Spatial AI Learning Ecosystem',
  description: 'Learn Smarter. Remember Longer. Achieve More. Next-generation AI personal tutor, document research assistant, adaptive exam generator, and spaced repetition platform.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased bg-[#03060f] text-slate-100 min-h-screen selection:bg-violet-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
