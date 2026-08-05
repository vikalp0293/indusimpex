import { ICONS, LeafIcon } from "./icons";
import LeafPattern from "./LeafPattern";

// Visual stand-in for real photography that hasn't been supplied yet
// (see spec section 7, "Open Items / Placeholder Content"). Uses a
// consistent icon + leaf-motif illustration system rather than generic
// stock photography, since unthemed stock photos (tested: landscapes,
// buildings, pets) read as less credible than a deliberate placeholder for
// a B2B export catalog. Always carries a small "Placeholder" tag so it's
// never mistaken for real photography once real images are dropped in.
export default function PlaceholderImage({
  label = "Photo pending",
  icon = "leaf",
  aspect = "aspect-[4/3]",
  className = "",
}) {
  const Icon = ICONS[icon] || LeafIcon;

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-800 text-white ${aspect} ${className}`}
    >
      <LeafPattern className="text-white" opacity={0.12} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
          <Icon className="h-7 w-7 text-white" />
        </span>
        <p className="text-xs font-medium text-white/80">{label}</p>
      </div>
      <span className="absolute right-2 top-2 rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/90 backdrop-blur-sm">
        Placeholder
      </span>
    </div>
  );
}
