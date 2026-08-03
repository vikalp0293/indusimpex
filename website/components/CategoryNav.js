import Link from "next/link";

// `categories` is derived from the actual distinct `products.category`
// values in the database (computed by the calling page from its product
// fetch) — not a hardcoded list, since category is a free-text column.
export default function CategoryNav({ categories = [], active = null }) {
  const items = [...categories.map((value) => ({ label: value, value })), { label: "All", value: null }];

  return (
    <nav className="flex flex-wrap justify-center gap-8">
      {items.map((cat) => {
        const href = cat.value ? `/products?category=${encodeURIComponent(cat.value)}` : "/products";
        const isActive = active === cat.value;
        return (
          <Link
            key={cat.label}
            href={href}
            className="flex flex-col items-center gap-2 text-sm font-medium text-black/70 hover:text-teal-800"
          >
            <span
              className={`flex h-16 w-16 items-center justify-center rounded-full text-xl font-semibold shadow-sm transition-colors ${
                isActive ? "bg-teal-700 text-white" : "bg-teal-50 text-teal-800"
              }`}
            >
              {cat.value ? cat.value.charAt(0).toUpperCase() : "✦"}
            </span>
            {cat.label}
          </Link>
        );
      })}
    </nav>
  );
}
