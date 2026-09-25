"use client";

import React from "react";
import { Station } from "@/types/station";
import { useRotaryDial } from "@/hooks/use-rotary-dial";

interface RotaryTunerProps {
  currentStation: Station | null;
  isPlaying?: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectStation?: (station: Station) => void;
}

export function RotaryTuner({
  currentStation, isPlaying, onTogglePlay, onNext, onPrev, onSelectStation,
}: RotaryTunerProps) {
  const { dialRef, angle, handlePointerDown, handlePointerMove, handlePointerUp } =
    useRotaryDial({ currentStation, onSelectStation });

  const frequency = currentStation?.name.match(/\b\d{2,3}(\.\d)?\b/)?.[0] || "103.7";
  const callsign = currentStation?.callSign || currentStation?.genre || "FM";

  return (
    <div
      ref={dialRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-[#DFDBD2] shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.08)] select-none shrink-0 cursor-grab active:cursor-grabbing touch-none"
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none p-2">
        {Array.from({ length: 36 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1={10}
            x2="100"
            y2={i % 3 === 0 ? 18 : 14}
            stroke="#6B6861"
            strokeWidth={i % 3 === 0 ? 1.5 : 1}
            transform={`rotate(${i * 10} 100 100)`}
          />
        ))}
        <circle
          cx="100"
          cy="14"
          r="4.5"
          fill="#FF4E17"
          transform={`rotate(${angle} 100 100)`}
          className="transition-none shadow-sm"
        />
      </svg>

      <div className="relative flex flex-col items-center justify-center w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-[#ECE9E2] shadow-[0_2px_6px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.8)] border border-[#D5D1C7] pointer-events-auto">
        <span className="text-[9px] tracking-widest text-[#706E66] uppercase font-mono truncate max-w-[90px]">
          {callsign}
        </span>
        <button
          onClick={onTogglePlay}
          className="text-3xl sm:text-4xl font-light tracking-tight text-[#191918] tabular-nums font-mono my-0.5 hover:text-[#FF4E17] active:scale-95 transition-all"
        >
          {frequency}
        </button>
        <div className="flex items-center gap-1">
          <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-[#FF4E17] animate-pulse" : "bg-[#706E66]"}`} />
          <span className="text-[9px] font-mono text-[#191918] font-bold">FM</span>
        </div>
        <div className="absolute inset-x-2 bottom-2.5 flex justify-between px-3">
          <button onClick={onPrev} className="text-sm text-[#706E66] hover:text-[#191918] p-1 active:scale-95">&#x25C2;</button>
          <button onClick={onNext} className="text-sm text-[#706E66] hover:text-[#191918] p-1 active:scale-95">&#x25B8;</button>
        </div>
      </div>
    </div>
  );
}
