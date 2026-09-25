"use client";

import React from "react";
import { HeartIcon } from "@/components/icons/heart-icon";
import { PlayIcon } from "@/components/icons/play-icon";
import { PauseIcon } from "@/components/icons/pause-icon";

interface Props {
  cleanName: string;
  rawName: string;
  nowPlayingTrack: string | null;
  genre: string;
  isPlaying?: boolean;
  isFavorite?: boolean;
  onTogglePlay?: () => void;
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
  onToggleFavorite,
}: Props) {
  return (
    <div className="flex md:hidden flex-col gap-1 w-full">
      {onTogglePlay && (
        <div className="flex justify-center mb-0.5">
          <button
            onClick={onTogglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="w-11 h-11 rounded-full bg-[#191918] text-[#FAF7F2] flex items-center justify-center active:scale-95 transition-all shadow-md"
          >
            {isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} className="ml-0.5" />}
          </button>
        </div>
      )}

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
    </div>
  );
}
