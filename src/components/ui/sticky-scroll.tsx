"use client";

import { cn } from "../../lib/utils";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface Content {
  title: string;
  description: string;
  icon?: string;
}

interface StickyScrollProps {
  content: Content[];
  contentClassName?: string;
}

export const StickyScroll = ({
  content,
  contentClassName,
}: StickyScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="relative w-full">
          {content.map((item, index) => {
            const translateY = useTransform(
              scrollYProgress,
              [index / content.length, (index + 1) / content.length],
              ["0%", "-100%"]
            );

            const opacity = useTransform(
              scrollYProgress,
              [
                (index - 0.5) / content.length,
                index / content.length,
                (index + 1) / content.length,
              ],
              [0, 1, 0]
            );

            return (
              <motion.div
                key={item.title + index}
                style={{ opacity, translateY }}
                className={cn(
                  "absolute top-0 left-0 w-full px-4",
                  contentClassName
                )}
              >
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-6">
                    {item.icon && (
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-black/40 backdrop-blur-sm border border-white/10">
                        <img 
                          src={item.icon} 
                          alt={item.title}
                          className="w-6 h-6 object-contain invert"
                        />
                      </div>
                    )}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">
                        {item.title}
                      </h2>
                      <p className="text-lg text-neutral-200">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
