import { getProjectBySlug, projectsData } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { AnimatedElement } from '@/components/shared/AnimatedElement';
import { Github, PlayCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


interface ProjectDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const awaitedParams = await params;
  const project = getProjectBySlug(awaitedParams.slug);
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  return {
    title: `${project.title} - LuxeCode Portfolio`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const awaitedParams = await params;
  const project = getProjectBySlug(awaitedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-16 md:py-24 bg-background">
      <Container>
        <AnimatedElement>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 font-headline !text-primary">{project.title}</h1>
          <p className="text-lg text-center text-foreground/80 mb-12 max-w-3xl mx-auto">{project.shortDescription}</p>
        </AnimatedElement>

        {project.videoUrl && (
          <AnimatedElement delay={100} className="mb-12">
            <div className="aspect-video rounded-lg overflow-hidden shadow-xl border border-border">
              <iframe
                width="100%"
                height="100%"
                src={project.videoUrl}
                title={`${project.title} Video Showcase`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="bg-muted"
              ></iframe>
            </div>
          </AnimatedElement>
        )}

        {!project.videoUrl && project.imageUrl && (
          <AnimatedElement delay={100} className="mb-12">
            <Image
              src={project.imageUrl}
              alt={project.title}
              data-ai-hint={project.dataAiHint || "project main image"}
              width={1200}
              height={675}
              className="w-full rounded-lg shadow-xl object-cover border border-border"
              priority
            />
          </AnimatedElement>
        )}

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <AnimatedElement delay={200}>
              <h2 className="text-2xl md:text-3xl font-semibold font-headline !text-primary mb-4">Project Overview</h2>
              <div className="prose prose-lg max-w-none text-foreground/90" dangerouslySetInnerHTML={{ __html: project.longDescription.replace(/\n/g, '<br />') }} />
            </AnimatedElement>

            {project.galleryImages && project.galleryImages.length > 0 && (
              <AnimatedElement delay={300}>
                <h2 className="text-2xl md:text-3xl font-semibold font-headline !text-primary mt-12 mb-6">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.galleryImages.map((img, index) => (
                    <AnimatedElement key={index} delay={index * 100} animationConfig={{ initial: 'opacity-0 scale-90', final: 'opacity-100 scale-100' }}>
                      <Image
                        src={img.url}
                        alt={`${project.title} gallery image ${index + 1}`}
                        data-ai-hint={img.dataAiHint || "project screenshot"}
                        width={800}
                        height={600}
                        className="rounded-lg shadow-md object-cover border border-border"
                      />
                    </AnimatedElement>
                  ))}
                </div>
              </AnimatedElement>
            )}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-24 self-start">
            <AnimatedElement delay={250}>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-headline !text-primary">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-secondary text-secondary-foreground">{tech}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3 pt-4">
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          View Live Site <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button asChild variant="outline" className="w-full text-primary border-primary bg-background hover:bg-primary/10 hover:text-primary hover:border-primary">
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          View on GitHub <Github className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AnimatedElement>
          </aside>
        </div>

        <AnimatedElement delay={400} className="mt-16 text-center">
          <Button asChild variant="outline" size="lg" className="text-primary border-primary hover:bg-primary/10">
            <Link href="/projects">
              Back to All Projects
            </Link>
          </Button>
        </AnimatedElement>
      </Container>
    </div>
  );
}
