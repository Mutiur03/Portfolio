import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-secondary text-secondary-foreground py-8 border-t">
      <Container className="text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="mailto:mutiur5bb@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className="hover:text-accent transition-colors">
            <Mail className="h-6 w-6" />
          </Link>
          <Link href="https://github.com/Mutiur03" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors">
            <Github className="h-6 w-6" />
          </Link>
          <Link href="https://linkedin.com/in/mutiur-rahman-mr" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors">
            <Linkedin className="h-6 w-6" />
          </Link>
        </div>
        <p className="text-sm">
          &copy; {currentYear} Mutiur Rahman.
        </p>
        <p className="text-sm">
          Made with 🩷 by Mutiur Rahman
        </p>
        <p className="text-xs text-secondary-foreground/70 mt-2">
          All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
