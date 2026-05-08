import { useCallback, useEffect, useState } from 'react';
import { Grip, Plus, Save, Trash2, Waypoints } from 'lucide-react';
import {
  defaultSiteNavigation,
  type NavigationItem,
  type SiteNavigation,
} from '../../hooks/useSiteContent';
import { useApi } from '../hooks/useApi';

type NavigationKey = keyof SiteNavigation;
type ParametresResponse = {
  parametres?: Record<string, unknown>;
};

const sections: Array<{
  key: NavigationKey;
  title: string;
  description: string;
}> = [
  {
    key: 'main',
    title: 'Menu principal',
    description: 'Liens visibles dans le header.',
  },
  {
    key: 'services',
    title: 'Sous-menu services',
    description: 'Liens affichés dans le menu déroulant Services.',
  },
  {
    key: 'footerServices',
    title: 'Footer services',
    description: 'Colonne services du footer.',
  },
  {
    key: 'footerCompany',
    title: 'Footer entreprise',
    description: 'Colonne entreprise du footer.',
  },
  {
    key: 'footerLegal',
    title: 'Footer légal',
    description: 'Liens juridiques et légaux.',
  },
];

function normalizeItems(value: unknown, fallback: NavigationItem[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const items = value
    .filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null)
    .map((item) => ({
      label: typeof item.label === 'string' ? item.label : '',
      path: typeof item.path === 'string' ? item.path : '',
      url: typeof item.url === 'string' ? item.url : '',
    }))
    .filter((item) => item.label && (item.path || item.url));

  return items.length > 0 ? items : fallback;
}

export function Navigation() {
  const { fetchApi, loading } = useApi();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [menus, setMenus] = useState<SiteNavigation>(defaultSiteNavigation);

  const loadMenus = useCallback(async () => {
    const data = await fetchApi<ParametresResponse>('/api/parametres');
    if (!data?.parametres) {
      return;
    }

    setMenus({
      main: normalizeItems(data.parametres.navigation_main, defaultSiteNavigation.main),
      services: normalizeItems(data.parametres.navigation_services, defaultSiteNavigation.services),
      footerServices: normalizeItems(data.parametres.navigation_footer_services, defaultSiteNavigation.footerServices),
      footerCompany: normalizeItems(data.parametres.navigation_footer_company, defaultSiteNavigation.footerCompany),
      footerLegal: normalizeItems(data.parametres.navigation_footer_legal, defaultSiteNavigation.footerLegal),
    });
  }, [fetchApi]);

  useEffect(() => {
    loadMenus();
  }, [loadMenus]);

  const updateItem = (section: NavigationKey, index: number, field: keyof NavigationItem, value: string) => {
    setMenus((prev) => ({
      ...prev,
      [section]: prev[section].map((item, itemIndex) => (
        itemIndex === index ? { ...item, [field]: value } : item
      )),
    }));
  };

  const addItem = (section: NavigationKey) => {
    setMenus((prev) => ({
      ...prev,
      [section]: [...prev[section], { label: '', path: '', url: '' }],
    }));
  };

  const removeItem = (section: NavigationKey, index: number) => {
    setMenus((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    await fetchApi('/api/parametres/bulk', {
      method: 'POST',
      body: {
        parametres: {
          navigation_main: menus.main.filter((item) => item.label && (item.path || item.url)),
          navigation_services: menus.services.filter((item) => item.label && (item.path || item.url)),
          navigation_footer_services: menus.footerServices.filter((item) => item.label && (item.path || item.url)),
          navigation_footer_company: menus.footerCompany.filter((item) => item.label && (item.path || item.url)),
          navigation_footer_legal: menus.footerLegal.filter((item) => item.label && (item.path || item.url)),
        },
      }
    });

    setSaving(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="dark:bg-[var(--bg)] dark:text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1B2F] dark:text-white flex items-center gap-3">
            <Waypoints className="text-[#0055FF]" />
            Navigation du site
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gère les liens du header, du sous-menu services et du footer.
          </p>
        </div>
        {saved && (
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
            Navigation enregistrée !
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.key}
            className="bg-white dark:bg-white/[0.05] rounded-xl p-6 border border-gray-100 dark:border-white/10"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-semibold text-[#0A1B2F] dark:text-white">{section.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{section.description}</p>
              </div>
              <button
                type="button"
                onClick={() => addItem(section.key)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0055FF] text-white hover:bg-[#0044CC] transition-colors"
              >
                <Plus size={16} />
                Ajouter
              </button>
            </div>

            <div className="space-y-3">
              {menus[section.key].map((item, index) => (
                <div
                  key={`${section.key}-${index}`}
                  className="grid lg:grid-cols-[32px,1fr,1fr,48px] gap-3 items-center rounded-xl border border-gray-200 dark:border-white/10 p-4"
                >
                  <div className="text-gray-400 flex justify-center">
                    <Grip size={18} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Libellé</label>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateItem(section.key, index, 'label', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Chemin interne</label>
                      <input
                        type="text"
                        value={item.path || ''}
                        onChange={(e) => updateItem(section.key, index, 'path', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                        placeholder="/contact"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">URL externe</label>
                      <input
                        type="text"
                        value={item.url || ''}
                        onChange={(e) => updateItem(section.key, index, 'url', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(section.key, index)}
                    className="w-10 h-10 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={saving || loading}
          className="flex items-center gap-2 px-6 py-3 bg-[#0055FF] text-white rounded-lg hover:bg-[#0044CC] transition-colors disabled:opacity-50"
        >
          <Save size={20} />
          {saving ? 'Enregistrement...' : 'Enregistrer la navigation'}
        </button>
      </form>
    </div>
  );
}
