import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'MemoVerse SaaS - Romantic Couple Platform',
  description: 'Public couple memory template and romantic interactive dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
