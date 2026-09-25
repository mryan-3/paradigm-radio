"use client";

import React from "react";
import { Station } from "@/types/station";
import { allStations } from "@/data";

interface RotaryTunerProps {
  currentStation: Station | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function RotaryTuner({
  currentStation,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
}: RotaryTunerProps) {
  const frequency = currentStation?.name.match(/\b\d{2,3}(\.\d)?\b/)?.[0] || "101.2";
  const currentIndex = currentStation
    ? allStations.findIndex((s) => s.id === currentStation.id)
    : 0;
  const needleAngle = (currentIndex * 18) % 360;

  return (
    <div className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-[#DFDBD2] shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.08)] select-none">
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none p-2">
        {Array.from({ length: 36 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1={12}
            x2="100"
            y2={i % 3 === 0 ? 20 : 16}
            stroke="#6B6861"
            strokeWidth={i % 3 === 0 ? 1.5 : 1}
            transform={`rotate(${i * 10} 100 100)`}
          />
        ))}
        <circle
          cx="100"
          cy="16"
          r="4"
          fill="#FF4E17"
          transform={`rotate(${needleAngle} 100 100)`}
          className="transition-transform duration-300 ease-out"
        />
      </svg>

      <div className="relative flex flex-col items-center justify-center w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-[#ECE9E2] shadow-[0_2px_5px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.8)] border border-[#D5D1C7]">
        <span className="text-[10px] tracking-widest text-[#706E66] uppercase font-mono">
          {isPlaying ? "ON AIR" : "TUNER"}
        </span>
        <button
          onClick={onTogglePlay}
          className="text-2xl sm:text-3xl font-light tracking-tight text-[#191918] tabular-nums font-mono my-0.5 hover:text-[#FF4E17] active:scale-95 transition-all"
        >
          {frequency}
        </button>
        <span className="text-[9px] tracking-wider text-[#FF4E17] font-medium uppercase">
          MHz
        </span>
        <div className="absolute inset-x-2 bottom-3 flex justify-between px-3">
          <button onClick={onPrev} className="text-sm text-[#706E66] hover:text-[#191918] active:scale-95">&#x25C2;</button>
          <button onClick={onNext} className="text-sm text-[#706E66] hover:text-[#191918] active:scale-95">&#x25B8;</button>
        </div>
      </div>
    </div>
  );
}
