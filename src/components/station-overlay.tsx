"use client";

import { useState, useMemo } from "react";
import { useAudio } from "@/context/audio-context";
import { allStations } from "@/data";
import { Genre } from "@/types/station";
import { CloseIcon } from "@/components/icons/close-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { StationListItem } from "@/components/station-list-item";

interface Props { isOpen: boolean; onClose: () => void; }
const genres: { id: Genre; label: string }[] = [
  { id: "all", label: "All" }, { id: "favorites", label: "Favorites" },
  { id: "country", label: "Country" }, { id: "gospel", label: "Gospel" }, { id: "blues", label: "Blues" },
];

export function StationOverlay({ isOpen, onClose }: Props) {
  const { currentStation, isPlaying, playStation, favorites, toggleFavorite, isFavorite } = useAudio();
  const [activeGenre, setActiveGenre] = useState<Genre>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = activeGenre === "all" ? allStations : activeGenre === "favorites" ? allStations.filter((s) => favorites.includes(s.id)) : allStations.filter((s) => s.genre === activeGenre);
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter((s) =>
        s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q) ||
        (s.state && s.state.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeGenre, query, favorites]);

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <div className="absolute inset-0 bg-[#191918]/40" onClick={onClose} />
      <div className={`absolute top-0 bottom-0 left-0 w-full sm:max-w-md bg-[#F4F3EE] border-r-4 border-[#191918] shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 border-b border-[#D5D1C7] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-normal text-[#191918]">Station Directory</h2>
            <p className="text-xs text-[#706E66] font-mono">{filtered.length} stations</p>
          </div>
          <button onClick={onClose} className="p-2 text-[#706E66] hover:text-[#191918] transition-colors"><CloseIcon size={18} /></button>
        </div>

        <div className="p-3 border-b border-[#D5D1C7] flex items-center gap-2 bg-[#EAE7DF] mx-4 my-3">
          <SearchIcon size={15} className="text-[#706E66] shrink-0" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search station, city, state..." className="bg-transparent text-sm text-[#191918] placeholder:text-[#8A877F] focus:outline-none w-full font-mono" />
        </div>

        <div className="flex px-4 pb-2 gap-3 border-b border-[#D5D1C7] overflow-x-auto shrink-0">
          {genres.map((g) => (
            <button key={g.id} onClick={() => setActiveGenre(g.id)} className={`text-xs font-mono uppercase pb-1 transition-colors ${activeGenre === g.id ? "text-[#191918] border-b-2 border-[#191918] font-semibold" : "text-[#8A877F] hover:text-[#191918]"}`}>{g.label}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto catalog-scroll p-3 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[#706E66] text-xs font-mono">No matching stations found</div>
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
