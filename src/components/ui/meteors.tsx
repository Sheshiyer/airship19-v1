"use client";

import { cn } from "../../lib/utils";
import { useEffect, useState } from "react";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors = ({ number = 20, className }: MeteorsProps) => {
  const [meteors, setMeteors] = useState<Array<{ id: number; left: number; top: number; delay: number }>>([]);

  useEffect(() => {
    const newMeteors = [...Array(number)].map((_, index) => ({
      id: index,
      left: Math.floor(Math.random() * 100),
      top: Math.floor(Math.random() * 100),
      delay: Math.random() * 1,
    }));
    setMeteors(newMeteors);
  }, [number]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className={cn(
            "absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
            "before:content-[''] before:absolute before:transform before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent"
          )}
          style={{
            top: meteor.top + "%",
            left: meteor.left + "%",
            animationDelay: meteor.delay + "s",
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );
};
