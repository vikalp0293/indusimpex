import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import { apiGet } from "@/lib/api";

export const metadata = {
  title: "Contact — Indus Impex",
};

async function getProducts() {
  try {
    return await apiGet("/api/products?is_active=true");
  } catch {
    return [];
  }
}

export default async function ContactPage({ searchParams }) {
  const { product, name, email } = await searchParams;
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <AnimatedSection as="div">
        <h1 className="text-3xl font-semibold">Request a Quote</h1>
        <p className="mt-2 text-black/60">
          {name
            ? `Tell us a bit more about your requirement for "${name}" and we'll get back to you with a quote.`
            : "Tell us what you need — product, quantity, and destination — and we'll get back to you with a quote."}
        </p>
      </AnimatedSection>

      <AnimatedSection as="div" className="mt-10">
        <ContactForm products={products} initialProductSlug={product} initialEmail={email} />
      </AnimatedSection>
    </div>
  );
}
