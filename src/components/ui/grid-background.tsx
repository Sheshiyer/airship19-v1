"use client";

import { cn } from "../../lib/utils";
import { useEffect, useRef } from "react";

interface GridBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  cellSize?: number;
  lineWidth?: number;
  lineColor?: string;
}

export const GridBackground = ({
  className,
  cellSize = 40,
  lineWidth = 1,
  lineColor = "#333",
  ...props
}: GridBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const drawGrid = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const render = () => {
      resizeCanvas();
      drawGrid();
    };

    window.addEventListener("resize", render);
    render();

    return () => {
      window.removeEventListener("resize", render);
    };
  }, [cellSize, lineWidth, lineColor]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-0",
        className
      )}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-[0.15]"
      />
    </div>
  );
};
