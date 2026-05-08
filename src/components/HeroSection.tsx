import { ArrowRight, Play } from 'lucide-react';
import { Button } from './Button';

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[var(--gray-50)] to-white pt-20">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[var(--primary)] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[var(--accent-teal)] opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-semibold">
              🚀 Innovation Digitale
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              Transformez votre
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent-teal)]">
                Vision Digitale
              </span>
              en Réalité
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--gray-600)] leading-relaxed max-w-xl">
              Nous créons des solutions digitales sur mesure qui propulsent votre entreprise vers le succès. Expertise, innovation et résultats garantis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => scrollToSection('contact')}
                icon={<ArrowRight size={20} />}
              >
                Démarrer un projet
              </Button>
              <Button 
                variant="ghost"
                size="lg"
                onClick={() => scrollToSection('about')}
                icon={<Play size={20} />}
              >
                En savoir plus
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[var(--gray-200)]">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-[var(--primary)]">250+</p>
                <p className="text-sm text-[var(--gray-600)] mt-1">Projets réalisés</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-[var(--primary)]">98%</p>
                <p className="text-sm text-[var(--gray-600)] mt-1">Satisfaction client</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-[var(--primary)]">15+</p>
                <p className="text-sm text-[var(--gray-600)] mt-1">Ans d'expertise</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden md:block">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1617518077569-6fb6bc9433da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHNoYXBlcyUyMGJsdWV8ZW58MXx8fHwxNzcwMjE0MTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Abstract geometric illustration"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-xl p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent-teal)] flex items-center justify-center text-white text-lg">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-sm text-[var(--secondary)]">Projet livré</p>
                  <p className="text-xs text-[var(--gray-500)]">À temps et dans le budget</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--accent-orange)] to-[var(--primary)] flex items-center justify-center text-white text-lg">
                  ⚡
                </div>
                <div>
                  <p className="font-semibold text-sm text-[var(--secondary)]">Performance</p>
                  <p className="text-xs text-[var(--gray-500)]">+250% de croissance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
