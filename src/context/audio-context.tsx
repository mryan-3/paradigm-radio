"use client";

import React, { createContext, useContext, useCallback } from "react";
import { AudioContextType, Station } from "@/types/station";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { useStationMetadata } from "@/hooks/use-station-metadata";
import { allStations } from "@/data";

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const {
    currentStation,
    playbackStatus,
    isPlaying,
    volume,
    isMuted,
    playStation,
    togglePlay,
    setVolume,
    toggleMute,
  } = useAudioPlayer();

  const nowPlayingTrack = useStationMetadata(currentStation, isPlaying);

  const playNext = useCallback(() => {
    if (!currentStation) return;
    const currentIndex = allStations.findIndex((s) => s.id === currentStation.id);
    const nextIndex = (currentIndex + 1) % allStations.length;
    playStation(allStations[nextIndex]);
  }, [currentStation, playStation]);

  const playPrevious = useCallback(() => {
    if (!currentStation) return;
    const currentIndex = allStations.findIndex((s) => s.id === currentStation.id);
    const prevIndex = (currentIndex - 1 + allStations.length) % allStations.length;
    playStation(allStations[prevIndex]);
  }, [currentStation, playStation]);

  return (
    <AudioContext.Provider
      value={{
        currentStation,
        playbackStatus,
        isPlaying,
        volume,
        isMuted,
        nowPlayingTrack,
        playStation,
        togglePlay,
        setVolume,
        toggleMute,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
