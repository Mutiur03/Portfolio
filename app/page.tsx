"use client";
import { HeroSection } from '@/components/landing/HeroSection';
import { AboutMeSection } from '@/components/landing/AboutMeSection';
import { SkillsSection } from '@/components/landing/SkillsSection';
import { ProjectsPreview } from '@/components/landing/ProjectsPreview';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { ContactCTA } from '@/components/landing/ContactCTA';

export default function HomePage() {
  return (
    <>
      <section id="home" className="scroll-mt-20">
        <HeroSection />
      </section>
      <section id="about" className="scroll-mt-20">
        <AboutMeSection />
      </section>
      <section id="work" className="scroll-mt-20">
        <ProjectsPreview />
      </section>
      <section id="services" className="scroll-mt-20">
        <SkillsSection />
      </section>
          <section id="contact-cta" className="scroll-mt-20">
        <ContactCTA />
      </section>
    </>
  );
}
