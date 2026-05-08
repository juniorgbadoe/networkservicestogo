import { ArrowUp, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Link } from 'react-router';
import LogoNS from '../assets/logo.png';
import { useSiteShell, type NavigationItem } from '../hooks/useSiteContent';

function resolveLogoSrc(logo: string) {
  if (!logo) {
    return LogoNS;
  }

  if (logo.startsWith('http://') || logo.startsWith('https://') || logo.startsWith('/')) {
    return logo;
  }

  return LogoNS;
}

function isExternalLink(item: NavigationItem) {
  return Boolean(item.url && /^https?:\/\//i.test(item.url));
}

export function NstogoFooter() {
  const { settings, navigation } = useSiteShell();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <Linkedin size={18} />, label: 'LinkedIn', url: settings.social_linkedin },
    { icon: <Twitter size={18} />, label: 'Twitter', url: settings.social_twitter },
    { icon: <Facebook size={18} />, label: 'Facebook', url: settings.social_facebook },
    { icon: <Instagram size={18} />, label: 'Instagram', url: settings.social_instagram },
  ].filter((item) => item.url);

  const contactLines = [settings.contact_phone1, settings.contact_phone2].filter(Boolean);
  const logoSrc = resolveLogoSrc(settings.site_logo);

  const renderFooterLink = (item: NavigationItem, key: string) => {
    if (item.url) {
      return (
        <a
          key={key}
          href={item.url}
          target={isExternalLink(item) ? '_blank' : undefined}
          rel={isExternalLink(item) ? 'noopener noreferrer' : undefined}
          className="text-white/75 hover:text-white transition-colors text-[13px] hover:translate-x-1 inline-block transform duration-200"
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link
        key={key}
        to={item.path || '/'}
        className="text-white/75 hover:text-white transition-colors text-[13px] hover:translate-x-1 inline-block transform duration-200"
      >
        {item.label}
      </Link>
    );
  };

  return (
    <footer className="bg-gradient-to-br from-[var(--secondary)] to-[#0D1F35] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-full flex items-center justify-center shadow-xl hover:shadow-[0_12px_28px_rgba(0,85,255,0.30)] transition-all duration-300 hover:scale-110 z-20"
      >
        <ArrowUp size={18} />
      </button>

      {/* NOTE: container plus étroit + padding réduit */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-5 lg:px-6">
        {/* Main Footer Content */}
        {/* NOTE: grille centrée, colonnes 1 -> md:3 pour équilibrer (logo/desc | services | contact à droite) */}
        <div className="pt-10 pb-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">

          {/* Colonne 1 : Logo + description (contact déplacé à droite) */}
          <div className="space-y-4">
            {/* Logo + titre */}
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <img src={logoSrc} alt={`${settings.site_name} Logo`} className="w-8 h-8 rounded-lg object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold leading-none tracking-tight">
                  {settings.site_name}
                </span>
                <span className="text-[11px] text-white/60 font-medium tracking-wide uppercase">
                  {settings.site_tagline}
                </span>
              </div>
            </Link>

            {/* NOTE: texte réduit + line-height ajustée */}
            <p className="text-white/80 leading-relaxed text-[13px]">
              {settings.footer_description}
            </p>

            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Colonne 2 : Services (visible) */}
          <div className="md:mt-4">
            <h3 className="font-bold text-sm mb-3 text-gray-100 dark:text-white">Services</h3>
            <ul className="space-y-2">
              {navigation.footerServices.map((link, index) => (
                <li key={`footer-service-${index}`}>
                  {renderFooterLink(link, `footer-service-link-${index}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Contact (EMAIL + NUMÉROS + ADRESSE) – bien aligné à droite */}
          <div className="space-y-3 md:text-right md:mt-10">
            {/* Email */}
            <a
              href={`mailto:${settings.contact_email}`}
              className="flex md:justify-end items-center gap-2 text-white/75 hover:text-white transition-colors group"
            >
              <span className="text-[13px] order-2 md:order-1">{settings.contact_email}</span>
              <div className="order-1 md:order-2 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0">
                <Mail size={14} />
              </div>
            </a>

            {/* Téléphones */}

            <div className="flex items-start justify-start md:justify-end gap-2 text-white/75">
              {/* Icône en 1er en mobile, en 2e en desktop */}
              <div className="order-1 md:order-2 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Phone size={14} />
              </div>

              {/* Numéros en 2e en mobile, en 1er en desktop */}
              <div className="order-2 md:order-1 flex flex-col text-[13px] leading-snug">
                {contactLines.map((phone, index) => (
                  <div key={`footer-phone-${index}`} className="md:text-right">
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors whitespace-nowrap">
                      {phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>


            {/* Adresse (si tu veux afficher une adresse, mets le texte entre les balises <span>) */}

            <div className="flex items-start justify-start md:justify-end gap-2 text-white/75">
              {/* Icône en 1er en mobile, en 2e en desktop */}
              <div className="order-1 md:order-2 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={14} />
              </div>

              {/* Texte en 2e en mobile, en 1er en desktop */}
              <span className="order-2 md:order-1 text-[13px] leading-relaxed md:text-right">
                {settings.contact_address}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        {/* NOTE: padding réduit et container compact */}
        <div className="border-t border-white/10 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/60 text-[12px]">
              © {new Date().getFullYear()} {settings.site_name}. {settings.footer_copyright}
            </p>

            {navigation.footerLegal.length > 0 && (
              <div className="flex flex-wrap justify-center gap-5 text-sm">
                {navigation.footerLegal.map((link, index) => (
                  <span key={`footer-legal-${index}`} className="text-white/60 hover:text-white transition-colors">
                    {renderFooterLink(link, `footer-legal-link-${index}`)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
