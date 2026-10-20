// Hand-drawn, schematic game map. It is not a geographic map of any real region.

const W = 1000;
const H = 625;

function toView({ x, y }) {
  return { x: (x / 100) * W, y: (y / 100) * H };
}

function curve(a, b) {
  const p = toView(a);
  const q = toView(b);
  const mx = (p.x + q.x) / 2;
  const my = (p.y + q.y) / 2 - Math.abs(q.x - p.x) * 0.12;
  return `M${p.x} ${p.y} Q${mx} ${my} ${q.x} ${q.y}`;
}

const mountains = [
  [640, 170, 70], [720, 140, 95], [800, 175, 70], [880, 150, 85], [930, 210, 55],
  [600, 250, 45], [760, 260, 60], [850, 300, 50], [690, 330, 40], [920, 360, 45],
];

export function MapArt({ routes }) {
  return (
    <svg className="map-art" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="map-land" cx="0.6" cy="0.4" r="0.8">
          <stop offset="0" stopColor="#3a2e2a" />
          <stop offset="1" stopColor="#1e1a1d" />
        </radialGradient>
        <linearGradient id="map-sea" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3d1a24" />
          <stop offset="1" stopColor="#25121a" />
        </linearGradient>
        <pattern id="map-waves" width="40" height="18" patternUnits="userSpaceOnUse">
          <path d="M0 9 Q10 3 20 9 T40 9" fill="none" stroke="#8c2a37" strokeOpacity="0.35" strokeWidth="1.2" />
        </pattern>
      </defs>

      <rect width={W} height={H} fill="url(#map-land)" />

      <path
        d="M0 210 C120 230 230 250 300 300 C360 345 330 420 300 470 C270 525 300 585 330 625 L0 625 Z"
        fill="url(#map-sea)"
      />
      <path
        d="M0 210 C120 230 230 250 300 300 C360 345 330 420 300 470 C270 525 300 585 330 625 L0 625 Z"
        fill="url(#map-waves)"
      />
      <path
        d="M0 210 C120 230 230 250 300 300 C360 345 330 420 300 470 C270 525 300 585 330 625"
        fill="none"
        stroke="#c9a45c"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />

      <g fill="#2a2428" stroke="#85765f" strokeOpacity="0.55" strokeWidth="1.2" strokeLinejoin="round">
        {mountains.map(([x, y, s]) => (
          <g key={`${x}-${y}`}>
            <path d={`M${x - s} ${y + s * 0.8} L${x} ${y - s * 0.6} L${x + s} ${y + s * 0.8} Z`} />
            <path d={`M${x - s * 0.28} ${y - s * 0.18} L${x} ${y - s * 0.6} L${x + s * 0.28} ${y - s * 0.18}`} fill="#cbbba5" fillOpacity="0.2" />
          </g>
        ))}
      </g>

      <g stroke="#5a4c44" strokeOpacity="0.5" fill="none">
        {[[420, 520], [470, 560], [520, 515], [560, 470], [600, 540], [650, 500]].map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x - 14} ${y} q14 -18 28 0`} />
        ))}
      </g>

      <g fill="none" strokeWidth="2.5" strokeLinecap="round">
        {routes.map((route) => (
          <path
            key={`${route.from.id}-${route.to.id}`}
            d={curve(route.from.position, route.to.position)}
            stroke={route.open ? '#c9a45c' : '#54494e'}
            strokeOpacity={route.open ? 0.8 : 0.7}
            strokeDasharray={route.open ? '2 9' : '2 12'}
          />
        ))}
      </g>

      <g transform="translate(925 555)" stroke="#a8843f" fill="none" strokeWidth="1.2" opacity="0.8">
        <circle r="34" />
        <path d="M0 -42 L7 -7 L42 0 L7 7 L0 42 L-7 7 L-42 0 L-7 -7 Z" />
      </g>

      <rect x="6" y="6" width={W - 12} height={H - 12} fill="none" stroke="#a8843f" strokeOpacity="0.4" />
    </svg>
  );
}
