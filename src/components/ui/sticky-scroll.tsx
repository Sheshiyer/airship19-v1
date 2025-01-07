"use client";

import { cn } from "../../lib/utils";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/legacy/image";

interface Content {
  title: string;
  description: string;
  icon?: string;
}

interface StickyScrollProps {
  content: Content[];
  contentClassName?: string;
}

// Create individual hooks for each position
function usePositionTransform(
  scrollYProgress: MotionValue<number>,
  index: number,
  total: number
) {
  const translateY = useTransform(
    scrollYProgress,
    [index / total, (index + 1) / total],
    ["0%", "-100%"]
  );

  const opacity = useTransform(
    scrollYProgress,
    [
      (index - 0.5) / total,
      index / total,
      (index + 1) / total,
    ],
    [0, 1, 0]
  );

  return { translateY, opacity };
}

// Pre-define hooks for maximum number of items we expect
const MAX_ITEMS = 10;

export const StickyScroll = ({
  content,
  contentClassName,
}: StickyScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Create hooks for each possible position
  const position0 = usePositionTransform(scrollYProgress, 0, content.length);
  const position1 = usePositionTransform(scrollYProgress, 1, content.length);
  const position2 = usePositionTransform(scrollYProgress, 2, content.length);
  const position3 = usePositionTransform(scrollYProgress, 3, content.length);
  const position4 = usePositionTransform(scrollYProgress, 4, content.length);
  const position5 = usePositionTransform(scrollYProgress, 5, content.length);
  const position6 = usePositionTransform(scrollYProgress, 6, content.length);
  const position7 = usePositionTransform(scrollYProgress, 7, content.length);
  const position8 = usePositionTransform(scrollYProgress, 8, content.length);
  const position9 = usePositionTransform(scrollYProgress, 9, content.length);

  const positions = [
    position0,
    position1,
    position2,
    position3,
    position4,
    position5,
    position6,
    position7,
    position8,
    position9,
  ].slice(0, Math.min(content.length, MAX_ITEMS));

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="relative w-full">
          {content.slice(0, MAX_ITEMS).map((item, index) => (
            <motion.div
              key={item.title + index}
              style={{
                opacity: positions[index].opacity,
                translateY: positions[index].translateY,
              }}
              className={cn(
                "absolute top-0 left-0 w-full px-4",
                contentClassName
              )}
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-6">
                  {item.icon && (
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-black/40 backdrop-blur-sm border border-white/10">
                      <div className="relative w-6 h-6">
                        <Image 
                          src={item.icon} 
                          alt={item.title}
                          layout="fill"
                          objectFit="contain"
                          className="invert"
                        />
                      </div>
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
          ))}
        </div>
      </div>
    </div>
  );
};
