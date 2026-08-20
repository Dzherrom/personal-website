interface SpainFlagProps {
  className?: string;
  width?: number;
  height?: number;
}

export function SpainFlag({
  className,
  width = 28,
  height = 18,
}: SpainFlagProps) {
  const stripe = height / 4;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 18"
      width={width}
      height={height}
      aria-hidden="true"
    >
      <rect width="28" height={stripe} y="0" fill="#AA151B" />
      <rect width="28" height={stripe * 2} y={stripe} fill="#F1BF00" />
      <rect width="28" height={stripe} y={stripe * 3} fill="#AA151B" />
    </svg>
  );
}
