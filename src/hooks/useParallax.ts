"use client";

import { useEffect, useRef } from "react";

export default function useParallax(strength = 12) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * strength;
      const rotateY = -(x / rect.width) * strength;

      el.style.transform = `
        perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.03)
      `;
    };

    const reset = () => {
      el.style.transform = `
        perspective(900px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, [strength]);

  return ref;
}
