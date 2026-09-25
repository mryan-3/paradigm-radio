"use client";

import { useAudio } from "@/context/audio-context";
import { WavesIcon } from "@/components/icons/waves-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { ShuffleIcon } from "@/components/icons/shuffle-icon";
import { HeartIcon } from "@/components/icons/heart-icon";

interface Props { onOpenStations?: () => void; }

export function AmbientPlayer({ onOpenStations }: Props) {
  const { currentStation, nowPlayingTrack, isPlaying, playRandom, toggleFavorite, isFavorite } = useAudio();
  const favorited = currentStation ? isFavorite(currentStation.id) : false;

  if (!currentStation) {
    return (
      <div className="flex flex-col items-center justify-center text-white text-center px-4 max-w-md mx-auto">
        <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-wide drop-shadow-lg">
          Select a Station
        </h2>
        <p className="mt-2.5 text-xs sm:text-sm font-sans font-light text-white/60">
          Over 250 curated American country, gospel, and blues radio stations
        </p>
        <div className="mt-5 sm:mt-6 flex items-center gap-3 flex-wrap justify-center">
          {onOpenStations && (
            <button onClick={onOpenStations} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-medium transition-all shadow-xl active:scale-95">
              <SearchIcon size={15} /><span>Browse Stations</span>
            </button>
          )}
          <button onClick={playRandom} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-medium transition-all shadow-xl active:scale-95">
            <ShuffleIcon size={15} /><span>Random Station</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 text-white">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <WavesIcon isPlaying={isPlaying} />
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 max-w-2xl px-2">
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-center leading-tight drop-shadow-2xl">
          {currentStation.name}
        </h2>
        <button onClick={() => toggleFavorite(currentStation.id)} aria-label="Toggle Favorite" className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white shrink-0">
          <HeartIcon size={22} filled={favorited} className={favorited ? "text-red-400" : ""} />
        </button>
      </div>

      <div className="mt-3 sm:mt-4 min-h-[3rem] sm:min-h-[3.5rem] flex items-center justify-center px-2 max-w-xl">
        <p className={`text-base sm:text-xl md:text-2xl font-sans text-center transition-all duration-700 line-clamp-2 ${nowPlayingTrack ? "text-white font-medium drop-shadow-lg" : "text-white/60 font-light italic"}`}>
          {nowPlayingTrack || "Live Broadcast"}
        </p>
      </div>

      <div className="mt-4 sm:mt-6 flex items-center gap-2 text-[11px] sm:text-xs font-sans font-medium text-white/50 tracking-widest uppercase">
        <span>{currentStation.genre}</span>
        <span className="w-1 h-1 rounded-full bg-white/30" />
        <span>{currentStation.city}</span>
      </div>
    </div>
  );
}
