import Link from "next/link";

// Heading/body/CTA label come from the `pages` table (key "home"), edited
// via the admin. The link always points at the real RFQ form — no
// newsletter/subscription endpoint exists on the backend, so this stays a
// CTA into the working form rather than a non-functional email capture box.
export default function NewsletterBand({ heading, body, ctaLabel = "Request a Quote" }) {
  return (
    <div className="bg-teal-700 px-6 py-14 text-center text-white">
      <h2 className="text-2xl font-semibold">{heading}</h2>
      <p className="mx-auto mt-2 max-w-xl text-white/80">{body}</p>
      <Link
        href="/contact"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-800 transition-colors hover:bg-white/90"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
