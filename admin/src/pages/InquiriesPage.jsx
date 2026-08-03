import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

const STATUSES = ['new', 'read', 'responded'];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const loadInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = statusFilter ? `?status=${statusFilter}` : '';
      const data = await api.get(`/api/inquiries${query}`);
      setInquiries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleStatusChange = async (inquiry, status) => {
    setUpdatingId(inquiry.id);
    try {
      const updated = await api.patch(`/api/inquiries/${inquiry.id}`, { status });
      setInquiries((prev) => prev.map((i) => (i.id === inquiry.id ? { ...i, ...updated } : i)));
    } catch (err) {
      alert(`Failed to update status: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <h1>Inquiries</h1>

      <div style={{ marginBottom: 16 }}>
        <label>
          Filter by status:{' '}
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading && <p>Loading inquiries…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {!loading && !error && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e4e7' }}>
              <th style={{ padding: 8 }}>Received</th>
              <th style={{ padding: 8 }}>Name / Company</th>
              <th style={{ padding: 8 }}>Contact</th>
              <th style={{ padding: 8 }}>Product</th>
              <th style={{ padding: 8 }}>Quantity</th>
              <th style={{ padding: 8 }}>Destination</th>
              <th style={{ padding: 8 }}>Message</th>
              <th style={{ padding: 8 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: 8, color: '#666' }}>
                  No inquiries yet.
                </td>
              </tr>
            )}
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: 8, whiteSpace: 'nowrap' }}>
                  {new Date(inquiry.created_at).toLocaleDateString()}
                </td>
                <td style={{ padding: 8 }}>
                  {inquiry.name}
                  {inquiry.company && <div style={{ color: '#666' }}>{inquiry.company}</div>}
                </td>
                <td style={{ padding: 8 }}>
                  <div>{inquiry.email}</div>
                  {inquiry.phone && <div style={{ color: '#666' }}>{inquiry.phone}</div>}
                </td>
                <td style={{ padding: 8 }}>{inquiry.product_name || '—'}</td>
                <td style={{ padding: 8 }}>{inquiry.quantity || '—'}</td>
                <td style={{ padding: 8 }}>{inquiry.destination_country || '—'}</td>
                <td style={{ padding: 8, maxWidth: 240 }}>{inquiry.message || '—'}</td>
                <td style={{ padding: 8 }}>
                  <select
                    value={inquiry.status}
                    disabled={updatingId === inquiry.id}
                    onChange={(e) => handleStatusChange(inquiry, e.target.value)}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
