"use client";

import React, { useState } from "react";
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
}

export function HardwareStage({
  currentStation,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
}: HardwareStageProps) {
  const [module, setModule] = useState<"wheel" | "tuner">("wheel");

  return (
    <div className="flex flex-col items-center my-auto py-2 gap-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
        <PerforatedSpeaker isPlaying={isPlaying} />
        {module === "wheel" ? (
          <ClickWheel
            isPlaying={isPlaying}
            onTogglePlay={onTogglePlay}
            onNext={onNext}
            onPrev={onPrev}
          />
        ) : (
          <RotaryTuner
            currentStation={currentStation}
            isPlaying={isPlaying}
            onTogglePlay={onTogglePlay}
            onNext={onNext}
            onPrev={onPrev}
          />
        )}
      </div>

      <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#E8E5DF] border border-[#D5D1C7] text-[10px] font-mono">
        <button
          onClick={() => setModule("wheel")}
          className={`px-3 py-1 rounded-full transition-colors ${
            module === "wheel"
              ? "bg-[#191918] text-[#FAF7F2]"
              : "text-[#706E66] hover:text-[#191918]"
          }`}
        >
          CONTROLLER
        </button>
        <button
          onClick={() => setModule("tuner")}
          className={`px-3 py-1 rounded-full transition-colors ${
            module === "tuner"
              ? "bg-[#191918] text-[#FAF7F2]"
              : "text-[#706E66] hover:text-[#191918]"
          }`}
        >
          TUNER DIAL
        </button>
      </div>
    </div>
  );
}
