import type { Metadata } from 'next';
import { GitHubLanguagesSection } from '@/components/landing/GitHubLanguagesSection';

const siteUrl = 'https://www.mutiurrahman.com';
const pagePath = '/tools/github-language-analyzer';
const pageUrl = `${siteUrl}${pagePath}`;
const title = 'GitHub Language Analyzer - Free GitHub Top Languages Tool';
const description =
  'Analyze any public GitHub profile and see top programming languages by repository code bytes. Generate a README-ready SVG language card for your GitHub profile.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'GitHub language analyzer',
    'GitHub top languages',
    'GitHub language stats',
    'GitHub profile analyzer',
    'GitHub README SVG',
    'programming language usage',
    'GitHub repository languages',
    'free developer tool',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title,
    description,
    siteName: 'Mutiur Rahman Portfolio',
    images: [
      {
        url: `${pagePath}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'GitHub Language Analyzer tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [`${pagePath}/twitter-image`],
    creator: '@MutiurRahman03',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'GitHub Language Analyzer',
    url: pageUrl,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    description,
    creator: {
      '@type': 'Person',
      name: 'Mutiur Rahman',
      url: siteUrl,
      sameAs: [
        'https://github.com/Mutiur03',
        'https://www.linkedin.com/in/mutiur-rahman-mr/',
        'https://x.com/MutiurRahman03',
      ],
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Analyze public original GitHub repositories',
      'Calculate programming language percentages from GitHub code-byte data',
      'Generate README-ready SVG language cards',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does the GitHub Language Analyzer measure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It measures programming language usage across public, original repositories using GitHub language byte data and returns percentage breakdowns.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I add the result to my GitHub README?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. After analysis, the tool generates a README-ready SVG card and Markdown snippet for a GitHub profile or project README.',
        },
      },
    ],
  },
];

export default function GitHubLanguageAnalyzerPage() {
  return (
    <main className="min-h-screen">
      <h1 className="sr-only">GitHub Language Analyzer</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GitHubLanguagesSection />
    </main>
  );
}
