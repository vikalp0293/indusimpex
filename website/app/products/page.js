// /products — grid of all products, pulled dynamically from the backend API.
// import { apiGet } from "@/lib/api";

export const metadata = {
  title: "Products — Indus Impex",
};

export default async function ProductsPage() {
  // const products = await apiGet("/api/products");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Products</h1>
      <p className="mt-2 text-black/60">
        Product grid (name, image, size/shape variants, HSN code, MOQ) — TODO: fetch from
        backend and render cards with a &quot;Request a Quote&quot; button per product.
      </p>
    </div>
  );
}
