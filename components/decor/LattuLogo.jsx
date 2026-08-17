// Brand mark: an actual lattu (spinning top) silhouette — rounded body
// tapering to a point, a knob on top, and a couple of motion lines to show
// it spinning. Same shape used here, in the interactive SpinningTop.jsx
// decoration, and (eventually) as the hand-paint/imprint reference on the
// physical dolls, so the logo, the decoration, and the doll imprint all
// trace back to one simple, easy-to-reproduce form.
//
// Two variants:
//   - "color"  the everyday logo — painted-band body + wordmark, used in
//              the header, favicon, etc.
//   - "stamp"  a single-colour outline reduction of the same silhouette,
//              meant as a reference for a future wood-burned/hand-painted
//              imprint on the physical dolls. One stroke, no gradients, no
//              fine detail — easy to carve or paint by hand at small sizes.

const LATTU_BODY =
  "M50 8 C 72 8 83 27 78 40 C 74 54 61 62 55 78 L50 93 L45 78 C 39 62 26 54 22 40 C 17 27 28 8 50 8 Z";

export function LattuMark({ size = 40, variant = "color", className = "" }) {
  if (variant === "stamp") {
    // Single ink-colour outline — what you'd actually burn or paint onto a
    // wooden doll. No fills, just the silhouette, the knob, and one motion
    // line, all easy to reproduce by hand.
    return (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
        <path d={LATTU_BODY} fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="50" cy="8" r="4" fill="currentColor" />
        <path d="M18 32 Q 5 40 11 52" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <clipPath id={`lattu-body-clip-${size}`}>
          <path d={LATTU_BODY} />
        </clipPath>
      </defs>
      <path d={LATTU_BODY} fill="#D9A023" />
      <g clipPath={`url(#lattu-body-clip-${size})`}>
        <rect x="0" y="33" width="100" height="12" fill="#B23429" />
        <rect x="0" y="50" width="100" height="6" fill="#2C3A5C" />
      </g>
      <circle cx="50" cy="8" r="4.5" fill="#2C3A5C" />
      <path d="M18 32 Q 5 40 11 52" fill="none" stroke="#2C3A5C" strokeWidth="3.5" strokeLinecap="round" opacity="0.55" />
      <path d="M9 48 Q -1 58 7 70" fill="none" stroke="#2C3A5C" strokeWidth="3.5" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

export default function LattuLogo({ size = 34, showWordmark = true, light = false, className = "" }) {
  return (
    <span className={"lt-brandmark" + (light ? " lt-brandmark-light" : "") + (className ? " " + className : "")}>
      <LattuMark size={size} />
      {showWordmark && (
        <span className="lt-brandmark-word">
          lattu<span className="lt-brandmark-top">Top</span>
        </span>
      )}
    </span>
  );
}
