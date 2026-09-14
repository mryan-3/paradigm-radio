"use client";

import { useAudio } from "@/context/audio-context";
import { PlayIcon } from "@/components/icons/play-icon";
import { PauseIcon } from "@/components/icons/pause-icon";
import { SkipBackIcon } from "@/components/icons/skip-back-icon";
import { SkipForwardIcon } from "@/components/icons/skip-forward-icon";
import { VolumeIcon } from "@/components/icons/volume-icon";
import { MenuIcon } from "@/components/icons/menu-icon";

interface Props { onOpenMenu: () => void; }

export function GlassControls({ onOpenMenu }: Props) {
  const { currentStation, playbackStatus, isPlaying, volume, isMuted, togglePlay, setVolume, toggleMute, playNext, playPrevious } = useAudio();
  const hasStation = currentStation !== null;
  const isBuffering = playbackStatus === "buffering";

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40 max-w-[calc(100vw-1.5rem)]">
      <div className="flex items-center gap-2 sm:gap-4 md:gap-5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black/45 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-white">
        <button onClick={onOpenMenu} aria-label="Stations" className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-full hover:bg-white/10 active:bg-white/15 transition-colors text-white/80 hover:text-white">
          <MenuIcon size={16} />
          <span className="text-[11px] sm:text-xs font-medium tracking-wide">Stations</span>
        </button>
        <div className="w-px h-5 sm:h-6 bg-white/10" />
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <button onClick={playPrevious} disabled={!hasStation} className="p-2 rounded-full hover:bg-white/10 transition-colors disabled:opacity-40 active:scale-95"><SkipBackIcon size={16} /></button>
          <button onClick={togglePlay} disabled={!hasStation} className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all active:scale-95 disabled:opacity-50">
            {isBuffering ? <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
          </button>
          <button onClick={playNext} disabled={!hasStation} className="p-2 rounded-full hover:bg-white/10 transition-colors disabled:opacity-40 active:scale-95"><SkipForwardIcon size={16} /></button>
        </div>
        <div className="w-px h-5 sm:h-6 bg-white/10 hidden sm:block" />
        <div className="hidden sm:flex items-center gap-2">
          <button onClick={toggleMute} className="p-2 hover:bg-white/10 rounded-full transition-colors"><VolumeIcon size={18} muted={isMuted || volume === 0} /></button>
          <input type="range" min={0} max={1} step={0.01} value={isMuted ? 0 : volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-20 md:w-24 h-1.5 bg-white/25 rounded-full appearance-none cursor-pointer accent-white opacity-85 hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  );
}
