import { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import Badge from '../components/ui/Badge.jsx';
import { inputClasses } from '../components/ui/Field.jsx';

const STATUSES = ['new', 'read', 'responded'];
const STATUS_TONE = { new: 'amber', read: 'teal', responded: 'green' };

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
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {inquiries.length} inquir{inquiries.length === 1 ? 'y' : 'ies'}
        </p>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          Status
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`${inputClasses} w-auto`}
          >
            <option value="">All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading && <p className="text-sm text-slate-500">Loading inquiries…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="whitespace-nowrap px-4 py-3">Received</th>
                <th className="px-4 py-3">Name / Company</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Destination</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                    No inquiries yet.
                  </td>
                </tr>
              )}
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="align-top hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{inquiry.name}</div>
                    {inquiry.company && <div className="text-slate-500">{inquiry.company}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-900">{inquiry.email}</div>
                    {inquiry.phone && <div className="text-slate-500">{inquiry.phone}</div>}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{inquiry.product_name || '—'}</td>
                  <td className="px-4 py-3 text-slate-500">{inquiry.quantity || '—'}</td>
                  <td className="px-4 py-3 text-slate-500">{inquiry.destination_country || '—'}</td>
                  <td className="max-w-60 px-4 py-3 text-slate-500">{inquiry.message || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-start gap-1.5">
                      <Badge tone={STATUS_TONE[inquiry.status]}>{inquiry.status}</Badge>
                      <select
                        value={inquiry.status}
                        disabled={updatingId === inquiry.id}
                        onChange={(e) => handleStatusChange(inquiry, e.target.value)}
                        className={`${inputClasses} py-1 text-xs`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
