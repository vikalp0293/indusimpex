import { apiGet, getDistinctCategories } from "@/lib/api";
import AnimatedSection from "@/components/AnimatedSection";
import CategoryNav from "@/components/CategoryNav";
import ProductGrid from "@/components/ProductGrid";

export const metadata = {
  title: "Products — Indus Impex",
};

async function getProducts(category) {
  try {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    return await apiGet(`/api/products${query}`);
  } catch {
    return null;
  }
}

async function getAllProducts() {
  try {
    return await apiGet("/api/products");
  } catch {
    return [];
  }
}

export default async function ProductsPage({ searchParams }) {
  const { category } = await searchParams;
  const [products, allProducts] = await Promise.all([getProducts(category), getAllProducts()]);
  const categories = getDistinctCategories(allProducts);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <AnimatedSection as="div">
        <h1 className="text-3xl font-semibold">Products</h1>
        <p className="mt-2 max-w-2xl text-black/60">
          Browse our range of eco-friendly disposable tableware. No prices are listed here —
          request a quote for pricing, MOQ, and shipping terms tailored to your order.
        </p>
      </AnimatedSection>

      <AnimatedSection as="div" className="mt-10">
        <CategoryNav categories={categories} active={category || null} />
      </AnimatedSection>

      <AnimatedSection as="div" className="mt-10">
        {products === null ? (
          <p className="rounded-xl border border-dashed border-black/15 p-10 text-center text-black/50">
            Products are temporarily unavailable — please check back shortly.
          </p>
        ) : (
          <ProductGrid
            products={products}
            emptyMessage={
              category
                ? `No products in "${category}" yet — check back soon.`
                : "No products yet — check back soon."
            }
          />
        )}
      </AnimatedSection>
    </div>
  );
}
