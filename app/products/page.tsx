import Link from 'next/link';
import { ArrowRight, Boxes } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { productsData } from '@/lib/products';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      <Container className="py-16 md:py-20">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium">
            <Boxes className="h-4 w-4 text-accent" />
            Products
          </div>
          <h1 className="mb-4 text-4xl font-bold text-primary md:text-6xl">
            Tools You Can Use
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore products and utilities I build for real-world use.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {productsData.map((product) => (
            <Card key={product.href} className="flex h-full flex-col transition-shadow hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="mb-5 text-foreground/80">{product.description}</p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="p-0 text-accent">
                  <Link href={product.href}>
                    Open Product <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}
