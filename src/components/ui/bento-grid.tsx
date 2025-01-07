"use client";

import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    title: string;
    description: string;
    icon?: string;
    priority?: "high" | "normal";
    header?: string;
    className?: string;
  }[];
}

export const BentoGrid = ({ items, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-4",
        className
      )}
      {...props}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          viewport={{ once: true }}
          className={cn(
            "group relative rounded-3xl border border-white/10 bg-black/40 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300",
            item.priority === "high" ? "md:col-span-2 md:row-span-2" : "",
            item.className
          )}
        >
          {item.header && (
            <span className="inline-block px-3 py-1 mb-4 text-xs font-mono text-blue-300 bg-blue-900/30 rounded-full">
              {item.header}
            </span>
          )}
          <div className="flex items-center gap-4 mb-4">
            {item.icon && (
              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-black/50 to-black/20 border border-white/10 group-hover:border-white/20 transition-colors duration-300">
                <img 
                  src={item.icon} 
                  alt={item.title}
                  className="w-6 h-6 object-contain invert opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            )}
            <h3 className="text-xl font-bold text-neutral-100 group-hover:text-white transition-colors duration-300">
              {item.title}
            </h3>
          </div>
          <p className={cn(
            "text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300",
            item.priority === "high" ? "text-lg" : "text-base line-clamp-3"
          )}>
            {item.description}
          </p>
          <div 
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/[0.05] group-hover:to-blue-500/0 transition-all duration-500"
            style={{
              maskImage: "radial-gradient(circle at center, transparent 50%, black 150%)",
              WebkitMaskImage: "radial-gradient(circle at center, transparent 50%, black 150%)"
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};
