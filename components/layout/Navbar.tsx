"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu, X, ArrowUpRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Container } from '@/components/shared/Container';
import { useTheme } from 'next-themes';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About me' },
  { href: '/#work', label: 'My Work' },
  { href: '/#services', label: 'Services' },
  { href: '/#contact-cta', label: 'Contact me' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    setIsMounted(true);

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));


    const handleScroll = () => {
      if (window.scrollY < 200 && pathname === '/') {
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', handleScroll);


    return () => {
      sections.forEach(section => observer.unobserve(section));
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    navItems.map((item) => {
      const isCurrentPageRoot = pathname === '/';

      let isActive = false;
      if (item.href === '/') {
        isActive = isCurrentPageRoot && (activeSection === '' || activeSection === 'hero');
      } else if (item.href.startsWith('/#')) {
        isActive = isCurrentPageRoot && activeSection === item.href.substring(2);
      } else {
        isActive = pathname === item.href;
      }

      const handleClick = (e: React.MouseEvent) => {
        if (item.href === '/' && isCurrentPageRoot) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (item.href.startsWith('/#') && isCurrentPageRoot) {
          e.preventDefault();
          const targetId = item.href.substring(2);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
        if (mobile) setIsMobileMenuOpen(false);
      };

      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={handleClick}
          className={cn(
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            isActive
              ? 'text-accent'
              : 'text-foreground/70 hover:text-foreground',
            mobile && 'block w-full text-left text-lg py-3 hover:text-accent'
          )}
          aria-current={isActive ? 'page' : undefined}
        >
          {item.label}
        </Link>
      );
    })
  );

  if (!isMounted) {
    return (
      <header className="bg-background/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 text-foreground">
        <Container className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold font-headline">
            Mutiur<span className="text-accent">.</span>
          </Link>
          <div className="hidden md:flex items-center space-x-2">

            <div className="w-16 h-8 bg-muted/20 rounded-md animate-pulse"></div>
            <div className="w-20 h-8 bg-muted/20 rounded-md animate-pulse"></div>
            <div className="w-20 h-8 bg-muted/20 rounded-md animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted/20 rounded-full animate-pulse"></div>
            <div className="hidden md:block w-24 h-10 bg-muted/20 rounded-full animate-pulse"></div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </Container>
      </header>
    );
  }

  return (
    <header className="bg-background/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 text-foreground">
      <Container className="flex items-center justify-between h-20">
        <Link href="/" className="text-2xl font-bold font-headline">
          Mutiur<span className="text-accent">.</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
            className="text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-full"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          <Button asChild variant="ghost" size="icon" className="hidden md:flex text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-full">
            <Link href="https://github.com/Mutiur03" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </Button>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background text-foreground p-6 w-[280px] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <Link href="/" className="text-xl font-bold font-headline" onClick={() => setIsMobileMenuOpen(false)}>
                    Mutiur<span className="text-accent">.</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-full">
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-3">
                  <NavLinks mobile />
                  <Button asChild variant="outline" className="w-full rounded-full mt-4 border-foreground/30 hover:border-accent hover:text-accent">
                    <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
