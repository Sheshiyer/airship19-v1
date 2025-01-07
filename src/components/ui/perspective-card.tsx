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
  fov?: {
    horizontal: number;
    vertical: number;
    peripheral: number;
  };
  sensory?: {
    colorPerception: {
      spectrum: "full" | "limited" | "enhanced";
      nightVision: boolean;
      infrared: boolean;
      ultraviolet: boolean;
    };
    soundPerception: {
      frequencyRange: [number, number];
      echolocation: boolean;
      directionality: "mono" | "stereo" | "surround";
    };
  };
  movement?: {
    type: "ethereal" | "quadrupedal" | "bipedal" | "hover";
    speed: number;
    agility: number;
    phaseThrough: boolean;
  };
  abilities?: Array<{
    name: string;
    description: string;
    cooldown: number;
    energyCost: number;
  }>;
  elementalAffinity?: {
    air: number;
    earth: number;
    water: number;
    aether: number;
  };
  immersion?: {
    realityDistortion: number;
    timePerception: "normal" | "dilated" | "compressed";
    dimensionalAccess: number;
    energySignature: "physical" | "spectral" | "hybrid";
  };
}

export const PerspectiveCard = ({ 
  mode, 
  image, 
  description,
  active,
  character,
  onSelect,
  fov,
  sensory,
  movement,
  abilities,
  elementalAffinity,
  immersion
}: PerspectiveCardProps) => (
  <ThreeDCard
    className={cn(
      "perspective-card w-full max-w-6xl min-h-[32rem] lg:min-h-[38rem] cursor-pointer transition-all duration-300",
      active && "ring-2 ring-[var(--card-primary)]"
    )}
    onClick={() => onSelect(mode)}
  >
    <div className="flex flex-col lg:flex-row h-full rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm border border-white/10 transition-colors hover:border-[var(--card-primary)]/50">
      <div className="relative w-full lg:w-[70%] h-[40%] lg:h-full">
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
      <div className="w-full lg:w-[30%] flex-1 lg:flex-none flex flex-col p-6 bg-black/60 backdrop-blur-md">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white capitalize mb-2">{mode} Perspective</h3>
          <p className="text-sm text-neutral-200">{description}</p>
        </div>
        
        <div className="flex-1 flex flex-col justify-between">
          {/* Core Stats */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs text-neutral-300">
              {fov && (
                <div className="flex flex-col">
                  <span className="text-blue-400 mb-1">Field of View</span>
                  <span>{fov.horizontal}°h/{fov.vertical}°v</span>
                  <span className="text-xs opacity-75">Peripheral: {fov.peripheral}%</span>
                </div>
              )}
              {movement && (
                <div className="flex flex-col">
                  <span className="text-blue-400 mb-1">Movement</span>
                  <span className="capitalize">{movement.type}</span>
                  <span className="text-xs opacity-75">Speed: {movement.speed}/100</span>
                </div>
              )}
            </div>

            {/* Sensory & Abilities */}
            <div className="border-t border-white/10 pt-3">
              {sensory && (
                <div className="mb-2">
                  <span className="text-blue-400 text-xs">Perception</span>
                  <div className="grid grid-cols-2 gap-2 mt-1 text-xs">
                    <span>{sensory.colorPerception.spectrum} vision</span>
                    {sensory.colorPerception.nightVision && <span>Night vision</span>}
                    {sensory.colorPerception.infrared && <span>Infrared</span>}
                    {sensory.colorPerception.ultraviolet && <span>UV sight</span>}
                  </div>
                </div>
              )}
              {abilities && abilities[0] && (
                <div>
                  <span className="text-blue-400 text-xs">Special Ability</span>
                  <div className="mt-1">
                    <span className="text-sm font-medium">{abilities[0].name}</span>
                    <div className="text-xs opacity-75 mt-0.5">
                      CD: {abilities[0].cooldown}s | Energy: {abilities[0].energyCost}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Immersion Stats */}
            {immersion && (
              <div className="border-t border-white/10 pt-3 text-xs">
                <div className="flex justify-between mb-1">
                  <span>Reality Distortion</span>
                  <span className="text-blue-400">{immersion.realityDistortion}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Flow</span>
                  <span className="text-blue-400 capitalize">{immersion.timePerception}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </ThreeDCard>
);
