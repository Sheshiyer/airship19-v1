"use client";

import { cn } from "../../lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ContainerScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  titleComponent?: React.ReactNode;
  children: React.ReactNode;
}

export const ContainerScroll = ({
  titleComponent,
  children,
  className,
  ...props
}: ContainerScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div
      ref={containerRef}
      className={cn("relative mb-[-100vh] h-[300vh] w-full", className)}
      {...props}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        {titleComponent && (
          <motion.div
            style={{ opacity }}
            className="absolute top-10 text-center"
          >
            {titleComponent}
          </motion.div>
        )}
        <motion.div
          style={{
            scale,
            opacity,
          }}
          className="relative w-full max-w-6xl px-4 md:px-8"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
