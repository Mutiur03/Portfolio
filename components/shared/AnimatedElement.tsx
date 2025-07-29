"use client";
import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  delay?: number; 
  threshold?: number;
  triggerOnce?: boolean;
  animationConfig?: {
    initial: string;
    final: string;
  };
  as?: ElementType;
}

const defaultAnimation = {
  initial: 'opacity-0 translate-y-5',
  final: 'opacity-100 translate-y-0',
};

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  animationConfig = defaultAnimation,
  as: Tag = 'div',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null); 

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            if (triggerOnce && currentRef) {
              observer.unobserve(currentRef);
            }
          }, delay);
        } else {
          if (!triggerOnce) {
            setIsVisible(false);
          }
        }
      },
      { threshold }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce, delay]);

  return (
    <Tag
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? animationConfig.final : animationConfig.initial,
        className
      )}
    >
      {children}
    </Tag>
  );
};
