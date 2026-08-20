interface UsaFlagProps {
  className?: string;
  width?: number;
  height?: number;
}

export function UsaFlag({ className, width = 28, height = 18 }: UsaFlagProps) {
  const stripeHeight = 18 / 13;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 18"
      width={width}
      height={height}
      aria-hidden="true"
    >
      {Array.from({ length: 13 }, (_, index) => (
        <rect
          key={index}
          y={index * stripeHeight}
          width="28"
          height={stripeHeight}
          fill={index % 2 === 0 ? "#B22234" : "#FFFFFF"}
        />
      ))}
      <rect width="11.2" height="9.69" fill="#3C3B6E" />
      {[
        [1.4, 1.2],
        [3.5, 1.2],
        [5.6, 1.2],
        [7.7, 1.2],
        [9.8, 1.2],
        [2.45, 2.5],
        [4.55, 2.5],
        [6.65, 2.5],
        [8.75, 2.5],
        [1.4, 3.8],
        [3.5, 3.8],
        [5.6, 3.8],
        [7.7, 3.8],
        [9.8, 3.8],
        [2.45, 5.1],
        [4.55, 5.1],
        [6.65, 5.1],
        [8.75, 5.1],
        [1.4, 6.4],
        [3.5, 6.4],
        [5.6, 6.4],
        [7.7, 6.4],
        [9.8, 6.4],
        [2.45, 7.7],
        [4.55, 7.7],
        [6.65, 7.7],
        [8.75, 7.7],
      ].map(([cx, cy], index) => (
        <circle key={index} cx={cx} cy={cy} r="0.45" fill="#FFFFFF" />
      ))}
    </svg>
  );
}
