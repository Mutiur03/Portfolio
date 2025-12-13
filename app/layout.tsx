import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AppProviders } from '@/components/layout/AppProviders';
import Script from 'next/script';
import Analytics from '@/components/Analytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mutiurrahman.com/'),
  title: 'Mutiur Rahman - Expert Fullstack Web Developer | React, Next.js, Node.js',
  description: 'Mutiur Rahman is a professional fullstack web developer specializing in React, Next.js, TypeScript, Node.js, and modern web technologies. Get custom web applications, responsive websites, and scalable solutions.',
  keywords: [
    'fullstack developer',
    'web developer',
    'React developer',
    'Next.js developer',
    'TypeScript developer',
    'Node.js developer',
    'JavaScript developer',
    'frontend developer',
    'backend developer',
    'Mutiur Rahman',
    'portfolio',
    'web development services',
  ],
  authors: [{ name: 'Mutiur Rahman' }],
  creator: 'Mutiur Rahman',
  publisher: 'Mutiur Rahman',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.mutiurrahman.com/',
    title: 'Mutiur Rahman - Fullstack Web Developer',
    description: 'Professional fullstack web developer creating modern, scalable web applications with React, Next.js, and Node.js. View my portfolio and get in touch for your next project.',
    siteName: 'Mutiur Rahman Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mutiur Rahman - Fullstack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mutiur Rahman - Expert Fullstack Web Developer',
    description: 'Professional fullstack web developer specializing in React, Next.js, TypeScript, and Node.js. Building modern web solutions.',
    images: ['/twitter-image.jpg'],
    creator: '@MutiurRahman03',
  },
  alternates: {
    canonical: 'https://www.mutiurrahman.com/',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-606H5K3S67" strategy="afterInteractive"
        ></Script>
        <Script id="ga-init" strategy="afterInteractive"
        >
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-606H5K3S67');
          `}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Mutiur Rahman',
              jobTitle: 'Fullstack Web Developer',
              description: 'Professional fullstack web developer specializing in React, Next.js, TypeScript, Node.js, and modern web technologies.',
              url: 'https://www.mutiurrahman.com/',
              sameAs: [
                'https://github.com/Mutiur03',
                'https://www.linkedin.com/in/mutiur-rahman-mr/',
                'https://x.com/MutiurRahman03',
              ],
              knowsAbout: [
                'React',
                'Next.js',
                'TypeScript',
                'Node.js',
                'JavaScript',
                'Web Development',
                'Frontend Development',
                'Backend Development',
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <AppProviders>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
          <Analytics />
        </AppProviders>
      </body>
    </html>
  );
}
