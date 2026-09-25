"use client";

import { useState } from "react";
import { useAudio } from "@/context/audio-context";
import { RadioChassis } from "@/components/chassis/radio-chassis";
import { StationOverlay } from "@/components/station-overlay";

export default function Home() {
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const {
    currentStation,
    nowPlayingTrack,
    isPlaying,
    togglePlay,
    playNext,
    playPrevious,
    playStation,
  } = useAudio();

  return (
    <main className="min-h-screen w-full bg-[#E5E2DA] flex items-center justify-center p-4 sm:p-6 md:p-12 select-none font-sans">
      <RadioChassis
        currentStation={currentStation}
        nowPlayingTrack={nowPlayingTrack}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onNext={playNext}
        onPrev={playPrevious}
        onSelectStation={playStation}
        onOpenDirectory={() => setIsDirectoryOpen(true)}
      />

      <StationOverlay
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
      />
    </main>
  );
}
