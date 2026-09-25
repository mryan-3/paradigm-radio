"use client";

import React from "react";
import { Station } from "@/types/station";

interface ExhibitionHeaderProps {
  currentStation: Station | null;
  onOpenDirectory: () => void;
}

export function ExhibitionHeader({
  currentStation,
  onOpenDirectory,
}: ExhibitionHeaderProps) {
  const stationTitle = currentStation?.name || "Pocket Radio";
  const genre = currentStation?.genre || "Archive";

  return (
    <header className="w-full flex items-start justify-between border-b border-[#E2DFD7] pb-4 mb-4 select-none">
      <div>
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-normal tracking-tight text-[#191918]">
            {stationTitle}
          </h1>
          <span className="text-xs font-mono text-[#FF4E17] font-semibold">
            1958
          </span>
        </div>
        <p className="text-xs text-[#706E66] mt-0.5 font-sans">
          Paradigm Acoustic Broadcast &bull; {genre}
        </p>
      </div>

      <button
        onClick={onOpenDirectory}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8E5DE] hover:bg-[#DDD9D0] text-[#191918] transition-colors text-xs font-medium border border-[#D5D1C7]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4E17]" />
        <span>Directory</span>
      </button>
    </header>
  );
}
