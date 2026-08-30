import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface FrostedHeaderProps {
  brandName?: string;
  backHref?: string;
  backLabel?: string;
  children?: React.ReactNode;
}

export function FrostedHeader({
  brandName = "rezervehere",
  backHref,
  backLabel = "Back",
  children,
}: FrostedHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md [transform:translateZ(0)] border-b border-[#ECECEC] h-16 md:h-20 flex items-center shadow-2xs px-6 md:px-12">
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center select-none shrink-0 group">
          <span className="font-display font-semibold text-xl md:text-2xl text-[#111827] tracking-tight group-hover:opacity-80 transition-opacity">
            {brandName}
          </span>
        </Link>

        <div className="flex items-center gap-2.5">
          {backHref && (
            <Link
              href={backHref}
              className="h-8.5 px-3.5 rounded-full border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F7F7F8] text-[#4B5563] hover:text-[#111827] flex items-center gap-1.5 text-xs font-medium transition-colors shadow-2xs"
            >
              <ArrowLeft className="h-3.5 w-3.5 stroke-[2]" />
              <span>{backLabel}</span>
            </Link>
          )}
          {children}
        </div>
      </div>
    </header>
  );
}
