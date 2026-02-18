import React, { useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

export function NstogoProjects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    /*{
      id: 1,
      title: 'Plateforme E-commerce Premium',
      category: 'E-commerce',
      description: 'Solution complète avec système de recommandation IA, paiement sécurisé et gestion multi-devises pour une boutique de luxe.',
      image: 'https://images.unsplash.com/photo-1717323454555-f053c31ff4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzcwMjQxMTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['React', 'Node.js', 'Stripe'],
      results: '+250% conversions'
    },*/

    {
      id: 1,
      title: 'Infrastructure d\'Interconnexion Réseau',
      category: 'Réseaux & Infrastructure',
      description: 'Mise en place d\'une architecture d\'interconnexion sécurisée entre plusieurs sites, avec optimisation du routage, VPN IPsec, segmentation VLAN et supervision centralisée pour assurerperformance, continuité et sécurité.',
      image: 'https://images.unsplash.com/photo-1581091870622-e492b5d49671?q=80&w=1080',
      tags: ['VPN IPsec' , 'VLAN', 'Firewall', 'Switching'],
      results: 'Infrastructure sécurisée et performante'
    },

    /*{
      id: 2,
      title: 'Application SaaS Cloud',
      category: 'SaaS',
      description: 'Plateforme de gestion d\'entreprise avec tableaux de bord temps réel, collaboration d\'équipe et API robuste.',
      image: 'https://images.unsplash.com/photo-1637937459053-c788742455be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHNjcmVlbiUyMGNvZGV8ZW58MXx8fHwxNzcwMjQ0NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Vue.js', 'Python', 'AWS'],
      results: '10k+ utilisateurs'
    },*/

    {
      id: 2,
      title: 'Maintenance Informatique Professionnelle',
      category: 'Support & Maintenance',
      description: 'Service complet incluant maintenance préventive et curative, optimisation des postes, gestion des mises à jour, sécurité, sauvegardes automatisées et assistance technique pour une infrastructure fiable et performante.',
      image: 'https://images.unsplash.com/photo-1581090464777-1e63c7f16bcd?q=80&w=1080',
      tags: ['Maintenance', 'Sécurité', 'Optimisation', 'Supervision'],
      results: 'Infrastructure stable et performante'
    },

    /*{
      id: 3,
      title: 'Infrastructure Cloud Scalable',
      category: 'Cloud',
      description: 'Architecture serverless haute disponibilité avec auto-scaling, monitoring 24/7 et déploiement multi-régions.',
      image: 'https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMHNlcnZlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcwMjQ0NTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Kubernetes', 'Docker', 'GCP'],
      results: '99.99% uptime'
    }*/

    {
      id: 3,
      title: 'Câblage Réseau Professionnel',
      category: 'Infrastructure & Câblage',
      description: 'Installation de câblage Ethernet Cat6/Cat6a et fibre optique, organisation de baie de brassage, test de performance, certification des liaisons et optimisation du réseau pour un débit fiable et sécurisé.',
      image: 'https://images.unsplash.com/photo-1581091226033-83191d4d94b7?q=80&w=1080',
      tags: ['Fibre Optique', 'Cat6', 'Baie de brassage', 'RJ45'],
      results: 'Réseau rapide et fiable'
    }

  ];

  const categories = ['all', 'Réseaux & Infrastructure', 'Support & Maintenance', 'Infrastructure & Câblage'];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding bg-gradient-to-br from-[var(--gray-50)] via-white to-[var(--gray-50)] relative">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full mb-6">
            <span className="text-sm font-semibold text-[var(--primary)]">
              Nos Réalisations
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[var(--secondary)]">
            Des projets qui
            <span className="block gradient-text mt-2">
              font la différence
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--gray-600)] leading-relaxed">
            Découvrez comment nous avons transformé les ambitions de nos clients en succès concrets et mesurables.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white shadow-lg'
                  : 'bg-white text-[var(--gray-700)] border-2 border-[var(--gray-200)] hover:border-[var(--primary)]'
              }`}
            >
              {category === 'all' ? 'Tous les projets' : category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[var(--gray-200)]"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--secondary)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full">
                  <span className="text-xs font-bold text-[var(--primary)]">{project.category}</span>
                </div>

                {/* View Project Icon */}
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <ExternalLink className="text-[var(--primary)]" size={20} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-[var(--secondary)] group-hover:text-[var(--primary)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[var(--gray-600)] leading-relaxed text-sm">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[var(--gray-100)] text-[var(--gray-700)] text-xs font-medium rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Results */}
                <div className="pt-4 border-t border-[var(--gray-200)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[var(--gray-500)] mb-1">Résultat</p>
                      <p className="text-sm font-bold gradient-text">{project.results}</p>
                    </div>
                  {/*  <button className="text-[var(--primary)] font-semibold text-sm hover:gap-2 flex items-center gap-1 transition-all group/btn">
                      Voir plus
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>*/}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-[var(--gray-600)] mb-4 text-lg">
            Envie de créer le prochain projet à succès ?
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[var(--primary)] font-semibold hover:underline text-lg transition-all inline-flex items-center gap-2 group"
          >
            Discutons de votre projet
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
