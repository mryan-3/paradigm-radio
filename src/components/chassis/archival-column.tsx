"use client";

import React from "react";

interface ArchivalColumnProps {
  isPlaying?: boolean;
}

export function ArchivalColumn({ isPlaying }: ArchivalColumnProps) {
  return (
    <aside className="relative w-24 sm:w-32 md:w-44 lg:w-52 shrink-0 bg-[#191918] text-[#FAF7F2] flex flex-col justify-between items-center py-6 select-none border-r-[6px] border-[#141413] overflow-hidden">
      {/* Top Section with Machined Fastener & Radio Headline */}
      <div className="flex flex-col items-center gap-4 z-10">
        <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#3E3C38]">
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
          <line x1="3" y1="6" x2="9" y2="6" stroke="currentColor" strokeWidth="1" />
          <line x1="6" y1="3" x2="6" y2="9" stroke="currentColor" strokeWidth="1" />
        </svg>

        <span className="text-sm sm:text-base md:text-lg font-mono tracking-[0.3em] text-[#FAF7F2] uppercase font-semibold">
          RADIO
        </span>
      </div>

      {/* Massive Glowing PARADIGM Watermark */}
      <div className="relative flex items-center justify-center my-auto z-10 w-full h-full">
        <span
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter text-transparent [writing-mode:vertical-lr] rotate-180 select-none pointer-events-none transition-all duration-700 ${
            isPlaying
              ? "[-webkit-text-stroke:1.5px_rgba(250,247,242,0.45)] drop-shadow-[0_0_22px_rgba(250,247,242,0.25)] animate-pulse"
              : "[-webkit-text-stroke:1.2px_rgba(250,247,242,0.18)]"
          }`}
        >
          PARADIGM
        </span>
      </div>

      {/* Bottom Section with Machined Fastener */}
      <div className="z-10">
        <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#3E3C38]">
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
          <line x1="3" y1="6" x2="9" y2="6" stroke="currentColor" strokeWidth="1" />
          <line x1="6" y1="3" x2="6" y2="9" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute inset-y-0 right-0 w-[1px] bg-white/5 pointer-events-none" />
    </aside>
  );
}
