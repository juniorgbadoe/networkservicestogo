import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface User {
  id: number;
  email: string;
  nom: string;
  role: string;
  actif: boolean;
  created_at: string;
}

export function Users() {
  const { fetchApi, loading } = useApi();
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState({ email: '', password: '', nom: '', role: 'editor' });

  const loadData = useCallback(async () => {
    const data = await fetchApi<{ users: User[] }>('/api/admin/users');
    if (data?.users) setUsers(data.users);
  }, [fetchApi]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = editing ? { email: form.email, nom: form.nom, role: form.role } : form;

    const endpoint = editing ? `/api/admin/users/${editing.id}` : '/api/admin/users';
    const method = editing ? 'PUT' : 'POST';

    await fetchApi(endpoint, { method, body: payload });
    setShowModal(false);
    setEditing(null);
    setForm({ email: '', password: '', nom: '', role: 'editor' });
    loadData();
  }

  async function handleDelete(id: number) {
    if (!confirm('Supprimer cet utilisateur ?')) return;
    await fetchApi(`/api/admin/users/${id}`, { method: 'DELETE' });
    loadData();
  }

  async function toggleActif(user: User) {
    await fetchApi(`/api/admin/users/${user.id}`, {
      method: 'PUT',
      body: { actif: !user.actif }
    });
    loadData();
  }

  return (
    <div className="dark:bg-[var(--bg)] dark:text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1B2F] dark:text-white">Utilisateurs</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gérez les administrateurs</p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({ email: '', password: '', nom: '', role: 'editor' }); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#0055FF] text-white rounded-lg hover:bg-[#0044CC] transition-colors"
        >
          <Plus size={18} />
          Nouveau
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-[#0055FF] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Nom</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Email</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Rôle</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Statut</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0055FF] text-white flex items-center justify-center text-sm font-medium">
                        {user.nom?.charAt(0) || 'A'}
                      </div>
                      <span className="font-medium text-[#0A1B2F]">{user.nom}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'super_admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                      {user.role === 'super_admin' ? 'Super Admin' : 'Éditeur'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                    onClick={() => toggleActif(user)}
                    className={`w-3 h-3 rounded-full transition-colors ${user.actif ? 'bg-green-500' : 'bg-red-400'}`}
                    title={user.actif ? 'Actif - Cliquer pour désactiver' : 'Inactif - Cliquer pour activer'}
                  />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => { setEditing(user); setForm({ email: user.email, password: '', nom: user.nom, role: user.role }); setShowModal(true); }} className="p-2 text-gray-400 hover:text-[#0055FF] inline-block">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="p-2 text-gray-400 hover:text-red-500 inline-block ml-2">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{editing ? 'Modifier' : 'Nouvel'} utilisateur</h3>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input type="text" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              {!editing && (
                <div>
                  <label className="block text-sm font-medium mb-1">Mot de passe</label>
                  <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required={!editing} />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">Rôle</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                  <option value="editor">Éditeur</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              <button type="submit" className="w-full py-2 bg-[#0055FF] text-white rounded-lg hover:bg-[#0044CC]">
                {editing ? 'Modifier' : 'Créer'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
