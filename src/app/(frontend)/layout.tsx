import type { Metadata } from 'next';

import { cn } from '@/utilities/ui';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { Instrument_Serif } from 'next/font/google';
import React from 'react';

import { AdminBar } from '@/components/AdminBar';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { Footer } from '@/Footer/Component';
import { Header } from '@/Header/Component';
import { Providers } from '@/providers';
import { InitTheme } from '@/providers/Theme/InitTheme';
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { draftMode } from 'next/headers';

import { getServerSideURL } from '@/utilities/getURL';
import '../../styles/payloadStyles.css';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: '400',
  style: ['normal', 'italic'],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode();

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, instrumentSerif.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <GoogleAnalytics />
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="pt-20 md:pt-24">
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <SpeedInsights />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'centrAL - Collaborative Learning Platform for Sri Lankan A/L Students',
    template: '%s | centrAL',
  },
  description:
    'centrAL is a collaborative learning platform designed specifically for Sri Lankan G.C.E A/L students. Access comprehensive study resources, connect with peers, and excel in your Advanced Level examinations.',
  applicationName: 'centrAL',
  keywords: [
    'Sri Lanka A/L',
    'Advanced Level',
    'GCE A/L',
    'collaborative learning',
    'study platform',
    'education',
    'student resources',
    'exam preparation',
  ],
  authors: [
    {
      name: 'centrAL',
      url: getServerSideURL(),
    },
  ],
  creator: 'centrAL',
  publisher: 'centrAL',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    title: 'centrAL - Collaborative Learning Platform for Sri Lankan A/L Students',
    description:
      'Access comprehensive study resources, connect with peers, and excel in your Advanced Level examinations.',
    creator: '@studyatcentral',
    site: '@studyatcentral', 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
};
