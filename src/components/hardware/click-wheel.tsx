"use client";

import React from "react";
import { PlayIcon } from "@/components/icons/play-icon";
import { PauseIcon } from "@/components/icons/pause-icon";
import { SkipForwardIcon } from "@/components/icons/skip-forward-icon";
import { SkipBackIcon } from "@/components/icons/skip-back-icon";

interface ClickWheelProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ClickWheel({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
}: ClickWheelProps) {
  return (
    <div className="relative flex items-center justify-center w-52 h-52 sm:w-60 sm:h-60 md:w-68 md:h-68 lg:w-72 lg:h-72 rounded-full bg-[#1C1B1A] shadow-[0_4px_20px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)] select-none shrink-0">
      {/* Top Alignment Mark */}
      <div className="absolute top-2.5 sm:top-4 flex gap-1 pointer-events-none">
        <span className="w-1 h-1 rounded-full bg-[#52504B]" />
        <span className="w-1 h-1 rounded-full bg-[#52504B]" />
      </div>

      {/* Left Previous Button */}
      <button
        onClick={onPrev}
        aria-label="Previous station"
        className="absolute left-2 sm:left-4 p-2 text-[#8A877F] hover:text-[#FAF7F2] active:scale-95 transition-all"
      >
        <SkipBackIcon size={14} className="sm:w-4 sm:h-4" />
      </button>

      {/* Right Next Button */}
      <button
        onClick={onNext}
        aria-label="Next station"
        className="absolute right-2 sm:right-4 p-2 text-[#8A877F] hover:text-[#FAF7F2] active:scale-95 transition-all"
      >
        <SkipForwardIcon size={14} className="sm:w-4 sm:h-4" />
      </button>

      {/* Bottom Play/Pause Quick Touch */}
      <button
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="absolute bottom-2.5 sm:bottom-4 p-1.5 text-[#8A877F] hover:text-[#FAF7F2] active:scale-95 transition-all text-[11px] sm:text-xs font-mono"
      >
        {isPlaying ? "||" : "▶"}
      </button>

      {/* Center Tactile Play / Pause Core Button */}
      <button
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
        className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-[#DFDBD2] text-[#191918] shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.7)] hover:bg-[#E7E4DC] active:scale-95 transition-all"
      >
        {isPlaying ? (
          <PauseIcon size={20} className="sm:w-6 sm:h-6" />
        ) : (
          <PlayIcon size={20} className="sm:w-6 sm:h-6" />
        )}
      </button>
    </div>
  );
}
