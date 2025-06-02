import { ContactForm } from '@/components/contact/ContactForm';
import { Container } from '@/components/shared/Container';
import { AnimatedElement } from '@/components/shared/AnimatedElement';
import { Mail, MapPin, Phone } from 'lucide-react';

export const metadata = {
  title: 'Contact Me - LuxeCode Portfolio',
  description: 'Get in touch for project inquiries or collaborations.',
};

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24 bg-background">
      <Container>
        <AnimatedElement>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 font-headline !text-primary">Get In Touch</h1>
          <p className="text-lg text-center text-foreground/80 mb-12 max-w-2xl mx-auto">
            I'm always excited to discuss new projects, creative ideas, or opportunities to be part of something amazing. Feel free to reach out!
          </p>
        </AnimatedElement>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <AnimatedElement delay={100}>
              <ContactForm />
            </AnimatedElement>
          </div>
          <div className="space-y-8">
            <AnimatedElement delay={200}>
              <div className="bg-card p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold font-headline !text-primary mb-4">Contact Information</h3>
                <ul className="space-y-3 text-card-foreground">
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-accent flex-shrink-0" />
                    <span>mutiur5bb@gmail.com</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-accent flex-shrink-0" />
                    <span>+880 1934 453796</span>
                  </li>
                  <li className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-accent flex-shrink-0" />
                    <span>Khulna, Bangladesh</span>
                  </li>
                </ul>
              </div>
            </AnimatedElement>
             {/* <AnimatedElement delay={300}>
              <div className="bg-card p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold font-headline !text-primary mb-4">Office Hours</h3>
                <p className="text-card-foreground">Monday - Friday: 9 AM - 6 PM (Your Timezone)</p>
                <p className="text-sm text-muted-foreground mt-1">Response typically within 24 hours.</p>
              </div>
            </AnimatedElement> */}
          </div>
        </div>
      </Container>
    </div>
  );
}
