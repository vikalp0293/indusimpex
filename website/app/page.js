// Homepage — section skeleton per project spec. Each section is a placeholder
// to be built out with real content, data fetching, and Framer Motion animations.

function Section({ title, note, className = "" }) {
  return (
    <section className={`mx-auto max-w-6xl px-6 py-16 ${className}`}>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-black/60">{note}</p>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Section
        title="Hero"
        note='Category-first headline, subtext, "View Products" / "Request a Quote" CTAs.'
      />
      <Section title="Category quick-nav" note="Plates / Cups / Cutlery / All." />
      <Section
        title="Featured Products"
        note="Product grid pulled from the backend API, not hardcoded."
      />
      <Section title="Stats" note="Years in business, countries served, product types." />
      <Section title="Mission / Story" note="Sustainability narrative, made-in-India story." />
      <Section title="Trust Badges" note="Certifications and guarantees." />
      <Section title="Why Source From Us" note="Testimonials placeholder pre-launch." />
      <Section title="Newsletter / Contact Capture" note="Footer signup band." />
    </>
  );
}
