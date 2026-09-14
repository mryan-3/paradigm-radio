"use client";

import { useState } from "react";
import { AmbientVideo } from "@/components/ambient-video";
import { AmbientPlayer } from "@/components/ambient-player";
import { GlassControls } from "@/components/glass-controls";
import { StationOverlay } from "@/components/station-overlay";
import { SearchIcon } from "@/components/icons/search-icon";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="relative w-full h-[100dvh] overflow-hidden bg-black select-none">
      {/* Seamless Ambient Video Background */}
      <AmbientVideo src="/A_cinematic_abstract_ambient.mp4" />

      {/* Top Ambient Bar */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 sm:p-6 pt-[max(1rem,env(safe-area-inset-top))]">
        <h1 className="text-xs sm:text-sm font-serif font-light tracking-widest text-white/70 uppercase">
          Paradigm Radio
        </h1>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 hover:bg-white/15 text-white/80 hover:text-white transition-all text-xs font-medium shadow-lg active:scale-95"
        >
          <SearchIcon size={13} />
          <span>Browse Stations</span>
        </button>
      </header>

      {/* Main Player Layer */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 pb-20 sm:pb-24">
        <AmbientPlayer onOpenStations={() => setIsMenuOpen(true)} />
      </div>

      {/* Controls Layer */}
      <GlassControls onOpenMenu={() => setIsMenuOpen(true)} />

      {/* Stations Drawer */}
      <StationOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </main>
  );
}
