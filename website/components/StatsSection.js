// Content comes from the `pages` table (key "home"), edited via the admin.
// Real business figures aren't confirmed yet (spec section 7, "Real stats"),
// so the seeded defaults are placeholders — swap in actual figures via admin.
export default function StatsSection({ items = [], note }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 text-center">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {items.map((stat) => (
          <div key={stat.label}>
            <p className="text-4xl font-bold text-teal-800">{stat.value}</p>
            <p className="mt-2 text-sm text-black/60">{stat.label}</p>
          </div>
        ))}
      </div>
      {note && <p className="mt-8 text-xs text-black/40">* {note}</p>}
    </div>
  );
}
