"use client";

import React from "react";
import { Station } from "@/types/station";

interface ExhibitionFooterProps {
  currentStation: Station | null;
}

export function ExhibitionFooter({ currentStation }: ExhibitionFooterProps) {
  const origin = currentStation?.state
    ? `${currentStation.city || "USA"}, ${currentStation.state}`
    : currentStation?.city || "United States";
  const genre = currentStation?.genre || "Roots";

  return (
    <footer className="w-full flex items-center justify-between pt-4 border-t border-[#D5D1C7] select-none text-[11px]">
      <div className="flex flex-col">
        <span className="text-[#8A877F] uppercase tracking-wider text-[9px] font-mono">
          Origin
        </span>
        <span className="text-[#191918] font-medium mt-0.5">
          {origin}
        </span>
      </div>

      <div className="flex flex-col text-right">
        <span className="text-[#8A877F] uppercase tracking-wider text-[9px] font-mono">
          Genre
        </span>
        <span className="text-[#191918] font-medium capitalize mt-0.5">
          {genre}
        </span>
      </div>
    </footer>
  );
}
