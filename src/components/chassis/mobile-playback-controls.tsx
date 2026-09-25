"use client";

import React from "react";
import { PlayIcon } from "@/components/icons/play-icon";
import { PauseIcon } from "@/components/icons/pause-icon";
import { SkipBackIcon } from "@/components/icons/skip-back-icon";
import { SkipForwardIcon } from "@/components/icons/skip-forward-icon";

interface Props {
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function MobilePlaybackControls({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-4 py-0.5">
      {onPrev && (
        <button
          onClick={onPrev}
          aria-label="Previous station"
          className="w-9 h-9 rounded-full bg-[#ECE9E2] border border-[#D5D1C7] text-[#191918] flex items-center justify-center active:scale-95 transition-all shadow-sm"
        >
          <SkipBackIcon size={14} />
        </button>
      )}
      {onTogglePlay && (
        <button
          onClick={onTogglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="w-11 h-11 rounded-full bg-[#191918] text-[#FAF7F2] flex items-center justify-center active:scale-95 transition-all shadow-md"
        >
          {isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} className="ml-0.5" />}
        </button>
      )}
      {onNext && (
        <button
          onClick={onNext}
          aria-label="Next station"
          className="w-9 h-9 rounded-full bg-[#ECE9E2] border border-[#D5D1C7] text-[#191918] flex items-center justify-center active:scale-95 transition-all shadow-sm"
        >
          <SkipForwardIcon size={14} />
        </button>
      )}
    </div>
  );
}
