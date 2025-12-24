'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { AnimatedElement } from '@/components/shared/AnimatedElement';
import { ArrowRight, Download } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.20))] bg-background text-foreground">
      <Container className="flex flex-col items-center text-center py-12 md:py-16"> {/* Added some padding for aesthetics */}
        <AnimatedElement delay={100} animationConfig={{ initial: 'opacity-0 scale-90', final: 'opacity-100 scale-100' }}>
          <Image
            src="/hero_section.jpg"
            alt="Mutiur Rahman"
            data-ai-hint="man portrait professional"
            width={128}
            height={128}
            className="rounded-full mb-6 shadow-lg"
            priority
            unoptimized
          />
        </AnimatedElement>

        <AnimatedElement delay={200}>
          <p className="text-lg md:text-xl text-foreground/80 mb-3 font-body">
            Hi! I'm Mutiur Rahman 👋
          </p>
        </AnimatedElement>

        <AnimatedElement delay={300}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline !text-foreground tracking-tight mb-6 max-w-3xl">
            Fullstack web developer based in Bangladesh.
          </h1>
        </AnimatedElement>

        <AnimatedElement delay={400}>
          <p className="text-md md:text-lg text-foreground/70 mb-10 max-w-5xl font-body">
            I am a fullstack developer from Khulna, Bangladesh. I specialize in creating dynamic and responsive websites using modern technologies like React, Next.js, Node.js, and more.
          </p>
        </AnimatedElement>

        <AnimatedElement delay={500} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/80 shadow-md px-8">
            <Link href="/contact">
              contact me <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full text-foreground border-foreground/30 hover:border-accent hover:text-accent shadow-md px-8">
            {/* Assuming resume is a static file in /public */}
            <Link href="/Mutiur Rahman.pdf" target="_blank" rel="noopener noreferrer">
              my resume <Download className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </AnimatedElement>
      </Container>
    </section>
  );
}
