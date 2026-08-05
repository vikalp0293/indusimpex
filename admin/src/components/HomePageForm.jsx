import RepeatableRows from './RepeatableRows.jsx';
import Card from './ui/Card.jsx';
import { Field, inputClasses, textareaClasses } from './ui/Field.jsx';

// Structured editor for the "home" page content — mirrors the shape
// website/app/page.js expects (Hero/Stats/Story/Mission/TrustBadges/
// WhySource/Newsletter props) so a non-technical admin never has to see
// JSON to change any of it.
export default function HomePageForm({ value, onChange }) {
  const set = (path, val) => {
    const next = structuredClone(value);
    let obj = next;
    for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
    obj[path[path.length - 1]] = val;
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card title="Hero">
        <div className="flex flex-col gap-4">
          <Field label="Headline">
            <textarea
              value={value.hero.headline}
              onChange={(e) => set(['hero', 'headline'], e.target.value)}
              rows={2}
              className={textareaClasses}
            />
          </Field>
          <Field label="Subtext">
            <textarea
              value={value.hero.subtext}
              onChange={(e) => set(['hero', 'subtext'], e.target.value)}
              rows={2}
              className={textareaClasses}
            />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Primary button label">
              <input
                type="text"
                value={value.hero.primaryCtaLabel}
                onChange={(e) => set(['hero', 'primaryCtaLabel'], e.target.value)}
                className={inputClasses}
              />
            </Field>
            <Field label="Primary button link">
              <input
                type="text"
                value={value.hero.primaryCtaHref}
                onChange={(e) => set(['hero', 'primaryCtaHref'], e.target.value)}
                className={inputClasses}
              />
            </Field>
            <Field label="Secondary button label">
              <input
                type="text"
                value={value.hero.secondaryCtaLabel}
                onChange={(e) => set(['hero', 'secondaryCtaLabel'], e.target.value)}
                className={inputClasses}
              />
            </Field>
            <Field label="Secondary button link">
              <input
                type="text"
                value={value.hero.secondaryCtaHref}
                onChange={(e) => set(['hero', 'secondaryCtaHref'], e.target.value)}
                className={inputClasses}
              />
            </Field>
          </div>
        </div>
      </Card>

      <Card title="Stats">
        <RepeatableRows
          items={value.stats.items}
          fields={[
            { name: 'value', label: 'Value (e.g. 5+)' },
            { name: 'label', label: 'Label (e.g. Years in Business)' },
          ]}
          emptyItem={{ value: '', label: '' }}
          addLabel="Add stat"
          onChange={(items) => set(['stats', 'items'], items)}
        />
        <div className="mt-4">
          <Field label="Footnote">
            <input
              type="text"
              value={value.stats.note || ''}
              onChange={(e) => set(['stats', 'note'], e.target.value)}
              className={inputClasses}
            />
          </Field>
        </div>
      </Card>

      <Card title="Story" description="Alternating image/text section. Leave heading blank to hide it.">
        <div className="flex flex-col gap-4">
          <Field label="Eyebrow">
            <input
              type="text"
              value={value.story.eyebrow}
              onChange={(e) => set(['story', 'eyebrow'], e.target.value)}
              className={inputClasses}
            />
          </Field>
          <Field label="Heading">
            <input
              type="text"
              value={value.story.heading}
              onChange={(e) => set(['story', 'heading'], e.target.value)}
              className={inputClasses}
            />
          </Field>
          <Field label="Body">
            <textarea
              value={value.story.body}
              onChange={(e) => set(['story', 'body'], e.target.value)}
              rows={3}
              className={textareaClasses}
            />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Button label">
              <input
                type="text"
                value={value.story.ctaLabel}
                onChange={(e) => set(['story', 'ctaLabel'], e.target.value)}
                className={inputClasses}
              />
            </Field>
            <Field label="Button link">
              <input
                type="text"
                value={value.story.ctaHref}
                onChange={(e) => set(['story', 'ctaHref'], e.target.value)}
                className={inputClasses}
              />
            </Field>
          </div>
        </div>
      </Card>

      <Card title="Mission">
        <div className="flex flex-col gap-4">
          <Field label="Heading">
            <input
              type="text"
              value={value.mission.heading}
              onChange={(e) => set(['mission', 'heading'], e.target.value)}
              className={inputClasses}
            />
          </Field>
          <Field label="Body">
            <textarea
              value={value.mission.body}
              onChange={(e) => set(['mission', 'body'], e.target.value)}
              rows={3}
              className={textareaClasses}
            />
          </Field>
          <Field label="Founding year" hint="e.g. 2018, or TBD">
            <input
              type="text"
              value={value.mission.foundingYear || ''}
              onChange={(e) => set(['mission', 'foundingYear'], e.target.value)}
              className={inputClasses}
            />
          </Field>
        </div>
      </Card>

      <Card title="Certifications & Trust badges">
        <RepeatableRows
          items={value.trustBadges}
          fields={[
            { name: 'label', label: 'Label (e.g. FSSAI)' },
            { name: 'note', label: 'Note (e.g. pending confirmation)' },
          ]}
          emptyItem={{ label: '', note: '' }}
          addLabel="Add badge"
          onChange={(items) => set(['trustBadges'], items)}
        />
      </Card>

      <Card title="Why Source From Us">
        <RepeatableRows
          items={value.whySource}
          fields={[
            { name: 'title', label: 'Title' },
            { name: 'body', label: 'Body', type: 'textarea', rows: 2 },
          ]}
          emptyItem={{ title: '', body: '' }}
          addLabel="Add reason"
          onChange={(items) => set(['whySource'], items)}
        />
      </Card>

      <Card title="Explore Tiles" description="Quick-link grid pointing to other pages on the site.">
        <div className="mb-4">
          <Field label="Section heading">
            <input
              type="text"
              value={value.exploreTiles.heading}
              onChange={(e) => set(['exploreTiles', 'heading'], e.target.value)}
              className={inputClasses}
            />
          </Field>
        </div>
        <RepeatableRows
          items={value.exploreTiles.tiles}
          fields={[
            { name: 'heading', label: 'Tile heading' },
            { name: 'body', label: 'Tile body', type: 'textarea', rows: 2 },
            { name: 'href', label: 'Link (e.g. /products)' },
          ]}
          emptyItem={{ heading: '', body: '', href: '' }}
          addLabel="Add tile"
          onChange={(items) => set(['exploreTiles', 'tiles'], items)}
        />
      </Card>

      <Card title="Newsletter / quote band">
        <div className="flex flex-col gap-4">
          <Field label="Heading">
            <input
              type="text"
              value={value.newsletter.heading}
              onChange={(e) => set(['newsletter', 'heading'], e.target.value)}
              className={inputClasses}
            />
          </Field>
          <Field label="Body">
            <textarea
              value={value.newsletter.body}
              onChange={(e) => set(['newsletter', 'body'], e.target.value)}
              rows={2}
              className={textareaClasses}
            />
          </Field>
          <Field label="Button label">
            <input
              type="text"
              value={value.newsletter.ctaLabel}
              onChange={(e) => set(['newsletter', 'ctaLabel'], e.target.value)}
              className={inputClasses}
            />
          </Field>
        </div>
      </Card>
    </div>
  );
}
