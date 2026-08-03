export const metadata = {
  title: "Contact — Indus Impex",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Contact / Request a Quote</h1>
      <p className="mt-2 text-black/60">
        RFQ form (Name, Company, Email, Phone, Product Interest, Quantity, Destination
        Country, Shipping Terms, Message) submitting to the backend&apos;s{" "}
        <code>/api/inquiries</code> endpoint — TODO.
      </p>
    </div>
  );
}
