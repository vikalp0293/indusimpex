import Link from "next/link";
import { resolveImageUrl } from "@/lib/api";
import PlaceholderImage from "./PlaceholderImage";

export default function ProductCard({ product }) {
  const firstImage = product.images && product.images[0];
  const imageUrl = firstImage ? resolveImageUrl(firstImage.image_path) : null;
  const quoteHref = `/contact?product=${encodeURIComponent(
    product.slug
  )}&name=${encodeURIComponent(product.name)}`;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white transition-shadow hover:shadow-md">
      <Link href={`/products/${product.slug}`}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={product.name}
            className="aspect-[4/3] w-full object-cover"
          />
        ) : (
          <PlaceholderImage label={product.name} />
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {product.category && (
          <span className="w-fit rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-800">
            {product.category}
          </span>
        )}
        <Link href={`/products/${product.slug}`} className="font-semibold hover:text-teal-800">
          {product.name}
        </Link>
        {product.hsn_code && (
          <p className="text-xs text-black/50">HSN: {product.hsn_code}</p>
        )}
        <Link
          href={quoteHref}
          className="mt-auto inline-flex items-center justify-center rounded-full bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
        >
          Request a Quote
        </Link>
      </div>
    </div>
  );
}
