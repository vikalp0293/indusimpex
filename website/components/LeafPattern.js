// Tiled leaf-motif texture used as a low-opacity overlay on dark sections
// (hero, mission, footer). Ties visually to the areca-leaf story instead of
// generic stock photography we don't have real replacements for yet.
export default function LeafPattern({ className = "", opacity = 0.08 }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <pattern id="leaf-pattern" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
          <path
            d="M10 90C10 50 40 20 90 20c0 40-30 70-70 70Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
    </svg>
  );
}
