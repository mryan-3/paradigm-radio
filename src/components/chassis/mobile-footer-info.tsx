"use client";

import React from "react";
import { HeartIcon } from "@/components/icons/heart-icon";
import { MobilePlaybackControls } from "./mobile-playback-controls";

interface Props {
  cleanName: string;
  rawName: string;
  nowPlayingTrack: string | null;
  genre: string;
  isPlaying?: boolean;
  isFavorite?: boolean;
  onTogglePlay?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onToggleFavorite?: () => void;
}

export function MobileFooterInfo({
  cleanName,
  rawName,
  nowPlayingTrack,
  genre,
  isPlaying,
  isFavorite,
  onTogglePlay,
  onNext,
  onPrev,
  onToggleFavorite,
}: Props) {
  return (
    <div className="flex md:hidden flex-col gap-2 w-full">
      {/* Titles & Metadata */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0 flex flex-col">
          <h2 title={rawName} className="text-base font-normal tracking-tight text-[#191918] truncate leading-tight">
            {cleanName}
          </h2>
          <p className="h-5 leading-5 text-xs font-mono text-[#191918] mt-0.5 truncate font-semibold">
            {nowPlayingTrack || "\u00A0"}
          </p>
          <span className="text-[10px] text-[#706E66] font-mono mt-0.5 capitalize">{genre}</span>
        </div>
        {onToggleFavorite && (
          <button
            onClick={onToggleFavorite}
            aria-label={isFavorite ? "Remove favorite" : "Save favorite"}
            className="p-1.5 text-[#706E66] hover:text-[#FF4E17] active:scale-95 transition-all shrink-0"
          >
            <HeartIcon size={18} filled={isFavorite} className={isFavorite ? "text-[#FF4E17]" : ""} />
          </button>
        )}
      </div>

      {/* Controls Cluster Below Titles */}
      <MobilePlaybackControls
        isPlaying={isPlaying}
        onTogglePlay={onTogglePlay}
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  );
}
