"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PlaybackStatus, Station } from "@/types/station";

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [playbackStatus, setPlaybackStatus] = useState<PlaybackStatus>("idle");
  const [volume, setVolumeState] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;

    const onPlaying = () => setPlaybackStatus("playing");
    const onWaiting = () => setPlaybackStatus("buffering");
    const onError = () => {
      // Fallback through proxy if direct stream failed
      if (audio.src && !audio.src.includes("/api/stream") && currentStation) {
        audio.src = `/api/stream?url=${encodeURIComponent(currentStation.streamUrl)}`;
        audio.play().catch(() => setPlaybackStatus("error"));
      } else {
        setPlaybackStatus("error");
      }
    };

    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("error", onError);
      audio.pause();
      audio.src = "";
    };
  }, [currentStation]);

  const playStation = useCallback((station: Station) => {
    setCurrentStation(station);
    setPlaybackStatus("buffering");
    if (!audioRef.current) return;
    audioRef.current.pause();
    // Try direct playback first
    audioRef.current.src = station.streamUrl;
    audioRef.current.volume = isMuted ? 0 : volume;
    audioRef.current.play().catch(() => {
      // Proxy fallback on initial failure
      if (audioRef.current) {
        audioRef.current.src = `/api/stream?url=${encodeURIComponent(station.streamUrl)}`;
        audioRef.current.play().catch(() => setPlaybackStatus("error"));
      }
    });
  }, [isMuted, volume]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentStation) return;
    if (playbackStatus === "playing") {
      audioRef.current.pause();
      setPlaybackStatus("idle");
    } else {
      setPlaybackStatus("buffering");
      audioRef.current.play().catch(() => setPlaybackStatus("error"));
    }
  }, [currentStation, playbackStatus]);

  const setVolume = useCallback((newVol: number) => {
    setVolumeState(newVol);
    if (audioRef.current && !isMuted) audioRef.current.volume = newVol;
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) audioRef.current.volume = next ? 0 : volume;
      return next;
    });
  }, [volume]);

  return { currentStation, playbackStatus, isPlaying: playbackStatus === "playing", volume, isMuted, playStation, togglePlay, setVolume, toggleMute };
}
