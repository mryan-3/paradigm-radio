"use client";

import React, { createContext, useContext, useCallback } from "react";
import { AudioContextType, Station } from "@/types/station";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { useStationMetadata } from "@/hooks/use-station-metadata";
import { useFavorites } from "@/hooks/use-favorites";
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
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const playNext = useCallback(() => {
    if (allStations.length === 0) return;
    const currentIndex = currentStation
      ? allStations.findIndex((s) => s.id === currentStation.id)
      : -1;
    const nextIndex = (currentIndex + 1) % allStations.length;
    playStation(allStations[nextIndex]);
  }, [currentStation, playStation]);

  const playPrevious = useCallback(() => {
    if (allStations.length === 0) return;
    const currentIndex = currentStation
      ? allStations.findIndex((s) => s.id === currentStation.id)
      : 0;
    const prevIndex =
      (currentIndex - 1 + allStations.length) % allStations.length;
    playStation(allStations[prevIndex]);
  }, [currentStation, playStation]);

  const playRandom = useCallback(() => {
    if (allStations.length === 0) return;
    const randomStation = allStations[Math.floor(Math.random() * allStations.length)];
    playStation(randomStation);
  }, [playStation]);

  return (
    <AudioContext.Provider
      value={{
        currentStation,
        playbackStatus,
        isPlaying,
        volume,
        isMuted,
        nowPlayingTrack,
        favorites,
        playStation,
        togglePlay,
        setVolume,
        toggleMute,
        playNext,
        playPrevious,
        playRandom,
        toggleFavorite,
        isFavorite,
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
