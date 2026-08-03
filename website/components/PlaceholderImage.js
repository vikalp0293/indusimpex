// Visual stand-in for real photography that hasn't been supplied yet
// (see spec section 7, "Open Items / Placeholder Content"). Always carries
// a small "Placeholder" tag so it's never mistaken for real product/site
// photography once real images are dropped in.
export default function PlaceholderImage({
  label = "Photo pending",
  aspect = "aspect-[4/3]",
  className = "",
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-dashed border-teal-700/30 bg-gradient-to-br from-teal-50 to-emerald-100 ${aspect} ${className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <svg
          className="h-8 w-8 text-teal-700/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5V6a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 21 6v12a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18v-1.5Zm0 0 5-5 3.5 3.5L16 10l5 5"
          />
          <circle cx="8" cy="8.5" r="1.5" />
        </svg>
        <p className="text-xs font-medium text-teal-900/60">{label}</p>
      </div>
      <span className="absolute right-2 top-2 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal-800 shadow-sm">
        Placeholder
      </span>
    </div>
  );
}
