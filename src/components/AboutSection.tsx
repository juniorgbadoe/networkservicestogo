import { CheckCircle } from 'lucide-react';
import { Button } from './Button';

export function AboutSection() {
  const values = [
    { label: 'Innovation', description: 'Adoption des technologies de pointe' },
    { label: 'Excellence', description: 'Qualité irréprochable dans chaque projet' },
    { label: 'Transparence', description: 'Communication claire et honnête' },
    { label: 'Engagement', description: 'Votre succès est notre priorité' }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1576057122708-9608db46b2f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd29ya3NwYWNlJTIwbGFwdG9wfGVufDF8fHx8MTc3MDI0MzUwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Notre équipe au travail"
                className="w-full h-auto"
              />
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-[var(--primary)] to-[var(--accent-teal)] opacity-20 rounded-2xl -z-10"></div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-semibold">
              À Propos de Nous
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Votre partenaire digital
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent-teal)]">
                depuis 2009
              </span>
            </h2>
            
            <p className="text-lg text-[var(--gray-600)] leading-relaxed">
              DigitalPro est une agence digitale de premier plan, spécialisée dans la création de solutions innovantes qui transforment les entreprises. Notre équipe d'experts passionnés combine créativité et technologie pour livrer des résultats exceptionnels.
            </p>

            <p className="text-lg text-[var(--gray-600)] leading-relaxed">
              Nous croyons que chaque entreprise mérite une présence digitale à la hauteur de ses ambitions. C'est pourquoi nous nous engageons à fournir des solutions sur mesure qui dépassent vos attentes.
            </p>

            {/* Values */}
            <div className="space-y-4 pt-4">
              <h3 className="text-2xl font-bold text-[var(--secondary)]">Nos Valeurs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-[var(--primary)] mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-[var(--secondary)]">{value.label}</p>
                      <p className="text-sm text-[var(--gray-600)]">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button size="lg" onClick={scrollToContact}>
                Discutons de votre projet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
