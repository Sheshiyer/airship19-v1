"use client";

import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabGroupProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (id: string) => void;
}

export const TabGroup = ({ 
  tabs,
  defaultTab,
  onChange 
}: TabGroupProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  return (
    <div 
      className="flex items-center gap-2"
      style={{
        "--tab-active-bg": "rgb(255, 255, 255)",
        "--tab-active-text": "rgb(0, 0, 0)",
        "--tab-inactive-text": "rgb(156, 163, 175)",
      } as React.CSSProperties}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
              "hover:text-white",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
              isActive ? "text-black" : "text-[var(--tab-inactive-text)]"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-[var(--tab-active-bg)] rounded-full"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
