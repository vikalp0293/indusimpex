import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { DashboardIcon, BoxIcon, DocumentIcon, MailIcon, LogoutIcon } from './icons.jsx';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', Icon: DashboardIcon },
  { to: '/products', label: 'Products', Icon: BoxIcon },
  { to: '/pages', label: 'Pages', Icon: DocumentIcon },
  { to: '/inquiries', label: 'Inquiries', Icon: MailIcon },
];

const TITLES = {
  '/dashboard': 'Dashboard',
  '/products': 'Products',
  '/pages': 'Pages',
  '/inquiries': 'Inquiries',
};

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const currentTitle =
    Object.entries(TITLES).find(([path]) => location.pathname.startsWith(path))?.[1] ?? 'Admin';

  return (
    <div className="flex min-h-svh bg-slate-50">
      <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="flex items-center gap-2 px-5 py-5">
          <img src="/icon.png" alt="" className="h-8 w-8" />
          <span className="text-base font-bold tracking-wide">
            <span className="text-[#052146]">Indus</span> <span className="text-[#cb933b]">Impex</span>
          </span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {NAV_ITEMS.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-50 text-teal-800'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-100 p-3">
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <LogoutIcon className="h-5 w-5 shrink-0" />
            Log out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center border-b border-slate-200 bg-white px-6">
          <h1 className="text-lg font-semibold text-slate-900">{currentTitle}</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
