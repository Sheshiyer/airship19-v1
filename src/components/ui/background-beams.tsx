"use client";

import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      requestAnimationFrame(() => {
        container.style.setProperty("--x", x.toString());
        container.style.setProperty("--y", y.toString());
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 z-0 bg-black",
        className
      )}
      style={{
        "--x": "0",
        "--y": "0",
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_var(--x)_var(--y),rgba(255,255,255,0.06),transparent_40%)]" />
    </div>
  );
};
