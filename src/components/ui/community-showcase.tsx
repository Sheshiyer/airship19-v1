"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Achievement {
  title: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  count: number;
}

interface Stats {
  totalMembers: number;
  activeToday: number;
  perspectivesShared: number;
  witnessCount: number;
}

interface CommunityShowcaseProps {
  stats: Stats;
  achievements: Achievement[];
}

const rarityColors = {
  common: "bg-neutral-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-yellow-500"
};

export const CommunityShowcase = ({ stats, achievements }: CommunityShowcaseProps) => {
  return (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(stats).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
            <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {value.toLocaleString()}
              </div>
              <div className="text-sm text-neutral-400 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
            <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${rarityColors[achievement.rarity]}`}>
                  <Image
                    src={achievement.icon}
                    alt={achievement.title}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-neutral-300 mb-3">
                    {achievement.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 flex-1 rounded-full bg-black/50 border border-white/5`}>
                      <div
                        className={`h-full rounded-full ${rarityColors[achievement.rarity]} transition-all duration-500`}
                        style={{ width: `${(achievement.count / 100) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-neutral-400">
                      {achievement.count}/100
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
