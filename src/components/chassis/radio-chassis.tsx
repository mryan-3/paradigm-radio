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
  nowPlayingTrack: string | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectStation: (station: Station) => void;
  onOpenDirectory: () => void;
}

export function RadioChassis({
  currentStation,
  nowPlayingTrack,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  onSelectStation,
  onOpenDirectory,
}: RadioChassisProps) {
  return (
    <div className="relative w-full max-w-5xl bg-[#F4F3EE] rounded-xl border-8 sm:border-[10px] md:border-[12px] border-[#191918] shadow-[0_24px_64px_rgba(0,0,0,0.14)] overflow-hidden flex flex-col md:flex-row min-h-[640px]">
      <ArchivalColumn isPlaying={isPlaying} />

      <div className="flex-1 min-w-0 flex flex-col justify-between p-6 sm:p-8 md:p-10 bg-[#F4F3EE]">
        <ExhibitionHeader
          currentStation={currentStation}
          nowPlayingTrack={nowPlayingTrack}
          onOpenDirectory={onOpenDirectory}
        />

        <HardwareStage
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
