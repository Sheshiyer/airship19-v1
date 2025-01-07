"use client";

import { cn } from "../../lib/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SparkleType {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
    zIndex: number;
  };
}

const DEFAULT_COLOR = "#FFC700";
const generateSparkle = (color: string = DEFAULT_COLOR): SparkleType => {
  return {
    id: Math.random().toString(36).slice(2),
    createdAt: Date.now(),
    color,
    size: Math.random() * 10 + 10,
    style: {
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      zIndex: 2,
    },
  };
};

interface SparklesProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  children: React.ReactNode;
  sparklesEnabled?: boolean;
}

export const SparklesPreview = ({
  color = DEFAULT_COLOR,
  children,
  sparklesEnabled = true,
  className,
  ...props
}: SparklesProps) => {
  const [sparkles, setSparkles] = useState<SparkleType[]>([]);

  useEffect(() => {
    if (!sparklesEnabled) return;

    const generateSparkles = () => {
      const now = Date.now();
      const sparkle = generateSparkle(color);
      const nextSparkles = [...sparkles, sparkle].filter(
        (sp) => now - sp.createdAt < 1000
      );
      setSparkles(nextSparkles);
    };

    const intervalId = setInterval(generateSparkles, 50);

    return () => clearInterval(intervalId);
  }, [color, sparkles, sparklesEnabled]);

  return (
    <div className={cn("relative inline-block", className)} {...props}>
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

interface SparkleProps {
  size: number;
  color: string;
  style: React.CSSProperties;
}

const Sparkle = ({ size, color, style }: SparkleProps) => {
  const path =
    "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 71 34 71C34 71 35.6597 50.7065 43.5 43.5C51.6455 36.0044 71 34 71 34C71 34 51.6947 32.5684 43.5 25.5C36.5605 19.1679 34 0 34 0C34 0 33.395 18.7498 26.5 25.5Z";

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
      style={style}
      className="absolute pointer-events-none"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 68 68"
        fill="none"
        className="animate-spin-slow"
      >
        <path d={path} fill={color} transform="scale(0.66)" />
      </svg>
    </motion.div>
  );
};
