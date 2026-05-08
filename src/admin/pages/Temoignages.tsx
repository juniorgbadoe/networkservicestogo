import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Plus, Pencil, Trash2, MessageSquare, X } from 'lucide-react';

interface Temoignage {
  id: number;
  client: string;
  entreprise: string;
  pays: string;
  quote: string;
  logo: string;
  ordre: number;
  actif: boolean;
}

export function Temoignages() {
  const { fetchApi, loading } = useApi();
  const [temoignages, setTemoignages] = useState<Temoignage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Temoignage | null>(null);
  const [form, setForm] = useState({ client: '', entreprise: '', pays: '', quote: '', ordre: 0 });
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || '';

  const loadData = useCallback(async () => {
    const data = await fetchApi<{ temoignages: Temoignage[] }>('/api/temoignages');
    if (data?.temoignages) setTemoignages(data.temoignages);
  }, [fetchApi]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'ordre') formData.append(key, String(value));
      else if (value) formData.append(key, String(value));
    });
    if (logoFile) formData.append('logo', logoFile);

    const endpoint = editing ? `/api/temoignages/${editing.id}` : '/api/temoignages';
    const method = editing ? 'PUT' : 'POST';

    await fetchApi(endpoint, { method, body: formData });
    setShowModal(false);
    setEditing(null);
    setForm({ client: '', entreprise: '', pays: '', quote: '', ordre: 0 });
    setLogoFile(null);
    loadData();
  }

  async function handleDelete(id: number) {
    if (!confirm('Supprimer ce témoignage ?')) return;
    await fetchApi(`/api/temoignages/${id}`, { method: 'DELETE' });
    loadData();
  }

  async function toggleActif(temoignage: Temoignage) {
    await fetchApi(`/api/temoignages/${temoignage.id}`, {
      method: 'PUT',
      body: { actif: !temoignage.actif }
    });
    loadData();
  }

  return (
    <div className="dark:bg-[var(--bg)] dark:text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1B2F] dark:text-white">Témoignages</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gérez les témoignages clients</p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({ client: '', entreprise: '', pays: '', quote: '', ordre: 0 }); setShowModal(true); }}
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
      ) : temoignages.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-white/[0.05] rounded-xl border border-gray-100 dark:border-white/10">
          <MessageSquare className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
          <p className="text-gray-500 dark:text-gray-400">Aucun témoignage</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {temoignages.map(temoignage => (
            <div key={temoignage.id} className={`bg-white dark:bg-white/[0.05] rounded-xl p-6 shadow-sm border ${temoignage.actif ? 'border-gray-100 dark:border-white/10' : 'border-gray-200 dark:border-white/5 opacity-60'}`}>
              <div className="flex items-start gap-4">
                {temoignage.logo && (
                  <img src={`${API_URL}/uploads/avatars/${temoignage.logo}`} alt={temoignage.client} className="w-16 h-16 object-contain rounded-lg" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-[#0A1B2F] dark:text-white">{temoignage.client}</span>
                    {temoignage.entreprise && <span className="text-gray-500 dark:text-gray-400">- {temoignage.entreprise}</span>}
                    {temoignage.pays && <span className="text-gray-400 dark:text-gray-500 text-sm">({temoignage.pays})</span>}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">"{temoignage.quote}"</p>
                </div>
                <div className="flex items-center gap-2">
<button 
                    onClick={() => toggleActif(temoignage)}
                    className={`w-3 h-3 rounded-full transition-colors ${temoignage.actif ? 'bg-green-500' : 'bg-red-400'}`}
                    title={temoignage.actif ? 'Actif - Cliquer pour désactiver' : 'Inactif - Cliquer pour activer'}
                  />
                  <button onClick={() => { setEditing(temoignage); setForm({ client: temoignage.client, entreprise: temoignage.entreprise || '', pays: temoignage.pays || '', quote: temoignage.quote, ordre: temoignage.ordre }); setShowModal(true); }} className="p-2 text-gray-400 hover:text-[#0055FF]">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(temoignage.id)} className="p-2 text-gray-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[var(--gray-800)] rounded-2xl p-6 w-full max-w-lg border border-gray-100 dark:border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#0A1B2F] dark:text-white">{editing ? 'Modifier' : 'Nouveau'} témoignage</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 dark:text-gray-400"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Client *</label>
                  <input type="text" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Entreprise</label>
                  <input type="text" value={form.entreprise} onChange={e => setForm({ ...form, entreprise: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Pays</label>
                <input type="text" value={form.pays} onChange={e => setForm({ ...form, pays: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg" placeholder="Togo, Niger, etc." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Citation *</label>
                <textarea value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg" rows={4} required placeholder="Le témoignage du client..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Ordre d'affichage</label>
                <input type="number" value={form.ordre} onChange={e => setForm({ ...form, ordre: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Logo</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                  <input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files?.[0] || null)} className="w-full text-gray-600 dark:text-gray-300" />
                </div>
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
