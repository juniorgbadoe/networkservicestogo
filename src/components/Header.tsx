import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Accueil', id: 'hero' },
    { label: 'Services', id: 'services' },
    { label: 'À propos', id: 'about' },
    { label: 'Réalisations', id: 'projects' },
    { label: 'Témoignages', id: 'testimonials' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[var(--z-fixed)] transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('hero')}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent-teal)] flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-xl font-bold text-[var(--secondary)]">Digital<span className="text-[var(--primary)]">Pro</span></span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-[var(--gray-700)] hover:text-[var(--primary)] font-medium transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button onClick={() => scrollToSection('contact')}>
              Nous contacter
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-[var(--secondary)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white border-t border-[var(--gray-200)] transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-left text-[var(--gray-700)] hover:text-[var(--primary)] font-medium py-2 transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <Button 
            onClick={() => scrollToSection('contact')}
            className="w-full mt-2"
          >
            Nous contacter
          </Button>
        </nav>
      </div>
    </header>
  );
}
