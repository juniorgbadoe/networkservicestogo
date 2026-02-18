import { Target, Eye, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from './Button';
import TeamImage from '../assets/photo18.png';

export function NstogoAbout() {
  const navigate = useNavigate();
  
  const values = [
    {
      icon: <Target size={24} />,
      title: 'Mission',
      description: 'Offrir des solutions technologiques fiables, personnalisées et durables qui accompagnent la croissance de nos clients. Nous nous engageons à simplifier la gestion informatique, optimiser les infrastructures réseau et garantir un service de proximité, réactif et tourné vers l\'innovation responsable.'
    },
    {
      icon: <Eye size={24} />,
      title: 'Vision',
      description: 'Être un partenaire technologique de confiance, reconnu pour son expertise, sa capacité d’innovation et son engagement à créer des environnements numériques performants, sécurisés et durables, au service des ambitions de chaque client.'
    },
    {
      icon: <Heart size={24} />,
      title: 'Valeurs',
      description: 'Excellence technique, transparence totale, engagement client et innovation continue guident chacune de nos actions au quotidien.'
    }
  ];

 /* const achievements = [
    'Leader en solutions cloud depuis 2015',
    'Équipe certifiée AWS, Google Cloud & Azure',
    'Méthodologie Agile éprouvée',
    'Support francophone dédié 24/7'
  ]; */

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={TeamImage}
                alt="Notre équipe en action"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-transparent"></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-[var(--primary)] to-[var(--accent-turquoise)] opacity-10 rounded-3xl -z-10 blur-2xl"></div>
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-gradient-to-br from-[var(--accent-gold)] to-[var(--primary)] opacity-10 rounded-3xl -z-10 blur-2xl"></div>

            {/* Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 border border-[var(--gray-100)] max-w-xs">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center">
                  <p className="text-2xl font-bold text-white">NS</p>
                </div>
                <div>
                  <p className="font-bold text-[var(--secondary)]">Au service de votre succès</p>
                  <p className="text-sm text-[var(--gray-500)]"></p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full">
                <span className="text-sm font-semibold text-[var(--primary)]">
                  À Propos de Network Service
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[var(--secondary)]">
                Votre succès digital,
                <span className="block gradient-text mt-2">
                  notre obsession
                </span>
              </h2>
              
              <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                Network Service accompagne les organisations dans leur transformation numérique avec des solutions fiables, sécurisées et durables.
                Notre solution d\'interconnexion de sites est simple, rapide à déployer, sécurisée, et proposée à un coût très concurrentiel.
              </p>

              <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                Nous vous aidons à relier vos bureaux et filiales avec efficacité, tout en restant proches de vos besoins métiers.
              </p>
            </div>

            {/* Mission, Vision, Values */}
            <div className="grid gap-6">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="flex gap-4 p-6 rounded-2xl bg-gradient-to-r from-[var(--gray-50)] to-transparent border border-[var(--gray-200)] hover:border-[var(--primary)] transition-all duration-300 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      {value.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--secondary)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-[var(--gray-600)] leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Achievements */}
          {/*  <div className="pt-6">
              <div className="grid sm:grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="text-[var(--primary)] flex-shrink-0" size={20} />
                    <span className="text-[var(--gray-700)] font-medium text-sm">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* CTA */}
            <div className="pt-4">
              <Button 
                size="lg"
                onClick={() => navigate('/contact')}
                icon={<ArrowRight size={20} />}
              >
                Démarrons votre projet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}