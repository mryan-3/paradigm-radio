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
  isFavorite: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectStation: (station: Station) => void;
  onToggleFavorite: () => void;
  onOpenDirectory: () => void;
}

export function RadioChassis({
  currentStation, nowPlayingTrack, isPlaying, isFavorite,
  onTogglePlay, onNext, onPrev, onSelectStation, onToggleFavorite, onOpenDirectory,
}: RadioChassisProps) {
  return (
    <div className="relative w-full md:max-w-5xl bg-[#F4F3EE] md:rounded-xl border-0 md:border-8 lg:md:border-[12px] md:border-[#191918] shadow-none md:shadow-[0_24px_64px_rgba(0,0,0,0.14)] overflow-hidden flex flex-col md:flex-row h-[100dvh] max-h-[100dvh] md:h-auto md:min-h-[520px]">
      {/* Archival Column displayed exclusively on desktop poster view */}
      <div className="hidden md:flex shrink-0">
        <ArchivalColumn isPlaying={isPlaying} />
      </div>

      <div className="h-full flex-1 min-w-0 flex flex-col justify-between p-3.5 sm:p-6 md:p-8 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-[#F4F3EE] overflow-hidden">
        <ExhibitionHeader
          currentStation={currentStation}
          nowPlayingTrack={nowPlayingTrack}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
          onOpenDirectory={onOpenDirectory}
        />

        <HardwareStage
          currentStation={currentStation}
          isPlaying={isPlaying}
          onTogglePlay={onTogglePlay}
          onNext={onNext}
          onPrev={onPrev}
          onSelectStation={onSelectStation}
        />

        {/* Frequency lines tape displayed exclusively on desktop */}
        <div className="hidden md:block">
          <FrequencyTape
            currentStation={currentStation}
            onSelectStation={onSelectStation}
          />
        </div>

        <ExhibitionFooter
          currentStation={currentStation}
          nowPlayingTrack={nowPlayingTrack}
          isPlaying={isPlaying}
          isFavorite={isFavorite}
          onTogglePlay={onTogglePlay}
          onNext={onNext}
          onPrev={onPrev}
          onToggleFavorite={onToggleFavorite}
        />
      </div>
    </div>
  );
}
