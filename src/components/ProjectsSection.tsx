import { ProjectCard } from './Card';

export function ProjectsSection() {
  const projects = [
    {
      image: 'https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ24lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcwMTQxNDQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Plateforme SaaS Cloud',
      description: 'Solution complète de gestion pour entreprises avec tableau de bord analytique avancé.',
      category: 'Web App'
    },
    {
      image: 'https://images.unsplash.com/photo-1707836916010-3c4ad261936c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBzY3JlZW4lMjBtb2NrdXB8ZW58MXx8fHwxNzcwMjEyMTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Application Mobile Finance',
      description: 'Application bancaire mobile avec fonctionnalités de paiement et de gestion de budget.',
      category: 'Mobile'
    },
    {
      image: 'https://images.unsplash.com/photo-1687524690542-2659f268cde8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MDE3MTM4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'E-commerce Premium',
      description: 'Boutique en ligne avec système de recommandation IA et expérience utilisateur optimale.',
      category: 'E-commerce'
    }
  ];

  return (
    <section id="projects" className="section-padding bg-gradient-to-br from-[var(--gray-50)] to-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-semibold mb-4">
            Nos Réalisations
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Découvrez nos projets
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent-teal)]">
              qui font la différence
            </span>
          </h2>
          <p className="text-lg text-[var(--gray-600)] leading-relaxed">
            Chaque projet est une histoire de succès. Voici quelques exemples de nos réalisations récentes.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              image={project.image}
              title={project.title}
              description={project.description}
              category={project.category}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-[var(--gray-600)] mb-4">Vous souhaitez voir plus de projets ?</p>
          <button className="text-[var(--primary)] font-semibold hover:underline transition-all">
            Voir tous nos projets →
          </button>
        </div>
      </div>
    </section>
  );
}
