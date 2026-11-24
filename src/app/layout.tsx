import type { Metadata, Viewport } from 'next';
import { Martian_Mono, Newsreader } from 'next/font/google';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/content/site';
import './globals.css';

// Two families, one job each (DESIGN.md "Type"): Newsreader is Sam's voice, Martian Mono is the log.
const newsreader = Newsreader({
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});
const martian = Martian_Mono({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-martian',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}. Live loops and lessons in Silver Plume, Colorado`, template: `%s. ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.tagline,
    siteName: site.name,
    type: 'website',
    images: [{ url: '/video/_G_9w33wKDw.webp', width: 720, height: 1280, alt: 'Sam Shoyer playing alto sax at his loop rig' }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#eeefec' };

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${martian.variable}`}>
      <body className="bg-window text-ink antialiased">
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
