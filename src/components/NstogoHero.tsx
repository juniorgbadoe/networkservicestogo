import { ArrowRight, Play, Sparkles, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from './Button';

export function NstogoHero() {
  const navigate = useNavigate();

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[var(--gray-50)] via-white to-[var(--gray-50)] pt-20">
      {/* Animated Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] opacity-5 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-gradient-to-br from-[var(--accent-turquoise)] to-[var(--primary)] opacity-5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8 lg:space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent-turquoise)]/10 border border-[var(--primary)]/20 rounded-full">
              <Sparkles className="text-[var(--primary)]" size={18} />
              <span className="text-sm font-semibold text-[var(--primary)]">
                Solutions digitales sur mesure
              </span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-[var(--secondary)]">
                Accélérez votre
                <span className="block mt-2 gradient-text">
                  Transformation Digitale
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-[var(--gray-600)] leading-relaxed max-w-2xl">
                Votre partenaire technologique pour relever les défis numériques d’aujourd’hui et de demain.

                Network Service est un cabinet spécialisée en informatique réseau, services digitaux et développement de sites web.

              Nous vous aidons à bâtir une infrastructure performante, à optimiser vos outils numériques et à sécuriser vos environnements.              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => navigate('/services')}
                icon={<ArrowRight size={22} />}
              >
                Découvrir nos services
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate('/contact')}
                icon={<Play size={20} />}
              >
                Nous contacter
              </Button>
            </div>

            {/* <div className="grid grid-cols-3 gap-6 pt-8 lg:pt-12">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-3xl lg:text-4xl font-bold gradient-text">500+</p>
                </div>
                <p className="text-sm text-[var(--gray-600)] font-medium">Projets réussis</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-3xl lg:text-4xl font-bold gradient-text">99.9%</p>
                </div>
                <p className="text-sm text-[var(--gray-600)] font-medium">Uptime garanti</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-3xl lg:text-4xl font-bold gradient-text">24/7</p>
                </div>
                <p className="text-sm text-[var(--gray-600)] font-medium">Support expert</p>
              </div>
            </div> */}
            
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block">
            {/* Floating Cards */}
            <div className="absolute top-1/4 left-1/4 bg-white rounded-2xl shadow-xl p-5 animate-float backdrop-blur-sm border border-[var(--gray-100)]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center">
                  <Zap className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-bold text-[var(--secondary)] text-sm">Rapidité</p>
                  <p className="text-xs text-[var(--gray-500)]">Déploiement instantané</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-1/4 right-1/4 bg-white rounded-2xl shadow-xl p-5 animate-float backdrop-blur-sm border border-[var(--gray-100)]" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-turquoise)] to-[var(--primary)] flex items-center justify-center">
                  <Shield className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-bold text-[var(--secondary)] text-sm">Sécurité</p>
                  <p className="text-xs text-[var(--gray-500)]">Protection maximale</p>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[var(--accent-turquoise)]/5 to-[var(--primary)]/5 rounded-3xl blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}