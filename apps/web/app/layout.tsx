import { Outfit } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  metadataBase: new URL('https://snapstudio.ai'),
  title: {
    default: 'SnapStudio AI — Professional Product Photography for eCommerce',
    template: '%s | SnapStudio AI',
  },
  description: 'Transform raw snapshots into studio-quality photos in seconds. Optimized for Amazon, Daraz, Noon, and Shopify sellers in the UAE and South Asia.',
  keywords: [
    'ai product photography',
    'ecommerce photo editor',
    'daraz product photo maker',
    'amazon product background removal',
    'ai scene generation',
    'professional product photos ai',
    'pakistan ecommerce tools',
    'uae seller tools',
    'noon.com photo requirements',
    'background removal for daraz',
  ],
  authors: [{ name: 'SnapStudio AI' }],
  creator: 'SnapStudio AI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://snapstudio.ai',
    siteName: 'SnapStudio AI',
    title: 'SnapStudio AI — Pro Product Photos in 10 Seconds',
    description: 'The #1 AI photography tool for Daraz, Amazon, and Noon sellers. High-fidelity background removal and lifestyle scene generation.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SnapStudio AI - Product Photography Reimagined',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SnapStudio AI — Pro Product Photos in 10 Seconds',
    description: 'Transform raw snapshots into studio-quality photos in seconds. Designed for global marketplace sellers.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased bg-background text-white selection:bg-brand-violet/30 selection:text-brand-violet">
        {children}
      </body>
    </html>
  );
}
