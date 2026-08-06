import PegDoll from "./PegDoll";

export function SchoolScene() {
  return (
    <svg viewBox="0 0 260 170" className="lt-scene-svg">
      <rect x="0" y="0" width="260" height="170" rx="16" fill="#EAD9B0" />
      <rect x="18" y="20" width="90" height="60" rx="6" fill="#F3E9D2" stroke="#2C1B10" strokeOpacity="0.15" />
      <path d="M30 34 h66 M30 44 h66 M30 54 h40" stroke="#B23429" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <rect x="16" y="118" width="228" height="8" rx="4" fill="#8B5A2B" />
      <g transform="translate(140,50)">
        <PegDoll uid="scn-school-1" body="#B23429" head="#D9A023" pattern="stripes" size={54} />
      </g>
      <g transform="translate(190,58)">
        <PegDoll uid="scn-school-2" body="#2C3A5C" head="#F3E9D2" pattern="dots" size={46} />
      </g>
      <g transform="translate(90,64)">
        <PegDoll uid="scn-school-3" body="#0E6B4F" head="#D9A023" pattern="dots" size={44} />
      </g>
    </svg>
  );
}

export function OfficeScene() {
  return (
    <svg viewBox="0 0 260 170" className="lt-scene-svg">
      <rect x="0" y="0" width="260" height="170" rx="16" fill="#DCE1E8" />
      <rect x="16" y="118" width="228" height="8" rx="4" fill="#2C3A5C" />
      <rect x="30" y="70" width="70" height="46" rx="4" fill="#2C1B10" opacity="0.85" />
      <rect x="34" y="74" width="62" height="34" rx="2" fill="#8FB4D9" />
      <path d="M180 118 L180 90 Q180 78 195 78 Q210 78 210 92" stroke="#0E6B4F" strokeWidth="6" fill="none" strokeLinecap="round" />
      <ellipse cx="195" cy="76" rx="16" ry="10" fill="#0E6B4F" />
      <rect x="205" y="96" width="26" height="22" rx="3" fill="#B23429" />
      <path d="M205 100 h26" stroke="#F3E9D2" strokeWidth="3" />
      <g transform="translate(118,54)">
        <PegDoll uid="scn-office-1" body="#F3E9D2" head="#8B5A2B" pattern="stripes" size={58} />
      </g>
    </svg>
  );
}

export function RestaurantScene() {
  return (
    <svg viewBox="0 0 260 170" className="lt-scene-svg">
      <rect x="0" y="0" width="260" height="170" rx="16" fill="#3A2416" />
      <rect x="16" y="60" width="228" height="8" rx="4" fill="#8B5A2B" />
      <rect x="16" y="112" width="228" height="8" rx="4" fill="#8B5A2B" />
      <circle cx="205" cy="40" r="10" fill="#D9A023" opacity="0.85" />
      <path d="M205 30 q3 -10 0 -16 q-3 6 0 16" fill="#D9A023" opacity="0.7" />
      <g transform="translate(28,20)">
        <PegDoll uid="scn-rest-1" body="#B23429" head="#D9A023" pattern="dots" size={40} />
      </g>
      <g transform="translate(80,10)">
        <PegDoll uid="scn-rest-2" body="#2C3A5C" head="#F3E9D2" pattern="stripes" size={46} />
      </g>
      <g transform="translate(140,72)">
        <PegDoll uid="scn-rest-3" body="#8B5A2B" head="#F3E9D2" pattern="dots" size={40} />
      </g>
      <g transform="translate(190,66)">
        <PegDoll uid="scn-rest-4" body="#D9A023" head="#B23429" pattern="stripes" size={44} />
      </g>
    </svg>
  );
}
