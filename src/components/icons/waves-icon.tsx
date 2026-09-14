interface WavesIconProps {
  className?: string;
  isPlaying?: boolean;
}

export function WavesIcon({
  className = "",
  isPlaying = false,
}: WavesIconProps) {
  return (
    <div
      className={`flex items-end gap-0.75 h-4 ${className}`}
      aria-hidden="true"
    >
      <span
        className={`w-1 bg-[#C8681A] rounded-full transition-all duration-300 ${isPlaying ? "h-4 animate-pulse" : "h-1.5"
          }`}
      />
      <span
        className={`w-1 bg-[#C8681A] rounded-full transition-all duration-300 ${isPlaying
            ? "h-2.5 animate-pulse [animation-delay:150ms]"
            : "h-3"
          }`}
      />
      <span
        className={`w-1 bg-[#C8681A] rounded-full transition-all duration-300 ${isPlaying
            ? "h-4 animate-pulse [animation-delay:300ms]"
            : "h-2"
          }`}
      />
      <span
        className={`w-1 bg-[#C8681A] rounded-full transition-all duration-300 ${isPlaying
            ? "h-3 animate-pulse [animation-delay:450ms]"
            : "h-1"
          }`}
      />
    </div>
  );
}
