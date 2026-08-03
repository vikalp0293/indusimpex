import Link from "next/link";
import { notFound } from "next/navigation";
import { apiGet, resolveImageUrl } from "@/lib/api";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";

async function getProduct(slug) {
  try {
    return await apiGet(`/api/products/${slug}`);
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const quoteHref = `/contact?product=${encodeURIComponent(
    product.slug
  )}&name=${encodeURIComponent(product.name)}`;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <AnimatedSection as="div" className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          {product.images && product.images.length > 0 ? (
            product.images.map((img) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={img.id}
                src={resolveImageUrl(img.image_path)}
                alt={product.name}
                className="aspect-square w-full rounded-xl object-cover"
              />
            ))
          ) : (
            <PlaceholderImage label={product.name} aspect="aspect-square" className="col-span-2" />
          )}
        </div>

        <div>
          {product.category && (
            <span className="w-fit rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-800">
              {product.category}
            </span>
          )}
          <h1 className="mt-3 text-3xl font-semibold">{product.name}</h1>

          {product.description && (
            <p className="mt-4 text-black/70">{product.description}</p>
          )}

          <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {product.material_specs && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-black/40">
                  Material
                </dt>
                <dd className="mt-1 text-sm text-black/70">{product.material_specs}</dd>
              </div>
            )}
            {product.hsn_code && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-black/40">
                  HSN Code
                </dt>
                <dd className="mt-1 text-sm text-black/70">{product.hsn_code}</dd>
              </div>
            )}
            {product.moq_notes && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-black/40">
                  MOQ
                </dt>
                <dd className="mt-1 text-sm text-black/70">{product.moq_notes}</dd>
              </div>
            )}
          </dl>

          {product.variants && product.variants.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-black/40">
                Size / Shape Variants
              </h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <li
                    key={v.id}
                    className="rounded-full border border-black/10 px-3 py-1 text-sm text-black/70"
                  >
                    {[v.size, v.shape].filter(Boolean).join(" · ")}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href={quoteHref}
            className="mt-10 inline-flex items-center justify-center rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
          >
            Request a Quote
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
