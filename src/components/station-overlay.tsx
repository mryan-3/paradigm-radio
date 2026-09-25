"use client";

import { useState, useMemo } from "react";
import { useAudio } from "@/context/audio-context";
import { allStations } from "@/data";
import { Genre } from "@/types/station";
import { CloseIcon } from "@/components/icons/close-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { ShuffleIcon } from "@/components/icons/shuffle-icon";
import { StationListItem } from "@/components/station-list-item";

interface Props { isOpen: boolean; onClose: () => void; }
const genres: { id: Genre; label: string }[] = [
  { id: "all", label: "All" }, { id: "favorites", label: "Favorites" },
  { id: "country", label: "Country" }, { id: "gospel", label: "Gospel" }, { id: "blues", label: "Blues" },
];

export function StationOverlay({ isOpen, onClose }: Props) {
  const { currentStation, isPlaying, playStation, playRandom, favorites, toggleFavorite, isFavorite } = useAudio();
  const [activeGenre, setActiveGenre] = useState<Genre>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = activeGenre === "all" ? allStations : activeGenre === "favorites" ? allStations.filter((s) => favorites.includes(s.id)) : allStations.filter((s) => s.genre === activeGenre);
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter((s) =>
        s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q) ||
        (s.state && s.state.toLowerCase().includes(q)) || (s.subGenre && s.subGenre.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeGenre, query, favorites]);

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`absolute top-0 bottom-0 left-0 w-full sm:max-w-md bg-black/80 backdrop-blur-2xl border-r border-white/10 shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "translate-x-0" : "-translate-x-full"} pb-[max(1rem,env(safe-area-inset-bottom))]`}>
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between pt-[max(1rem,env(safe-area-inset-top))]">
          <div>
            <h2 className="text-lg sm:text-xl font-serif font-light text-white">Stations</h2>
            <p className="text-xs text-white/50">{filtered.length} stations</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { playRandom(); onClose(); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white/80 hover:text-white transition-colors"><ShuffleIcon size={13} /><span>Random</span></button>
            <button onClick={onClose} className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"><CloseIcon size={20} /></button>
          </div>
        </div>

        <div className="p-3 sm:p-3.5 border-b border-white/10 flex items-center gap-2.5 bg-white/5 rounded-xl mx-3 sm:mx-4 my-2.5 sm:my-3">
          <SearchIcon size={16} className="text-white/40 shrink-0" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search station, city, state..." className="bg-transparent text-base sm:text-sm text-white placeholder:text-white/30 focus:outline-none w-full" />
          {query && <button onClick={() => setQuery("")} className="text-white/40 hover:text-white p-1"><CloseIcon size={14} /></button>}
        </div>

        <div className="flex px-3 sm:px-4 pb-2.5 gap-2 border-b border-white/10 overflow-x-auto glass-scroll shrink-0">
          {genres.map((g) => (
            <button key={g.id} onClick={() => setActiveGenre(g.id)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${activeGenre === g.id ? "bg-white/20 text-white shadow-sm" : "text-white/50 hover:bg-white/10 hover:text-white"}`}>{g.id === "favorites" ? `Favorites (${favorites.length})` : g.label}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto glass-scroll p-3 sm:p-4 space-y-1.5">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-white/40 text-sm px-4">
              {activeGenre === "favorites" ? "No favorite stations yet. Tap the heart on any station to save it here." : `No stations match "${query}"`}
            </div>
          ) : (
            filtered.map((station) => (
              <StationListItem key={`${station.id}-${station.genre}`} station={station} isActive={currentStation?.id === station.id} isPlaying={isPlaying} isFavorite={isFavorite(station.id)} onSelect={(s) => { playStation(s); onClose(); }} onToggleFavorite={(_, id) => toggleFavorite(id)} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
