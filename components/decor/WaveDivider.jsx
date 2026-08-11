export default function WaveDivider({ color = "#F3E9D2" }) {
  return (
    <svg className="lt-wave" viewBox="0 0 400 24" preserveAspectRatio="none">
      <path
        d="M0 12 Q 25 0, 50 12 T 100 12 T 150 12 T 200 12 T 250 12 T 300 12 T 350 12 T 400 12 V24 H0 Z"
        fill={color}
      />
    </svg>
  );
}
