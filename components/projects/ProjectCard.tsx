'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/types';
import { AnimatedElement } from '@/components/shared/AnimatedElement';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const MAX_DESC_LENGTH = 120;
  const shortDesc =
    project.shortDescription.length > MAX_DESC_LENGTH
      ? project.shortDescription.slice(0, MAX_DESC_LENGTH) + '...'
      : project.shortDescription;

  return (
    <AnimatedElement delay={index * 100} animationConfig={{ initial: 'opacity-0 scale-95', final: 'opacity-100 scale-100' }}>
      <Card className="overflow-hidden h-full flex flex-col group hover:shadow-2xl transition-shadow duration-300">
        <CardHeader className="p-0">
          <Link href={`/projects/${project.slug}`} className="block">
            <div className="w-full aspect-[16/9] overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                data-ai-hint={project.dataAiHint || 'project image'}
                width={600}
                height={338}
                priority
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        </CardHeader>
        <CardContent className="pt-6 flex-grow">
          <Link href={`/projects/${project.slug}`}>
            <CardTitle className="text-2xl font-headline !text-primary group-hover:text-accent transition-colors duration-300 mb-2">
              {project.title}
            </CardTitle>
          </Link>
          <CardDescription className="text-foreground/80 mb-4 line-clamp-3">{shortDesc}</CardDescription>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-secondary text-secondary-foreground">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && <Badge variant="secondary">...</Badge>}
          </div>
        </CardContent>
        <CardFooter className='flex justify-between items-center '>
          <Button asChild variant="link" className="text-accent p-0 hover:underline">
            <Link href={`/projects/${project.slug}`}>
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className='text-foreground hover:bg-muted/50 rounded-full p-2'
            >
              <Github className="h-5 w-5" />
            </Link>
          )}
        </CardFooter>
      </Card>
    </AnimatedElement>
  );
}
