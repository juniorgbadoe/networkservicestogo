import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Image, FolderKanban, MessageSquare, Wrench, Eye } from 'lucide-react';

interface Stats {
  photos: number;
  projets: number;
  temoignages: number;
  services: number;
  users: number;
}

export function Dashboard() {
  const { fetchApi } = useApi();
  const [stats, setStats] = useState<Stats>({
    photos: 0,
    projets: 0,
    temoignages: 0,
    services: 0,
    users: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const [photosRes, projetsRes, temoignagesRes, servicesRes, usersRes] = await Promise.all([
        fetchApi<{ photos: unknown[] }>('/api/galerie/photos'),
        fetchApi<{ projets: unknown[] }>('/api/projets'),
        fetchApi<{ temoignages: unknown[] }>('/api/temoignages'),
        fetchApi<{ services: unknown[] }>('/api/services'),
        fetchApi<{ users: unknown[] }>('/api/admin/users')
      ]);

      setStats({
        photos: photosRes?.photos?.length || 0,
        projets: projetsRes?.projets?.length || 0,
        temoignages: temoignagesRes?.temoignages?.length || 0,
        services: servicesRes?.services?.length || 0,
        users: usersRes?.users?.length || 0
      });
      setLoading(false);
    }

    loadStats();
  }, [fetchApi]);

  const statCards = [
    { label: 'Photos', value: stats.photos, icon: Image, color: 'from-blue-500 to-blue-600', path: '/admin/galerie' },
    { label: 'Projets', value: stats.projets, icon: FolderKanban, color: 'from-purple-500 to-purple-600', path: '/admin/projets' },
    { label: 'Témoignages', value: stats.temoignages, icon: MessageSquare, color: 'from-amber-500 to-amber-600', path: '/admin/temoignages' },
    { label: 'Services', value: stats.services, icon: Wrench, color: 'from-teal-500 to-teal-600', path: '/admin/services' },
  ];

  return (
    <div className="dark:bg-[var(--bg)] dark:text-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0A1B2F] dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Vue d'ensemble du CMS</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#0055FF] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-white/[0.05] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <p className="text-3xl font-bold text-[#0A1B2F] dark:text-white">{stat.value}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-white/[0.05] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-white/10">
          <h2 className="text-lg font-semibold text-[#0A1B2F] dark:text-white mb-4">Actions rapides</h2>
          <div className="space-y-3">
            <a href="/admin/galerie" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-white/[0.05] hover:bg-gray-100 dark:hover:bg-white/[0.1] transition-colors">
              <Image className="text-[#0055FF]" size={20} />
              <span className="text-gray-700 dark:text-gray-300">Ajouter une photo</span>
            </a>
            <a href="/admin/projets" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-white/[0.05] hover:bg-gray-100 dark:hover:bg-white/[0.1] transition-colors">
              <FolderKanban className="text-[#0055FF]" size={20} />
              <span className="text-gray-700 dark:text-gray-300">Créer un projet</span>
            </a>
            <a href="/admin/temoignages" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-white/[0.05] hover:bg-gray-100 dark:hover:bg-white/[0.1] transition-colors">
              <MessageSquare className="text-[#0055FF]" size={20} />
              <span className="text-gray-700 dark:text-gray-300">Ajouter un témoignage</span>
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-white/[0.05] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-white/10">
          <h2 className="text-lg font-semibold text-[#0A1B2F] dark:text-white mb-4">Liens rapides</h2>
          <div className="space-y-3">
            <a href="/" target="_blank" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-white/[0.05] hover:bg-gray-100 dark:hover:bg-white/[0.1] transition-colors">
              <Eye className="text-teal-500" size={20} />
              <span className="text-gray-700 dark:text-gray-300">Voir le site</span>
            </a>
            <a href="/mediatheque" target="_blank" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-white/[0.05] hover:bg-gray-100 dark:hover:bg-white/[0.1] transition-colors">
              <Image className="text-teal-500" size={20} />
              <span className="text-gray-700 dark:text-gray-300">Médiathèque</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
