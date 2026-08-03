// Content comes from the `pages` table (key "home"), edited via the admin.
export default function MissionSection({ heading, body, foundingYear }) {
  return (
    <div className="bg-teal-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">{heading}</h2>
        <p className="mt-6 text-lg text-white/80">{body}</p>
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
