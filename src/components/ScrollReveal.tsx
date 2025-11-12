"use client";

import { useEffect, useRef, useState } from "react";
import { RevealFx } from "@once-ui-system/core";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  translateY?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  translateY = 16,
  className = ""
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing to prevent re-triggering
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "50px 0px -50px 0px", // Start animation 50px before element enters viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {isVisible && (
        <RevealFx translateY={translateY} delay={delay}>
          {children}
        </RevealFx>
      )}
    </div>
  );
}
