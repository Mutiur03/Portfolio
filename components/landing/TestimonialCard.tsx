import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { Testimonial } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.author.split(' ').map(n => n[0]).join('').toUpperCase();
  return (
    <Card className="h-full flex flex-col bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          {testimonial.avatarUrl && <AvatarImage src={testimonial.avatarUrl} alt={testimonial.author} data-ai-hint={testimonial.dataAiHint || 'person avatar'} />}
          <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-card-foreground">{testimonial.author}</p>
          {testimonial.company && <p className="text-sm text-muted-foreground">{testimonial.company}</p>}
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-2">
        <div className="flex mb-2">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-accent fill-accent" />
            ))}
        </div>
        <p className="italic text-card-foreground/90">&ldquo;{testimonial.quote}&rdquo;</p>
      </CardContent>
    </Card>
  );
}
