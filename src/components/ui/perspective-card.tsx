"use client";

import { cn } from "../../lib/utils";
import { ThreeDCard } from "./3d-card";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";

interface PerspectiveCardProps {
  mode: string;
  image: string;
  description: string;
  active?: boolean;
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
  onSelect,
  fov,
  sensory,
  movement,
  abilities,
  immersion
}: PerspectiveCardProps) => {
  // Touch interaction controls
  const controls = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleDragStart = () => {
    controls.start({ scale: 0.95 });
  };

  const handleDragEnd = () => {
    controls.start({ scale: 1, x: 0, y: 0 });
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      whileTap={{ cursor: "grabbing" }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{ x, y, rotateX, rotateY }}
      className="touch-none"
    >
      <ThreeDCard
        className="perspective-card w-[95vw] md:w-[90vw] lg:w-[85vw] min-h-[32rem] lg:min-h-[38rem] cursor-pointer transform-gpu"
        onClick={() => onSelect(mode)}
      >
        <div className={cn(
          "flex flex-col lg:flex-row h-full rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm transition-all duration-300 w-full",
          active ? "border-2 border-blue-500" : "hover:border-2 hover:border-blue-500/50 border border-white/10"
        )}>
          <div className="w-full flex flex-col p-8 bg-black/40 backdrop-blur-md relative">
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80">
              <div className="relative w-full h-full">
                <Image 
                  src={image}
                  alt={`${mode} perspective`}
                  fill
                  sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
                  className="object-contain filter brightness-125 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] transform hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent mix-blend-overlay" />
              </div>
            </div>
            <div className="flex-1 flex flex-col max-w-xl relative z-10 mt-[calc(theme(spacing.40)+theme(spacing.4))] sm:mt-[calc(theme(spacing.56)+theme(spacing.6))] md:mt-[calc(theme(spacing.64)+theme(spacing.6))] lg:mt-0">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white capitalize mb-3">{mode} Perspective</h3>
                <p className="text-base text-neutral-200">{description}</p>
              </div>
              {/* Core Stats */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 text-sm text-neutral-300">
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

                  {/* Marketplace Button */}
                  <div className="mt-4">
                    <a
                      href={`https://nftify.network/marketplace/perspective/${mode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()} // Prevent card selection when clicking the button
                    >
                      <span>View in Marketplace</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Immersion Stats */}
                {immersion && (
                  <div className="border-t border-white/10 pt-3 text-xs">
                    <div className="flex justify-between mb-1">
                      <span>Reality Distortion</span>
                      <span className="text-blue-400">{immersion.realityDistortion}%</span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span>Time Flow</span>
                      <span className="text-blue-400 capitalize">{immersion.timePerception}</span>
                    </div>
                  </div>
                )}

                {/* Minting Progress */}
                <div className="border-t border-white/10 pt-4">
                  <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex justify-between text-sm text-neutral-300 mb-2">
                      <span>Minting Progress</span>
                      <span>64%</span>
                    </div>
                    <div className="w-full h-2 bg-blue-900/30 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "64%" }} />
                    </div>
                    <div className="flex justify-between text-xs text-neutral-400 mt-2">
                      <span>32/50 Minted</span>
                      <span>Floor: 0.5 ETH</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThreeDCard>
    </motion.div>
  );
};
