import { Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  'Maintenance preventive et curative',
  'Mises a jour, optimisation et securisation',
  'Sauvegardes, restauration et support utilisateurs',
];

const benefits = [
  'Reduction des interruptions de service',
  'Postes et serveurs plus stables au quotidien',
  'Donnees protegees et reprise plus rapide',
];

export default function Maintenance() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-[var(--gray-50)] to-white pt-28 pb-20 dark:from-[var(--gray-900)] dark:via-[var(--gray-900)] dark:to-[var(--gray-800)]">
      <div className="container">
        <nav className="text-sm text-[var(--gray-500)] mb-8 dark:text-slate-300">
          <Link to="/" className="hover:text-[var(--primary)]">Accueil</Link>
          <span className="mx-2">/</span>
          <Link to="/services" className="hover:text-[var(--primary)]">Services</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--gray-700)] dark:text-slate-100">Maintenance informatique</span>
        </nav>

        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-12 items-start">
          <div>
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#0A1B2F] to-[#1E2F47] text-white flex items-center justify-center mb-6 shadow-lg">
              <Wrench size={26} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-5 text-[var(--secondary)] dark:text-slate-100">
              Maintenance informatique
            </h1>
            <p className="text-lg text-[var(--gray-600)] leading-relaxed max-w-3xl dark:text-slate-300">
              Nous assurons la disponibilite, la securite et la performance de votre parc informatique avec une approche claire:
              prevenir les incidents, intervenir vite et documenter chaque action utile.
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition-colors"
            >
              Demander un devis
            </Link>
          </div>

          <div className="grid gap-5">
            <div className="rounded-lg border border-[var(--gray-200)] bg-white p-6 shadow-sm dark:bg-white/[0.05] dark:border-white/10">
              <h2 className="text-xl font-bold mb-4 text-[var(--secondary)] dark:text-slate-100">Nos prestations</h2>
              <ul className="space-y-3 text-[var(--gray-700)] dark:text-slate-300">
                {services.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-[var(--gray-200)] bg-white p-6 shadow-sm dark:bg-white/[0.05] dark:border-white/10">
              <h2 className="text-xl font-bold mb-4 text-[var(--secondary)] dark:text-slate-100">Benefices</h2>
              <ul className="space-y-3 text-[var(--gray-700)] dark:text-slate-300">
                {benefits.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent-turquoise)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
