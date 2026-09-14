"use client";

import { useRef, useState, useEffect } from "react";

interface Props {
  src: string;
  className?: string;
}

export function AmbientVideo({ src, className = "" }: Props) {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (video1Ref.current) {
      video1Ref.current.play().catch(() => {});
    }
  }, []);

  const handleTimeUpdate = (videoNum: 1 | 2) => {
    const current = videoNum === 1 ? video1Ref.current : video2Ref.current;
    const next = videoNum === 1 ? video2Ref.current : video1Ref.current;
    if (!current || !next || !current.duration) return;

    const remaining = current.duration - current.currentTime;
    if (remaining <= 1.8 && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      next.currentTime = 0;
      next.play().catch(() => {});
      setActiveVideo(videoNum === 1 ? 2 : 1);
    }
  };

  const handleEnded = (videoNum: 1 | 2) => {
    hasTriggeredRef.current = false;
    const current = videoNum === 1 ? video1Ref.current : video2Ref.current;
    if (current) current.pause();
  };

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
      <video
        ref={video1Ref}
        src={src}
        muted
        playsInline
        onTimeUpdate={() => handleTimeUpdate(1)}
        onEnded={() => handleEnded(1)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
          activeVideo === 1 ? "opacity-60" : "opacity-0"
        }`}
      />
      <video
        ref={video2Ref}
        src={src}
        muted
        playsInline
        onTimeUpdate={() => handleTimeUpdate(2)}
        onEnded={() => handleEnded(2)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
          activeVideo === 2 ? "opacity-60" : "opacity-0"
        }`}
      />
    </div>
  );
}
