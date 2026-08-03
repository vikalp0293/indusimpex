import { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import ProductForm from '../components/ProductForm.jsx';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null); // null closed, 'new', or a product object
  const [submitting, setSubmitting] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get('/api/products');
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreate = async (payload) => {
    setSubmitting(true);
    try {
      await api.post('/api/products', payload);
      setEditing(null);
      await loadProducts();
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (payload) => {
    setSubmitting(true);
    try {
      await api.put(`/api/products/${editing.id}`, payload);
      setEditing(null);
      await loadProducts();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/api/products/${product.id}`);
      await loadProducts();
    } catch (err) {
      alert(`Failed to delete: ${err.message}`);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Products</h1>
        {editing === null && (
          <button type="button" onClick={() => setEditing('new')}>
            New Product
          </button>
        )}
      </div>

      {editing === 'new' && (
        <ProductForm
          onSubmit={handleCreate}
          onCancel={() => setEditing(null)}
          submitting={submitting}
        />
      )}
      {editing && editing !== 'new' && (
        <ProductForm
          product={editing}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
          submitting={submitting}
        />
      )}

      {loading && <p>Loading products…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {!loading && !error && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e4e7' }}>
              <th style={{ padding: 8 }}>Name</th>
              <th style={{ padding: 8 }}>Slug</th>
              <th style={{ padding: 8 }}>Category</th>
              <th style={{ padding: 8 }}>HSN Code</th>
              <th style={{ padding: 8 }}>Active</th>
              <th style={{ padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: 8, color: '#666' }}>
                  No products yet.
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: 8 }}>{product.name}</td>
                <td style={{ padding: 8 }}>{product.slug}</td>
                <td style={{ padding: 8 }}>{product.category}</td>
                <td style={{ padding: 8 }}>{product.hsn_code}</td>
                <td style={{ padding: 8 }}>{product.is_active ? 'Yes' : 'No'}</td>
                <td style={{ padding: 8, display: 'flex', gap: 8 }}>
                  <button type="button" onClick={() => setEditing(product)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(product)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
