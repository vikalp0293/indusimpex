import LeafPattern from "./LeafPattern";

// Content comes from the `pages` table (key "home"), edited via the admin.
// Real business figures aren't confirmed yet (spec section 7, "Real stats"),
// so the seeded defaults are placeholders — swap in actual figures via admin.
export default function StatsSection({ items = [], note }) {
  if (items.length === 0) return null;

  return (
    <div className="relative overflow-hidden bg-teal-900 px-6 py-16 text-center text-white">
      <LeafPattern className="text-white" opacity={0.06} />
      <div className="relative mx-auto grid max-w-5xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {items.map((stat) => (
          <div key={stat.label} className="px-4 py-6 sm:py-0">
            <p className="text-4xl font-bold text-amber-400 sm:text-5xl">{stat.value}</p>
            <p className="mt-2 text-sm text-white/70">{stat.label}</p>
          </div>
        ))}
      </div>
      {note && <p className="relative mt-8 text-xs text-white/40">* {note}</p>}
    </div>
  );
}
