"use client";

import { useState } from 'react';
import { projectsData } from '@/lib/data';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Container } from '@/components/shared/Container';
import { AnimatedElement } from '@/components/shared/AnimatedElement';

const FILTERS = [
  { label: 'All Projects', value: 'all' },
  { label: 'Web Applications', value: 'web' },
  { label: 'Websites', value: 'website' },
  { label: 'SaaS Platforms', value: 'saas' },
  { label: 'Mobile Applications', value: 'mobile' },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const filteredProjects =
    filter === 'all'
      ? projectsData
      : projectsData.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      <Container className="py-20 md:py-32">
        <AnimatedElement>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-headline text-foreground">
              Featured <span className="text-primary">Projects</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              Explore my latest work in full-stack development, showcasing innovative solutions
              and cutting-edge technologies that drive business success.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full"></div>
          </div>
        </AnimatedElement>

        {/* Enhanced Filter Bar */}
        <AnimatedElement delay={0.2}>
          <div className="flex flex-wrap gap-3 justify-center mb-16 p-2 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-lg max-w-fit mx-auto">
            {FILTERS.map(f => (
              <button
                key={f.value}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 text-sm md:text-base
                  ${filter === f.value
                    ? 'bg-foreground text-background shadow-lg shadow-foreground/25 scale-105'
                    : 'text-muted-foreground hover:text-background hover:bg-foreground hover:shadow-lg hover:shadow-foreground/20 hover:scale-105'
                  }`}
                onClick={() => setFilter(f.value)}
                type="button"
              >
                {f.label}
              </button>
            ))}
          </div>
        </AnimatedElement>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <AnimatedElement delay={0.4}>
            <div className="grid gap-8 md:gap-10 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </AnimatedElement>
        ) : (
          <AnimatedElement delay={0.4}>
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/20 flex items-center justify-center">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">No Projects Found</h3>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                No projects match your current filter. Try selecting a different category or check back soon for new additions!
              </p>
            </div>
          </AnimatedElement>
        )}
      </Container>
    </div>
  );
}
