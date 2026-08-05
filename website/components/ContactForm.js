"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";

const SHIPPING_TERMS = ["FOB", "CIF", "EXW", "Not sure yet"];

export default function ContactForm({ products, initialProductSlug, initialEmail = "" }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: initialEmail,
    phone: "",
    product_interest: (() => {
      const match = products.find((p) => p.slug === initialProductSlug);
      return match ? String(match.id) : "";
    })(),
    quantity: "",
    destination_country: "",
    shipping_terms: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errors, setErrors] = useState([]);

  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrors([]);
    try {
      await apiPost("/api/inquiries", {
        name: form.name.trim(),
        company: form.company.trim() || undefined,
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        product_interest: form.product_interest ? Number(form.product_interest) : undefined,
        quantity: form.quantity.trim() || undefined,
        destination_country: form.destination_country.trim() || undefined,
        shipping_terms: form.shipping_terms || undefined,
        message: form.message.trim() || undefined,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrors(err.errors && err.errors.length ? err.errors : [err.message]);
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-teal-700/30 bg-teal-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-teal-900">Thanks — request received</h2>
        <p className="mt-2 text-teal-800/80">
          We&apos;ll get back to you shortly with a quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {errors.length > 0 && (
        <ul className="list-disc rounded-lg bg-red-50 p-4 pl-8 text-sm text-red-700">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Name *
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            className="rounded-lg border border-black/15 bg-white px-3 py-2 font-normal"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Company
          <input
            type="text"
            value={form.company}
            onChange={(e) => setField("company", e.target.value)}
            className="rounded-lg border border-black/15 bg-white px-3 py-2 font-normal"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Email *
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            className="rounded-lg border border-black/15 bg-white px-3 py-2 font-normal"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Phone
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className="rounded-lg border border-black/15 bg-white px-3 py-2 font-normal"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Product Interest
          <select
            value={form.product_interest}
            onChange={(e) => setField("product_interest", e.target.value)}
            className="rounded-lg border border-black/15 bg-white px-3 py-2 font-normal"
          >
            <option value="">Select a product (optional)</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Quantity
          <input
            type="text"
            placeholder="e.g. 10,000 units"
            value={form.quantity}
            onChange={(e) => setField("quantity", e.target.value)}
            className="rounded-lg border border-black/15 bg-white px-3 py-2 font-normal"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Destination Country
          <input
            type="text"
            value={form.destination_country}
            onChange={(e) => setField("destination_country", e.target.value)}
            className="rounded-lg border border-black/15 bg-white px-3 py-2 font-normal"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Shipping Terms Preference
          <select
            value={form.shipping_terms}
            onChange={(e) => setField("shipping_terms", e.target.value)}
            className="rounded-lg border border-black/15 bg-white px-3 py-2 font-normal"
          >
            <option value="">Select (optional)</option>
            {SHIPPING_TERMS.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Message
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setField("message", e.target.value)}
          className="rounded-lg border border-black/15 bg-white px-3 py-2 font-normal"
        />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 w-fit rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request a Quote"}
      </button>
    </form>
  );
}
