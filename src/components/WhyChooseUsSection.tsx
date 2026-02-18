import React from 'react';
import { Award, Users, Zap, Target } from 'lucide-react';
import { IconWrapper } from './IconWrapper';

export function WhyChooseUsSection() {
  const advantages = [
    {
      icon: <Award size={32} />,
      title: 'Expertise Reconnue',
      description: 'Plus de 15 ans d\'expérience et des certifications internationales dans les technologies de pointe.'
    },
    {
      icon: <Users size={32} />,
      title: 'Équipe Passionnée',
      description: 'Des experts dévoués qui transforment vos idées en solutions innovantes et performantes.'
    },
    {
      icon: <Zap size={32} />,
      title: 'Innovation Continue',
      description: 'Nous adoptons les dernières technologies pour vous offrir un avantage concurrentiel durable.'
    },
    {
      icon: <Target size={32} />,
      title: 'Résultats Mesurables',
      description: 'Approche orientée ROI avec des KPIs clairs et un suivi transparent de vos projets.'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-[var(--gray-50)] to-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-semibold mb-4">
            Pourquoi Nous Choisir
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Votre partenaire de confiance pour
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent-teal)]">
              la réussite digitale
            </span>
          </h2>
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="text-center group">
              <div className="mb-6 flex justify-center transform transition-transform duration-300 group-hover:scale-110">
                <IconWrapper variant="gradient" size="xl">
                  {advantage.icon}
                </IconWrapper>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[var(--secondary)]">
                {advantage.title}
              </h3>
              <p className="text-[var(--gray-600)] leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-[var(--gray-200)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[var(--primary)] mb-2">250+</p>
              <p className="text-[var(--gray-600)]">Clients Satisfaits</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--primary)] mb-2">500+</p>
              <p className="text-[var(--gray-600)]">Projets Livrés</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--primary)] mb-2">50+</p>
              <p className="text-[var(--gray-600)]">Experts Certifiés</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--primary)] mb-2">24/7</p>
              <p className="text-[var(--gray-600)]">Support Dédié</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
