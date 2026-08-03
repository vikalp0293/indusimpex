import { useState } from 'react';

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
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        border: '1px solid #e5e4e7',
        borderRadius: 8,
        padding: 16,
        marginBottom: 24,
        maxWidth: 480,
      }}
    >
      <h2 style={{ fontSize: 18, margin: 0 }}>{product ? 'Edit Product' : 'New Product'}</h2>

      {errors.length > 0 && (
        <ul style={{ color: 'crimson', margin: 0, paddingLeft: 20 }}>
          {errors.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}

      <label>
        Name
        <input
          type="text"
          value={form.name}
          onChange={(e) => setField('name', e.target.value)}
          required
          style={{ display: 'block', width: '100%' }}
        />
      </label>

      <label>
        Slug (optional — auto-generated from name if blank)
        <input
          type="text"
          value={form.slug}
          onChange={(e) => setField('slug', e.target.value)}
          placeholder="areca-leaf-plate-round"
          style={{ display: 'block', width: '100%' }}
        />
      </label>

      <label>
        Category
        <input
          type="text"
          value={form.category}
          onChange={(e) => setField('category', e.target.value)}
          placeholder="Plates / Cups / Cutlery"
          style={{ display: 'block', width: '100%' }}
        />
      </label>

      <label>
        Description
        <textarea
          value={form.description}
          onChange={(e) => setField('description', e.target.value)}
          rows={3}
          style={{ display: 'block', width: '100%' }}
        />
      </label>

      <label>
        Material Specs
        <textarea
          value={form.material_specs}
          onChange={(e) => setField('material_specs', e.target.value)}
          rows={2}
          style={{ display: 'block', width: '100%' }}
        />
      </label>

      <label>
        HSN Code
        <input
          type="text"
          value={form.hsn_code}
          onChange={(e) => setField('hsn_code', e.target.value)}
          style={{ display: 'block', width: '100%' }}
        />
      </label>

      <label>
        MOQ Notes
        <input
          type="text"
          value={form.moq_notes}
          onChange={(e) => setField('moq_notes', e.target.value)}
          style={{ display: 'block', width: '100%' }}
        />
      </label>

      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="checkbox"
          checked={form.is_active}
          onChange={(e) => setField('is_active', e.target.checked)}
        />
        Active (visible on the public site)
      </label>

      <div>
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Images</p>
        {form.images.map((img, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <input
              type="text"
              value={img.image_path}
              onChange={(e) => updateImage(i, e.target.value)}
              placeholder="/uploads/product-1.jpg"
              style={{ flex: 1 }}
            />
            <button type="button" onClick={() => removeImage(i)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addImage}>
          Add image path
        </button>
      </div>

      <div>
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Variants</p>
        {form.variants.map((v, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <input
              type="text"
              value={v.size}
              onChange={(e) => updateVariant(i, 'size', e.target.value)}
              placeholder="Size (e.g. 10 inch)"
              style={{ flex: 1 }}
            />
            <input
              type="text"
              value={v.shape}
              onChange={(e) => updateVariant(i, 'shape', e.target.value)}
              placeholder="Shape (e.g. round)"
              style={{ flex: 1 }}
            />
            <button type="button" onClick={() => removeVariant(i)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addVariant}>
          Add variant
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save'}
        </button>
        <button type="button" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}
