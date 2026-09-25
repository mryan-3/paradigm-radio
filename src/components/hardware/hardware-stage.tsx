"use client";

import React from "react";
import { Station } from "@/types/station";
import { PerforatedSpeaker } from "@/components/hardware/perforated-speaker";
import { ClickWheel } from "@/components/hardware/click-wheel";
import { RotaryTuner } from "@/components/hardware/rotary-tuner";

interface HardwareStageProps {
  currentStation: Station | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectStation?: (station: Station) => void;
}

export function HardwareStage({
  currentStation,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  onSelectStation,
}: HardwareStageProps) {
  return (
    <>
      {/* Desktop View: Side-by-side Dual Circles */}
      <div className="hidden md:flex flex-row items-center justify-center gap-8 lg:gap-16 my-auto py-6">
        <PerforatedSpeaker isPlaying={isPlaying} />
        <ClickWheel
          isPlaying={isPlaying}
          onTogglePlay={onTogglePlay}
          onNext={onNext}
          onPrev={onPrev}
        />
      </div>

      {/* Mobile View: Dedicated Rotary Tuner Dial without Tabs */}
      <div className="flex md:hidden items-center justify-center my-auto py-1">
        <RotaryTuner
          currentStation={currentStation}
          isPlaying={isPlaying}
          onTogglePlay={onTogglePlay}
          onNext={onNext}
          onPrev={onPrev}
          onSelectStation={onSelectStation}
        />
      </div>
    </>
  );
}
