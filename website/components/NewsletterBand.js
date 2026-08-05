"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LeafPattern from "./LeafPattern";

// Heading/body/CTA label come from the `pages` table (key "home"), edited
// via the admin. No newsletter/subscription endpoint exists on the
// backend, so instead of a non-functional email-capture box, submitting
// this form carries the email through to the real RFQ form pre-filled.
export default function NewsletterBand({ heading, body, ctaLabel = "Request a Quote" }) {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = email.trim() ? `?email=${encodeURIComponent(email.trim())}` : "";
    router.push(`/contact${query}`);
  };

  return (
    <div className="relative overflow-hidden bg-teal-700 px-6 py-14 text-center text-white">
      <LeafPattern className="text-white" opacity={0.08} />
      <div className="relative mx-auto max-w-xl">
        <h2 className="text-2xl font-semibold">{heading}</h2>
        <p className="mt-2 text-white/80">{body}</p>
        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full rounded-full border-0 bg-white px-5 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-800 transition-colors hover:bg-white/90"
          >
            {ctaLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
