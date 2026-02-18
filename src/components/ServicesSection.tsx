import { Code, Smartphone, Rocket, Megaphone, BarChart3, Shield } from 'lucide-react';
import { ServiceCard } from './Card';

export function ServicesSection() {
  const services = [
    {
      icon: <Code size={28} />,
      title: 'Développement Web',
      description: 'Sites web et applications sur mesure, performants et évolutifs, conçus avec les technologies les plus récentes.'
    },
    {
      icon: <Smartphone size={28} />,
      title: 'Applications Mobile',
      description: 'Applications iOS et Android natives ou hybrides pour offrir une expérience utilisateur exceptionnelle.'
    },
    {
      icon: <Rocket size={28} />,
      title: 'Solutions Cloud',
      description: 'Infrastructure cloud scalable et sécurisée pour propulser votre croissance sans limites.'
    },
    {
      icon: <Megaphone size={28} />,
      title: 'Marketing Digital',
      description: 'Stratégies digitales personnalisées pour augmenter votre visibilité et générer des leads qualifiés.'
    },
    {
      icon: <BarChart3 size={28} />,
      title: 'Data & Analytics',
      description: 'Analyse de données avancée pour prendre des décisions éclairées et optimiser vos performances.'
    },
    {
      icon: <Shield size={28} />,
      title: 'Cybersécurité',
      description: 'Protection complète de vos données et systèmes contre les menaces numériques actuelles.'
    }
  ];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-semibold mb-4">
            Nos Services
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Des solutions complètes pour
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent-teal)]">
              tous vos besoins digitaux
            </span>
          </h2>
          <p className="text-lg text-[var(--gray-600)] leading-relaxed">
            Nous accompagnons votre transformation digitale avec expertise et passion, du concept à la réalisation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
