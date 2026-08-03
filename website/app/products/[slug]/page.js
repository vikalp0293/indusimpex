// /products/[slug] — full spec sheet for a single product.
// import { apiGet } from "@/lib/api";

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  // const product = await apiGet(`/api/products/${slug}`);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Product: {slug}</h1>
      <p className="mt-2 text-black/60">
        Dimensions, material, packaging options, HSN code, MOQ, image gallery, and a
        &quot;Request a Quote&quot; CTA — TODO: fetch from backend.
      </p>
    </div>
  );
}
