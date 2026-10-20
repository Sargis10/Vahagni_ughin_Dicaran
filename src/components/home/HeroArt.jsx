// Stylised, non-literal landscape (mountains and stone pillars) drawn as SVG for the hero.
// It does not depict a specific real place.

export function HeroArt() {
  return (
    <svg
      className="hero-art"
      viewBox="0 0 1440 560"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#151215" />
          <stop offset="0.65" stopColor="#2a1519" />
          <stop offset="1" stopColor="#3d1a1f" />
        </linearGradient>
        <radialGradient id="hero-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e3c88f" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#c9a45c" stopOpacity="0.12" />
          <stop offset="1" stopColor="#c9a45c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#151215" stopOpacity="0" />
          <stop offset="1" stopColor="#151215" />
        </linearGradient>
      </defs>

      <rect width="1440" height="560" fill="url(#hero-sky)" />
      <circle cx="1040" cy="250" r="190" fill="url(#hero-sun)" />
      <circle cx="1040" cy="250" r="62" fill="none" stroke="#c9a45c" strokeOpacity="0.45" />

      <path
        d="M0 420 L180 330 L300 370 L470 250 L560 300 L700 200 L820 290 L930 240 L1080 330 L1220 270 L1440 360 L1440 560 L0 560 Z"
        fill="#2a2428"
      />
      <path
        d="M700 200 L740 232 L720 236 L700 222 L676 238 L664 232 Z"
        fill="#cbbba5"
        fillOpacity="0.35"
      />
      <path
        d="M0 470 L220 400 L380 440 L560 370 L760 430 L940 380 L1140 440 L1300 400 L1440 430 L1440 560 L0 560 Z"
        fill="#1e1a1d"
      />

      <g fill="#151215" stroke="#3a3236" strokeWidth="1">
        <rect x="168" y="388" width="34" height="140" />
        <rect x="160" y="378" width="50" height="14" />
        <rect x="248" y="408" width="30" height="120" />
        <rect x="241" y="398" width="44" height="12" />
        <path d="M1180 528 L1180 420 Q1230 370 1280 420 L1280 528 L1258 528 L1258 432 Q1230 400 1202 432 L1202 528 Z" />
      </g>

      <rect y="380" width="1440" height="180" fill="url(#hero-fade)" />
    </svg>
  );
}
