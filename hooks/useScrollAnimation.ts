import { useEffect, useRef, useState } from 'react';

// This is a simplified hook. In a real app, you'd likely use a more robust
// library like Framer Motion's `useInView` for better performance and control.
export const useScrollAnimation = () => {
  const ref = useRef<HTMLElement>(null);
  const [controls, setControls] = useState('hidden');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('fade-in-visible');
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return { ref, controls };
};
