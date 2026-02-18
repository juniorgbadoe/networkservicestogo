//import { Code2, Cloud, Palette, TrendingUp, Database, Lock, Smartphone, Globe } from 'lucide-react';

import { Wrench, Network, Cable, ServerCog, ShieldCheck } from 'lucide-react';

export function NstogoServices() {
  const services = [

    {
      icon: <Wrench size={28}  />,
      title: 'Maintenance informatique',
      description: 'La maintenance informatique assure le bon fonctionnement des systèmes : prévention, dépannage, mise à niveau, sécurité, gestion des réseaux et données. Elle est essentielle pour optimiser la performance et la fiabilité.',
      color: 'from-[#0A1B2F] to-[#1E2F47]',
      features: ['Préventive & curative', 'Mises à jour & optimisation', 'Sécurité & sauvegardes']
    },
    
    {
      icon: <Network size={28}  />,
      title: 'Déploiement des réseaux d’entreprise',
      description: 'Le déploiement de réseaux d’entreprise connecte efficacement les utilisateurs, assure sécurité et performance, facilite l’accès aux ressources et améliore la productivité grâce à des technologies modernes et des compétences spécialisées.',
      color: 'from-[#0055FF] to-[#3377FF]',
      features: ['Architecture LAN/WAN/Wi‑Fi', 'Sécurité & segmentation (VLAN)', 'Qualité de service & supervision']
    },

    {
      icon: <Cable size={28}  />,
      title: 'Câblage réseau informatique',
      description: 'Le câblage réseau connecte les équipements informatiques via des câbles Ethernet, coaxiaux ou fibre optique, assurant un échange de données fiable, sécurisé et rapide pour garantir le bon fonctionnement du réseau.',
      color: 'from-[#FFB800] to-[#00D4D4]',
      features: ['Cat6/Cat6a & fibre optique', 'Baie de brassage & test de lien', 'Normes & étiquetage']
    },

    {
      icon: <ServerCog size={28}  />,
      title: 'Configuration d’infrastructure réseau',
      description: 'La configuration d’infrastructure réseau consiste à déployer et gérer les équipements physiques et logiciels pour assurer une connectivité fiable, sécurisée et performante, permettant le partage efficace de données, services et applications.',
      color: 'from-[#1E2F47] to-[#0A1B2F]',
      features: ['Switching & Routing', 'Pare‑feu & VPN', 'Haute dispo & monitoring']
    },

   /* {
      icon: <Code2 size={28} />,
      title: 'Développement Web',
      description: 'Applications web sur mesure, sites vitrines et plateformes e-commerce performantes avec les dernières technologies.',
      color: 'from-[#0055FF] to-[#3377FF]',
      features: ['React & Vue.js', 'Backend robuste', 'API RESTful']
    }, */
   /* {
      icon: <Cloud size={28} />,
      title: 'Hébergement Cloud',
      description: 'Infrastructure cloud sécurisée, scalable et haute disponibilité pour vos applications critiques.',
      color: 'from-[#00D4D4] to-[#00A0A0]',
      features: ['99.9% uptime', 'Auto-scaling', 'Backup quotidien']
    }, */
   /* {
      icon: <Palette size={28} />,
      title: 'Design UI/UX',
      description: 'Interfaces modernes et intuitives centrées sur l\'expérience utilisateur pour maximiser vos conversions.',
      color: 'from-[#FFB800] to-[#FF8C00]',
      features: ['Design System', 'Prototypage', 'Tests utilisateurs']
    }, */
  /*  {
      icon: <TrendingUp size={28} />,
      title: 'Marketing Digital',
      description: 'Stratégies digitales complètes pour augmenter votre visibilité et générer des leads qualifiés.',
      color: 'from-[#8B5CF6] to-[#6366F1]',
      features: ['SEO/SEA', 'Social Media', 'Analytics']
    },*/
   /* {
      icon: <Database size={28} />,
      title: 'Solutions Data',
      description: 'Architectures data robustes et analyses avancées pour exploiter tout le potentiel de vos données.',
      color: 'from-[#EC4899] to-[#F43F5E]',
      features: ['Big Data', 'BI Dashboards', 'Data Mining']
    },*/
   /* {
      icon: <Lock size={28} />,
      title: 'Cybersécurité',
      description: 'Protection complète de vos systèmes et données avec audits de sécurité et mises à jour continues.',
      color: 'from-[#10B981] to-[#059669]',
      features: ['Audit sécurité', 'Monitoring 24/7', 'Conformité RGPD']
    },*/
   /* {
      icon: <Smartphone size={28} />,
      title: 'Applications Mobile',
      description: 'Apps natives iOS et Android ou solutions cross-platform avec React Native et Flutter.',
      color: 'from-[#F59E0B] to-[#D97706]',
      features: ['iOS & Android', 'PWA', 'App Store ready']
    },*/
   /* {
      icon: <Globe size={28} />,
      title: 'Consulting Digital',
      description: 'Accompagnement stratégique pour votre transformation digitale et optimisation de vos processus.',
      color: 'from-[#06B6D4] to-[#0891B2]',
      features: ['Audit digital', 'Roadmap', 'Formation']
    } */
   
  ];

  return (
    <section id="services" className="section-padding bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--gray-50)] to-transparent pointer-events-none"></div>
      
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full mb-6">
            <span className="text-sm font-semibold text-[var(--primary)]">
              Nos Expertises
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[var(--secondary)]">
            Des solutions intelligentes
            <span className="block gradient-text mt-2">
              pour chaque besoin
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--gray-600)] leading-relaxed">
            Afin d’apporter un service fiable, conforme aux standards et adapté à la demande, Network Service est à l’écoute de vos besoins pour vous proposer des solutions sur mesure.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 border-2 border-[var(--gray-200)] hover:border-[var(--primary)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-[var(--secondary)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                {service.title}
              </h3>
              <p className="text-[var(--gray-600)] leading-relaxed mb-4 text-sm">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></div>
                    <span className="text-xs text-[var(--gray-500)] font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-turquoise)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl"></div>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-16">
          <p className="text-[var(--gray-600)] mb-4 text-lg">
            Un projet spécifique en tête ?
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[var(--primary)] font-semibold hover:underline text-lg transition-all inline-flex items-center gap-2 group"
          >
            Parlons-en ensemble
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div> */}
        
      </div>
    </section>
  );
}
