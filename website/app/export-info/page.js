import AnimatedSection from "@/components/AnimatedSection";
import { getPageContent } from "@/lib/api";

export const metadata = {
  title: "Export Info — Indus Impex",
};

// Fallback copy — used only if the "export-info" row in the `pages` table
// hasn't been created/edited yet.
const EXPORT_INFO_FALLBACK = {
  intro: "",
  shippingTerms: [],
  portsShippedFrom: "",
  leadTimes: "",
  samplePolicy: "",
  paymentTerms: "",
};

export default async function ExportInfoPage() {
  const content = await getPageContent("export-info", EXPORT_INFO_FALLBACK);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <AnimatedSection as="div">
        <h1 className="text-3xl font-semibold">Export Info</h1>
        <p className="mt-4 text-black/70">{content.intro}</p>
      </AnimatedSection>

      {content.shippingTerms.length > 0 && (
        <AnimatedSection as="div" className="mt-14">
          <h2 className="text-xl font-semibold">Shipping Terms</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {content.shippingTerms.map((t) => (
              <div key={t.term} className="rounded-xl border border-black/10 p-5">
                <h3 className="font-medium text-teal-800">{t.term}</h3>
                <p className="mt-2 text-sm text-black/60">{t.body}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection as="div" className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold">Ports Shipped From</h2>
          <p className="mt-3 text-black/70">{content.portsShippedFrom}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Lead Times</h2>
          <p className="mt-3 text-black/70">{content.leadTimes}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Sample Policy</h2>
          <p className="mt-3 text-black/70">
            {content.samplePolicy}{" "}
            <a href="/contact" className="text-teal-800 underline">
              Request samples via the contact form
            </a>
            .
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Payment Terms</h2>
          <p className="mt-3 text-black/70">{content.paymentTerms}</p>
        </div>
      </AnimatedSection>
    </div>
  );
}
