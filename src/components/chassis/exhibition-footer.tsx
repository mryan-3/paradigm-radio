"use client";

import React from "react";
import { Station } from "@/types/station";

interface ExhibitionFooterProps {
  currentStation: Station | null;
}

export function ExhibitionFooter({ currentStation }: ExhibitionFooterProps) {
  const origin = currentStation?.state
    ? `${currentStation.city || "USA"}, ${currentStation.state}`
    : "United States";
  const genre = currentStation?.genre || "American Roots";

  const metadata = [
    { label: "Object", value: "Acoustic Receiver" },
    { label: "Origin", value: origin },
    { label: "Format", value: genre },
    { label: "Edition", value: "Paradigm 1958" },
  ];

  return (
    <footer className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#E2DFD7] select-none text-[11px]">
      {metadata.map((item, i) => (
        <div key={i} className="flex flex-col">
          <span className="text-[#8A877F] uppercase tracking-wider text-[9px] font-mono">
            {item.label}
          </span>
          <span className="text-[#191918] font-medium truncate mt-0.5">
            {item.value}
          </span>
        </div>
      ))}
    </footer>
  );
}
