import React from "react";
import { Clock, ChevronRight } from "lucide-react";

interface DividerListRowProps {
  title: string;
  description?: string;
  duration?: number;
  price: number;
  currency?: string;
  buttonLabel?: string;
  onSelect?: () => void;
}

export function DividerListRow({
  title,
  description,
  duration,
  price,
  currency = "€",
  buttonLabel = "Book",
  onSelect,
}: DividerListRowProps) {
  return (
    <div className="group py-4 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-2xl hover:bg-[#F7F7F8] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1 flex-1 text-left pr-2 sm:pr-6">
        <h3 className="font-semibold text-sm sm:text-base text-[#111827] group-hover:text-[#000000] transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-xs font-normal text-[#4B5563] leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
        {duration && (
          <div className="flex items-center gap-1.5 pt-0.5 text-xs text-[#6B7280] font-normal">
            <Clock className="h-3.5 w-3.5 text-[#6B7280]" />
            <span>{duration} mins</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-1 sm:pt-0">
        <span className="font-display font-semibold text-base sm:text-lg text-[#111827]">
          {currency}{price.toFixed(2)}
        </span>

        {onSelect && (
          <button
            type="button"
            onClick={onSelect}
            className="h-8.5 px-4 rounded-full bg-[#111827] hover:bg-[#262626] text-white font-medium text-xs transition-all shadow-2xs flex items-center justify-center gap-1 cursor-pointer active:scale-95"
          >
            <span>{buttonLabel}</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        )}
      </div>
    </div>
  );
}
