import { useCallback, useEffect, useState } from 'react';
import { FolderKanban, ImagePlus, Pencil, Plus, Trash2, X } from 'lucide-react';
import { useApi } from '../../hooks/useApi';

interface ProjetImage {
  fichier: string;
  miniature: string;
  principal: boolean;
}

interface Projet {
  id: number;
  titre: string;
  slug: string;
  description: string;
  resultat: string;
  categorie: string;
  tags: string[];
  images: ProjetImage[];
  ordre: number;
  actif: boolean;
}

const emptyForm = {
  titre: '',
  description: '',
  resultat: '',
  categorie: '',
  tags: '',
  ordre: 0,
};

const categoryOptions = ['Reseaux & Infrastructure', 'Support & Maintenance', 'Infrastructure & Cablage'];
const API_URL = import.meta.env.VITE_API_URL || '';

export function ProjetsList() {
  const { fetchApi, loading } = useApi();
  const [projets, setProjets] = useState<Projet[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Projet | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const loadData = useCallback(async () => {
    const data = await fetchApi<{ projets: Projet[] }>('/api/projets');
    if (data?.projets) setProjets(data.projets);
  }, [fetchApi]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (!mainImage) {
      setImagePreview('');
      return;
    }

    const previewUrl = URL.createObjectURL(mainImage);
    setImagePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [mainImage]);

  const getProjectImageUrl = (projet: Projet | null) => {
    const image = projet?.images?.[0];
    return image ? `${API_URL}/uploads/projets/${image.miniature || image.fichier}` : '';
  };

  const openCreateModal = () => {
    setEditing(null);
    setForm(emptyForm);
    setMainImage(null);
    setSubmitError('');
    setShowModal(true);
  };

  const openEditModal = (projet: Projet) => {
    setEditing(projet);
    setForm({
      titre: projet.titre,
      description: projet.description,
      resultat: projet.resultat || '',
      categorie: projet.categorie || '',
      tags: (projet.tags || []).join(', '),
      ordre: projet.ordre,
    });
    setMainImage(null);
    setSubmitError('');
    setShowModal(true);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    const tagsArray = form.tags.split(',').map((tag) => tag.trim()).filter(Boolean);
    const formData = new FormData();
    formData.append('titre', form.titre);
    formData.append('description', form.description);
    formData.append('resultat', form.resultat);
    formData.append('categorie', form.categorie);
    formData.append('tags', JSON.stringify(tagsArray));
    formData.append('ordre', String(form.ordre));
    if (mainImage) formData.append('image', mainImage);

    const endpoint = editing ? `/api/projets/${editing.id}` : '/api/projets';
    const method = editing ? 'PUT' : 'POST';
    const result = await fetchApi<{ success: boolean }>(endpoint, { method, body: formData });

    setSubmitting(false);
    if (!result?.success) {
      setSubmitError("L'enregistrement a echoue. Verifiez les champs requis et utilisez une image valide de moins de 10 Mo.");
      return;
    }

    setShowModal(false);
    setEditing(null);
    setForm(emptyForm);
    setMainImage(null);
    loadData();
  }

  async function handleDelete(id: number) {
    if (!confirm('Supprimer ce projet ?')) return;
    await fetchApi(`/api/projets/${id}`, { method: 'DELETE' });
    loadData();
  }

  async function toggleActif(projet: Projet) {
    await fetchApi(`/api/projets/${projet.id}`, {
      method: 'PUT',
      body: { actif: !projet.actif },
    });
    loadData();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1B2F]">Projets</h1>
          <p className="text-gray-500 mt-1">Gerez les realisations et leurs visuels.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#0055FF] text-white rounded-lg hover:bg-[#0044CC] transition-colors"
        >
          <Plus size={18} />
          Nouveau
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-[#0055FF] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projets.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
          <FolderKanban className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500">Aucun projet</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projets.map((projet) => (
            <div key={projet.id} className={`bg-white rounded-lg overflow-hidden shadow-sm border ${projet.actif ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}>
              {getProjectImageUrl(projet) ? (
                <img
                  src={getProjectImageUrl(projet)}
                  alt={projet.titre}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                  <ImagePlus size={32} />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-[#0A1B2F]">{projet.titre}</h3>
                  <button
                    onClick={() => toggleActif(projet)}
                    className={`w-3 h-3 rounded-full transition-colors ${projet.actif ? 'bg-green-500' : 'bg-red-400'}`}
                    title={projet.actif ? 'Actif - Cliquer pour desactiver' : 'Inactif - Cliquer pour activer'}
                  />
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{projet.description}</p>
                {projet.categorie && <span className="text-xs bg-gray-100 px-2 py-1 rounded">{projet.categorie}</span>}
                <div className="flex justify-end gap-2 mt-3 pt-3 border-t">
                  <button onClick={() => openEditModal(projet)} className="p-2 text-gray-400 hover:text-[#0055FF]">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(projet.id)} className="p-2 text-gray-400 hover:text-red-500">
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
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{editing ? 'Modifier' : 'Nouveau'} projet</h3>
              <button onClick={() => setShowModal(false)} type="button">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre *</label>
                <input type="text" value={form.titre} onChange={(e) => setForm({ ...form, titre: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" rows={4} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Resultat</label>
                <input type="text" value={form.resultat} onChange={(e) => setForm({ ...form, resultat: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="Infrastructure securisee..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Categorie</label>
                <select value={form.categorie} onChange={(e) => setForm({ ...form, categorie: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                  <option value="">Selectionner...</option>
                  {categoryOptions.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tags separes par virgules</label>
                <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="VPN, Firewall, VLAN" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ordre</label>
                <input type="number" value={form.ordre} onChange={(e) => setForm({ ...form, ordre: parseInt(e.target.value, 10) || 0 })} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image principale</label>
                <div className="border-2 border-dashed rounded-lg p-4 space-y-3">
                  {(imagePreview || getProjectImageUrl(editing)) ? (
                    <img
                      src={imagePreview || getProjectImageUrl(editing)}
                      alt="Apercu du projet"
                      className="h-36 w-full rounded-lg object-cover border border-gray-100"
                    />
                  ) : (
                    <div className="h-28 rounded-lg bg-gray-50 flex flex-col items-center justify-center text-gray-400">
                      <ImagePlus size={28} />
                      <span className="text-sm mt-2">Aucune image selectionnee</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={(e) => setMainImage(e.target.files?.[0] || null)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">
                    JPG, PNG, WebP ou GIF. Maximum 10 Mo. En modification, choisir une image remplacera l'ancienne.
                  </p>
                </div>
              </div>

              {submitError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {submitError}
                </div>
              )}

              <button type="submit" disabled={submitting} className="w-full py-2 bg-[#0055FF] text-white rounded-lg hover:bg-[#0044CC] disabled:opacity-60">
                {submitting ? 'Enregistrement...' : editing ? 'Modifier' : 'Creer'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
