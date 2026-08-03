import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import { getPageContent } from "@/lib/api";

export const metadata = {
  title: "Gallery — Indus Impex",
};

// Fallback copy — used only if the "gallery" row in the `pages` table
// hasn't been created/edited yet. Real photography hasn't been supplied
// yet (spec section 7) — captions are DB-backed, but the images themselves
// stay placeholders until real photos are uploaded.
const GALLERY_FALLBACK = {
  intro:
    "Real photos of our production unit, packaging process, and product samples will replace these placeholders once supplied.",
  items: [],
};

export default async function GalleryPage() {
  const content = await getPageContent("gallery", GALLERY_FALLBACK);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <AnimatedSection as="div">
        <h1 className="text-3xl font-semibold">Gallery</h1>
        <p className="mt-2 max-w-2xl text-black/60">{content.intro}</p>
      </AnimatedSection>

      <AnimatedSection as="div" className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {content.items.map((label) => (
          <PlaceholderImage key={label} label={label} aspect="aspect-square" />
        ))}
      </AnimatedSection>
    </div>
  );
}
