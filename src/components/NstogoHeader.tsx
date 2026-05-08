import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
import LogoNS from '../assets/logons2.png';
import { type NavigationItem, useSiteShell } from '../hooks/useSiteContent';

function resolveLogoSrc(logo: string) {
  if (!logo) {
    return LogoNS;
  }

  if (logo.startsWith('http://') || logo.startsWith('https://') || logo.startsWith('/')) {
    return logo;
  }

  return LogoNS;
}

function isExternalUrl(url?: string) {
  return Boolean(url && /^https?:\/\//i.test(url));
}

export function NstogoHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { settings, navigation } = useSiteShell();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainMenu = navigation.main;
  const servicesMenu = navigation.services;
  const logoSrc = useMemo(() => resolveLogoSrc(settings.site_logo), [settings.site_logo]);

  const handleMenuClose = () => setIsMobileMenuOpen(false);
  const handleCtaClick = () => {
    const destination = settings.header_cta_link || '/contact';
    if (isExternalUrl(destination)) {
      window.open(destination, '_blank', 'noopener,noreferrer');
      return;
    }
    navigate(destination);
  };

  const isServicesMenuItem = (item: NavigationItem) =>
    item.path === '/services' || item.label.toLowerCase() === 'services';

  const renderSimpleDesktopItem = (item: NavigationItem) => {
    if (item.url) {
      return (
        <a
          key={`${item.label}-${item.url}`}
          href={item.url}
          target={isExternalUrl(item.url) ? '_blank' : undefined}
          rel={isExternalUrl(item.url) ? 'noopener noreferrer' : undefined}
          className="text-[var(--gray-700)] dark:text-[var(--gray-300)] hover:text-[var(--primary)] font-medium text-[15px] transition-colors duration-200"
        >
          {item.label}
        </a>
      );
    }

    return (
      <NavLink
        key={`${item.label}-${item.path}`}
        to={item.path || '/'}
        className={({ isActive }) =>
          `text-[var(--gray-700)] dark:text-[var(--gray-300)] hover:text-[var(--primary)]
           font-medium text-[15px] transition-colors duration-200 relative group
           ${isActive ? 'text-[var(--primary)]' : ''}`
        }
      >
        {item.label}
        <span
          className={`absolute bottom-0 left-0 h-0.5 bg-[var(--primary)] transition-all duration-300
            ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`}
        />
      </NavLink>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[var(--z-fixed)] transition-all duration-300 ${isScrolled
          ? 'bg-white/98 dark:bg-[var(--gray-900)]/98 backdrop-blur-lg shadow-lg border-b border-[var(--gray-200)] dark:border-[var(--gray-700)]'
          : 'bg-transparent'
        }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={handleMenuClose}
          >
            <div className="relative">
              <img src={logoSrc} alt={`${settings.site_name} Logo`} className="w-10 h-10 rounded-lg object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-[var(--secondary)] dark:text-[var(--white)] leading-none tracking-tight">
                {settings.site_name}
              </span>
              <span className="text-[10px] text-[var(--gray-500)] dark:text-[var(--gray-400)] font-medium tracking-wide uppercase">
                {settings.site_tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {mainMenu.map((link) => {
              const isServices = isServicesMenuItem(link) && servicesMenu.length > 0;
              const isServicesActive =
                link.path === '/services'
                  ? location.pathname.startsWith('/services') ||
                    servicesMenu.some((serviceLink) => serviceLink.path === location.pathname)
                  : false;

              if (isServices && link.path) {
                return (
                  <div key={`${link.label}-${link.path}`} className="relative group">
                    <button
                      className={`flex items-center gap-1 font-medium text-[15px] transition-colors duration-200
              ${isServicesActive
                          ? 'text-[var(--primary)]'
                          : 'text-[var(--gray-700)] dark:text-[var(--gray-300)] hover:text-[var(--primary)]'}`}
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${isServicesActive ? 'rotate-180' : 'group-hover:rotate-180'}`}
                      />
                    </button>

                    {/* Menu déroulant */}
                    <div
                      className="invisible opacity-0 group-hover:visible group-hover:opacity-100
                       focus-within:visible focus-within:opacity-100
                       absolute top-full left-0 mt-2 w-72
                       bg-white dark:bg-[var(--gray-800)]
                       border border-[var(--gray-200)] dark:border-[var(--gray-700)]
                       shadow-xl rounded-xl overflow-hidden transition-opacity duration-150"
                      role="menu"
                    >
                      <NavLink
                        to={link.path}
                        role="menuitem"
                        className={({ isActive }) =>
                          `block px-4 py-3 font-semibold ${isActive ? 'text-[var(--primary)]' : 'text-[var(--secondary)] dark:text-white'
                          } hover:bg-[var(--gray-50)] dark:hover:bg-[var(--gray-700)]`
                        }
                      >
                        {link.label} →
                      </NavLink>

                      <div className="py-2">
                        {servicesMenu.map((serviceLink) => (
                          <NavLink
                            key={`${serviceLink.label}-${serviceLink.path || serviceLink.url}`}
                            to={serviceLink.path || '/services'}
                            role="menuitem"
                            className={({ isActive }) =>
                              `block px-4 py-2.5 ${isActive ? 'text-[var(--primary)]' : 'text-[var(--gray-700)] dark:text-[var(--gray-300)]'
                              } hover:bg-[var(--gray-50)] dark:hover:bg-[var(--gray-700)]`
                            }
                          >
                            {serviceLink.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return renderSimpleDesktopItem(link);
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Button
              onClick={handleCtaClick}
              size="md"
            >
              {settings.header_cta_label}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              className="w-11 h-11 flex items-center justify-center rounded-lg text-[var(--secondary)] dark:text-[var(--white)] hover:bg-[var(--gray-100)] dark:hover:bg-[var(--gray-700)] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white dark:bg-[var(--gray-800)] border-t border-[var(--gray-200)] dark:border-[var(--gray-700)]
              transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] opacity-100 shadow-xl' : 'max-h-0 opacity-0'}`}
      >
        <nav className="container py-6 flex flex-col gap-1">
          {mainMenu.map((link) => {
            const isServices = isServicesMenuItem(link) && servicesMenu.length > 0 && !!link.path;

            if (isServices && link.path) {
              return (
                <details key={`${link.label}-${link.path}`} className="group rounded-lg overflow-hidden">
                  <summary
                    className={`cursor-pointer flex items-center justify-between py-3 px-4 font-medium
                hover:bg-[var(--gray-50)] dark:hover:bg-[var(--gray-700)]
                ${location.pathname.startsWith('/services') ? 'text-[var(--primary)]' : 'text-[var(--gray-700)] dark:text-[var(--gray-300)]'}
            `}
                  >
                    <span>Services</span>
                    <ChevronDown size={18} className="transition-transform group-open:rotate-180" />
                  </summary>

                  <div className="flex flex-col">
                    <NavLink
                      to={link.path}
                      onClick={handleMenuClose}
                      className={({ isActive }) =>
                        `py-3 pl-8 pr-4 font-semibold hover:bg-[var(--gray-50)] dark:hover:bg-[var(--gray-700)]
                 ${isActive ? 'text-[var(--primary)]' : 'text-[var(--secondary)] dark:text-white'}`
                      }
                    >
                      {link.label} →
                    </NavLink>

                    {servicesMenu.map((serviceLink) => (
                      <NavLink
                        key={`${serviceLink.label}-${serviceLink.path || serviceLink.url}`}
                        to={serviceLink.path || '/services'}
                        onClick={handleMenuClose}
                        className={({ isActive }) =>
                          `py-3 pl-8 pr-4 hover:bg-[var(--gray-50)] dark:hover:bg-[var(--gray-700)]
                    ${isActive ? 'text-[var(--primary)]' : 'text-[var(--gray-700)] dark:text-[var(--gray-300)]'}`
                        }
                      >
                        {serviceLink.label}
                      </NavLink>
                    ))}
                  </div>
                </details>
              );
            }

            if (link.url) {
              return (
                <a
                  key={`${link.label}-${link.url}`}
                  href={link.url}
                  target={isExternalUrl(link.url) ? '_blank' : undefined}
                  rel={isExternalUrl(link.url) ? 'noopener noreferrer' : undefined}
                  className="text-left font-medium py-3 px-4 rounded-lg transition-all duration-200
                    hover:text-[var(--primary)] hover:bg-[var(--gray-50)] dark:hover:bg-[var(--gray-700)]
                    text-[var(--gray-700)] dark:text-[var(--gray-300)]"
                >
                  {link.label}
                </a>
              );
            }

            return (
              <NavLink
                key={`${link.label}-${link.path}`}
                to={link.path || '/'}
                onClick={handleMenuClose}
                className={({ isActive }) =>
                  `text-left font-medium py-3 px-4 rounded-lg transition-all duration-200
           hover:text-[var(--primary)] hover:bg-[var(--gray-50)] dark:hover:bg-[var(--gray-700)]
           ${isActive
                    ? 'text-[var(--primary)] bg-[var(--gray-50)] dark:bg-[var(--gray-700)]'
                    : 'text-[var(--gray-700)] dark:text-[var(--gray-300)]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            );
          })}

          {/* CTA */}
          <div className="mt-4 px-4">
            <Button onClick={() => { handleMenuClose(); handleCtaClick(); }} className="w-full">
              {settings.header_cta_label}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
