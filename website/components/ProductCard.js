import Link from "next/link";
import { resolveImageUrl } from "@/lib/api";
import { iconKeyForCategory } from "./icons";
import PlaceholderImage from "./PlaceholderImage";

export default function ProductCard({ product }) {
  const firstImage = product.images && product.images[0];
  const imageUrl = firstImage ? resolveImageUrl(firstImage.image_path) : null;
  const quoteHref = `/contact?product=${encodeURIComponent(
    product.slug
  )}&name=${encodeURIComponent(product.name)}`;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/10">
      <Link href={`/products/${product.slug}`} className="block overflow-hidden">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={product.name}
            className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <PlaceholderImage label={product.name} icon={iconKeyForCategory(product.category)} />
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {product.category && (
          <span className="w-fit rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800">
            {product.category}
          </span>
        )}
        <Link href={`/products/${product.slug}`} className="font-semibold text-black/90 hover:text-teal-800">
          {product.name}
        </Link>
        {product.hsn_code && (
          <p className="text-xs text-black/45">HSN: {product.hsn_code}</p>
        )}
        <Link
          href={quoteHref}
          className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
        >
          Request a Quote
        </Link>
      </div>
    </div>
  );
}
