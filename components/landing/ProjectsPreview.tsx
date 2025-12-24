'use client';
import Link from 'next/link';
import { projectsData } from '@/lib/data';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { AnimatedElement } from '@/components/shared/AnimatedElement';
import { ArrowRight } from 'lucide-react';
export function ProjectsPreview() {
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <section className="py-16 md:py-20 bg-background">
      <Container>
        <AnimatedElement>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline !text-primary">Featured Projects</h2>
          <p className="text-lg text-center text-foreground/80 mb-12 max-w-2xl mx-auto">
            A glimpse into some of the innovative solutions I've developed. Each project reflects my commitment to quality and user-centric design.
          </p>
        </AnimatedElement>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <AnimatedElement >
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </AnimatedElement>
      </Container>
    </section>
  );
}
