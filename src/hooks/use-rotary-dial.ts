"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Station } from "@/types/station";
import { allStations } from "@/data";

interface UseRotaryDialProps {
  currentStation: Station | null;
  onSelectStation?: (station: Station) => void;
}

export function useRotaryDial({
  currentStation,
  onSelectStation,
}: UseRotaryDialProps) {
  const dialRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startAngleRef = useRef(0);
  const currentAngleRef = useRef(0);
  const [angle, setAngle] = useState(0);

  // Sync initial angle with current station position
  useEffect(() => {
    if (!isDragging.current && currentStation && allStations.length > 0) {
      const idx = allStations.findIndex((s) => s.id === currentStation.id);
      if (idx >= 0) {
        const target = (idx / allStations.length) * 360;
        setAngle(target);
        currentAngleRef.current = target;
      }
    }
  }, [currentStation]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dialRef.current) return;
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const rect = dialRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rad = Math.atan2(e.clientY - cy, e.clientX - cx);
    startAngleRef.current = rad * (180 / Math.PI) - currentAngleRef.current;
  };

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rad = Math.atan2(e.clientY - cy, e.clientX - cx);
    let deg = (rad * (180 / Math.PI) - startAngleRef.current) % 360;
    if (deg < 0) deg += 360;

    setAngle(deg);
    currentAngleRef.current = deg;

    if (onSelectStation && allStations.length > 0) {
      const idx = Math.min(
        allStations.length - 1,
        Math.floor((deg / 360) * allStations.length)
      );
      if (allStations[idx].id !== currentStation?.id) {
        onSelectStation(allStations[idx]);
      }
    }
  }, [currentStation, onSelectStation]);

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return { dialRef, angle, handlePointerDown, handlePointerMove, handlePointerUp };
}
