import { useState } from 'react';
import Card from './ui/Card.jsx';
import Button from './ui/Button.jsx';
import { Field, inputClasses, textareaClasses } from './ui/Field.jsx';

const emptyProduct = {
  name: '',
  slug: '',
  category: '',
  description: '',
  material_specs: '',
  hsn_code: '',
  moq_notes: '',
  is_active: true,
  images: [],
  variants: [],
};

function toFormState(product) {
  if (!product) return emptyProduct;
  return {
    name: product.name || '',
    slug: product.slug || '',
    category: product.category || '',
    description: product.description || '',
    material_specs: product.material_specs || '',
    hsn_code: product.hsn_code || '',
    moq_notes: product.moq_notes || '',
    is_active: Boolean(product.is_active),
    images: (product.images || []).map((img) => ({ image_path: img.image_path })),
    variants: (product.variants || []).map((v) => ({ size: v.size || '', shape: v.shape || '' })),
  };
}

// Converts form state into the payload shape the backend expects,
// dropping blank optional fields and empty image/variant rows.
function toPayload(form) {
  return {
    name: form.name.trim(),
    slug: form.slug.trim() || undefined,
    category: form.category.trim() || null,
    description: form.description.trim() || null,
    material_specs: form.material_specs.trim() || null,
    hsn_code: form.hsn_code.trim() || null,
    moq_notes: form.moq_notes.trim() || null,
    is_active: form.is_active,
    images: form.images
      .map((img) => ({ image_path: img.image_path.trim() }))
      .filter((img) => img.image_path),
    variants: form.variants
      .map((v) => ({ size: v.size.trim(), shape: v.shape.trim() }))
      .filter((v) => v.size || v.shape),
  };
}

export default function ProductForm({ product, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(() => toFormState(product));
  const [errors, setErrors] = useState([]);

  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const addImage = () => setField('images', [...form.images, { image_path: '' }]);
  const updateImage = (i, value) =>
    setField(
      'images',
      form.images.map((img, idx) => (idx === i ? { image_path: value } : img))
    );
  const removeImage = (i) =>
    setField('images', form.images.filter((_, idx) => idx !== i));

  const addVariant = () => setField('variants', [...form.variants, { size: '', shape: '' }]);
  const updateVariant = (i, field, value) =>
    setField(
      'variants',
      form.variants.map((v, idx) => (idx === i ? { ...v, [field]: value } : v))
    );
  const removeVariant = (i) =>
    setField('variants', form.variants.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      await onSubmit(toPayload(form));
    } catch (err) {
      setErrors(err.errors && err.errors.length ? err.errors : [err.message]);
    }
  };

  return (
    <Card
      title={product ? 'Edit Product' : 'New Product'}
      className="mb-6 max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {errors.length > 0 && (
          <ul className="list-disc rounded-lg bg-red-50 py-3 pl-8 pr-3 text-sm text-red-700">
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Name">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              required
              className={inputClasses}
            />
          </Field>

          <Field label="Category" hint="e.g. Plates / Cups / Cutlery">
            <input
              type="text"
              value={form.category}
              onChange={(e) => setField('category', e.target.value)}
              placeholder="Plates"
              className={inputClasses}
            />
          </Field>
        </div>

        <Field label="Slug" hint="Optional — auto-generated from name if left blank">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setField('slug', e.target.value)}
            placeholder="areca-leaf-plate-round"
            className={inputClasses}
          />
        </Field>

        <Field label="Description">
          <textarea
            value={form.description}
            onChange={(e) => setField('description', e.target.value)}
            rows={3}
            className={textareaClasses}
          />
        </Field>

        <Field label="Material Specs">
          <textarea
            value={form.material_specs}
            onChange={(e) => setField('material_specs', e.target.value)}
            rows={2}
            className={textareaClasses}
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="HSN Code">
            <input
              type="text"
              value={form.hsn_code}
              onChange={(e) => setField('hsn_code', e.target.value)}
              className={inputClasses}
            />
          </Field>

          <Field label="MOQ Notes">
            <input
              type="text"
              value={form.moq_notes}
              onChange={(e) => setField('moq_notes', e.target.value)}
              className={inputClasses}
            />
          </Field>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setField('is_active', e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
          />
          Active (visible on the public site)
        </label>

        <fieldset className="rounded-lg border border-slate-200 p-4">
          <legend className="px-1 text-sm font-semibold text-slate-700">Images</legend>
          {form.images.map((img, i) => (
            <div key={i} className="mb-2 flex gap-2">
              <input
                type="text"
                value={img.image_path}
                onChange={(e) => updateImage(i, e.target.value)}
                placeholder="/uploads/product-1.jpg"
                className={`${inputClasses} flex-1`}
              />
              <Button size="sm" variant="danger" onClick={() => removeImage(i)}>
                Remove
              </Button>
            </div>
          ))}
          <Button size="sm" onClick={addImage} className="mt-1">
            Add image path
          </Button>
        </fieldset>

        <fieldset className="rounded-lg border border-slate-200 p-4">
          <legend className="px-1 text-sm font-semibold text-slate-700">Variants</legend>
          {form.variants.map((v, i) => (
            <div key={i} className="mb-2 flex gap-2">
              <input
                type="text"
                value={v.size}
                onChange={(e) => updateVariant(i, 'size', e.target.value)}
                placeholder="Size (e.g. 10 inch)"
                className={`${inputClasses} flex-1`}
              />
              <input
                type="text"
                value={v.shape}
                onChange={(e) => updateVariant(i, 'shape', e.target.value)}
                placeholder="Shape (e.g. round)"
                className={`${inputClasses} flex-1`}
              />
              <Button size="sm" variant="danger" onClick={() => removeVariant(i)}>
                Remove
              </Button>
            </div>
          ))}
          <Button size="sm" onClick={addVariant} className="mt-1">
            Add variant
          </Button>
        </fieldset>

        <div className="flex gap-2 pt-2">
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? 'Saving…' : 'Save'}
          </Button>
          <Button type="button" onClick={onCancel} disabled={submitting}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
