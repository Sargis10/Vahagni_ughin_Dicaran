// Decorative geometric motifs drawn for this project; purely ornamental, no symbolic claim is made.

export function Rosette({ size = 64, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M32 4 L38 26 L60 32 L38 38 L32 60 L26 38 L4 32 L26 26 Z" />
        <path d="M32 14 L44 20 L50 32 L44 44 L32 50 L20 44 L14 32 L20 20 Z" opacity="0.6" />
        <circle cx="32" cy="32" r="5" />
      </g>
    </svg>
  );
}

export function OrnamentDivider({ className }) {
  return (
    <div className={['ornament-divider', className].filter(Boolean).join(' ')} aria-hidden="true">
      <span className="ornament-divider__line" />
      <svg width="40" height="16" viewBox="0 0 40 16" fill="none" focusable="false">
        <g stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round">
          <path d="M20 1 L27 8 L20 15 L13 8 Z" />
          <path d="M7 5 L10 8 L7 11 L4 8 Z" />
          <path d="M33 5 L36 8 L33 11 L30 8 Z" />
        </g>
      </svg>
      <span className="ornament-divider__line" />
    </div>
  );
}
