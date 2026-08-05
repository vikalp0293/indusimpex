"use client";

import { useState } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";

const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/export-info", label: "Export Info" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <BrandLogo />
        </Link>

        {/* Tablet and up: full horizontal nav */}
        <ul className="hidden items-center gap-7 text-sm font-medium text-black/70 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-teal-800">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden shrink-0 rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 md:inline-flex"
        >
          Request a Quote
        </Link>

        {/* Mobile: hamburger toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-md text-black/80 md:hidden"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile: collapsible menu panel */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-black/10 px-6 py-3 text-sm md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="block py-2" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-teal-700 px-5 py-2.5 font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Request a Quote
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
