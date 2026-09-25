"use client";

import React from "react";
import { PerforatedSpeaker } from "@/components/hardware/perforated-speaker";
import { ClickWheel } from "@/components/hardware/click-wheel";

interface HardwareStageProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function HardwareStage({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
}: HardwareStageProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 my-auto py-6">
      <PerforatedSpeaker isPlaying={isPlaying} />
      <ClickWheel
        isPlaying={isPlaying}
        onTogglePlay={onTogglePlay}
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  );
}
