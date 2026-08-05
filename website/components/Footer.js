import Link from "next/link";
import LeafPattern from "./LeafPattern";
import BrandLogo from "./BrandLogo";

const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/export-info", label: "Export Info" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-teal-950 text-white">
      <LeafPattern className="text-white" opacity={0.05} />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <BrandLogo variant="dark" />
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Eco-friendly disposable tableware, manufactured and exported from India — for
            domestic and international B2B buyers.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Quick Links
          </h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Get In Touch
          </h3>
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Have a requirement in mind? Send us your product, quantity, and destination and
            we&apos;ll get back with a quote.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-teal-900 transition-colors hover:bg-white/90"
          >
            Request a Quote
          </Link>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-6 text-center text-sm text-white/50">
        &copy; {new Date().getFullYear()} Indus Impex. All rights reserved. &middot;{" "}
        <Link href="/credits" className="underline hover:text-white/70">
          Image credits
        </Link>
      </div>
    </footer>
  );
}
