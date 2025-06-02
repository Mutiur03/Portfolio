import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { AnimatedElement } from '@/components/shared/AnimatedElement';
import { Send } from 'lucide-react';

export function ContactCTA() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground">
      <Container className="text-center">
        <AnimatedElement>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-headline">
            Ready to Elevate Your Project?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-primary-foreground/80 dark:text-primary-foreground/90">
            Let's discuss how my skills and experience can bring your vision to life.
            I'm excited to learn about your ideas and contribute to your success.
          </p>
        </AnimatedElement>
        <AnimatedElement delay={200}>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href="/contact">
              Get in Touch <Send className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </AnimatedElement>
      </Container>
    </section>
  );
}
