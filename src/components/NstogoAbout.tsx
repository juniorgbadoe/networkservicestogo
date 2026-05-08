import { Target, Eye, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import TeamImage from '../assets/photo18.png';
import { useSiteContent } from '../hooks/useSiteContent';

export function NstogoAbout() {
  const navigate = useNavigate();
  const { content: pageContent } = useSiteContent('about');

  const aboutContent = pageContent?.about || {};
  const title = aboutContent.title || 'Vos solutions, Notre mission';
  const subtitle = aboutContent.subtitle || "Network Service accompagne les organisations dans leur transformation numérique avec des solutions fiables, sécurisées et durables.";

  const values = [
    {
      icon: <Target size={24} />,
      title: 'Mission',
      description:
        "Offrir des solutions technologiques fiables, personnalisées et durables qui accompagnent la croissance de nos clients. Nous nous engageons à simplifier la gestion informatique, optimiser les infrastructures réseau et garantir un service de proximité, réactif et tourné vers l'innovation responsable."
    },
    {
      icon: <Eye size={24} />,
      title: 'Vision',
      description:
        "Être un partenaire technologique de confiance, reconnu pour son expertise, sa capacité d’innovation et son engagement à créer des environnements numériques performants, sécurisés et durables, au service des ambitions de chaque client."
    },
    {
      icon: <Heart size={24} />,
      title: 'Valeurs',
      description:
        "Excellence technique, transparence totale, engagement client et innovation continue guident chacune de nos actions au quotidien."
    }
  ];

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden
      dark:bg-[var(--bg)]">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_70%,transparent_100%)]
        dark:hidden"
        /* 👆 Le quadrillage est visible en mode clair, caché en mode sombre */
      ></div>

      <div className="container relative z-10">

        {/* GRID TEXTE GAUCHE / IMAGE DROITE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — CONTENT */}
          <div className="space-y-8 order-2 lg:order-1">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full
              dark:bg-[var(--primary)]/20 dark:border-[var(--primary)]/30">
              <span className="text-sm font-semibold text-[var(--primary)]">À Propos de Network Service</span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[var(--secondary)]
              dark:text-slate-100">
              {title.split(',')[0]},
              <span className="block gradient-text mt-2">{title.split(',')[1]?.trim() || title.split(' ').slice(2).join(' ')}</span>
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4">
              <p className="text-lg text-[var(--gray-600)] leading-relaxed
                dark:text-slate-300">
                {subtitle}
              </p>

              <p className="text-lg text-[var(--gray-600)] leading-relaxed
                dark:text-slate-300">
                Nous vous aidons à relier vos bureaux et filiales avec efficacité, tout en restant proches de vos besoins métiers.
              </p>
            </div>

            {/* VALUES */}
            <div className="grid gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 rounded-2xl bg-gradient-to-r from-[var(--gray-50)] to-transparent border border-[var(--gray-200)] hover:border-[var(--primary)] transition-all duration-300 group
                    dark:from-white/[0.05] dark:to-transparent dark:border-white/10 dark:hover:border-white/20"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      {value.icon}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[var(--secondary)] mb-2 group-hover:text-[var(--primary)] transition-colors
                      dark:text-slate-100">
                      {value.title}
                    </h3>
                    <p className="text-[var(--gray-600)] leading-relaxed
                      dark:text-slate-300">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button
                size="lg"
                onClick={() => navigate('/contact')}
                icon={<ArrowRight size={20} />}
                className="dark:[box-shadow:0_0_0_1px_rgba(255,255,255,0.06)_inset]"
              >
                Démarrons votre projet
              </Button>
            </div>

          </div>

          {/* RIGHT — IMAGE */}
          <div className="relative order-1 lg:order-2">
            <div
              className="
                relative rounded-3xl overflow-hidden shadow-2xl
                h-64 sm:h-72 md:h-80 lg:h-[430px]
              "
            >
              <img
                src={TeamImage}
                alt="Notre équipe en action"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-transparent"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-[var(--primary)] to-[var(--accent-turquoise)] opacity-10 rounded-3xl -z-10 blur-2xl
              dark:opacity-10"></div>
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-gradient-to-br from-[var(--accent-gold)] to-[var(--primary)] opacity-10 rounded-3xl -z-10 blur-2xl
              dark:opacity-10"></div>

            {/* Stats Card — conservé */}
            {/* <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 border border-[var(--gray-100)] max-w-xs">...</div> */}
          </div>

        </div>
      </div>
    </section>
  );
}
