import Link from "next/link";

// Background: real areca palm leaf photography (see /credits for
// attribution) with a dark teal overlay for text contrast — matches the
// spec's "hero with dark overlay image" layout pattern.
export default function Hero({
  headline,
  subtext,
  primaryCtaLabel = "View Products",
  primaryCtaHref = "/products",
  secondaryCtaLabel = "Request a Quote",
  secondaryCtaHref = "/contact",
}) {
  return (
    <div
      className="relative isolate overflow-hidden bg-cover bg-center px-6 py-28 text-center text-white sm:py-36"
      style={{ backgroundImage: "url(/images/hero-leaves.jpg)" }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-teal-950/90 via-teal-900/85 to-emerald-900/80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-amber-400/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{headline}</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">{subtext}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href={primaryCtaHref}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-900 transition-colors hover:bg-white/90"
          >
            {primaryCtaLabel}
          </Link>
          <Link
            href={secondaryCtaHref}
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {secondaryCtaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
