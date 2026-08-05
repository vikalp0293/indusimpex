import RepeatableRows from './RepeatableRows.jsx';
import Card from './ui/Card.jsx';
import { Field, textareaClasses } from './ui/Field.jsx';

// Structured editor for the "export-info" page content — mirrors the shape
// website/app/export-info/page.js expects.
export default function ExportInfoPageForm({ value, onChange }) {
  const set = (path, val) => {
    const next = structuredClone(value);
    let obj = next;
    for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
    obj[path[path.length - 1]] = val;
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card title="Introduction">
        <Field label="Intro paragraph">
          <textarea
            value={value.intro}
            onChange={(e) => set(['intro'], e.target.value)}
            rows={3}
            className={textareaClasses}
          />
        </Field>
      </Card>

      <Card title="Shipping Terms">
        <RepeatableRows
          items={value.shippingTerms}
          fields={[
            { name: 'term', label: 'Term (e.g. FOB (Free On Board))' },
            { name: 'body', label: 'Explanation', type: 'textarea', rows: 2 },
          ]}
          emptyItem={{ term: '', body: '' }}
          addLabel="Add term"
          onChange={(items) => set(['shippingTerms'], items)}
        />
      </Card>

      <Card title="Ports, Lead Times, Samples & Payment">
        <div className="flex flex-col gap-4">
          <Field label="Ports shipped from">
            <textarea
              value={value.portsShippedFrom}
              onChange={(e) => set(['portsShippedFrom'], e.target.value)}
              rows={2}
              className={textareaClasses}
            />
          </Field>
          <Field label="Lead times">
            <textarea
              value={value.leadTimes}
              onChange={(e) => set(['leadTimes'], e.target.value)}
              rows={2}
              className={textareaClasses}
            />
          </Field>
          <Field label="Sample policy">
            <textarea
              value={value.samplePolicy}
              onChange={(e) => set(['samplePolicy'], e.target.value)}
              rows={2}
              className={textareaClasses}
            />
          </Field>
          <Field label="Payment terms">
            <textarea
              value={value.paymentTerms}
              onChange={(e) => set(['paymentTerms'], e.target.value)}
              rows={2}
              className={textareaClasses}
            />
          </Field>
        </div>
      </Card>
    </div>
  );
}
