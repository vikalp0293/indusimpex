import AnimatedSection from "@/components/AnimatedSection";
import { ShieldIcon } from "@/components/icons";
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/press.jpg"
          alt="Areca leaf plate press machine in operation"
          className="aspect-[4/3] w-full rounded-xl object-cover"
        />
      </AnimatedSection>

      {content.certifications.length > 0 && (
        <AnimatedSection as="div" className="mt-14">
          <h2 className="text-xl font-semibold">Certifications</h2>
          <div className="mt-6 flex flex-wrap gap-8">
            {content.certifications.map((cert) => (
              <div key={cert.label} className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full border-2 border-dashed border-teal-700/30 bg-teal-50 px-2 text-center">
                  <ShieldIcon className="h-5 w-5 text-teal-700/70" />
                  <span className="text-xs font-semibold text-teal-800">{cert.label}</span>
                </span>
                <p className="text-xs text-black/40">{cert.note}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection
        as="div"
        className="relative mt-14 -mx-6 overflow-hidden bg-cover bg-center px-6 py-14 text-white sm:mx-0 sm:rounded-2xl"
        style={{ backgroundImage: "url(/images/hero-leaves.jpg)" }}
      >
        <div className="absolute inset-0 bg-teal-950/85" aria-hidden="true" />
        <div className="relative">
          <h2 className="text-xl font-semibold">{content.sustainability.heading}</h2>
          <p className="mt-3 max-w-2xl text-white/80">{content.sustainability.body}</p>
        </div>
      </AnimatedSection>
    </div>
  );
}
