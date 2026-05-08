import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../admin/hooks/useApi';
import { Image, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

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
  active: boolean;
}

const API_URL = import.meta.env.VITE_API_URL || '';

export function Mediatheque() {
  const { fetchApi } = useApi();
  const [categories, setCategories] = useState<Category[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [catsRes, phsRes] = await Promise.all([
      fetchApi<{ categories: Category[] }>('/api/galerie/categories'),
      fetchApi<{ photos: Photo[] }>('/api/galerie/photos')
    ]);

    if (catsRes?.categories) {
      setCategories(catsRes.categories.filter((c: Category) => c.active));
    }
    if (phsRes?.photos) {
      setPhotos(phsRes.photos.filter((p: Photo) => p.active));
    }
    setLoading(false);
  }, [fetchApi]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredPhotos = activeCategory
    ? photos.filter(p => p.categorie_id === activeCategory)
    : photos;

  const openLightbox = (photo: Photo, index: number) => {
    setLightboxPhoto(photo);
    setLightboxIndex(index);
  };

  const nextPhoto = () => {
    const newIndex = (lightboxIndex + 1) % filteredPhotos.length;
    setLightboxIndex(newIndex);
    setLightboxPhoto(filteredPhotos[newIndex]);
  };

  const prevPhoto = () => {
    const newIndex = (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setLightboxIndex(newIndex);
    setLightboxPhoto(filteredPhotos[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--gray-50)] via-white to-[var(--gray-50)] dark:from-[var(--bg)] dark:via-[var(--bg)] dark:to-[var(--bg)] pt-24 pb-16">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full mb-6 dark:bg-[var(--primary)]/20 dark:border-[var(--primary)]/30">
            <Image className="text-[var(--primary)]" size={18} />
            <span className="text-sm font-semibold text-[var(--primary)]">
              Médiathèque
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[var(--secondary)] dark:text-white">
            Notre galerie
            <span className="block gradient-text mt-2">photos</span>
          </h1>
          <p className="text-lg text-[var(--gray-600)] dark:text-gray-300 leading-relaxed">
            Découvrez nos réalisations, événements et l'équipe Network Service en images.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  activeCategory === null
                    ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white shadow-lg'
                    : 'bg-white text-[var(--gray-700)] border-2 border-[var(--gray-200)] hover:border-[var(--primary)] dark:bg-white/[0.06] dark:text-slate-100 dark:border-white/10 dark:hover:border-white/20'
                }`}
              >
                Toutes ({photos.length})
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white shadow-lg'
                      : 'bg-white text-[var(--gray-700)] border-2 border-[var(--gray-200)] hover:border-[var(--primary)] dark:bg-white/[0.06] dark:text-slate-100 dark:border-white/10 dark:hover:border-white/20'
                  }`}
                >
                  {category.nom} ({photos.filter(p => p.categorie_id === category.id).length})
                </button>
              ))}
            </div>

            {filteredPhotos.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-white/[0.05] rounded-3xl shadow-sm border border-[var(--gray-200)] dark:border-white/10">
                <Image className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={64} />
                <p className="text-lg text-[var(--gray-500)] dark:text-gray-400">Aucune photo dans cette catégorie</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {filteredPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-[var(--gray-200)] dark:bg-white/[0.05] dark:border-white/10 cursor-pointer"
                    onClick={() => openLightbox(photo, index)}
                  >
                    <div className="relative h-48 lg:h-56 overflow-hidden">
                      <img
                        src={`${API_URL}/uploads/photos/${photo.miniature || photo.fichier}`}
                        alt={photo.alt_text || photo.titre || 'Photo'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--secondary)]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <ZoomIn className="text-[var(--primary)]" size={24} />
                        </div>
                      </div>
                    </div>
                    {photo.titre && (
                      <div className="p-4">
                        <h3 className="font-semibold text-[var(--secondary)] dark:text-white text-sm truncate">
                          {photo.titre}
                        </h3>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {lightboxPhoto && (
        <div className="fixed inset-0 bg-black/95 z-[var(--z-modal)] flex items-center justify-center p-4" onClick={() => setLightboxPhoto(null)}>
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setLightboxPhoto(null)}
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
          >
            <ChevronRight size={24} />
          </button>

          <div className="max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={`${API_URL}/uploads/photos/${lightboxPhoto.fichier}`}
              alt={lightboxPhoto.alt_text || lightboxPhoto.titre || 'Photo'}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            {lightboxPhoto.titre && (
              <p className="text-center text-white mt-4 text-lg font-medium">{lightboxPhoto.titre}</p>
            )}
            <p className="text-center text-white/60 mt-2 text-sm">
              {lightboxIndex + 1} / {filteredPhotos.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
