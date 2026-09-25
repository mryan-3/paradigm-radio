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
    isFavorite,
    toggleFavorite,
  } = useAudio();

  return (
    <main className="fixed inset-0 w-full h-full overflow-hidden overscroll-none select-none font-sans bg-[#F4F3EE] md:bg-[#E5E2DA] flex items-center justify-center p-0 md:p-12">
      <RadioChassis
        currentStation={currentStation}
        nowPlayingTrack={nowPlayingTrack}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onNext={playNext}
        onPrev={playPrevious}
        onSelectStation={playStation}
        isFavorite={currentStation ? isFavorite(currentStation.id) : false}
        onToggleFavorite={() =>
          currentStation && toggleFavorite(currentStation.id)
        }
        onOpenDirectory={() => setIsDirectoryOpen(true)}
      />

      <StationOverlay
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
      />
    </main>
  );
}
