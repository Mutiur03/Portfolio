export interface Product {
  title: string;
  description: string;
  href: string;
  tags: string[];
}

export const productsData: Product[] = [
  {
    title: 'GitHub Language Analyzer',
    description:
      'Analyze any public GitHub account and see its language mix based on repository code bytes.',
    href: '/products/github-language-analyzer',
    tags: ['GitHub API', 'Next.js', 'Analytics'],
  },
];
