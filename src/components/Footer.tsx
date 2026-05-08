import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = {
    services: [
      { label: 'Développement Web', id: 'services' },
      { label: 'Applications Mobile', id: 'services' },
      { label: 'Solutions Cloud', id: 'services' },
      { label: 'Marketing Digital', id: 'services' }
    ],
    company: [
      { label: 'À propos', id: 'about' },
      { label: 'Nos réalisations', id: 'projects' },
      { label: 'Témoignages', id: 'testimonials' },
      { label: 'Contact', id: 'contact' }
    ],
    legal: [
      { label: 'Mentions légales', url: '#' },
      { label: 'Politique de confidentialité', url: '#' },
      { label: 'CGV', url: '#' },
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
    <footer className="bg-[var(--secondary)] text-white relative">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[var(--primary)] to-[var(--accent-teal)] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <ArrowUp size={20} />
      </button>

      <div className="container pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent-teal)] flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-xl font-bold">Digital<span className="text-[var(--primary)]">Pro</span></span>
            </div>
            <p className="text-[var(--gray-300)] leading-relaxed">
              Votre partenaire de confiance pour transformer vos idées digitales en succès concrets.
            </p>
            <div className="space-y-2">
              <a href="mailto:contact@digitalpro.fr" className="flex items-center gap-2 text-[var(--gray-300)] hover:text-[var(--primary)] transition-colors">
                <Mail size={16} />
                <span className="text-sm">contact@digitalpro.fr</span>
              </a>
              <a href="tel:+33123456789" className="flex items-center gap-2 text-[var(--gray-300)] hover:text-[var(--primary)] transition-colors">
                <Phone size={16} />
                <span className="text-sm">+33 1 23 45 67 89</span>
              </a>
              <div className="flex items-start gap-2 text-[var(--gray-300)]">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span className="text-sm">123 Avenue des Champs-Élysées<br />75008 Paris</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-[var(--gray-300)] hover:text-[var(--primary)] transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">Entreprise</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-[var(--gray-300)] hover:text-[var(--primary)] transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-[var(--gray-300)] text-sm mb-4">
              Restez informé de nos dernières actualités et offres exclusives.
            </p>
            <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); alert('Merci pour votre inscription !'); }}>
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 bg-[var(--secondary-light)] border border-[var(--gray-600)] rounded-lg text-white placeholder:text-[var(--gray-400)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-teal)] rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8 pb-8 border-b border-[var(--gray-700)]">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              aria-label={social.label}
              className="w-10 h-10 rounded-lg border border-[var(--gray-600)] text-[var(--gray-300)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 flex items-center justify-center transition-all duration-300"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--gray-400)]">
          <p>© {new Date().getFullYear()} DigitalPro. Tous droits réservés.</p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="hover:text-[var(--primary)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
