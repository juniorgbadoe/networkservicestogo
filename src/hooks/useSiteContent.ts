import { useEffect, useMemo, useState } from 'react';

function resolveApiUrl() {
  const configuredUrl = import.meta.env.VITE_API_URL || '';

  if (!configuredUrl || typeof window === 'undefined') {
    return configuredUrl;
  }

  try {
    const url = new URL(configuredUrl);
    const currentHost = window.location.hostname;

    if ((url.hostname === 'localhost' && currentHost === '127.0.0.1') ||
        (url.hostname === '127.0.0.1' && currentHost === 'localhost')) {
      url.hostname = currentHost;
      return url.toString().replace(/\/$/, '');
    }
  } catch {
    return configuredUrl;
  }

  return configuredUrl;
}

const API_URL = resolveApiUrl();

export interface SitePageContent {
  hero?: {
    title?: string;
    subtitle?: string;
    badge?: string;
  };
  whyChoose?: {
    title?: string;
    subtitle?: string;
  };
  about?: {
    title?: string;
    subtitle?: string;
  };
}

export function useSiteContent(slug: string) {
  const [content, setContent] = useState<SitePageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch(`${API_URL}/api/pages/${slug}`);
        const data = await res.json();
        
        if (data.page?.contenu) {
          const parsed = typeof data.page.contenu === 'string' 
            ? JSON.parse(data.page.contenu) 
            : data.page.contenu;
          setContent(parsed as SitePageContent);
        }
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Erreur de chargement');
      } finally {
        setLoading(false);
      }
    }
    
    if (slug) {
      fetchContent();
    }
  }, [slug]);

  return { content, loading, error };
}

export interface NavigationItem {
  label: string;
  path?: string;
  url?: string;
}

export interface SiteSettings {
  site_name: string;
  site_tagline: string;
  site_description: string;
  site_logo: string;
  header_cta_label: string;
  header_cta_link: string;
  footer_description: string;
  footer_copyright: string;
  contact_email: string;
  contact_phone1: string;
  contact_phone2: string;
  contact_address: string;
  contact_whatsapp: string;
  contact_badge: string;
  contact_title: string;
  contact_highlight: string;
  contact_description: string;
  contact_response_time: string;
  contact_offer_label: string;
  contact_offer_text: string;
  contact_whatsapp_label: string;
  social_linkedin: string;
  social_twitter: string;
  social_facebook: string;
  social_instagram: string;
}

export interface SiteNavigation {
  main: NavigationItem[];
  services: NavigationItem[];
  footerServices: NavigationItem[];
  footerCompany: NavigationItem[];
  footerLegal: NavigationItem[];
}

type ParametresMap = Record<string, unknown>;

export const defaultSiteSettings: SiteSettings = {
  site_name: 'Network Service',
  site_tagline: 'Vos solutions, notre mission',
  site_description:
    "Votre partenaire technologique pour relever les défis numériques d’aujourd’hui et de demain.",
  site_logo: '',
  header_cta_label: 'Demander un devis',
  header_cta_link: '/contact',
  footer_description:
    "Votre partenaire technologique pour relever les défis numériques d’aujourd’hui et de demain. Network Service accompagne les entreprises avec des solutions réseau, digitales et web performantes.",
  footer_copyright: 'Tous droits réservés.',
  contact_email: 'contact@nstogo.com',
  contact_phone1: '+228 79 71 00 22',
  contact_phone2: '+228 91 54 14 48',
  contact_address: '',
  contact_whatsapp: 'https://wa.me/22870947927',
  contact_badge: 'Contactez-Nous',
  contact_title: 'Démarrons votre projet',
  contact_highlight: 'ensemble',
  contact_description:
    "Une idée, un projet, une question ? Notre équipe d'experts est à votre écoute pour transformer votre vision en réalité.",
  contact_response_time: 'Réponse sous 24h',
  contact_offer_label: 'Devis gratuit',
  contact_offer_text: 'Notre équipe est disponible',
  contact_whatsapp_label: 'Whatsapp',
  social_linkedin: '',
  social_twitter: '',
  social_facebook: '',
  social_instagram: '',
};

export const defaultSiteNavigation: SiteNavigation = {
  main: [
    { label: 'Accueil', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'À propos', path: '/about' },
    { label: 'Réalisations', path: '/projects' },
    { label: 'Médiathèque', path: '/mediatheque' },
    { label: 'Témoignages', path: '/testimonials' },
    { label: 'Contact', path: '/contact' },
  ],
  services: [
    { label: 'Maintenance informatique', path: '/maintenance' },
    { label: 'Déploiement des réseaux', path: '/deploiement' },
    { label: 'Câblage réseau', path: '/cablage' },
    { label: 'Infrastructure réseau', path: '/infrastructure' },
  ],
  footerServices: [
    { label: 'Maintenance informatique', path: '/maintenance' },
    { label: 'Déploiement des réseaux', path: '/deploiement' },
    { label: 'Câblage réseau', path: '/cablage' },
    { label: 'Infrastructure réseau', path: '/infrastructure' },
  ],
  footerCompany: [
    { label: 'À propos', path: '/about' },
    { label: 'Nos réalisations', path: '/projects' },
    { label: 'Témoignages', path: '/testimonials' },
    { label: 'Contact', path: '/contact' },
  ],
  footerLegal: [
    { label: 'Mentions légales', url: '#' },
    { label: 'Politique de confidentialité', url: '#' },
  ],
};

function toStringValue(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
}

function normalizeMenu(value: unknown, fallback: NavigationItem[]): NavigationItem[] {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const items = value
    .filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null)
    .map((item) => ({
      label: toStringValue(item.label, ''),
      path: toStringValue(item.path, ''),
      url: toStringValue(item.url, ''),
    }))
    .filter((item) => item.label && (item.path || item.url));

  return items.length > 0 ? items : fallback;
}

export function useParametres() {
  const [params, setParams] = useState<ParametresMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchParams() {
      try {
        const res = await fetch(`${API_URL}/api/parametres`);
        const data = await res.json();
        if (data.parametres) {
          setParams(data.parametres);
        }
      } catch (err) {
        console.error('Error fetching params:', err);
        setError('Erreur de chargement des paramètres');
      } finally {
        setLoading(false);
      }
    }
    fetchParams();
  }, []);

  return { params, loading, error };
}

export function useSiteShell() {
  const { params, loading, error } = useParametres();

  const settings = useMemo<SiteSettings>(() => ({
    site_name: toStringValue(params.site_name, defaultSiteSettings.site_name),
    site_tagline: toStringValue(params.site_tagline, defaultSiteSettings.site_tagline),
    site_description: toStringValue(params.site_description, defaultSiteSettings.site_description),
    site_logo: toStringValue(params.site_logo, defaultSiteSettings.site_logo),
    header_cta_label: toStringValue(params.header_cta_label, defaultSiteSettings.header_cta_label),
    header_cta_link: toStringValue(params.header_cta_link, defaultSiteSettings.header_cta_link),
    footer_description: toStringValue(params.footer_description, defaultSiteSettings.footer_description),
    footer_copyright: toStringValue(params.footer_copyright, defaultSiteSettings.footer_copyright),
    contact_email: toStringValue(params.contact_email, defaultSiteSettings.contact_email),
    contact_phone1: toStringValue(params.contact_phone1, defaultSiteSettings.contact_phone1),
    contact_phone2: toStringValue(params.contact_phone2, defaultSiteSettings.contact_phone2),
    contact_address: toStringValue(params.contact_address, defaultSiteSettings.contact_address),
    contact_whatsapp: toStringValue(params.contact_whatsapp, defaultSiteSettings.contact_whatsapp),
    contact_badge: toStringValue(params.contact_badge, defaultSiteSettings.contact_badge),
    contact_title: toStringValue(params.contact_title, defaultSiteSettings.contact_title),
    contact_highlight: toStringValue(params.contact_highlight, defaultSiteSettings.contact_highlight),
    contact_description: toStringValue(params.contact_description, defaultSiteSettings.contact_description),
    contact_response_time: toStringValue(params.contact_response_time, defaultSiteSettings.contact_response_time),
    contact_offer_label: toStringValue(params.contact_offer_label, defaultSiteSettings.contact_offer_label),
    contact_offer_text: toStringValue(params.contact_offer_text, defaultSiteSettings.contact_offer_text),
    contact_whatsapp_label: toStringValue(params.contact_whatsapp_label, defaultSiteSettings.contact_whatsapp_label),
    social_linkedin: toStringValue(params.social_linkedin, defaultSiteSettings.social_linkedin),
    social_twitter: toStringValue(params.social_twitter, defaultSiteSettings.social_twitter),
    social_facebook: toStringValue(params.social_facebook, defaultSiteSettings.social_facebook),
    social_instagram: toStringValue(params.social_instagram, defaultSiteSettings.social_instagram),
  }), [params]);

  const navigation = useMemo<SiteNavigation>(() => ({
    main: normalizeMenu(params.navigation_main, defaultSiteNavigation.main),
    services: normalizeMenu(params.navigation_services, defaultSiteNavigation.services),
    footerServices: normalizeMenu(params.navigation_footer_services, defaultSiteNavigation.footerServices),
    footerCompany: normalizeMenu(params.navigation_footer_company, defaultSiteNavigation.footerCompany),
    footerLegal: normalizeMenu(params.navigation_footer_legal, defaultSiteNavigation.footerLegal),
  }), [params]);

  return { settings, navigation, loading, error, rawParams: params };
}
