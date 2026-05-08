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
    <section
      className="
        section-padding bg-gradient-to-br from-[var(--gray-50)] to-white
        dark:from-[#0e1726] dark:to-[#0e1726]
      "
    >
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="
              inline-block px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-semibold mb-4
              dark:bg-[var(--primary)]/20 dark:text-[var(--primary)]
            "
          >
            Pourquoi Nous Choisir
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[var(--secondary)] dark:text-slate-100">
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
              <h3 className="text-xl font-bold mb-3 text-[var(--secondary)] dark:text-slate-100">
                {advantage.title}
              </h3>
              <p className="text-[var(--gray-600)] leading-relaxed dark:text-slate-300">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-[var(--gray-200)] dark:border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[var(--primary)] mb-2">250+</p>
              <p className="text-[var(--gray-600)] dark:text-slate-300">Clients Satisfaits</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--primary)] mb-2">500+</p>
              <p className="text-[var(--gray-600)] dark:text-slate-300">Projets Livrés</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--primary)] mb-2">50+</p>
              <p className="text-[var(--gray-600)] dark:text-slate-300">Experts Certifiés</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--primary)] mb-2">24/7</p>
              <p className="text-[var(--gray-600)] dark:text-slate-300">Support Dédié</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
