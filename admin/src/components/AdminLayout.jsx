import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100svh' }}>
      <nav style={{ width: 200, borderRight: '1px solid #e5e4e7', padding: 16 }}>
        <h2 style={{ fontSize: 16 }}>Indus Impex Admin</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/products">Products</NavLink></li>
          <li><NavLink to="/pages">Pages</NavLink></li>
          <li><NavLink to="/inquiries">Inquiries</NavLink></li>
        </ul>
        <button type="button" onClick={logout}>Log out</button>
      </nav>
      <main style={{ flex: 1, padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}
