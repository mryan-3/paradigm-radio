"use client";

import React from "react";
import { Station } from "@/types/station";
import { useCurrentTime } from "@/hooks/use-current-time";
import { HeartIcon } from "@/components/icons/heart-icon";
import { RadioMascot } from "./radio-mascot";

interface ExhibitionHeaderProps {
  currentStation: Station | null;
  nowPlayingTrack: string | null;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onOpenDirectory: () => void;
}

export function ExhibitionHeader({
  currentStation,
  nowPlayingTrack,
  isFavorite = false,
  onToggleFavorite,
  onOpenDirectory,
}: ExhibitionHeaderProps) {
  const { time, date } = useCurrentTime();
  const rawName = currentStation?.name || "Select Station";
  const cleanTitle = rawName.includes("|") ? rawName.split("|")[0].trim() : rawName;
  const genre = currentStation?.genre || "Roots";

  return (
    <header className="w-full flex items-start justify-between border-b border-[#D5D1C7] pb-3 md:pb-4 mb-2 md:mb-3 select-none">
      {/* Mobile Mascot Avatar */}
      <div className="flex md:hidden items-center">
        <RadioMascot size={38} />
      </div>

      {/* Desktop Station Name, Track, and Genre */}
      <div className="hidden md:flex flex-col flex-1 min-w-0 pr-4">
        <h1
          title={rawName}
          className="text-xl sm:text-2xl md:text-3xl font-normal tracking-tight text-[#191918] truncate leading-tight"
        >
          {cleanTitle}
        </h1>
        <p className="h-5 leading-5 text-xs sm:text-sm font-mono text-[#191918] mt-0.5 truncate font-semibold">
          {nowPlayingTrack || "\u00A0"}
        </p>
        <div className="text-[11px] font-mono text-[#706E66] mt-0.5 flex items-center gap-1.5">
          <span className="capitalize">{genre}</span>
          {date && time && <span>&bull; {date} {time}</span>}
        </div>
      </div>

      {/* Header Actions (Mascot, Favorite, Stations Directory) */}
      <div className="ml-auto shrink-0 flex items-center gap-2">
        <RadioMascot size={44} className="hidden md:flex" />
        {onToggleFavorite && (
          <button
            onClick={onToggleFavorite}
            aria-label={isFavorite ? "Remove favorite" : "Save favorite"}
            className="hidden md:flex p-2 text-[#706E66] hover:text-[#FF4E17] active:scale-95 transition-all shrink-0"
          >
            <HeartIcon size={18} filled={isFavorite} className={isFavorite ? "text-[#FF4E17]" : ""} />
          </button>
        )}
        <button
          onClick={onOpenDirectory}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 border-2 border-[#191918] bg-transparent text-[#191918] hover:bg-[#191918] hover:text-[#FAF7F2] transition-colors text-xs font-mono tracking-wider uppercase font-semibold"
        >
          <span>Stations</span>
          <span className="text-[10px] leading-none">&#x25BE;</span>
        </button>
      </div>
    </header>
  );
}
