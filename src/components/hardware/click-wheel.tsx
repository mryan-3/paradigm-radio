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
    <div className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-[#1C1B1A] shadow-[0_4px_16px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.1)] select-none">
      {/* Top Menu / Indicator Mark */}
      <div className="absolute top-4 flex gap-1">
        <span className="w-1 h-1 rounded-full bg-[#52504B]" />
        <span className="w-1 h-1 rounded-full bg-[#52504B]" />
      </div>

      {/* Left Previous Button */}
      <button
        onClick={onPrev}
        aria-label="Previous station"
        className="absolute left-4 p-2 text-[#8A877F] hover:text-[#FAF7F2] active:scale-95 transition-all"
      >
        <SkipBackIcon size={16} />
      </button>

      {/* Right Next Button */}
      <button
        onClick={onNext}
        aria-label="Next station"
        className="absolute right-4 p-2 text-[#8A877F] hover:text-[#FAF7F2] active:scale-95 transition-all"
      >
        <SkipForwardIcon size={16} />
      </button>

      {/* Center Tactile Play / Pause Core */}
      <button
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
        className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#DFDBD2] text-[#191918] shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.7)] active:scale-95 transition-all"
      >
        {isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
      </button>
    </div>
  );
}
