"use client";

import React, { useRef } from "react";
import { Station } from "@/types/station";
import { allStations } from "@/data";

interface FrequencyTapeProps {
  currentStation: Station | null;
  onSelectStation: (station: Station) => void;
}

export function FrequencyTape({
  currentStation,
  onSelectStation,
}: FrequencyTapeProps) {
  const tapeRef = useRef<HTMLDivElement>(null);
  const total = allStations.length;
  const currentIndex = currentStation
    ? allStations.findIndex((s) => s.id === currentStation.id)
    : 0;

  const activePercent =
    total > 1 ? Math.max(0, Math.min(100, (currentIndex / (total - 1)) * 100)) : 50;

  const handlePointerDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tapeRef.current || total === 0) return;
    const rect = tapeRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetIdx = Math.min(total - 1, Math.floor(ratio * total));
    onSelectStation(allStations[targetIdx]);
  };

  return (
    <div className="w-full flex flex-col gap-1.5 sm:gap-2 select-none py-1.5 sm:py-3 cursor-pointer">
      <div
        ref={tapeRef}
        onClick={handlePointerDown}
        className="relative w-full h-8 flex items-end border-b border-[#D5D1C7] overflow-hidden"
      >
        {Array.from({ length: 48 }).map((_, i) => {
          const isMajor = i % 6 === 0;
          const isMedium = i % 3 === 0;
          const height = isMajor ? "h-5" : isMedium ? "h-3" : "h-2";
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end">
              <span
                className={`w-[1px] ${
                  isMajor ? "bg-[#191918]" : "bg-[#A6A39B]"
                } ${height}`}
              />
            </div>
          );
        })}

        {/* Dynamic Vermillion Needle Positioned at Current Station */}
        <div
          className="absolute bottom-0 w-[2px] h-7 bg-[#FF4E17] z-10 transition-all duration-200 pointer-events-none"
          style={{ left: `${activePercent}%` }}
        >
          <div className="w-2 h-2 rounded-full bg-[#FF4E17] -ml-[3px] -mt-1 shadow-sm" />
        </div>
      </div>

      <div className="flex justify-between text-[11px] font-mono text-[#706E66] px-1 pointer-events-none">
        <span>88.0</span>
        <span>94.0</span>
        <span className="text-[#191918] font-medium">101.2</span>
        <span>104.0</span>
        <span>108.0</span>
      </div>
    </div>
  );
}
