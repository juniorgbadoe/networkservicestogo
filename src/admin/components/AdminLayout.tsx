import { Outlet, Navigate } from 'react-router';
import { Sidebar } from './Sidebar';
import { useAuth } from '../hooks/useApi';
import { useEffect, useState } from 'react';

export function AdminLayout() {
  const { user, loading, checkAuth } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const check = async () => {
      try {
        await checkAuth();
      } catch (err: unknown) {
        console.error('Auth check error:', err);
        setError(err instanceof Error ? err.message : 'Erreur de connexion');
      }
    };
    check();
  }, [checkAuth]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#0055FF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-2">Erreur de connexion</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Vérifiez que le backend est en cours d'exécution sur le port 3000</p>
          <button 
            onClick={() => { setError(null); checkAuth(); }}
            className="mt-4 px-4 py-2 bg-[#0055FF] text-white rounded-lg"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
