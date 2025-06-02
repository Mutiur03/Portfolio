import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-16 text-center">
      <AlertTriangle className="h-24 w-24 text-accent mb-8" />
      <h1 className="text-6xl font-bold font-headline !text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-foreground mb-6">Page Not Found</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
        <Link href="/">Return to Homepage</Link>
      </Button>
    </Container>
  );
}
