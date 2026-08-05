import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import { iconKeyForGalleryItem } from "@/components/icons";
import { resolveImageUrl } from "@/lib/api";
import { getPageContent } from "@/lib/api";

export const metadata = {
  title: "Gallery — Indus Impex",
};

// Fallback copy — used only if the "gallery" row in the `pages` table
// hasn't been created/edited yet.
const GALLERY_FALLBACK = {
  intro: "A look at the raw material, the pressing process, and the finished tableware.",
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
        {content.items.map((item) => {
          const imageUrl = resolveImageUrl(item.image);
          return imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.label}
              src={imageUrl}
              alt={item.label}
              className="aspect-square w-full rounded-xl object-cover"
            />
          ) : (
            <PlaceholderImage
              key={item.label}
              label={item.label}
              icon={iconKeyForGalleryItem(item.label)}
              aspect="aspect-square"
            />
          );
        })}
      </AnimatedSection>
    </div>
  );
}
