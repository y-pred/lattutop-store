"use client";

import { useState } from "react";

// Little interactive lattu (spinning top) — a playful nod to the brand name.
export default function SpinningTop() {
  const [spinning, setSpinning] = useState(false);
  const spin = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 900);
  };
  return (
    <button className="lt-lattu-wrap" onClick={spin} aria-label="Spin the lattu">
      <svg viewBox="0 0 100 100" width="64" height="64" className={"lt-lattu" + (spinning ? " lt-spinning" : "")}>
        <defs>
          <clipPath id="lattu-decor-clip">
            <path d="M50 8 C 72 8 83 27 78 40 C 74 54 61 62 55 78 L50 93 L45 78 C 39 62 26 54 22 40 C 17 27 28 8 50 8 Z" />
          </clipPath>
        </defs>
        <path
          d="M50 8 C 72 8 83 27 78 40 C 74 54 61 62 55 78 L50 93 L45 78 C 39 62 26 54 22 40 C 17 27 28 8 50 8 Z"
          fill="#D9A023"
        />
        <g clipPath="url(#lattu-decor-clip)">
          <rect x="0" y="33" width="100" height="12" fill="#B23429" />
          <rect x="0" y="50" width="100" height="6" fill="#2C3A5C" />
        </g>
        <circle cx="50" cy="8" r="4.5" fill="#F3E9D2" />
      </svg>
      <span>Give it a spin!</span>
    </button>
  );
}
