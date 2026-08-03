import ProductCard from "./ProductCard";

export default function ProductGrid({ products, emptyMessage = "No products to show yet." }) {
  if (!products || products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-black/15 p-10 text-center text-black/50">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
