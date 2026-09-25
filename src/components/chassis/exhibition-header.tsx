"use client";

import React from "react";
import { Station } from "@/types/station";
import { useCurrentTime } from "@/hooks/use-current-time";

interface ExhibitionHeaderProps {
  currentStation: Station | null;
  nowPlayingTrack: string | null;
  onOpenDirectory: () => void;
}

export function ExhibitionHeader({
  currentStation,
  nowPlayingTrack,
  onOpenDirectory,
}: ExhibitionHeaderProps) {
  const { time, date } = useCurrentTime();
  const rawName = currentStation?.name || "Paradigm Radio";
  const cleanTitle = rawName.includes("|")
    ? rawName.split("|")[0].trim()
    : rawName;

  return (
    <header className="w-full flex items-start justify-between gap-4 border-b border-[#D5D1C7] pb-4 mb-4 select-none">
      <div className="flex-1 min-w-0 flex flex-col">
        <h1
          title={rawName}
          className="text-xl sm:text-2xl md:text-3xl font-normal tracking-tight text-[#191918] truncate"
        >
          {cleanTitle}
        </h1>

        <p className="text-xs sm:text-sm font-mono text-[#191918] mt-1 truncate">
          {nowPlayingTrack ? (
            <span className="font-semibold text-[#191918]">
              {nowPlayingTrack}
            </span>
          ) : (
            <span className="text-[#706E66]">Live Broadcast</span>
          )}
        </p>

        {date && time && (
          <span className="text-[11px] font-mono text-[#706E66] mt-1">
            {date} &bull; {time}
          </span>
        )}
      </div>

      <button
        onClick={onOpenDirectory}
        className="shrink-0 px-4 py-2 border-2 border-[#191918] bg-transparent text-[#191918] hover:bg-[#191918] hover:text-[#FAF7F2] transition-colors text-xs font-mono tracking-wider uppercase font-semibold"
      >
        Stations
      </button>
    </header>
  );
}
