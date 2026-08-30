import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SiriFocalPickerProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onChange: (val: number) => void;
}

export function SiriFocalPicker({
  value,
  min = 0,
  max = 100,
  step = 0.5,
  unit = "%",
  onChange,
}: SiriFocalPickerProps) {
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isEditing, setIsEditing] = useState(false);
  const [customText, setCustomText] = useState(value.toFixed(1));

  const prevVal = Math.max(min, value - step);
  const nextVal = Math.min(max, value + step);

  const handleStepForward = () => {
    if (value < max) {
      setDirection("forward");
      const newVal = Math.min(max, Math.round((value + step) * 10) / 10);
      onChange(newVal);
      setCustomText(newVal.toFixed(1));
    }
  };

  const handleStepBackward = () => {
    if (value > min) {
      setDirection("backward");
      const newVal = Math.max(min, Math.round((value - step) * 10) / 10);
      onChange(newVal);
      setCustomText(newVal.toFixed(1));
    }
  };

  return (
    <div className="flex items-center justify-center gap-1.5 select-none bg-[#F7F7F8] p-1.5 rounded-full border border-[#ECECEC] w-fit mx-auto">
      {/* Left Stepper Button */}
      <button
        type="button"
        onClick={handleStepBackward}
        disabled={value <= min}
        className="w-7 h-7 rounded-full bg-white hover:bg-[#EBECEE] text-[#4B5563] hover:text-[#111827] flex items-center justify-center transition-colors disabled:opacity-30 cursor-pointer shadow-2xs active:scale-90"
        aria-label="Decrease value"
      >
        <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
      </button>

      {/* 1. Left Adjacent Ghost Step */}
      <button
        type="button"
        onClick={handleStepBackward}
        className="px-2 py-0.5 text-xs text-[#9CA3AF] hover:text-[#4B5563] font-normal transition-colors"
      >
        {prevVal.toFixed(1)}{unit}
      </button>

      {/* 2. Center Active Focus Pill */}
      <div className="relative min-w-[72px] h-7 bg-white rounded-full border border-[#E5E7EB] shadow-xs flex items-center justify-center px-2.5 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.span
            key={value}
            custom={direction}
            initial={{ opacity: 0, x: direction === "forward" ? 14 : -14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === "forward" ? -14 : 14 }}
            transition={{ type: "spring", stiffness: 480, damping: 34 }}
            className="font-semibold text-xs text-[#111827] tracking-tight whitespace-nowrap"
          >
            {value.toFixed(1)}{unit}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* 3. Right Adjacent Ghost Step */}
      <button
        type="button"
        onClick={handleStepForward}
        className="px-2 py-0.5 text-xs text-[#9CA3AF] hover:text-[#4B5563] font-normal transition-colors"
      >
        {nextVal.toFixed(1)}{unit}
      </button>

      {/* Right Stepper Button */}
      <button
        type="button"
        onClick={handleStepForward}
        disabled={value >= max}
        className="w-7 h-7 rounded-full bg-white hover:bg-[#EBECEE] text-[#4B5563] hover:text-[#111827] flex items-center justify-center transition-colors disabled:opacity-30 cursor-pointer shadow-2xs active:scale-90"
        aria-label="Increase value"
      >
        <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
      </button>
    </div>
  );
}
