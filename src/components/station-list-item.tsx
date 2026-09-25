"use client";

import React from "react";
import { Station } from "@/types/station";
import { PlayIcon } from "@/components/icons/play-icon";
import { WavesIcon } from "@/components/icons/waves-icon";
import { HeartIcon } from "@/components/icons/heart-icon";

interface Props {
  station: Station;
  isActive: boolean;
  isPlaying: boolean;
  isFavorite: boolean;
  onSelect: (station: Station) => void;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
}

export function StationListItem({
  station,
  isActive,
  isPlaying,
  isFavorite,
  onSelect,
  onToggleFavorite,
}: Props) {
  return (
    <div
      onClick={() => onSelect(station)}
      className={`w-full text-left p-3 flex items-center justify-between group cursor-pointer transition-colors ${
        isActive ? "bg-[#E3DFD5]" : "hover:bg-[#EBE7DF]"
      }`}
    >
      <div className="flex-1 min-w-0 pr-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-[#191918] truncate">
            {station.name}
          </h3>
          <span className="text-[9px] font-mono text-[#706E66] uppercase tracking-wider shrink-0">
            {station.genre}
          </span>
        </div>
        <p className="text-xs text-[#706E66] truncate mt-0.5">
          {station.city}
          {station.state && station.state !== "US" ? `, ${station.state}` : ""}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(e, station.id);
          }}
          aria-label="Save to favorites"
          className="p-1.5 text-[#8A877F] hover:text-[#FF4E17] transition-colors"
        >
          <HeartIcon
            size={14}
            filled={isFavorite}
            className={isFavorite ? "text-[#FF4E17]" : ""}
          />
        </button>

        <div className="w-6 h-6 flex items-center justify-center text-[#191918]">
          {isActive && isPlaying ? (
            <WavesIcon isPlaying={true} />
          ) : (
            <PlayIcon size={12} />
          )}
        </div>
      </div>
    </div>
  );
}
