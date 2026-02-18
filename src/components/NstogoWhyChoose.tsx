
import { Zap, Award, Target, Shield, Clock, Users, Lightbulb, HeartHandshake } from 'lucide-react';

export function NstogoWhyChoose() {
  const advantages = [
    {
      icon: <Zap size={32} />,
      title: 'Rapidité d\'exécution',
      description: 'Déploiement agile et livraisons rapides pour un time-to-market optimal. Nos processus éprouvés garantissent des résultats concrets en un temps record.',
      color: 'from-[var(--primary)] to-[var(--primary-light)]',
      stat: '',
      statLabel: ''
    },
    {
      icon: <Award size={32} />,
      title: 'Expertise technique',
      description: 'Une équipe expérimentée, fiable et prête à relever tous défis techniques.',
      color: 'from-[var(--accent-turquoise)] to-[#00A0A0]',
      stat: '',
      statLabel: ''
    },
    {
      icon: <Target size={32} />,
      title: 'Solutions sur mesure',
      description: 'Chaque projet est unique. Nous concevons des solutions sur mesure, évolutives, alignées à vos besoins présents et futurs.',
      color: 'from-[var(--accent-gold)] to-[#FF8C00]',
      stat: '',
      statLabel: ''
    },
    {
      icon: <Shield size={32} />,
      title: 'Fiabilité & Sécurité',
      description: 'Infrastructure ultra-sécurisée, monitoring 24/7 et backup automatique. Conformité RGPD et certifications ISO pour votre tranquillité d\'esprit.',
      color: 'from-[#10B981] to-[#059669]',
      stat: '',
      statLabel: ''
    }
  ];

  const extraFeatures = [
    { icon: <Clock size={20} />, label: 'Support 24/7' },
    { icon: <Users size={20} />, label: 'Équipe dédiée' },
    { icon: <Lightbulb size={20} />, label: 'Innovation continue' },
    { icon: <HeartHandshake size={20} />, label: 'Relation de confiance' }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-[var(--gray-50)] via-white to-[var(--gray-50)] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--primary)] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--accent-turquoise)] opacity-5 rounded-full blur-3xl"></div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full mb-6">
            <span className="text-sm font-semibold text-[var(--primary)]">
              Pourquoi Network Service
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[var(--secondary)]">
            Votre partenaire digital
            <span className="block gradient-text mt-2">
              de confiance
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--gray-600)] leading-relaxed">
            Nous ne sommes pas qu'un prestataire, nous sommes votre allié stratégique pour bâtir votre succès digital.
          </p>
        </div>

        {/* Main Advantages Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-[var(--gray-200)]"
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${advantage.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                {/* Icon & Stat */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${advantage.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    {advantage.icon}
                  </div>
                  <div className="text-right">
                    <p className={`text-3xl font-bold bg-gradient-to-br ${advantage.color} bg-clip-text text-transparent`}>
                      {advantage.stat}
                    </p>
                    <p className="text-xs text-[var(--gray-500)] font-medium mt-1">
                      {advantage.statLabel}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-[var(--secondary)] mb-4 group-hover:text-[var(--primary)] transition-colors">
                  {advantage.title}
                </h3>
                <p className="text-[var(--gray-600)] leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Extra Features */}
        <div className="bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-light)] rounded-3xl p-8 lg:p-12 text-white">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {extraFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  {feature.icon}
                </div>
                <p className="font-semibold text-lg">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <p className="text-4xl lg:text-5xl font-bold gradient-text">500+</p>
            <p className="text-[var(--gray-600)] font-medium">Clients satisfaits</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl lg:text-5xl font-bold gradient-text">1000+</p>
            <p className="text-[var(--gray-600)] font-medium">Projets livrés</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl lg:text-5xl font-bold gradient-text">98%</p>
            <p className="text-[var(--gray-600)] font-medium">Taux satisfaction</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl lg:text-5xl font-bold gradient-text">15+</p>
            <p className="text-[var(--gray-600)] font-medium">Pays couverts</p>
          </div>
        </div> */}
        
      </div>
    </section>
  );
}