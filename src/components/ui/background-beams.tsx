"use client";

import { cn } from "../../lib/utils";
import { useEffect, useRef } from "react";

interface Beam {
  x: string;
  y: string;
  size: string;
  color: string;
}

const defaultBeams: Beam[] = [
  { x: "20", y: "30", size: "400", color: "#4c7eff" },
  { x: "80", y: "20", size: "300", color: "#9333ea" },
  { x: "50", y: "50", size: "500", color: "#2563eb" },
  { x: "10", y: "80", size: "250", color: "#7c3aed" },
  { x: "90", y: "90", size: "350", color: "#db2777" },
];

interface BackgroundBeamsProps extends React.HTMLAttributes<HTMLDivElement> {
  beams?: Beam[];
}

export const BackgroundBeams = ({ 
  className,
  beams = defaultBeams,
  ...props 
}: BackgroundBeamsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const renderBeam = (beam: Beam) => {
      if (!ctx) return;

      const x = parseFloat(beam.x) / 100 * canvas.width;
      const y = parseFloat(beam.y) / 100 * canvas.height;
      const size = parseFloat(beam.size);

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, `${beam.color}50`);
      gradient.addColorStop(0.5, `${beam.color}25`);
      gradient.addColorStop(1, `${beam.color}00`);

      ctx.fillStyle = gradient;
      ctx.fillRect(x - size, y - size, size * 2, size * 2);
    };

    const render = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw fixed beams
      beams.forEach(renderBeam);

      // Draw interactive beam following mouse
      const mouseBeam = {
        x: `${(mousePosition.current.x / canvas.width) * 100}`,
        y: `${(mousePosition.current.y / canvas.height) * 100}`,
        size: "200",
        color: "#60a5fa"
      };
      renderBeam(mouseBeam);

      requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);

    resizeCanvas();
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [beams]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_25%,black)]",
        "after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0),rgba(0,0,0,0.4))]",
        className
      )}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
      />
    </div>
  );
};
