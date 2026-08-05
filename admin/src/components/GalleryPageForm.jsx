import RepeatableRows from './RepeatableRows.jsx';
import Card from './ui/Card.jsx';
import { Field, textareaClasses } from './ui/Field.jsx';

// Structured editor for the "gallery" page content — mirrors the shape
// website/app/gallery/page.js expects. `image` is a path/URL, same
// convention as product image paths in the Products form — leave blank
// and the site shows a labeled placeholder tile until a photo is added.
export default function GalleryPageForm({ value, onChange }) {
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
            rows={2}
            className={textareaClasses}
          />
        </Field>
      </Card>

      <Card
        title="Photos"
        description="Leave the image path blank to show a labeled placeholder tile until a real photo is available."
      >
        <RepeatableRows
          items={value.items}
          fields={[
            { name: 'label', label: 'Caption (e.g. Production unit — exterior)' },
            { name: 'image', label: 'Image path or URL (optional)' },
          ]}
          emptyItem={{ label: '', image: '' }}
          addLabel="Add photo"
          onChange={(items) => set(['items'], items)}
        />
      </Card>
    </div>
  );
}
