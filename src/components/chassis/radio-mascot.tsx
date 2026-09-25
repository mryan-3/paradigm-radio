"use client";

import React from "react";
import { Mascot } from "page-mascot";

interface RadioMascotProps {
  size?: number;
  className?: string;
}

export function RadioMascot({ size = 46, className = "" }: RadioMascotProps) {
  return (
    <div className={`shrink-0 flex items-center justify-center select-none ${className}`}>
      <Mascot
        directions="/mascots/radion-directions.webp"
        reactions="/mascots/radion-reactions.webp"
        size={size}
        label="Radion"
      />
    </div>
  );
}
