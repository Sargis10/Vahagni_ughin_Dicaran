const ICONS = {
  rosette: 'M24 13l2.6 6.4 6.9.5-5.3 4.4 1.7 6.7L24 27.3 18.1 31l1.7-6.7-5.3-4.4 6.9-.5z',
  eye: 'M12 24c3.5-5.5 7.5-8 12-8s8.5 2.5 12 8c-3.5 5.5-7.5 8-12 8s-8.5-2.5-12-8z M24 20.5a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7z',
  quill: 'M33 13c-7 1.5-12.5 7-15 15l-2 6 6-2c8-2.5 13.5-8 15-15z M16 34l8-8',
  flame: 'M24 12c1.5 4.5 7 7.5 7 13.5a7 7 0 0 1-14 0c0-3.5 2-5.5 3.5-7 .5 2.5 1.5 3.5 3 4-.5-4 0-7.5.5-10.5z',
};

/** Decorative medal for a badge; locked badges are drawn muted. */
export function BadgeMedal({ badge, earned, size = 56 }) {
  return (
    <svg
      className={`badge-medal${earned ? ' badge-medal--earned' : ''}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M24 3l5.5 4 6.8-.3 2.2 6.4 5.5 4-2.1 6.5 2.1 6.5-5.5 4-2.2 6.4-6.8-.3-5.5 4-5.5-4-6.8.3-2.2-6.4-5.5-4 2.1-6.5-2.1-6.5 5.5-4 2.2-6.4 6.8.3z" className="badge-medal__rim" />
      <circle cx="24" cy="24" r="14" className="badge-medal__face" />
      <path d={ICONS[badge.icon] ?? ICONS.rosette} className="badge-medal__icon" />
    </svg>
  );
}
