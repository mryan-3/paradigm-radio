"use client";

import { useEffect, useState } from "react";
import { Station } from "@/types/station";
import { sanitizeStreamTitle } from "@/lib/metadata-cleaner";

export function useStationMetadata(
  station: Station | null,
  isPlaying: boolean
) {
  const [nowPlayingTrack, setNowPlayingTrack] = useState<string | null>(null);

  useEffect(() => {
    setNowPlayingTrack(null);

    if (!station || !isPlaying) {
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
        const cleaned = sanitizeStreamTitle(data.title);
        if (isMounted && cleaned) {
          setNowPlayingTrack(cleaned);
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
