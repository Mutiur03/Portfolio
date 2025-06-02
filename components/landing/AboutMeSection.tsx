import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { AnimatedElement } from '@/components/shared/AnimatedElement';

export function AboutMeSection() {
  const academicTimeline = [
    {
      year: '2023 - Present',
      title: 'BSc in Computer Science & Engineering',
      institution: 'Khulna University of Engineering & Technology (KUET)'
    },
    {
      year: '2022',
      title: 'Higher Secondary Certificate (HSC)',
      institution: 'Govt. Azizul Haque College, Bogura'
    },
    {
      year: '2020',
      title: 'Secondary School Certificate (SSC)',
      institution: 'Panchbibi LBP Govt. High School, Panchbibi, Joypurhat'
    }
  ];

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center py-8 md:py-16 lg:py-24 bg-secondary ">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <AnimatedElement delay={100} animationConfig={{ initial: 'opacity-0 translate-x-[-20px]', final: 'opacity-100 translate-x-0' }} className="flex justify-center">
            <Image
              src="/about_section.webp"
              alt="About Mutiur Rahman"
              data-ai-hint="man working computer"
              width={320}
              height={400}
              className="rounded-lg scale-110 md:scale-125 shadow-xl object-cover w-auto h-auto max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[500px]"
            />
          </AnimatedElement>
          <AnimatedElement delay={200} animationConfig={{ initial: 'opacity-0 translate-x-[20px]', final: 'opacity-100 translate-x-0' }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline !text-primary mb-4 md:mb-6 text-center md:text-left">
              About Me
            </h2>
            <p className="text-base sm:text-lg text-foreground/80 mb-3 md:mb-4 text-center md:text-left">
              Hi, I&apos;m a second-year Computer Science and Engineering student at <strong>KUET (Khulna University of Engineering & Technology)</strong>, passionate about full-stack web development. Alongside my academic journey, I&apos;ve been actively building real-world applications using <strong>React</strong>, <strong>Next.js</strong>, <strong>Node.js</strong>, and <strong>PostgreSQL</strong>.
            </p>
            <p className="text-base sm:text-lg text-foreground/80 mb-6 md:mb-8 text-center md:text-left">
              I&apos;m always eager to explore new technologies, collaborate on meaningful projects, and turn complex ideas into seamless, user-friendly digital solutions. Outside of coding, I enjoy learning from open-source communities and experimenting with new tools.
            </p>

            {/* Academic Timeline */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold font-headline text-primary mb-4 text-center md:text-left">
                Academic Journey
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {academicTimeline.map((item, index) => (
                  <AnimatedElement
                    key={index}
                    delay={300 + (index * 100)}
                    animationConfig={{
                      initial: 'opacity-0 translate-y-[10px]',
                      final: 'opacity-100 translate-y-0'
                    }}
                    className="flex-1 text-center sm:text-left"
                  >
                    <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md inline-block mb-2">
                        {item.year}
                      </span>
                      <h4 className="font-semibold text-foreground text-xs sm:text-sm mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-foreground/70">
                        {item.institution}
                      </p>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </Container>
    </section>
  );
}
