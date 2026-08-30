import React, { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";

export type LanguageCode = "EN" | "SK" | "UA" | "DE";

interface CleanLanguageDropdownProps {
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

const LANGUAGES = [
  { code: "EN" as const, label: "English", flag: "🇬🇧" },
  { code: "SK" as const, label: "Slovenčina", flag: "🇸🇰" },
  { code: "UA" as const, label: "Українська", flag: "🇺🇦" },
  { code: "DE" as const, label: "Deutsch", flag: "🇩🇪" },
];

export function CleanLanguageDropdown({
  language,
  onLanguageChange,
}: CleanLanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8.5 px-3 rounded-full border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F7F7F8] text-[#4B5563] hover:text-[#111827] flex items-center gap-1.5 text-xs font-medium transition-colors shadow-2xs cursor-pointer select-none"
        aria-expanded={isOpen}
      >
        <Globe className="h-3.5 w-3.5 stroke-[1.8]" />
        <span>{language}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.12)] p-1 z-50 animate-in fade-in zoom-in-95 duration-100">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                onLanguageChange(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                language === lang.code
                  ? "bg-[#F7F7F8] font-semibold text-[#111827]"
                  : "text-[#4B5563] hover:bg-[#F7F7F8] hover:text-[#111827] font-normal"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </div>
              {language === lang.code && (
                <Check className="h-3.5 w-3.5 text-[#111827] stroke-[2.5]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
