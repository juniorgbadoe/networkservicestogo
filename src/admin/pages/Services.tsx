import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Plus, Pencil, Trash2, Wrench, X } from 'lucide-react';

interface Service {
  id: number;
  titre: string;
  slug: string;
  description: string;
  icon: string;
  couleur: string;
  features: string[];
  ordre: number;
  actif: boolean;
}

const iconOptions = ['Wrench', 'Network', 'Cable', 'ServerCog', 'ShieldCheck', 'Link', 'Zap', 'Award'];
const colorOptions = [
  { value: 'from-[#0A1B2F] to-[#1E2F47]', label: 'Bleu foncé' },
  { value: 'from-[#0055FF] to-[#3377FF]', label: 'Bleu' },
  { value: 'from-[#FFB800] to-[#00D4D4]', label: 'Or/Turquoise' },
  { value: 'from-[#1E2F47] to-[#0A1B2F]', label: 'Gris foncé' },
];

export function Services() {
  const { fetchApi, loading } = useApi();
  const [services, setServices] = useState<Service[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({
    titre: '',
    description: '',
    icon: 'Wrench',
    couleur: 'from-[#0A1B2F] to-[#1E2F47]',
    features: '',
    ordre: 0
  });

  const loadData = useCallback(async () => {
    const data = await fetchApi<{ services: Service[] }>('/api/services');
    if (data?.services) setServices(data.services);
  }, [fetchApi]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const featuresArray = form.features.split(',').map(f => f.trim()).filter(Boolean);

    const payload = {
      ...form,
      features: JSON.stringify(featuresArray)
    };

    const endpoint = editing ? `/api/services/${editing.id}` : '/api/services';
    const method = editing ? 'PUT' : 'POST';

    await fetchApi(endpoint, { method, body: payload });
    setShowModal(false);
    setEditing(null);
    setForm({ titre: '', description: '', icon: 'Wrench', couleur: 'from-[#0A1B2F] to-[#1E2F47]', features: '', ordre: 0 });
    loadData();
  }

  async function handleDelete(id: number) {
    if (!confirm('Supprimer ce service ?')) return;
    await fetchApi(`/api/services/${id}`, { method: 'DELETE' });
    loadData();
  }

  async function toggleActif(service: Service) {
    await fetchApi(`/api/services/${service.id}`, {
      method: 'PUT',
      body: { actif: !service.actif }
    });
    loadData();
  }

  return (
    <div className="dark:bg-[var(--bg)] dark:text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1B2F] dark:text-white">Services</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gérez les services proposés</p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({ titre: '', description: '', icon: 'Wrench', couleur: 'from-[#0A1B2F] to-[#1E2F47]', features: '', ordre: 0 }); setShowModal(true); }}
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
      ) : services.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <Wrench className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500">Aucun service</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {services.map(service => (
            <div key={service.id} className={`bg-white rounded-xl p-6 shadow-sm border ${service.actif ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.couleur || 'from-[#0055FF] to-[#3377FF]'} flex items-center justify-center text-white`}>
                    <Wrench size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1B2F]">{service.titre}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleActif(service)}
                    className={`w-3 h-3 rounded-full transition-colors ${service.actif ? 'bg-green-500' : 'bg-red-400'}`}
                    title={service.actif ? 'Actif - Cliquer pour désactiver' : 'Inactif - Cliquer pour activer'}
                  />
                  <button onClick={() => { setEditing(service); setForm({ titre: service.titre, description: service.description, icon: service.icon || 'Wrench', couleur: service.couleur || 'from-[#0055FF] to-[#3377FF]', features: (service.features || []).join(', '), ordre: service.ordre }); setShowModal(true); }} className="p-2 text-gray-400 hover:text-[#0055FF]">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(service.id)} className="p-2 text-gray-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {service.features && service.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {(service.features as unknown as string[]).map((feature, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">{feature}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{editing ? 'Modifier' : 'Nouveau'} service</h3>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre *</label>
                <input type="text" value={form.titre} onChange={e => setForm({ ...form, titre: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" rows={4} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Icône</label>
                  <select value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                    {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Couleur</label>
                  <select value={form.couleur} onChange={e => setForm({ ...form, couleur: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                    {colorOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Features (séparées par virgules)</label>
                <input type="text" value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="Feature 1, Feature 2, Feature 3" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ordre d'affichage</label>
                <input type="number" value={form.ordre} onChange={e => setForm({ ...form, ordre: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg" />
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
