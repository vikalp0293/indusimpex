import RepeatableRows from './RepeatableRows.jsx';
import Card from './ui/Card.jsx';
import { Field, inputClasses, textareaClasses } from './ui/Field.jsx';

// Structured editor for the "about" page content — mirrors the shape
// website/app/about/page.js expects.
export default function AboutPageForm({ value, onChange }) {
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
            rows={4}
            className={textareaClasses}
          />
        </Field>
      </Card>

      <Card title="Manufacturing Capability">
        <div className="flex flex-col gap-4">
          <Field label="Heading">
            <input
              type="text"
              value={value.manufacturing.heading}
              onChange={(e) => set(['manufacturing', 'heading'], e.target.value)}
              className={inputClasses}
            />
          </Field>
          <Field label="Body">
            <textarea
              value={value.manufacturing.body}
              onChange={(e) => set(['manufacturing', 'body'], e.target.value)}
              rows={3}
              className={textareaClasses}
            />
          </Field>
        </div>
      </Card>

      <Card title="Certifications">
        <RepeatableRows
          items={value.certifications}
          fields={[
            { name: 'label', label: 'Label (e.g. FSSAI)' },
            { name: 'note', label: 'Note (e.g. pending confirmation)' },
          ]}
          emptyItem={{ label: '', note: '' }}
          addLabel="Add certification"
          onChange={(items) => set(['certifications'], items)}
        />
      </Card>

      <Card title="Sustainability Story">
        <div className="flex flex-col gap-4">
          <Field label="Heading">
            <input
              type="text"
              value={value.sustainability.heading}
              onChange={(e) => set(['sustainability', 'heading'], e.target.value)}
              className={inputClasses}
            />
          </Field>
          <Field label="Body">
            <textarea
              value={value.sustainability.body}
              onChange={(e) => set(['sustainability', 'body'], e.target.value)}
              rows={3}
              className={textareaClasses}
            />
          </Field>
        </div>
      </Card>
    </div>
  );
}
