'use client';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/shared/Container';
import { AnimatedElement } from '@/components/shared/AnimatedElement';
import { CheckCircle } from 'lucide-react';

const skillCategories = {
  languages: [
    'JavaScript', 'TypeScript', 'Python', 'C', 'C++', 'Java', 'HTML', 'CSS', 'SQL'
  ],
  frontend: [
    'React', 'Next.js', 'Tailwind CSS', 'Material-UI', 'ShadCN/UI', 'Zustand', 'Framer Motion',
  ],
  backend: [
    'Node.js', 'Express.js', 'Django', 'Flask', 'MySQL', 'PostgreSQL', 'SQLite', 'MongoDB',
    'Git & GitHub', "Web Sockets", 'Prisma', 'Postman', 'GraphQL', 'Cloudinary',
    'Docker', 'Redis', 'Redis Queue', 'REST API', 'Firebase',
  ]
};

export function SkillsSection() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <Container>
        <AnimatedElement>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline !text-primary">My Expertise</h2>
          <p className="text-lg text-center text-foreground/80 mb-12 max-w-2xl mx-auto">
            I leverage a modern tech stack to build robust and efficient applications. Here are some of the key technologies and skills I work with:
          </p>
        </AnimatedElement>

        <div className="space-y-12">
          {/* Languages */}
          <AnimatedElement delay={100}>
            {/* <h3 className="text-2xl font-bold text-center mb-6 text-primary">Languages</h3> */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {skillCategories.languages.map((skill, index) => (
                <AnimatedElement key={skill} delay={50 + index * 50}>
                  <div className="bg-card p-3 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="font-medium text-card-foreground text-sm">{skill}</span>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedElement>

          {/* Frontend */}
          <AnimatedElement delay={200}>
            {/* <h3 className="text-2xl font-bold text-center mb-6 text-primary">Frontend</h3> */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {skillCategories.frontend.map((skill, index) => (
                <AnimatedElement key={skill} delay={200 + index * 50}>
                  <div className="bg-card p-3 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="font-medium text-card-foreground text-sm">{skill}</span>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedElement>

          {/* Backend */}
          <AnimatedElement delay={300}>
            {/* <h3 className="text-2xl font-bold text-center mb-6 text-primary">Backend & Tools</h3> */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {skillCategories.backend.map((skill, index) => (
                <AnimatedElement key={skill} delay={300 + index * 50}>
                  <div className="bg-card p-3 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="font-medium text-card-foreground text-sm">{skill}</span>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedElement>
        </div>
      </Container>
    </section>
  );
}
