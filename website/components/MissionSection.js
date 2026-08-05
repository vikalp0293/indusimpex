import { LeafIcon } from "./icons";

// Content comes from the `pages` table (key "home"), edited via the admin.
// Background: real areca leaf plate photography (see /credits) with a dark
// overlay, matching the spec's "full-width dark section" layout pattern.
export default function MissionSection({ heading, body, foundingYear }) {
  return (
    <div
      className="relative overflow-hidden bg-cover bg-center px-6 py-20 text-white"
      style={{ backgroundImage: "url(/images/plate-square.jpg)" }}
    >
      <div className="absolute inset-0 bg-teal-950/85" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
          <LeafIcon className="h-7 w-7 text-amber-400" />
        </span>
        <h2 className="mt-5 text-2xl font-semibold sm:text-3xl">{heading}</h2>
        <p className="mt-6 text-lg leading-relaxed text-white/80">{body}</p>
        {foundingYear && (
          <p className="mt-4 text-sm text-white/50">
            Handcrafted in India since{" "}
            <span className="rounded bg-white/10 px-1.5 py-0.5 font-medium text-white/70">
              {foundingYear}
            </span>
            .
          </p>
        )}
      </div>
    </div>
  );
}
