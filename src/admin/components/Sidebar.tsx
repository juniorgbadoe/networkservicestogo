import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Image,
  FolderKanban,
  MessageSquare,
  Wrench,
  Users,
  Settings,
  Waypoints,
  LogOut
} from 'lucide-react';
import { useAuth } from '../hooks/useApi';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/admin/galerie', icon: Image, label: 'Galerie' },
  { path: '/admin/projets', icon: FolderKanban, label: 'Projets' },
  { path: '/admin/temoignages', icon: MessageSquare, label: 'Témoignages' },
  { path: '/admin/services', icon: Wrench, label: 'Services' },
  { path: '/admin/navigation', icon: Waypoints, label: 'Navigation' },
  { path: '/admin/users', icon: Users, label: 'Utilisateurs', adminOnly: true },
  { path: '/admin/settings', icon: Settings, label: 'Paramètres' },
];

export function Sidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();

  const isActive = (path: string, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 min-h-screen bg-[#0A1B2F] text-white flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold text-white">NSTOGO</h1>
        <p className="text-xs text-white/60 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          if (item.adminOnly && user?.role !== 'super_admin') return null;

          const Icon = item.icon;
          const active = isActive(item.path, item.exact);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                active
                  ? 'bg-[#0055FF] text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#0055FF] flex items-center justify-center text-sm font-bold">
            {user?.nom?.charAt(0) || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.nom || 'Admin'}</p>
            <p className="text-xs text-white/50 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors w-full"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
