"use client";
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  delay?: number; // in ms
  threshold?: number;
  triggerOnce?: boolean;
  animationConfig?: {
    initial: string;
    final: string;
  };
  as?: keyof JSX.IntrinsicElements; // Allows specifying the wrapping HTML element
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
  as: Tag = 'div', // Default to 'div'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null); // Ref type matches the default Tag

  useEffect(() => {
    // Ensure this code only runs on the client
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
