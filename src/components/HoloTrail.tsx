"use client";

import { useEffect, useRef } from "react";

export default function HoloTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const points: { x: number; y: number; alpha: number }[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const addPoint = (x: number, y: number) => {
      points.push({ x, y, alpha: 1 });
    };

    const mouseMove = (e: MouseEvent) => {
      addPoint(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", mouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.alpha -= 0.03;

        if (p.alpha <= 0) {
          points.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(77,243,255,${p.alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#4DF3FF";
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
