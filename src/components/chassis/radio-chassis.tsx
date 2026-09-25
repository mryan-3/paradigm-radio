"use client";

import React from "react";
import { Station } from "@/types/station";
import { ArchivalColumn } from "./archival-column";
import { ExhibitionHeader } from "./exhibition-header";
import { ExhibitionFooter } from "./exhibition-footer";
import { HardwareStage } from "@/components/hardware/hardware-stage";
import { FrequencyTape } from "@/components/hardware/frequency-tape";

interface RadioChassisProps {
  currentStation: Station | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectStation: (station: Station) => void;
  onOpenDirectory: () => void;
}

export function RadioChassis({
  currentStation,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  onSelectStation,
  onOpenDirectory,
}: RadioChassisProps) {
  return (
    <div className="relative w-full max-w-5xl bg-[#F4F3EE] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.06)] border border-[#E2DFD7] overflow-hidden flex flex-col md:flex-row min-h-[640px]">
      <ArchivalColumn label="PARADIGM" year="1958" />

      <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 md:p-10 bg-[#F4F3EE]">
        <ExhibitionHeader
          currentStation={currentStation}
          onOpenDirectory={onOpenDirectory}
        />

        <HardwareStage
          currentStation={currentStation}
          isPlaying={isPlaying}
          onTogglePlay={onTogglePlay}
          onNext={onNext}
          onPrev={onPrev}
        />

        <FrequencyTape
          currentStation={currentStation}
          onSelectStation={onSelectStation}
        />

        <ExhibitionFooter currentStation={currentStation} />
      </div>
    </div>
  );
}
