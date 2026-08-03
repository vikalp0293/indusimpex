// Content comes from the `pages` table (key "home"), edited via the admin.
// Testimonials aren't available pre-launch (spec section 7), so this
// section stands in for them per the spec's explicit guidance.
export default function WhySourceSection({ reasons = [] }) {
  if (reasons.length === 0) return null;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-center text-2xl font-semibold">Why Source From Us</h2>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {reasons.map((reason) => (
          <div key={reason.title} className="rounded-xl border border-black/10 p-6">
            <h3 className="font-semibold text-teal-800">{reason.title}</h3>
            <p className="mt-2 text-sm text-black/60">{reason.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
