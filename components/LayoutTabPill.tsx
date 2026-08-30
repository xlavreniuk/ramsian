import React from "react";
import { motion } from "motion/react";

interface LayoutTabPillProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function LayoutTabPill({ tabs, activeTab, onTabChange }: LayoutTabPillProps) {
  return (
    <div className="flex bg-[#F7F7F8] p-1 rounded-full border border-[#ECECEC] w-fit">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`relative px-3.5 py-1 text-xs font-medium rounded-full transition-colors z-10 select-none cursor-pointer ${
              isActive ? "text-[#111827]" : "text-[#6B7280] hover:text-[#111827]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-white rounded-full shadow-2xs -z-10"
                transition={{ type: "spring", stiffness: 480, damping: 34 }}
              />
            )}
            <span>{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
