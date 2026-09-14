"use client";

import React, { createContext, useContext, useState } from "react";
import { AudioContextType, PlaybackStatus, Station } from "@/types/station";

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [playbackStatus, setPlaybackStatus] = useState<PlaybackStatus>("idle");
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [nowPlayingTrack, setNowPlayingTrack] = useState<string | null>(null);

  const isPlaying = playbackStatus === "playing";

  const playStation = (station: Station) => {
    setCurrentStation(station);
    setPlaybackStatus("playing");
  };

  const togglePlay = () => {
    if (!currentStation) return;
    setPlaybackStatus((prev) => (prev === "playing" ? "idle" : "playing"));
  };

  const toggleMute = () => setIsMuted((prev) => !prev);
  const playNext = () => {};
  const playPrevious = () => {};

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
