"use client";

import React from "react";

interface PerforatedSpeakerProps {
  isPlaying: boolean;
}

export function PerforatedSpeaker({ isPlaying }: PerforatedSpeakerProps) {
  // Generate concentric rings of dots matching Braun & Teenage Engineering grilles
  const rings = [
    { count: 1, radius: 0 },
    { count: 6, radius: 14 },
    { count: 12, radius: 28 },
    { count: 18, radius: 42 },
    { count: 24, radius: 56 },
    { count: 30, radius: 70 },
    { count: 36, radius: 84 },
    { count: 42, radius: 98 },
  ];

  return (
    <div className="relative flex items-center justify-center w-52 h-52 sm:w-60 sm:h-60 md:w-68 md:h-68 lg:w-72 lg:h-72 rounded-full bg-[#DFDBD2] shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_2px_10px_rgba(255,255,255,0.8)] select-none shrink-0">
      <svg
        viewBox="-110 -110 220 220"
        className="w-full h-full p-3 pointer-events-none"
      >
        {rings.map((ring, ringIdx) => {
          return Array.from({ length: ring.count }).map((_, dotIdx) => {
            const angle = (dotIdx / ring.count) * 2 * Math.PI;
            const cx = ring.radius === 0 ? 0 : Math.round(Math.cos(angle) * ring.radius * 100) / 100;
            const cy = ring.radius === 0 ? 0 : Math.round(Math.sin(angle) * ring.radius * 100) / 100;
            const delay = Math.round(((ringIdx * 0.1 + dotIdx * 0.02) % 1.2) * 100) / 100;

            return (
              <circle
                key={`${ringIdx}-${dotIdx}`}
                cx={cx}
                cy={cy}
                r={ringIdx === 0 ? 3.5 : 2.8}
                className={`fill-[#1C1B1A] transition-all duration-300 ${
                  isPlaying ? "animate-pulse" : "opacity-85"
                }`}
                style={{
                  animationDelay: `${delay}s`,
                  animationDuration: "1.8s",
                }}
              />
            );
          });
        })}
      </svg>
    </div>
  );
}
