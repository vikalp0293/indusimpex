import { ICONS, iconKeyForFeature } from "./icons";

// Content comes from the `pages` table (key "home"), edited via the admin.
// Testimonials aren't available pre-launch (spec section 7), so this
// section stands in for them per the spec's explicit guidance.
export default function WhySourceSection({ reasons = [] }) {
  if (reasons.length === 0) return null;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-center text-2xl font-semibold">Why Source From Us</h2>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {reasons.map((reason) => {
          const Icon = ICONS[iconKeyForFeature(reason.title)];
          return (
            <div
              key={reason.title}
              className="rounded-2xl border border-black/10 p-6 transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50">
                <Icon className="h-6 w-6 text-teal-700" />
              </span>
              <h3 className="mt-4 font-semibold text-teal-900">{reason.title}</h3>
              <p className="mt-2 text-sm text-black/60">{reason.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
