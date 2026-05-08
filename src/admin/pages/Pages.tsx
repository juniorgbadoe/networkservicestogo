import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { FileText, Save } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  content: string;
  actif: boolean;
}

interface PageContent {
  hero: {
    title: string;
    subtitle: string;
    badge: string;
  };
  whyChoose: {
    title: string;
    subtitle: string;
  };
  about: {
    title: string;
    subtitle: string;
  };
  sections: Section[];
}

interface PageResponse {
  page?: {
    contenu?: string | Partial<PageContent>;
  };
}

const defaultHomeContent: PageContent = {
  hero: {
    title: 'Accélérez votre Transformation Digitale',
    subtitle: 'Votre partenaire technologique pour relever les défis numériques d\'aujourd\'hui et de demain.',
    badge: 'Solutions digitales sur mesure'
  },
  whyChoose: {
    title: 'Votre partenaire digital de confiance',
    subtitle: 'Nous ne sommes pas qu\'un prestataire, nous sommes votre allié stratégique pour bâtirdigital.'
  },
  about: {
    title: 'Vos solutions, Notre mission',
    subtitle: 'Network Service accompagne les organisations dans leur transformation numérique avec des solutions fiables, sécurisées et durables.'
  },
  sections: []
};

const defaultAboutContent: PageContent = {
  hero: { title: '', subtitle: '', badge: '' },
  whyChoose: { title: '', subtitle: '' },
  about: {
    title: 'Vos solutions, Notre mission',
    subtitle: 'Network Service accompagne les organisations dans leur transformation numérique avec des solutions fiables, sécurisées et durables.'
  },
  sections: []
};

export function Pages() {
  const { fetchApi } = useApi();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'about'>('home');
  const [homeContent, setHomeContent] = useState<PageContent>(defaultHomeContent);
  const [aboutContent, setAboutContent] = useState<PageContent>(defaultAboutContent);

  const loadContent = useCallback(async () => {
    const data = await fetchApi<PageResponse>(`/api/pages/${activeTab}`);
    if (data?.page?.contenu) {
      try {
        const parsed = typeof data.page.contenu === 'string' ? JSON.parse(data.page.contenu) : data.page.contenu;
        if (activeTab === 'home') {
          setHomeContent({ ...defaultHomeContent, ...parsed });
        } else {
          setAboutContent({ ...defaultAboutContent, ...parsed });
        }
      } catch (e) {
        console.error('Error parsing content:', e);
      }
    }
  }, [activeTab, fetchApi]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const currentContent = activeTab === 'home' ? homeContent : aboutContent;
  const setCurrentContent = activeTab === 'home' ? setHomeContent : setAboutContent;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const pageData = {
      titre: activeTab === 'home' ? 'Home' : 'About',
      meta_title: activeTab === 'home' ? 'Network Service - Solutions digitales' : 'À propos - Network Service',
      meta_desc: activeTab === 'home' 
        ? 'Votre partenaire technologique pour relever les défis numériques'
        : 'Découvrez Network Service, votre partenaire pour la transformation numérique',
      contenu: currentContent
    };

    await fetchApi(`/api/pages/${activeTab}`, {
      method: 'PUT',
      body: pageData
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="dark:bg-[var(--bg)] dark:text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1B2F] dark:text-white flex items-center gap-3">
            <FileText className="text-[#0055FF]" />
            Gestion des pages
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Modifiez le contenu des pages du site</p>
        </div>
        {saved && (
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
            Modifications enregistrées !
          </span>
        )}
      </div>

      {/* Onglets */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'home'
              ? 'bg-[#0055FF] text-white'
              : 'bg-gray-100 dark:bg-white/[0.05] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          Page d'accueil
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'about'
              ? 'bg-[#0055FF] text-white'
              : 'bg-gray-100 dark:bg-white/[0.05] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          À propos
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-white dark:bg-white/[0.05] rounded-xl p-6 border border-gray-100 dark:border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#0A1B2F] dark:text-white">Section Hero</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Badge</label>
                  <input
                    type="text"
                    value={currentContent.hero.badge}
                    onChange={e => setCurrentContent({ ...currentContent, hero: { ...currentContent.hero, badge: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Titre principal</label>
                  <input
                    type="text"
                    value={currentContent.hero.title}
                    onChange={e => setCurrentContent({ ...currentContent, hero: { ...currentContent.hero, title: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Sous-titre</label>
                  <textarea
                    value={currentContent.hero.subtitle}
                    onChange={e => setCurrentContent({ ...currentContent, hero: { ...currentContent.hero, subtitle: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Why Choose Section */}
            <div className="bg-white dark:bg-white/[0.05] rounded-xl p-6 border border-gray-100 dark:border-white/10">
              <h2 className="text-lg font-semibold text-[#0A1B2F] dark:text-white mb-4">Section "Pourquoi choisir"</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Titre</label>
                  <input
                    type="text"
                    value={currentContent.whyChoose.title}
                    onChange={e => setCurrentContent({ ...currentContent, whyChoose: { ...currentContent.whyChoose, title: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Sous-titre</label>
                  <textarea
                    value={currentContent.whyChoose.subtitle}
                    onChange={e => setCurrentContent({ ...currentContent, whyChoose: { ...currentContent.whyChoose, subtitle: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-white/[0.05] rounded-xl p-6 border border-gray-100 dark:border-white/10">
              <h2 className="text-lg font-semibold text-[#0A1B2F] dark:text-white mb-4">Section À propos</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Titre</label>
                  <input
                    type="text"
                    value={currentContent.about.title}
                    onChange={e => setCurrentContent({ ...currentContent, about: { ...currentContent.about, title: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Description</label>
                  <textarea
                    value={currentContent.about.subtitle}
                    onChange={e => setCurrentContent({ ...currentContent, about: { ...currentContent.about, subtitle: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#0055FF] text-white rounded-lg hover:bg-[#0044CC] transition-colors disabled:opacity-50 mt-6"
        >
          <Save size={20} />
          {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </button>
      </form>
    </div>
  );
}
