export interface Tool {
  title: string;
  description: string;
  href: string;
  tags: string[];
}

export const toolsData: Tool[] = [
  {
    title: 'GitHub Language Analyzer',
    description:
      'Analyze any public GitHub account and see its language mix based on repository code bytes.',
    href: '/tools/github-language-analyzer',
    tags: ['GitHub API', 'Next.js', 'Analytics'],
  },
];
