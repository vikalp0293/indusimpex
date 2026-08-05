import { ShieldIcon } from "./icons";

// Content comes from the `pages` table (key "home"), edited via the admin.
// Certifications aren't confirmed yet (spec section 7) — the dashed circle
// deliberately signals "pending" rather than a finished badge.
export default function TrustBadges({ badges = [] }) {
  if (badges.length === 0) return null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-center text-2xl font-semibold">Certifications &amp; Trust</h2>
      <div className="mt-10 flex flex-wrap justify-center gap-10">
        {badges.map((badge) => (
          <div key={badge.label} className="flex flex-col items-center gap-2 text-center">
            <span className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full border-2 border-dashed border-teal-700/30 bg-teal-50 px-2 text-center">
              <ShieldIcon className="h-5 w-5 text-teal-700/70" />
              <span className="text-xs font-semibold text-teal-800">{badge.label}</span>
            </span>
            <p className="text-xs text-black/40">{badge.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
