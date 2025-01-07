"use client";

import { cn } from "../../lib/utils";
import { ThreeDCard } from "./3d-card";

interface PerspectiveCardProps {
  mode: string;
  image: string;
  description: string;
  active?: boolean;
  character?: string;
  onSelect: (mode: string) => void;
}

export const PerspectiveCard = ({ 
  mode, 
  image, 
  description,
  active,
  character,
  onSelect 
}: PerspectiveCardProps) => (
  <ThreeDCard
    className={cn(
      "perspective-card w-96 h-64 cursor-pointer transition-all duration-300",
      active && "ring-2 ring-[var(--card-primary)]"
    )}
    onClick={() => onSelect(mode)}
  >
    <div className="flex flex-col h-full rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm border border-white/10 transition-colors hover:border-[var(--card-primary)]/50">
      <div className="relative h-3/4">
        <img 
          src={image} 
          alt={`${mode} perspective`}
          className="object-cover w-full h-full"
        />
        {character && (
          <img
            src={character}
            alt={`${mode} character`}
            className="absolute bottom-0 right-0 w-24 h-24 object-contain"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      <div className="p-4 bg-black/60 backdrop-blur-md h-1/4">
        <h3 className="text-xl font-bold text-white capitalize mb-1">{mode} Perspective</h3>
        <p className="text-sm text-neutral-200 line-clamp-2">{description}</p>
      </div>
    </div>
  </ThreeDCard>
);
