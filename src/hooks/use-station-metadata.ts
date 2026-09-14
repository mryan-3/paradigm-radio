"use client";

import { useEffect, useState } from "react";
import { Station } from "@/types/station";

export function useStationMetadata(
  station: Station | null,
  isPlaying: boolean
) {
  const [nowPlayingTrack, setNowPlayingTrack] = useState<string | null>(null);

  useEffect(() => {
    if (!station || !isPlaying) {
      setNowPlayingTrack(null);
      return;
    }

    let isMounted = true;

    const fetchMetadata = async () => {
      try {
        const res = await fetch(
          `/api/metadata?url=${encodeURIComponent(station.streamUrl)}`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data.title) {
          setNowPlayingTrack(data.title);
        }
      } catch {
        // Silently ignore metadata fetch errors
      }
    };

    fetchMetadata();
    const interval = setInterval(fetchMetadata, 20000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [station, isPlaying]);

  return nowPlayingTrack;
}
