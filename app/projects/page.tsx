"use client";

import { useState } from 'react';
import { projectsData } from '@/lib/data';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Container } from '@/components/shared/Container';
import { AnimatedElement } from '@/components/shared/AnimatedElement';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Web Apps', value: 'web' },
  { label: 'Websites', value: 'website' },
  { label: 'Mobile Apps', value: 'mobile' },
  { label: 'SAAS Apps', value: 'saas' },
  // { label: 'Games', value: 'game' },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const filteredProjects =
    filter === 'all'
      ? projectsData
      : projectsData.filter(p => p.category === filter);

  return (
    <div className="py-16 md:py-24 bg-background">
      <Container>
        <AnimatedElement>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 font-headline !text-primary">
            My Projects
          </h1>
          <p className="text-lg text-center text-foreground/80 mb-12 max-w-3xl mx-auto">
            Dive into a curated selection of projects that demonstrate my skills in
            full-stack development, problem-solving, and creating impactful digital
            solutions.
          </p>
        </AnimatedElement>
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          {FILTERS.map(f => (
            <button
              key={f.value}
              className={`px-5 py-2 rounded border font-mono transition-colors
                ${filter === f.value
                  ? 'bg-primary text-primary-foreground border-primary shadow'
                  : 'bg-transparent text-primary border-primary hover:bg-primary hover:text-primary-foreground'
                }`}
              onClick={() => setFilter(f.value)}
              type="button"
            >
              {f.label}
            </button>
          ))}
        </div>
        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <AnimatedElement>
            <p className="text-center text-lg text-muted-foreground">
              No projects to display at the moment. Check back soon!
            </p>
          </AnimatedElement>
        )}
      </Container>
    </div>
  );
}
