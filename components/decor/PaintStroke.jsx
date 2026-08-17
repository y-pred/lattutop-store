export default function PaintStroke({ color = "#D9A023" }) {
  return (
    <svg className="lt-stroke" viewBox="0 0 220 20" preserveAspectRatio="none">
      <path
        d="M2 12 C 40 2, 80 18, 120 8 C 150 1, 190 14, 218 6"
        stroke={color}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
