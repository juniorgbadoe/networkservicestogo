import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, ArrowUp, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export function NstogoFooter() {
  const navigate = useNavigate();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = {
    services: [
      { label: 'Maintenance informatique', path: '/services' },
      { label: 'Déploiement des réseaux d’entreprise', path: '/services' },
      { label: 'Câblage réseau informatique', path: '/services' },
      { label: 'Configuration d’infrastructure réseau', path: '/services' }
    ],
    company: [
      { label: 'À propos', path: '/about' },
      { label: 'Nos réalisations', path: '/projects' },
      { label: 'Témoignages', path: '/testimonials' },
      { label: 'Contact', path: '/contact' },
      { label: 'Carrières', url: '#' },
      { label: 'Blog', url: '#'}
    ],
    resources: [
      { label: 'Documentation', url: '#' },
      { label: 'Centre d\'aide', url: '#' },
      { label: 'API', url: '#' },
      { label: 'Status', url: '#' },
      { label: 'Changelog', url: '#' }
    ],
    legal: [
      { label: 'Mentions légales', url: '#' },
      { label: 'Politique de confidentialité', url: '#' },
      { label: 'CGV', url: '#' },
      { label: 'CGU', url: '#' },
      { label: 'Cookies', url: '#' }
    ]
  };

  const socialLinks = [
    { icon: <Linkedin size={20} />, label: 'LinkedIn', url: '#' },
    { icon: <Twitter size={20} />, label: 'Twitter', url: '#' },
    { icon: <Facebook size={20} />, label: 'Facebook', url: '#' },
    { icon: <Instagram size={20} />, label: 'Instagram', url: '#' }
  ];

  return (
    <footer className="bg-gradient-to-br from-[var(--secondary)] to-[#0D1F35] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-full flex items-center justify-center shadow-2xl hover:shadow-[0_20px_50px_rgba(0,85,255,0.4)] transition-all duration-300 hover:scale-110 z-20"
      >
        <ArrowUp size={24} />
      </button>

      <div className="container relative z-10">
        {/* Main Footer Content */}
        <div className="pt-20 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Company Info - Takes more space */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow">
                  <span className="text-white font-bold text-2xl tracking-tight">NS</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[var(--accent-turquoise)] rounded-full border-2 border-[var(--secondary)]"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold leading-none tracking-tight">
                  Network Service
                </span>
                <span className="text-[11px] text-white/60 font-medium tracking-wide uppercase">
                  Digital Solutions
                </span>
              </div>
            </div>

            <p className="text-white/80 leading-relaxed text-[15px] pr-8">
              Votre partenaire technologique pour relever les défis numériques d’aujourd’hui et de demain. Network Service est un cabinet spécialisée en informatique réseau, services digitaux et développement de sites web. Nous vous aidons à bâtir une infrastructure performante, à optimiser vos outils numériques et à sécuriser vos environnements.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:contact@networkservice.com" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Mail size={18} />
                </div>
                <span className="text-sm">contact@nstogo.com</span>
              </a>
              <a href="tel:+33176543210" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Phone size={18} />
                </div>
                <span className="text-sm">+228 79 71 00 22</span>
                <span className="text-sm">+228 91 54 14 48</span>
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <span className="text-sm leading-relaxed"><br /></span>
              </div>
            </div>

            {/* Social Links */}
            {/*<div className="pt-4">
              <p className="text-sm font-semibold mb-3">Suivez-nous</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    aria-label={social.label}
                    className="w-11 h-11 rounded-lg bg-white/10 hover:bg-gradient-to-br hover:from-[var(--primary)] hover:to-[var(--primary-light)] flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>*/}
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {footerSections.services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
         {/* <div className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-6">Entreprise</h3>
            <ul className="space-y-3">
              {footerSections.company.map((link, index) => (
                <li key={index}>
                  {link.path ? (
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-200"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.url}
                      className="text-white/70 hover:text-white transition-colors text-sm hover:translate-x-1 inline-flex items-center gap-1 transform duration-200"
                    >
                      {link.label}
                      <ExternalLink size={12} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>*/}

          {/* Resources */}
         {/* <div className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-6">Ressources</h3>
            <ul className="space-y-3">
              {footerSections.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-white/70 hover:text-white transition-colors text-sm hover:translate-x-1 inline-flex items-center gap-1 transform duration-200"
                  >
                    {link.label}
                    <ExternalLink size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </div>*/}

          {/* Newsletter */}
         {/* <div className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              Restez informé de nos actualités et offres exclusives.
            </p>
            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Merci pour votre inscription !'); }}>
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--primary)] focus:bg-white/15 transition-all text-sm"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
              >
                S'inscrire
              </button>
            </form>
          </div>*/}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Network Service. Tous droits réservés.
            </p>

            {/* Legal Links */}
            {/*<div className="flex flex-wrap justify-center gap-6 text-sm">
              {footerSections.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>*/}
          </div>
        </div>
      </div>
    </footer>
  );
}