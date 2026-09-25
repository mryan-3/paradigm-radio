"use client";

import { Station } from "@/types/station";
import { PlayIcon } from "@/components/icons/play-icon";
import { WavesIcon } from "@/components/icons/waves-icon";
import { HeartIcon } from "@/components/icons/heart-icon";

interface Props {
  station: Station;
  isActive: boolean;
  isPlaying: boolean;
  isFavorite: boolean;
  onSelect: (station: Station) => void;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
}

export function StationListItem({
  station,
  isActive,
  isPlaying,
  isFavorite,
  onSelect,
  onToggleFavorite,
}: Props) {
  return (
    <div
      onClick={() => onSelect(station)}
      className={`w-full text-left p-3 sm:p-3.5 rounded-xl transition-all flex items-center justify-between group cursor-pointer active:scale-[0.99] ${
        isActive
          ? "bg-white/15 border border-white/25 shadow-lg"
          : "hover:bg-white/10 active:bg-white/15 border border-transparent"
      }`}
    >
      <div className="flex-1 min-w-0 pr-3">
        <div className="flex items-center gap-2">
          <h3 className={`text-sm font-medium truncate ${isActive ? "text-white" : "text-white/85 group-hover:text-white"}`}>
            {station.name}
          </h3>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/60 uppercase font-mono tracking-wider shrink-0">
            {station.genre}
          </span>
        </div>
        <p className="text-xs text-white/50 truncate mt-1">
          {station.city}{station.state && station.state !== "US" ? `, ${station.state}` : ""}
          {station.subGenre && station.subGenre !== station.genre ? ` • ${station.subGenre}` : ""}
        </p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(e, station.id); }}
          aria-label="Favorite"
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
        >
          <HeartIcon size={14} filled={isFavorite} className={isFavorite ? "text-red-400" : ""} />
        </button>
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/20 transition-colors">
          {isActive && isPlaying ? <WavesIcon isPlaying={true} /> : <PlayIcon size={13} className={isActive ? "text-white" : "text-white/50 group-hover:text-white"} />}
        </div>
      </div>
    </div>
  );
}
