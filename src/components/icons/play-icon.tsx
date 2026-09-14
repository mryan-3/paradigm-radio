interface IconProps {
  className?: string;
  size?: number;
}

export function PlayIcon({ className = "", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 4.5V19.5L19 12L7 4.5Z" />
    </svg>
  );
}
