// Content comes from the `pages` table (key "home"), edited via the admin.
// Certifications aren't confirmed yet (spec section 7) — shown as pending
// until the business confirms which of these it actually holds.
export default function TrustBadges({ badges = [] }) {
  if (badges.length === 0) return null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-center text-2xl font-semibold">Certifications &amp; Trust</h2>
      <div className="mt-10 flex flex-wrap justify-center gap-10">
        {badges.map((badge) => (
          <div key={badge.label} className="flex flex-col items-center gap-2 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-teal-700/30 bg-teal-50 text-xs font-semibold text-teal-800">
              {badge.label}
            </span>
            <p className="text-xs text-black/40">{badge.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
