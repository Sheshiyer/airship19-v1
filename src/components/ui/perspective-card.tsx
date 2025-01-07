"use client";

import { cn } from "../../lib/utils";
import { ThreeDCard } from "./3d-card";
import Image from "next/legacy/image";

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
  immersion
}: PerspectiveCardProps) => (
  <ThreeDCard
    className="perspective-card w-full max-w-6xl min-h-[32rem] lg:min-h-[38rem] cursor-pointer transform-gpu"
    onClick={() => onSelect(mode)}
  >
    <div className={cn(
      "flex flex-col lg:flex-row h-full rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm transition-all duration-300",
      active ? "border-2 border-blue-500" : "hover:border-2 hover:border-blue-500/50 border border-white/10"
    )}>
      <div className="w-full flex flex-col p-8 bg-black/40 backdrop-blur-md relative">
        <div className="absolute top-8 right-8 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80">
          <div className="relative w-full h-full">
            <img 
              src={image} 
              alt={`${mode} perspective`}
              className="w-full h-full object-contain filter brightness-125 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] transform hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent mix-blend-overlay" />
          </div>
        </div>
        <div className="flex-1 flex flex-col max-w-xl relative z-10 mt-[calc(theme(spacing.48)+theme(spacing.8))] sm:mt-[calc(theme(spacing.56)+theme(spacing.8))] md:mt-[calc(theme(spacing.64)+theme(spacing.8))] lg:mt-0">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white capitalize mb-3">{mode} Perspective</h3>
            <p className="text-base text-neutral-200">{description}</p>
          </div>
          {/* Core Stats */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-6 text-sm text-neutral-300">
              {fov && (
                <div className="flex flex-col">
                  <span className="text-blue-400 mb-2">Field of View</span>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Horizontal</span>
                      <span className="text-blue-300">{fov.horizontal}°</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Vertical</span>
                      <span className="text-blue-300">{fov.vertical}°</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Peripheral</span>
                      <span className="text-blue-300">{fov.peripheral}%</span>
                    </div>
                  </div>
                </div>
              )}
              {movement && (
                <div className="flex flex-col">
                  <span className="text-blue-400 mb-2">Movement</span>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Type</span>
                      <span className="text-blue-300 capitalize">{movement.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Speed</span>
                      <span className="text-blue-300">{movement.speed}/100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Agility</span>
                      <span className="text-blue-300">{movement.agility}/100</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sensory & Abilities */}
            <div className="border-t border-white/10 pt-6 mt-6">
              {sensory && (
                <div className="mb-2">
                  <span className="text-blue-400 text-sm mb-3 block">Perception</span>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <span>{sensory.colorPerception.spectrum} vision</span>
                    {sensory.colorPerception.nightVision && <span>Night vision</span>}
                    {sensory.colorPerception.infrared && <span>Infrared</span>}
                    {sensory.colorPerception.ultraviolet && <span>UV sight</span>}
                  </div>
                </div>
              )}
              {abilities && abilities[0] && (
                <div>
                  <span className="text-blue-400 text-sm mb-3 block">Special Ability</span>
                  <div className="space-y-2">
                    <span className="text-lg font-medium text-white block">{abilities[0].name}</span>
                    <p className="text-sm text-neutral-300">{abilities[0].description}</p>
                    <div className="text-sm text-blue-300/80 flex gap-4">
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
