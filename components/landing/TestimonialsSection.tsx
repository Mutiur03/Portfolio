import { testimonialsData } from '@/lib/data';
import { TestimonialCard } from './TestimonialCard';
import { Container } from '@/components/shared/Container';
import { AnimatedElement } from '@/components/shared/AnimatedElement';

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <Container>
        <AnimatedElement>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline !text-primary">Client Testimonials</h2>
          <p className="text-lg text-center text-foreground/80 mb-12 max-w-2xl mx-auto">
            Hear what my clients have to say about their experience working with me and the results I've delivered.
          </p>
        </AnimatedElement>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <AnimatedElement key={testimonial.id} delay={index * 150} animationConfig={{ initial: 'opacity-0 translate-y-10', final: 'opacity-100 translate-y-0' }}>
              <TestimonialCard testimonial={testimonial} />
            </AnimatedElement>
          ))}
        </div>
      </Container>
    </section>
  );
}
