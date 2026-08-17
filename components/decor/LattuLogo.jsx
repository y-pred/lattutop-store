// Brand mark: the lattu (spinning top) diamond, same silhouette used by the
// interactive spinning-top decoration elsewhere on the site, so the logo and
// the decorative mascot always read as the same shape.
//
// Two variants:
//   - "color"  the everyday logo — three colour panels + wordmark, used in
//              the header, favicon, etc.
//   - "stamp"  a single-colour outline reduction of the same silhouette,
//              meant as a reference for a future wood-burned/hand-painted
//              imprint on the physical dolls. One shape, no gradients, no
//              fine detail — easy to carve or paint by hand at small sizes.
//
// The outer silhouette (the diamond path below) is the one shape that must
// stay identical across both variants and across SpinningTop.jsx, so the
// mark, the decoration, and the future doll imprint all trace back to the
// same simple form.

const DIAMOND = "M40 4 L68 26 L60 60 L40 86 L20 60 L12 26 Z";

export function LattuMark({ size = 40, variant = "color", className = "" }) {
  const height = size;
  const width = (size * 80) / 90;

  if (variant === "stamp") {
    // Single ink-colour outline — what you'd actually burn or paint onto a
    // wooden doll. No fills, no colour panels, just the silhouette and the
    // centre spin-line, both easy to reproduce by hand.
    return (
      <svg viewBox="0 0 80 90" width={width} height={height} className={className} aria-hidden="true">
        <path d={DIAMOND} fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <line x1="40" y1="4" x2="40" y2="86" stroke="currentColor" strokeWidth="3" opacity="0.6" />
        <circle cx="40" cy="8" r="4" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 80 90" width={width} height={height} className={className} aria-hidden="true">
      <path d={DIAMOND} fill="#D9A023" />
      <path d="M40 4 L68 26 L60 60 L40 40 Z" fill="#B23429" opacity="0.9" />
      <path d="M40 4 L12 26 L20 60 L40 40 Z" fill="#2C3A5C" opacity="0.9" />
      <circle cx="40" cy="8" r="5" fill="#F3E9D2" />
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
