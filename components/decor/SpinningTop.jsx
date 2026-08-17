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
      <svg viewBox="0 0 80 90" width="64" height="72" className={"lt-lattu" + (spinning ? " lt-spinning" : "")}>
        <path d="M40 4 L68 26 L60 60 L40 86 L20 60 L12 26 Z" fill="#D9A023" />
        <path d="M40 4 L68 26 L60 60 L40 40 Z" fill="#B23429" opacity="0.85" />
        <path d="M40 4 L12 26 L20 60 L40 40 Z" fill="#2C3A5C" opacity="0.85" />
        <circle cx="40" cy="8" r="5" fill="#F3E9D2" />
      </svg>
      <span>Give it a spin!</span>
    </button>
  );
}
