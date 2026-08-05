import Link from "next/link";
import { ICONS, iconKeyForFeature } from "./icons";

// Quick-link tile grid (design pattern borrowed from category/catalog sites
// like Stephensons' "explore by need" section) pointing to our own real
// pages — content comes from the `pages` table (key "home").
export default function ExploreTiles({ heading, tiles = [] }) {
  if (tiles.length === 0) return null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {heading && <h2 className="text-center text-2xl font-semibold">{heading}</h2>}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => {
          const Icon = ICONS[iconKeyForFeature(tile.heading)];
          return (
            <Link
              key={tile.heading}
              href={tile.href || "#"}
              className="group flex flex-col rounded-xl border border-black/10 p-5 transition-shadow hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50">
                <Icon className="h-5 w-5 text-teal-700" />
              </span>
              <h3 className="mt-3 font-semibold text-black/90">{tile.heading}</h3>
              <p className="mt-1 flex-1 text-sm text-black/60">{tile.body}</p>
              <span className="mt-3 text-sm font-medium text-teal-800 group-hover:underline">
                View details →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
