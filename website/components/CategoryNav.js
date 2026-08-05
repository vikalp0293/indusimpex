import Link from "next/link";
import { ICONS, LeafIcon, iconKeyForCategory } from "./icons";

// `categories` is derived from the actual distinct `products.category`
// values in the database (computed by the calling page from its product
// fetch) — not a hardcoded list, since category is a free-text column.
export default function CategoryNav({ categories = [], active = null }) {
  const items = [
    ...categories.map((value) => ({ label: value, value, Icon: ICONS[iconKeyForCategory(value)] })),
    { label: "All", value: null, Icon: LeafIcon },
  ];

  return (
    <nav className="flex flex-wrap justify-center gap-8 sm:gap-10">
      {items.map((cat) => {
        const href = cat.value ? `/products?category=${encodeURIComponent(cat.value)}` : "/products";
        const isActive = active === cat.value;
        return (
          <Link
            key={cat.label}
            href={href}
            className="group flex flex-col items-center gap-3 text-sm font-medium text-black/70 hover:text-teal-800"
          >
            <span
              className={`flex items-center justify-center rounded-full transition-all ${
                isActive
                  ? "bg-gradient-to-br from-teal-700 to-emerald-700 shadow-lg shadow-teal-900/20"
                  : "bg-gradient-to-br from-teal-50 to-emerald-50 ring-1 ring-teal-700/10 group-hover:shadow-md"
              }`}
              style={{ height: 72, width: 72 }}
            >
              <cat.Icon className={`h-8 w-8 ${isActive ? "text-white" : "text-teal-700"}`} />
            </span>
            {cat.label}
          </Link>
        );
      })}
    </nav>
  );
}
