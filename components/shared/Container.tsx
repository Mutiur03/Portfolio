import { cn } from '@/lib/utils';
import type { ReactNode, ElementType } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export const Container = ({ children, className, as: Tag = 'div' }: ContainerProps) => {
  return (
    <Tag className={cn('container mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </Tag>
  );
};
