import Link from "next/link";

// Real hero photography hasn't been supplied yet (spec section 7), so the
// dark-overlay background is a teal/emerald gradient rather than a real
// image — flagged with the same "Placeholder" tag used elsewhere. Text
// content comes from the `pages` table (key "home"), edited via the admin.
export default function Hero({
  headline,
  subtext,
  primaryCtaLabel = "View Products",
  primaryCtaHref = "/products",
  secondaryCtaLabel = "Request a Quote",
  secondaryCtaHref = "/contact",
}) {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-teal-950 via-teal-900 to-emerald-900 px-6 py-28 text-center text-white sm:py-36">
      <span className="absolute right-4 top-4 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/70">
        Placeholder visual
      </span>
      <div className="mx-auto max-w-3xl">
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
