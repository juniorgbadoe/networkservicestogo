import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { Plus, Pencil, Trash2, Image, X, Upload } from 'lucide-react';

interface Category {
  id: number;
  nom: string;
  slug: string;
  description: string;
  ordre: number;
  active: boolean;
}

interface Photo {
  id: number;
  categorie_id: number;
  titre: string;
  description: string;
  fichier: string;
  miniature: string;
  alt_text: string;
  tags: string[];
  ordre: number;
  active: boolean;
}

export function GaleriesList() {
  const { fetchApi, loading } = useApi();
  const [categories, setCategories] = useState<Category[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);

  const [categoryForm, setCategoryForm] = useState({ nom: '', description: '', ordre: 0 });
  const [photoForm, setPhotoForm] = useState({ categorie_id: '', titre: '', description: '', alt_text: '', tags: '' });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoSubmitting, setPhotoSubmitting] = useState(false);
  const [photoSubmitError, setPhotoSubmitError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || '';

  const loadData = useCallback(async () => {
    const [cats, phs] = await Promise.all([
      fetchApi<{ categories: Category[] }>('/api/galerie/categories?active=all'),
      fetchApi<{ photos: Photo[] }>('/api/galerie/photos?active=all')
    ]);
    if (cats?.categories) setCategories(cats.categories);
    if (phs?.photos) setPhotos(phs.photos);
  }, [fetchApi]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleCategorySubmit(e: React.FormEvent) {
    e.preventDefault();
    const endpoint = editingCategory ? `/api/galerie/categories/${editingCategory.id}` : '/api/galerie/categories';
    const method = editingCategory ? 'PUT' : 'POST';

    await fetchApi(endpoint, { method, body: categoryForm });
    setShowCategoryModal(false);
    setEditingCategory(null);
    setCategoryForm({ nom: '', description: '', ordre: 0 });
    loadData();
  }

  async function handleDeleteCategory(id: number) {
    if (!confirm('Supprimer cette catégorie et toutes ses photos ?')) return;
    await fetchApi(`/api/galerie/categories/${id}`, { method: 'DELETE' });
    loadData();
  }

  async function toggleCategoryActive(cat: Category) {
    await fetchApi(`/api/galerie/categories/${cat.id}`, {
      method: 'PUT',
      body: { active: !cat.active }
    });
    loadData();
  }

  async function togglePhotoActive(photo: Photo) {
    await fetchApi(`/api/galerie/photos/${photo.id}`, {
      method: 'PUT',
      body: { active: !photo.active }
    });
    loadData();
  }

  async function handlePhotoSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPhotoSubmitting(true);
    setPhotoSubmitError('');
    const formData = new FormData();
    formData.append('categorie_id', photoForm.categorie_id);
    formData.append('titre', photoForm.titre);
    formData.append('description', photoForm.description);
    formData.append('alt_text', photoForm.alt_text);
    
    // Envoyer les tags comme chaîne simple (comma-separated) - le backend parser
    formData.append('tags', photoForm.tags || '');
    
    if (photoFile) formData.append('fichier', photoFile);

    const endpoint = editingPhoto ? `/api/galerie/photos/${editingPhoto.id}` : '/api/galerie/photos';
    const method = editingPhoto ? 'PUT' : 'POST';

    const result = await fetchApi<{ success: boolean }>(endpoint, { method, body: formData });
    setPhotoSubmitting(false);

    if (!result?.success) {
      setPhotoSubmitError("L'upload a echoue. Verifiez le fichier et les champs requis.");
      return;
    }

    setShowPhotoModal(false);
    setEditingPhoto(null);
    setPhotoForm({ categorie_id: '', titre: '', description: '', alt_text: '', tags: '' });
    setPhotoFile(null);
    loadData();
  }

  async function handleDeletePhoto(id: number) {
    if (!confirm('Supprimer cette photo ?')) return;
    await fetchApi(`/api/galerie/photos/${id}`, { method: 'DELETE' });
    loadData();
  }

  const filteredPhotos = selectedCategory
    ? photos.filter(p => p.categorie_id === selectedCategory)
    : photos;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1B2F]">Médiathèque</h1>
          <p className="text-gray-500 mt-1">Gérez les photos et catégories</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setEditingCategory(null); setCategoryForm({ nom: '', description: '', ordre: 0 }); setShowCategoryModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Plus size={18} />
            Catégorie
          </button>
          <button
            onClick={() => { setEditingPhoto(null); setPhotoSubmitError(''); setPhotoFile(null); setPhotoForm({ categorie_id: String(categories[0]?.id || ''), titre: '', description: '', alt_text: '', tags: '' }); setShowPhotoModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-[#0055FF] text-white rounded-lg hover:bg-[#0044CC] transition-colors"
          >
            <Plus size={18} />
            Photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-[#0A1B2F] mb-4">Catégories</h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${!selectedCategory ? 'bg-[#0055FF] text-white' : 'hover:bg-gray-100'}`}
              >
                Toutes les photos ({photos.length})
              </button>
              {categories.map(cat => (
                <div key={cat.id} className={`flex items-center gap-2 ${!cat.active ? 'opacity-50' : ''}`}>
                  <button
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex-1 text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === cat.id ? 'bg-[#0055FF] text-white' : 'hover:bg-gray-100'} ${!cat.active ? 'line-through text-gray-400' : ''}`}
                  >
                    {cat.nom} ({photos.filter(p => p.categorie_id === cat.id).length})
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleCategoryActive(cat); }}
                    className={`w-3 h-3 rounded-full transition-colors ${cat.active ? 'bg-green-500' : 'bg-red-400'}`}
                    title={cat.active ? 'Actif - Cliquer pour désactiver' : 'Inactif - Cliquer pour activer'}
                  />
                  <button onClick={() => { setEditingCategory(cat); setCategoryForm({ nom: cat.nom, description: cat.description || '', ordre: cat.ordre }); setShowCategoryModal(true); }} className="text-gray-400 hover:text-[#0055FF]">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDeleteCategory(cat.id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-[#0055FF] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <Image className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500">Aucune photo</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPhotos.map(photo => (
                <div key={photo.id} className={`relative group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 ${!photo.active ? 'opacity-60' : ''}`}>
                  <img
                    src={`${API_URL}/uploads/photos/${photo.miniature || photo.fichier}`}
                    alt={photo.titre || ''}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); togglePhotoActive(photo); }}
                      className={`w-3 h-3 rounded-full transition-colors ${photo.active ? 'bg-green-500' : 'bg-red-400'}`}
                      title={photo.active ? 'Actif - Cliquer pour désactiver' : 'Inactif - Cliquer pour activer'}
                    />
                    <button onClick={() => { setEditingPhoto(photo); setPhotoSubmitError(''); setPhotoFile(null); setPhotoForm({ categorie_id: String(photo.categorie_id), titre: photo.titre || '', description: photo.description || '', alt_text: photo.alt_text || '', tags: (photo.tags || []).join(', ') }); setShowPhotoModal(true); }} className="p-2 bg-white rounded-lg hover:bg-gray-100">
                      <Pencil size={16} className="text-gray-700" />
                    </button>
                    <button onClick={() => handleDeletePhoto(photo.id)} className="p-2 bg-white rounded-lg hover:bg-gray-100">
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                  {photo.titre && <p className="p-2 text-xs font-medium truncate">{photo.titre}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{editingCategory ? 'Modifier' : 'Nouvelle'} catégorie</h3>
              <button onClick={() => setShowCategoryModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input type="text" value={categoryForm.nom} onChange={e => setCategoryForm({ ...categoryForm, nom: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={categoryForm.description} onChange={e => setCategoryForm({ ...categoryForm, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ordre</label>
                <input type="number" value={categoryForm.ordre} onChange={e => setCategoryForm({ ...categoryForm, ordre: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <button type="submit" className="w-full py-2 bg-[#0055FF] text-white rounded-lg hover:bg-[#0044CC]">
                {editingCategory ? 'Modifier' : 'Créer'}
              </button>
            </form>
          </div>
        </div>
      )}

      {showPhotoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{editingPhoto ? 'Modifier' : 'Nouvelle'} photo</h3>
              <button onClick={() => setShowPhotoModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handlePhotoSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Catégorie</label>
                <select value={photoForm.categorie_id} onChange={e => setPhotoForm({ ...photoForm, categorie_id: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required>
                  <option value="">Sélectionner...</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.nom}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <input type="text" value={photoForm.titre} onChange={e => setPhotoForm({ ...photoForm, titre: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={photoForm.description} onChange={e => setPhotoForm({ ...photoForm, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Alt Text (accessibilité)</label>
                <input type="text" value={photoForm.alt_text} onChange={e => setPhotoForm({ ...photoForm, alt_text: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tags (séparés par virgules)</label>
                <input type="text" value={photoForm.tags} onChange={e => setPhotoForm({ ...photoForm, tags: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="tag1, tag2, tag3" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {editingPhoto ? 'Remplacer le fichier' : 'Fichier'}
                </label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={e => setPhotoFile(e.target.files?.[0] || null)}
                    className="w-full"
                    required={!editingPhoto}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    JPG, PNG, WebP ou GIF. Maximum 10 Mo.
                  </p>
                </div>
              </div>
              {photoSubmitError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {photoSubmitError}
                </div>
              )}
              <button type="submit" disabled={photoSubmitting} className="w-full py-2 bg-[#0055FF] text-white rounded-lg hover:bg-[#0044CC] disabled:opacity-60">
                {photoSubmitting ? 'Enregistrement...' : editingPhoto ? 'Modifier' : 'Télécharger'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
