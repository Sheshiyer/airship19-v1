"use client";

import { cn } from "../../lib/utils";
import { useEffect, useRef } from "react";

interface EvervaultCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  text?: string;
  debug?: boolean;
}

export const EvervaultCard = ({
  className,
  children,
  text = "",
  debug = false,
  ...props
}: EvervaultCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = noiseRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const noise = (x: number, y: number, t: number) => {
      const n = x + y * 57 + t * 23;
      return (Math.sin(n) * 43758.5453123) % 1;
    };

    const drawNoise = () => {
      if (!ctx || !canvas) return;

      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          const value = noise(x, y, time) * 255;
          const cell = (x + y * canvas.width) * 4;
          data[cell] = data[cell + 1] = data[cell + 2] = value;
          data[cell + 3] = debug ? 128 : 32;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animationFrameId = requestAnimationFrame(drawNoise);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawNoise();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [debug]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <canvas
        ref={noiseRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{
          mixBlendMode: "soft-light",
        }}
      />
      {text && (
        <span className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-center text-4xl font-bold text-transparent">
          {text}
        </span>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
