import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
import LogoNS from '../assets/logons2.png';

export function NstogoHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'À propos', path: '/about' },
    { label: 'Réalisations', path: '/projects' },
    { label: 'Témoignages', path: '/testimonials' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[var(--z-fixed)] transition-all duration-300 ${
        isScrolled 
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
          >
            <div className="relative">
              <img src={LogoNS} alt="NSTOGO Logo" className="w-10 h-10 rounded-lg group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-[var(--secondary)] dark:text-[var(--white)] leading-none tracking-tight">
                Network Service
              </span>
              <span className="text-[10px] text-[var(--gray-500)] dark:text-[var(--gray-400)] font-medium tracking-wide uppercase">
                Digital Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[var(--gray-700)] dark:text-[var(--gray-300)] hover:text-[var(--primary)] font-medium text-[15px] transition-colors duration-200 relative group ${
                  location.pathname === link.path ? 'text-[var(--primary)]' : ''
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-[var(--primary)] transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Button 
              onClick={() => navigate('/contact')}
              size="md"
            >
              Devis gratuit
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
        className={`lg:hidden bg-white dark:bg-[var(--gray-800)] border-t border-[var(--gray-200)] dark:border-[var(--gray-700)] transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100 shadow-xl' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-left text-[var(--gray-700)] dark:text-[var(--gray-300)] hover:text-[var(--primary)] hover:bg-[var(--gray-50)] dark:hover:bg-[var(--gray-700)] font-medium py-3 px-4 rounded-lg transition-all duration-200 ${
                location.pathname === link.path ? 'text-[var(--primary)] bg-[var(--gray-50)] dark:bg-[var(--gray-700)]' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 px-4">
            <Button 
              onClick={() => navigate('/contact')}
              className="w-full"
            >
              Devis gratuit
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}