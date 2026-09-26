import type { Metadata } from 'next';
import * as React from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'KAELITH STUDIO — Fast, Modern Websites At Fair Fixed Prices',
  description:
    'A boutique two-person engineering studio crafting high-performance digital products, bespoke web applications, and editorial online storefronts without agency bloat or intermediate friction.',
  openGraph: {
    title: 'KAELITH STUDIO — Fast, Modern Websites At Fair Fixed Prices',
    description:
      'A boutique two-person engineering studio crafting high-performance digital products, bespoke web applications, and editorial online storefronts without agency bloat.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#faf9f6] text-[#111111] antialiased selection:bg-[#111111] selection:text-[#faf9f6]">
        {children}
      </body>
    </html>
  );
}
