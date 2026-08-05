export const inputClasses =
  'block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600';

export const textareaClasses = `${inputClasses} resize-y`;

// `hint` is deliberately a sibling <p>, not nested inside <label> — nesting
// it would fold the hint text into the label's accessible name (e.g.
// "Category e.g. Plates / Cups / Cutlery" instead of just "Category"),
// which is wrong for screen readers and breaks label-based lookups.
export function Field({ label, hint, children, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-700">
        {label}
        <div className="mt-1 font-normal">{children}</div>
      </label>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
