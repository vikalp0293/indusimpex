import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import { getPageContent } from "@/lib/api";

export const metadata = {
  title: "About — Indus Impex",
};

// Fallback copy — used only if the "about" row in the `pages` table hasn't
// been created/edited yet.
const ABOUT_FALLBACK = {
  intro: "",
  manufacturing: { heading: "Manufacturing Capability", body: "" },
  certifications: [],
  sustainability: { heading: "Sustainability Story", body: "" },
};

export default async function AboutPage() {
  const content = await getPageContent("about", ABOUT_FALLBACK);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <AnimatedSection as="div">
        <h1 className="text-3xl font-semibold">About Indus Impex</h1>
        <p className="mt-4 text-black/70">{content.intro}</p>
      </AnimatedSection>

      <AnimatedSection as="div" className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold">{content.manufacturing.heading}</h2>
          <p className="mt-3 text-black/70">{content.manufacturing.body}</p>
        </div>
        <PlaceholderImage label="Manufacturing unit" />
      </AnimatedSection>

      {content.certifications.length > 0 && (
        <AnimatedSection as="div" className="mt-14">
          <h2 className="text-xl font-semibold">Certifications</h2>
          <div className="mt-6 flex flex-wrap gap-8">
            {content.certifications.map((cert) => (
              <div key={cert.label} className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-teal-700/30 bg-teal-50 px-2 text-center text-xs font-semibold text-teal-800">
                  {cert.label}
                </span>
                <p className="text-xs text-black/40">{cert.note}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection
        as="div"
        className="mt-14 bg-teal-950 -mx-6 px-6 py-14 text-white sm:rounded-2xl sm:mx-0"
      >
        <h2 className="text-xl font-semibold">{content.sustainability.heading}</h2>
        <p className="mt-3 max-w-2xl text-white/80">{content.sustainability.body}</p>
      </AnimatedSection>
    </div>
  );
}
