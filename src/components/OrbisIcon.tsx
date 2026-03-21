interface OrbisIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function OrbisIcon({
  size = 40,
  color = "#C9A84C",
  className = "",
}: OrbisIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer orbit circle */}
      <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="1.5" />

      {/* Upper arc orbit */}
      <path
        d="M 15 35 Q 50 5, 85 35"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />

      {/* Lower arc orbit */}
      <path
        d="M 15 65 Q 50 95, 85 65"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />

      {/* Eye shape — two curves forming an almond */}
      <path
        d="M 20 50 Q 50 25, 80 50 Q 50 75, 20 50 Z"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />

      {/* 8-pointed star in the center */}
      <path
        d={`
          M 50 36 L 53 46 L 64 50 L 53 54 L 50 64
          L 47 54 L 36 50 L 47 46 Z
        `}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />

      {/* Small circle at the very center */}
      <circle cx="50" cy="50" r="3" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
