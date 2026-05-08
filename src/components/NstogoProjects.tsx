import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import IF from '../assets/Designer (2).png';
import MI from '../assets/pexels-cottonbro-6804613.jpg'
import IC from '../assets/pexels-brett-sayles-2881232.jpg'

const API_URL = import.meta.env.VITE_API_URL || '';

interface Projet {
  id: number;
  titre: string;
  description: string;
  resultat?: string;
  categorie?: string;
  tags: string[];
  images?: Array<{
    fichier?: string;
    miniature?: string;
    principal?: boolean;
  }>;
}

interface ProjectCard {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  results: string;
}

const defaultProjects: ProjectCard[] = [
  {
    id: 1,
    title: 'Infrastructure d\'Interconnexion Réseau',
    category: 'Réseaux & Infrastructure',
    description: 'Mise en place d\'une architecture d\'interconnexion sécurisée entre plusieurs sites.',
    image: IF,
    tags: ['VPN IPsec', 'VLAN', 'Firewall', 'Switching'],
    results: 'Infrastructure sécurisée et performante'
  },
  {
    id: 2,
    title: 'Maintenance Informatique Professionnelle',
    category: 'Support & Maintenance',
    description: 'Service complet incluant maintenance préventive et curative.',
    image: MI,
    tags: ['Maintenance', 'Sécurité', 'Optimisation', 'Supervision'],
    results: 'Infrastructure stable et performante'
  },
  {
    id: 3,
    title: 'Câblage Réseau Professionnel',
    category: 'Infrastructure & Câblage',
    description: 'Installation de câblage Ethernet Cat6/Cat6a et fibre optique.',
    image: IC,
    tags: ['Fibre Optique', 'Cat6', 'Baie de brassage', 'RJ45'],
    results: 'Réseau rapide et fiable'
  }
];

export function NstogoProjects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState<ProjectCard[]>(defaultProjects);

  const mapProjectToCard = (project: Projet): ProjectCard => {
    const primaryImage = Array.isArray(project.images)
      ? project.images.find((image) => image.principal) || project.images[0]
      : undefined;
    const imageName = primaryImage?.miniature || primaryImage?.fichier;
    const image = imageName ? `${API_URL}/uploads/projets/${imageName}` : IF;

    return {
      id: project.id,
      title: project.titre,
      category: project.categorie || 'Réalisations',
      description: project.description,
      image,
      tags: Array.isArray(project.tags) ? project.tags : [],
      results: project.resultat || 'Résultats livrés avec succès',
    };
  };

  useEffect(() => {
    fetch(`${API_URL}/api/projets?actif=true`)
      .then(res => res.json())
      .then(data => {
        if (data.projets && data.projets.length > 0) {
          setProjects(data.projets.map((project: Projet) => mapProjectToCard(project)));
        } else {
          setProjects(defaultProjects);
        }
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setProjects(defaultProjects);
      });
  }, []);

  const categories = ['all', ...new Set(projects.map((p) => p.category).filter(Boolean))];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="
        section-padding bg-gradient-to-br from-[var(--gray-50)] via-white to-[var(--gray-50)] relative
        /* 👉 Fond sombre = EXACTEMENT celui de la navbar via variables */
        dark:bg-gradient-to-br dark:from-[var(--nav-dark-from)] dark:via-[var(--nav-dark-via)] dark:to-[var(--nav-dark-to)]
      "
    >
      <div className="container">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full mb-6
            dark:bg-[var(--primary)]/20 dark:border-[var(--primary)]/30">
            <span className="text-sm font-semibold text-[var(--primary)]">
              Nos Réalisations
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[var(--secondary)] dark:text-slate-100">
            Des projets qui
            <span className="block gradient-text mt-2">
              font la différence
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--gray-600)] leading-relaxed dark:text-slate-300">
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
                  : 'bg-white text-[var(--gray-700)] border-2 border-[var(--gray-200)] hover:border-[var(--primary)] dark:bg-white/[0.06] dark:text-slate-100 dark:border-white/10 dark:hover:border-white/20'
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
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[var(--gray-200)]
                dark:bg-white/[0.05] dark:border-white/10"
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
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full
                  dark:bg-white/10">
                  <span className="text-xs font-bold text-[var(--primary)]">{project.category}</span>
                </div>

                {/* View Project Icon */}
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300
                  dark:bg-white/10">
                  <ExternalLink className="text-[var(--primary)]" size={20} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-[var(--secondary)] group-hover:text-[var(--primary)] transition-colors dark:text-slate-100">
                  {project.title}
                </h3>
                <p className="text-[var(--gray-600)] leading-relaxed text-sm dark:text-slate-300">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[var(--gray-100)] text-[var(--gray-700)] text-xs font-medium rounded-lg
                        dark:bg-white/10 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Results */}
                <div className="pt-4 border-t border-[var(--gray-200)] dark:border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[var(--gray-500)] mb-1 dark:text-slate-300/80">Résultat</p>
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
          <p className="text-[var(--gray-600)] mb-4 text-lg dark:text-slate-300">
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
