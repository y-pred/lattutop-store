// Hand-painted peg-doll mascot, used decoratively throughout the site.
export default function PegDoll({
  uid,
  body = "#2C3A5C",
  head = "#D9A023",
  pattern = "dots",
  patternColor = "#F3E9D2",
  size = 90,
  bob = false,
  delay = 0,
}) {
  const clipId = `clip-${uid}`;
  return (
    <svg
      viewBox="0 0 120 172"
      width={size}
      height={(size * 172) / 120}
      className={"lt-doll-svg" + (bob ? " lt-doll-bob" : "")}
      style={bob ? { animationDelay: `${delay}s` } : undefined}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M60 55 C30 55 22 92 20 162 L100 162 C98 92 90 55 60 55 Z" />
        </clipPath>
      </defs>
      <ellipse cx="60" cy="165" rx="34" ry="5" fill="#2C1B10" opacity="0.12" />
      <path d="M60 55 C30 55 22 92 20 162 L100 162 C98 92 90 55 60 55 Z" fill={body} />
      <g clipPath={`url(#${clipId})`}>
        {pattern === "dots" &&
          Array.from({ length: 14 }).map((_, i) => (
            <circle key={i} cx={25 + (i % 5) * 18} cy={72 + Math.floor(i / 5) * 22} r="4" fill={patternColor} opacity="0.85" />
          ))}
        {pattern === "stripes" &&
          Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x="8" y={64 + i * 14} width="104" height="6" fill={patternColor} opacity="0.85" />
          ))}
      </g>
      <circle cx="60" cy="30" r="26" fill={head} />
      <circle cx="51" cy="30" r="2.4" fill="#2C1B10" opacity="0.7" />
      <circle cx="69" cy="30" r="2.4" fill="#2C1B10" opacity="0.7" />
      <path d="M50 39 Q60 46 70 39" stroke="#2C1B10" strokeWidth="2" fill="none" opacity="0.55" strokeLinecap="round" />
    </svg>
  );
}
