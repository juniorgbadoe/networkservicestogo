import { useCallback, useEffect, useState } from 'react';
import { Globe, Mail, MessageCircle, Save, Settings as SettingsIcon, Share2 } from 'lucide-react';
import { defaultSiteSettings, type SiteSettings } from '../../hooks/useSiteContent';
import { useApi } from '../hooks/useApi';

type ParametresResponse = {
  parametres?: Record<string, unknown>;
};

const fields = Object.keys(defaultSiteSettings) as Array<keyof SiteSettings>;

function toStringValue(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

export function Settings() {
  const { fetchApi, loading } = useApi();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<SiteSettings>(defaultSiteSettings);

  const loadSettings = useCallback(async () => {
    const data = await fetchApi<ParametresResponse>('/api/parametres');
    if (!data?.parametres) {
      return;
    }

    const nextForm = fields.reduce<SiteSettings>((acc, field) => {
      acc[field] = toStringValue(data.parametres?.[field], defaultSiteSettings[field]);
      return acc;
    }, { ...defaultSiteSettings });

    setForm(nextForm);
  }, [fetchApi]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const updateField = (field: keyof SiteSettings, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    await fetchApi('/api/parametres/bulk', {
      method: 'POST',
      body: {
        parametres: form,
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
            <SettingsIcon className="text-[#0055FF]" />
            Réglages globaux
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Administre l’identité du site, le header, le footer et la page contact.
          </p>
        </div>
        {saved && (
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
            Paramètres enregistrés !
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-white/[0.05] rounded-xl p-6 border border-gray-100 dark:border-white/10">
          <h2 className="text-lg font-semibold text-[#0A1B2F] dark:text-white mb-4 flex items-center gap-2">
            <Globe className="text-[#0055FF]" size={20} />
            Identité du site
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Nom du site</label>
              <input
                type="text"
                value={form.site_name}
                onChange={(e) => updateField('site_name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Baseline</label>
              <input
                type="text"
                value={form.site_tagline}
                onChange={(e) => updateField('site_tagline', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Description globale</label>
              <textarea
                value={form.site_description}
                onChange={(e) => updateField('site_description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Logo</label>
              <input
                type="text"
                value={form.site_logo}
                onChange={(e) => updateField('site_logo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                placeholder="URL absolue ou chemin public, ex: /uploads/logo.png"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-white/[0.05] rounded-xl p-6 border border-gray-100 dark:border-white/10">
          <h2 className="text-lg font-semibold text-[#0A1B2F] dark:text-white mb-4 flex items-center gap-2">
            <Mail className="text-[#0055FF]" size={20} />
            Coordonnées et CTA
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Email</label>
              <input
                type="email"
                value={form.contact_email}
                onChange={(e) => updateField('contact_email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Téléphone principal</label>
              <input
                type="text"
                value={form.contact_phone1}
                onChange={(e) => updateField('contact_phone1', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Téléphone secondaire</label>
              <input
                type="text"
                value={form.contact_phone2}
                onChange={(e) => updateField('contact_phone2', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Adresse</label>
              <input
                type="text"
                value={form.contact_address}
                onChange={(e) => updateField('contact_address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Libellé bouton header</label>
              <input
                type="text"
                value={form.header_cta_label}
                onChange={(e) => updateField('header_cta_label', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Lien bouton header</label>
              <input
                type="text"
                value={form.header_cta_link}
                onChange={(e) => updateField('header_cta_link', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                placeholder="/contact"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Description du footer</label>
              <textarea
                value={form.footer_description}
                onChange={(e) => updateField('footer_description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Texte copyright</label>
              <input
                type="text"
                value={form.footer_copyright}
                onChange={(e) => updateField('footer_copyright', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-white/[0.05] rounded-xl p-6 border border-gray-100 dark:border-white/10">
          <h2 className="text-lg font-semibold text-[#0A1B2F] dark:text-white mb-4 flex items-center gap-2">
            <MessageCircle className="text-[#0055FF]" size={20} />
            Page contact
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Badge</label>
              <input
                type="text"
                value={form.contact_badge}
                onChange={(e) => updateField('contact_badge', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Titre</label>
              <input
                type="text"
                value={form.contact_title}
                onChange={(e) => updateField('contact_title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Mot mis en avant</label>
              <input
                type="text"
                value={form.contact_highlight}
                onChange={(e) => updateField('contact_highlight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Délai de réponse</label>
              <input
                type="text"
                value={form.contact_response_time}
                onChange={(e) => updateField('contact_response_time', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Description</label>
              <textarea
                value={form.contact_description}
                onChange={(e) => updateField('contact_description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Titre bloc WhatsApp</label>
              <input
                type="text"
                value={form.contact_offer_label}
                onChange={(e) => updateField('contact_offer_label', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Libellé bouton WhatsApp</label>
              <input
                type="text"
                value={form.contact_whatsapp_label}
                onChange={(e) => updateField('contact_whatsapp_label', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Texte bloc WhatsApp</label>
              <input
                type="text"
                value={form.contact_offer_text}
                onChange={(e) => updateField('contact_offer_text', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Lien WhatsApp</label>
              <input
                type="text"
                value={form.contact_whatsapp}
                onChange={(e) => updateField('contact_whatsapp', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                placeholder="https://wa.me/228..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-white/[0.05] rounded-xl p-6 border border-gray-100 dark:border-white/10">
          <h2 className="text-lg font-semibold text-[#0A1B2F] dark:text-white mb-4 flex items-center gap-2">
            <Share2 className="text-[#0055FF]" size={20} />
            Réseaux sociaux
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">LinkedIn</label>
              <input
                type="text"
                value={form.social_linkedin}
                onChange={(e) => updateField('social_linkedin', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                placeholder="https://linkedin.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Twitter / X</label>
              <input
                type="text"
                value={form.social_twitter}
                onChange={(e) => updateField('social_twitter', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                placeholder="https://x.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Facebook</label>
              <input
                type="text"
                value={form.social_facebook}
                onChange={(e) => updateField('social_facebook', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#0A1B2F] dark:text-gray-300">Instagram</label>
              <input
                type="text"
                value={form.social_instagram}
                onChange={(e) => updateField('social_instagram', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving || loading}
          className="flex items-center gap-2 px-6 py-3 bg-[#0055FF] text-white rounded-lg hover:bg-[#0044CC] transition-colors disabled:opacity-50"
        >
          <Save size={20} />
          {saving ? 'Enregistrement...' : 'Enregistrer les réglages'}
        </button>
      </form>
    </div>
  );
}
