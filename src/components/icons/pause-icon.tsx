interface IconProps {
  className?: string;
  size?: number;
}

export function PauseIcon({ className = "", size = 20 }: IconProps) {
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
      <path d="M6 5H10V19H6V5ZM14 5H18V19H14V5Z" />
    </svg>
  );
}
