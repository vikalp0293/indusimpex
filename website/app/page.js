import Link from "next/link";
import { apiGet, getPageContent, getDistinctCategories } from "@/lib/api";
import AnimatedSection from "@/components/AnimatedSection";
import Hero from "@/components/Hero";
import CategoryNav from "@/components/CategoryNav";
import ProductGrid from "@/components/ProductGrid";
import StatsSection from "@/components/StatsSection";
import MissionSection from "@/components/MissionSection";
import AlternatingFeature from "@/components/AlternatingFeature";
import TrustBadges from "@/components/TrustBadges";
import WhySourceSection from "@/components/WhySourceSection";
import ExploreTiles from "@/components/ExploreTiles";
import NewsletterBand from "@/components/NewsletterBand";

// Fallback copy — used only if the "home" row in the `pages` table hasn't
// been created/edited yet, so the page is never blank while content is
// still being written via the admin.
const HOME_FALLBACK = {
  hero: {
    headline: "Eco-Friendly Disposable Tableware, Made in India, Exported Worldwide",
    subtext:
      "Areca leaf plates and expanding eco-friendly tableware — naturally fallen leaves, no trees cut, fully biodegradable.",
  },
  stats: { items: [], note: null },
  story: { eyebrow: "", heading: "", body: "", ctaLabel: "", ctaHref: "/about" },
  mission: { heading: "Our Mission", body: "", foundingYear: null },
  trustBadges: [],
  whySource: [],
  exploreTiles: { heading: "", tiles: [] },
  newsletter: { heading: "Ready to Source Sustainably?", body: "", ctaLabel: "Request a Quote" },
};

async function getAllActiveProducts() {
  try {
    return await apiGet("/api/products?is_active=true");
  } catch {
    return null; // signals a fetch failure, distinct from a real empty list
  }
}

export default async function Home() {
  const [content, allProducts] = await Promise.all([
    getPageContent("home", HOME_FALLBACK),
    getAllActiveProducts(),
  ]);

  const categories = allProducts ? getDistinctCategories(allProducts) : [];
  // No dedicated "featured" flag in the schema yet — showing the most
  // recently added active products as a stand-in.
  const featuredProducts = allProducts ? allProducts.slice(0, 4) : null;

  return (
    <>
      <Hero {...content.hero} />

      <AnimatedSection className="mx-auto max-w-6xl px-6 py-16">
        <CategoryNav categories={categories} />
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <Link href="/products" className="text-sm font-medium text-teal-800 hover:underline">
            View all products →
          </Link>
        </div>
        <div className="mt-8">
          {featuredProducts === null ? (
            <p className="rounded-xl border border-dashed border-black/15 p-10 text-center text-black/50">
              Products are temporarily unavailable — please check back shortly.
            </p>
          ) : (
            <ProductGrid
              products={featuredProducts}
              emptyMessage="No products yet — check back soon."
            />
          )}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <StatsSection {...content.stats} />
      </AnimatedSection>

      {content.story?.heading && (
        <AnimatedSection>
          <AlternatingFeature {...content.story} image="/images/press.jpg" />
        </AnimatedSection>
      )}

      <AnimatedSection>
        <MissionSection {...content.mission} />
      </AnimatedSection>

      <AnimatedSection>
        <TrustBadges badges={content.trustBadges} />
      </AnimatedSection>

      <AnimatedSection>
        <WhySourceSection reasons={content.whySource} />
      </AnimatedSection>

      <AnimatedSection>
        <ExploreTiles {...content.exploreTiles} />
      </AnimatedSection>

      <AnimatedSection>
        <NewsletterBand {...content.newsletter} />
      </AnimatedSection>
    </>
  );
}
