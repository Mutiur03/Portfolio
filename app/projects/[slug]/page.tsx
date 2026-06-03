import { getProjectBySlug, projectsData } from '@/lib/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient';

const siteUrl = 'https://www.mutiurrahman.com';

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found - Mutiur Rahman',
    };
  }

  const pageUrl = `${siteUrl}/projects/${project.slug}`;
  const description = project.shortDescription || stripHtml(project.longDescription).slice(0, 155);
  const imageUrl = project.imageUrl.startsWith('http') ? project.imageUrl : `${siteUrl}${project.imageUrl}`;

  return {
    title: `${project.title} - Project Case Study by Mutiur Rahman`,
    description,
    keywords: [
      project.title,
      `${project.title} project`,
      `${project.category} development`,
      ...project.technologies,
      'Mutiur Rahman portfolio',
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'article',
      url: pageUrl,
      title: `${project.title} - Project Case Study`,
      description,
      siteName: 'Mutiur Rahman Portfolio',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} project screenshot`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - Project Case Study`,
      description,
      images: [imageUrl],
      creator: '@MutiurRahman03',
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const pageUrl = `${siteUrl}/projects/${project.slug}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    url: pageUrl,
    description: project.shortDescription,
    image: project.imageUrl.startsWith('http') ? project.imageUrl : `${siteUrl}${project.imageUrl}`,
    creator: {
      '@type': 'Person',
      name: 'Mutiur Rahman',
      url: siteUrl,
    },
    keywords: project.technologies.join(', '),
    sameAs: [
      project.githubUrl,
      ...(Array.isArray(project.liveUrl) ? project.liveUrl.map((item) => item.url) : project.liveUrl ? [project.liveUrl] : []),
    ].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}
