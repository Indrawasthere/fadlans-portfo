"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface Sparkle {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export default function NeonParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  const sparkleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Create particles on mouse move
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          maxLife: 1,
          size: Math.random() * 3 + 1,
          color: Math.random() > 0.5 ? "#4DF3FF" : "#B14CFF",
        });
      }
    };

    // Create sparkles periodically - lebih banyak dan lebih sering
    const createSparkle = () => {
      // Create 3-5 sparkles sekaligus untuk efek yang lebih intens
      const sparkleCount = Math.floor(Math.random() * 3) + 3; // 3-5 sparkles
      
      const colors = ["#4DF3FF", "#B14CFF", "#FF44CC"];
      
      for (let i = 0; i < sparkleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        sparklesRef.current.push({
          x,
          y,
          life: 1,
          maxLife: 1,
          size: Math.random() * 6 + 3, // Lebih besar: 3-9
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    // Create sparkles lebih sering - setiap 0.8-1.5 seconds
    const scheduleSparkle = () => {
      const delay = Math.random() * 700 + 800; // 0.8-1.5 seconds (lebih cepat)
      sparkleTimerRef.current = setTimeout(() => {
        createSparkle();
        scheduleSparkle();
      }, delay);
    };
    // Start dengan beberapa sparkles langsung
    createSparkle();
    scheduleSparkle();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.02;
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        const alpha = particle.life;
        const isLightMode = document.documentElement.getAttribute("data-theme") === "light";
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = isLightMode 
          ? `${particle.color}${Math.floor(alpha * 80).toString(16).padStart(2, "0")}`
          : `${particle.color}${Math.floor(alpha * 150).toString(16).padStart(2, "0")}`;
        ctx.fill();
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        return particle.life > 0;
      });

      // Update and draw sparkles - lebih intens
      sparklesRef.current = sparklesRef.current.filter((sparkle) => {
        sparkle.life -= 0.02; // Lebih lambat fade out (bertahan lebih lama)

        const alpha = sparkle.life;
        const isLightMode = document.documentElement.getAttribute("data-theme") === "light";
        const color = sparkle.color;
        
        // Draw multiple layers untuk efek lebih intens
        ctx.save();
        
        // Outer glow layer
        ctx.shadowBlur = sparkle.size * 8; // Glow lebih besar
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = isLightMode
          ? `${color}${Math.floor(alpha * 120).toString(16).padStart(2, "0")}`
          : `${color}${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
        ctx.fill();
        
        // Inner bright core
        ctx.shadowBlur = sparkle.size * 4;
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = isLightMode
          ? `${color}${Math.floor(alpha * 180).toString(16).padStart(2, "0")}`
          : `${color}FF`;
        ctx.fill();
        
        // Bright center dot
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = isLightMode
          ? `${color}FF`
          : `${color}FF`;
        ctx.fill();
        
        ctx.restore();

        return sparkle.life > 0;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (sparkleTimerRef.current) {
        clearTimeout(sparkleTimerRef.current);
      }
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
