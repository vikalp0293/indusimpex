import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';
import Card from '../components/ui/Card.jsx';
import { BoxIcon, MailIcon } from '../components/icons.jsx';

function StatCard({ label, value, Icon, to, loading }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="text-2xl font-bold text-slate-900">{loading ? '–' : value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [products, inquiries] = await Promise.all([
          api.get('/api/products'),
          api.get('/api/inquiries'),
        ]);
        if (cancelled) return;
        setStats({
          products: products.length,
          inquiries: inquiries.length,
          newInquiries: inquiries.filter((i) => i.status === 'new').length,
        });
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <p className="mb-6 text-sm text-slate-500">Overview of your catalog and inbound RFQs.</p>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Products" value={stats?.products} Icon={BoxIcon} to="/products" loading={!stats} />
        <StatCard
          label="New Inquiries"
          value={stats?.newInquiries}
          Icon={MailIcon}
          to="/inquiries"
          loading={!stats}
        />
        <StatCard
          label="Total Inquiries"
          value={stats?.inquiries}
          Icon={MailIcon}
          to="/inquiries"
          loading={!stats}
        />
      </div>

      <Card title="Quick links" className="mt-6">
        <ul className="flex flex-col gap-2 text-sm">
          <li>
            <Link to="/products" className="text-teal-700 hover:underline">
              Manage products →
            </Link>
          </li>
          <li>
            <Link to="/pages" className="text-teal-700 hover:underline">
              Edit website content →
            </Link>
          </li>
          <li>
            <Link to="/inquiries" className="text-teal-700 hover:underline">
              Review inquiries →
            </Link>
          </li>
        </ul>
      </Card>
    </div>
  );
}
