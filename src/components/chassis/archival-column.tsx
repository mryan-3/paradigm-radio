"use client";

import React from "react";

interface ArchivalColumnProps {
  label?: string;
  year?: string;
}

export function ArchivalColumn({
  label = "PARADIGM",
  year = "1958",
}: ArchivalColumnProps) {
  return (
    <aside className="w-16 sm:w-20 md:w-24 shrink-0 bg-[#1C1B1A] text-[#FAF7F2] flex flex-col justify-between items-center py-8 select-none border-r border-[#2D2B28]">
      {/* Top Index Marker */}
      <div className="flex flex-col items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#FF4E17]" />
        <span className="text-[10px] tracking-widest font-mono text-[#8A877F] uppercase">
          T3
        </span>
      </div>

      {/* Hero Rotated Archival Typography (Matching Braun Ref 1) */}
      <div className="flex flex-col items-center justify-center my-auto">
        <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter text-[#FAF7F2] [writing-mode:vertical-lr] rotate-180">
          {year}
        </span>
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#8A877F] [writing-mode:vertical-lr] rotate-180 mt-4 uppercase">
          {label}
        </span>
      </div>

      {/* Bottom Model Tag */}
      <div className="text-[9px] font-mono text-[#6E6B63] [writing-mode:vertical-lr] rotate-180">
        MODEL T3 / GERMANY
      </div>
    </aside>
  );
}
