import Link from "next/link";
import PlaceholderImage from "./PlaceholderImage";

// Alternating image+text layout pattern (spec section 4, "Layout patterns
// to carry over from the reference"). Content comes from the `pages` table.
// `image` is a static asset path (not admin-editable — there's no image
// upload flow yet); falls back to the icon placeholder if omitted.
export default function AlternatingFeature({
  eyebrow,
  heading,
  body,
  ctaLabel,
  ctaHref = "/about",
  icon = "factory",
  image,
  reverse = false,
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div
        className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={heading}
            className="aspect-[4/3] w-full rounded-xl object-cover"
          />
        ) : (
          <PlaceholderImage label={heading} icon={icon} aspect="aspect-[4/3]" />
        )}
        <div>
          {eyebrow && (
            <span className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{heading}</h2>
          <p className="mt-4 text-black/70">{body}</p>
          {ctaLabel && (
            <Link
              href={ctaHref}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
            >
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
