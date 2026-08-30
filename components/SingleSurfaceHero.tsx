import React from "react";
import { MapPin, Clock, Star, Phone, Heart, Share2 } from "lucide-react";

interface SingleSurfaceHeroProps {
  name: string;
  description: string;
  address?: string;
  hours?: string;
  phone?: string;
  rating?: number;
  reviewCount?: number;
  logoUrl?: string;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onShare?: () => void;
}

export function SingleSurfaceHero({
  name,
  description,
  address,
  hours,
  phone,
  rating,
  reviewCount,
  logoUrl,
  isSaved = false,
  onToggleSave,
  onShare,
}: SingleSurfaceHeroProps) {
  return (
    <section className="w-full">
      <div className="flex flex-col sm:flex-row gap-6 items-start justify-between">
        <div className="flex flex-col sm:flex-row gap-5 items-start flex-1">
          {logoUrl ? (
            <div 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border border-[#ECECEC] bg-cover bg-center shadow-2xs shrink-0 overflow-hidden"
              style={{ backgroundImage: `url('${logoUrl}')` }}
            />
          ) : (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border border-[#ECECEC] bg-[#F7F7F8] flex items-center justify-center font-bold text-3xl text-[#111827] select-none shrink-0 shadow-2xs">
              {name.charAt(0)}
            </div>
          )}

          <div className="space-y-2 flex-1 text-left">
            <h1 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight text-[#111827]">
              {name}
            </h1>

            <p className="text-sm font-normal text-[#4B5563] leading-relaxed max-w-2xl">
              {description}
            </p>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-normal text-[#6B7280] pt-1">
              {address && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#111827] shrink-0" />
                  <span>{address}</span>
                </div>
              )}

              {hours && (
                <>
                  <div className="hidden sm:block text-[#ECECEC]">•</div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#111827] shrink-0" />
                    <span>{hours}</span>
                  </div>
                </>
              )}

              {phone && (
                <>
                  <div className="hidden sm:block text-[#ECECEC]">•</div>
                  <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-[#111827] transition-colors">
                    <Phone className="h-3.5 w-3.5 text-[#111827] shrink-0" />
                    <span>{phone}</span>
                  </a>
                </>
              )}

              {rating && (
                <>
                  <div className="hidden sm:block text-[#ECECEC]">•</div>
                  <div className="flex items-center gap-1 text-[#111827]">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{rating.toFixed(1)}</span>
                    {reviewCount && <span className="text-[#6B7280] font-normal">({reviewCount})</span>}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Hero Actions */}
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto pt-1 sm:pt-0">
          {onToggleSave && (
            <button
              type="button"
              onClick={onToggleSave}
              className={`h-8.5 px-3.5 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs select-none ${
                isSaved
                  ? "bg-rose-50 border-rose-200 text-rose-700"
                  : "border-[#ECECEC] bg-[#FFFFFF] hover:bg-[#F7F7F8] text-[#111827]"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${isSaved ? "fill-rose-500 text-rose-500" : "text-[#6B7280]"}`} />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
          )}

          {onShare && (
            <button
              type="button"
              onClick={onShare}
              className="h-8.5 px-3.5 rounded-full border border-[#ECECEC] bg-[#FFFFFF] hover:bg-[#F7F7F8] text-[#111827] text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs select-none"
            >
              <Share2 className="h-3.5 w-3.5 text-[#6B7280]" />
              <span>Share</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
