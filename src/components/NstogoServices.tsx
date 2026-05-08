import { useEffect, useState } from 'react';
import { Wrench, Network, Cable, ServerCog, ShieldCheck, Link } from 'lucide-react';
import { useNavigate } from 'react-router';

const iconMap: Record<string, React.ReactNode> = {
  Wrench: <Wrench size={28} />,
  Network: <Network size={28} />,
  Cable: <Cable size={28} />,
  ServerCog: <ServerCog size={28} />,
  ShieldCheck: <ShieldCheck size={28} />,
  Link: <Link size={28} />,
};

const API_URL = import.meta.env.VITE_API_URL || '';

interface Service {
  id: number;
  titre: string;
  description: string;
  icon: string;
  couleur: string;
  features: string[];
}

const defaultServices = [
  {
    id: 0,
    titre: 'Maintenance informatique',
    description: 'La maintenance informatique assure le bon fonctionnement des systèmes.',
    icon: 'Wrench',
    couleur: 'from-[#0A1B2F] to-[#1E2F47]',
    features: ['Préventive & curative', 'Mises à jour & optimisation', 'Sécurité & sauvegardes']
  },
  {
    id: 1,
    titre: 'Déploiement des réseaux',
    description: 'Le déploiement de réseaux connecte efficacement les utilisateurs.',
    icon: 'Network',
    couleur: 'from-[#0055FF] to-[#3377FF]',
    features: ['Architecture LAN/WAN/Wi-Fi', 'Sécurité & VLAN', 'Supervision']
  },
];

export function NstogoServices() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/services?actif=true`)
      .then(res => res.json())
      .then(data => {
        setServices(data.services || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching services:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-white dark:bg-[var(--bg)]">
        <div className="container">
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  const serviceList = services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="section-padding bg-white relative overflow-hidden dark:bg-[var(--bg)]">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--gray-50)] to-transparent pointer-events-none dark:from-white/[0.06] dark:to-transparent"></div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full mb-6 dark:bg-[var(--primary)]/20 dark:border-[var(--primary)]/30">
            <span className="text-sm font-semibold text-[var(--primary)]">Nos Expertises</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[var(--secondary)] dark:text-slate-100">
            Des solutions intelligentes<span className="block gradient-text mt-2">pour chaque besoin</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--gray-600)] leading-relaxed dark:text-slate-300">
            Afin d'apporter un service fiable, conforme aux standards et adapté à la demande, Network Service est à l'écoute de vos besoins.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {serviceList.map((service, index) => (
            <div
              key={service.id || index}
              className="group relative bg-white rounded-2xl p-8 border-2 border-[var(--gray-200)] hover:border-[var(--primary)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-white/[0.05] dark:border-white/10 dark:hover:border-white/20"
            >
              <div className="mb-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.couleur || 'from-[#0055FF] to-[#3377FF]'} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                  {iconMap[service.icon] || <Wrench size={28} />}
                </div>
              </div>

              <h3 className="text-xl font-bold text-[var(--secondary)] mb-3 group-hover:text-[var(--primary)] transition-colors dark:text-slate-100">
                {service.titre}
              </h3>
              <p className="text-[var(--gray-600)] leading-relaxed mb-4 text-sm dark:text-slate-300">
                {service.description}
              </p>

              <div className="space-y-2">
                {(service.features || []).map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></div>
                    <span className="text-xs text-[var(--gray-500)] font-medium dark:text-slate-300/80">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-[var(--gray-50)] text-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 border border-[var(--gray-200)] hover:border-transparent dark:bg-white/[0.06] dark:text-slate-100 dark:border-white/10 dark:hover:bg-[var(--primary)] dark:hover:text-white"
              >
                Voir plus<span className="text-xs">→</span>
              </button>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-turquoise)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl dark:from-[var(--primary)] dark:to-[var(--accent-turquoise)]"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}