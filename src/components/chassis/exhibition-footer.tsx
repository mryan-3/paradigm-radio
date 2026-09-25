"use client";

import React from "react";
import { Station } from "@/types/station";
import { MobileFooterInfo } from "./mobile-footer-info";

interface Props {
  currentStation: Station | null;
  nowPlayingTrack: string | null;
  isPlaying?: boolean;
  isFavorite?: boolean;
  onTogglePlay?: () => void;
  onToggleFavorite?: () => void;
}

export function ExhibitionFooter({
  currentStation,
  nowPlayingTrack,
  isPlaying = false,
  isFavorite = false,
  onTogglePlay,
  onToggleFavorite,
}: Props) {
  const rawName = currentStation?.name || "Select Station";
  const cleanName = rawName.includes("|") ? rawName.split("|")[0].trim() : rawName;
  const genre = currentStation?.genre || "Roots";

  return (
    <footer className="w-full md:hidden pt-2 border-t border-[#D5D1C7] select-none text-[11px]">
      <MobileFooterInfo
        cleanName={cleanName}
        rawName={rawName}
        nowPlayingTrack={nowPlayingTrack}
        genre={genre}
        isPlaying={isPlaying}
        isFavorite={isFavorite}
        onTogglePlay={onTogglePlay}
        onToggleFavorite={onToggleFavorite}
      />
    </footer>
  );
}
