import Button from './ui/Button.jsx';
import { Field, inputClasses, textareaClasses } from './ui/Field.jsx';

// Repeatable list of small objects (e.g. { value, label } stat rows,
// { label, note } badge rows) — add/remove/edit rows of plain text fields.
export default function RepeatableRows({ items, fields, onChange, addLabel = 'Add item', emptyItem }) {
  const update = (i, field, value) =>
    onChange(items.map((item, idx) => (idx === i ? { ...item, [field]: value } : item)));
  const add = () => onChange([...items, { ...emptyItem }]);
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="mb-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div className="flex flex-col gap-3">
            {fields.map((f) => (
              <Field key={f.name} label={f.label}>
                {f.type === 'textarea' ? (
                  <textarea
                    value={item[f.name] || ''}
                    onChange={(e) => update(i, f.name, e.target.value)}
                    rows={f.rows || 2}
                    className={textareaClasses}
                  />
                ) : (
                  <input
                    type="text"
                    value={item[f.name] || ''}
                    onChange={(e) => update(i, f.name, e.target.value)}
                    className={inputClasses}
                  />
                )}
              </Field>
            ))}
          </div>
          <Button size="sm" variant="danger" onClick={() => remove(i)} className="mt-3">
            Remove
          </Button>
        </div>
      ))}
      <Button size="sm" onClick={add}>
        {addLabel}
      </Button>
    </div>
  );
}
