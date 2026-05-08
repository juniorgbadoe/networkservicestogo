import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useNavigate } from 'react-router';
import afp from '../assets/AFP.png';
import cls from '../assets/CAISSE LE SALUT.png';
import cf from '../assets/CAPITAL FINANCE.png';
import ilema from '../assets/ILEMAlogo.png';
import MF from '../assets/MUTUAL FINANCE.png';

const API_URL = import.meta.env.VITE_API_URL || '';

type TestimonialCard = {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  image: string | null;
  color: string;
};

type ApiTemoignage = {
  client: string;
  pays?: string;
  quote: string;
  logo?: string | null;
};

const imageMap: Record<string, string> = {
  'AFP': afp,
  'CAISSE LE SALUT': cls,
  'CAPITAL FINANCE': cf,
  'ILEMA': ilema,
  'MUTUAL FINANCE': MF,
};

const defaultTestimonials: TestimonialCard[] = [
  {
    quote: "Network Service a complètement transformé notre infrastructure cloud. Leur expertise technique et leur réactivité sont impressionnantes.",
    author: "AFP",
    role: "TOGO",
    avatar: "AFP",
    image: afp,
    color: "from-[var(--primary)] to-[var(--primary-light)]",
  },
  {
    quote: "L'équipe Network Service a développé notre plateforme e-commerce de A à Z en respectant parfaitement nos délais.",
    author: "CAISSE LE SALUT",
    role: "TOGO",
    avatar: "CLS",
    image: cls,
    color: "from-[var(--accent-turquoise)] to-[#00A0A0]",
  },
  {
    quote: "Excellente collaboration avec Network Service sur notre refonte digitale complète.",
    author: "CAPITAL FINANCE",
    role: "NIGER",
    avatar: "CF",
    image: cf,
    color: "from-[var(--accent-gold)] to-[#FF8C00]",
  },
  {
    quote: "Support technique exceptionnel disponible 24/7. Leur monitoring proactif nous évite les mauvaises surprises.",
    author: "ILEMA",
    role: "TOGO",
    avatar: "ILEMA",
    image: ilema,
    color: "from-[#10B981] to-[#059669]",
  },
  {
    quote: "Network Service nous a accompagnés de l'idée initiale jusqu'au lancement de notre application mobile.",
    author: "MUTUAL FINANCE",
    role: "TOGO",
    avatar: "MF",
    image: MF,
    color: "from-[#8B5CF6] to-[#6366F1]",
  },
];

export function NstogoTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<TestimonialCard[]>(defaultTestimonials);

  const mapTestimonial = (t: ApiTemoignage): TestimonialCard => {
    const clientName = t.client?.toUpperCase() || '';
    let matchedImage: string | null = null;

    if (t.logo) {
      matchedImage = `${API_URL}/uploads/${t.logo}`;
    } else {
      for (const [key, img] of Object.entries(imageMap)) {
        if (clientName.includes(key.toUpperCase())) {
          matchedImage = img;
          break;
        }
      }
    }

    return {
      quote: t.quote,
      author: t.client,
      role: t.pays || 'Client',
      avatar: t.client?.substring(0, 2).toUpperCase() || 'NS',
      image: matchedImage,
      color: 'from-[var(--primary)] to-[var(--primary-light)]',
    };
  };

  useEffect(() => {
    fetch(`${API_URL}/api/temoignages?actif=true`)
      .then(res => res.json())
      .then(data => {
        if (data.temoignages && data.temoignages.length > 0) {
          setTestimonials(data.temoignages.map((t: ApiTemoignage) => mapTestimonial(t)));
        } else {
          setTestimonials(defaultTestimonials);
        }
      })
      .catch(err => {
        console.error('Error fetching testimonials:', err);
        setTestimonials(defaultTestimonials);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      className="
        section-padding bg-gradient-to-br from-[var(--gray-50)] via-white to-[var(--gray-50)] relative
        dark:bg-gradient-to-br dark:from-[var(--nav-dark-from)] dark:via-[var(--nav-dark-via)] dark:to-[var(--nav-dark-to)]
      "
    >
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full mb-6
            dark:bg-[var(--primary)]/20 dark:border-[var(--primary)]/30">
            <span className="text-sm font-semibold text-[var(--primary)]">
              Témoignages Clients
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[var(--secondary)] dark:text-slate-100">
            Ils nous font
            <span className="block gradient-text mt-2">
              confiance
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[var(--gray-600)] leading-relaxed dark:text-slate-300">
            La satisfaction de nos clients est notre meilleure récompense.
          </p>
        </div>

        {/* Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          <div
            className="flex gap-8 transition-transform duration-700"
            style={{ transform: `translateX(-${currentIndex * 350}px)` }}
          >
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="
                  min-w-[310px] rounded-3xl p-8 shadow-lg transition-all
                  bg-white border border-[var(--gray-200)]
                  hover:shadow-2xl hover:-translate-y-1
                  dark:bg-white/[0.05] dark:border-white/10
                "
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center mb-4`}>
                  <Quote className="text-white" size={24} />
                </div>

                {/* Image */}
                <div className="flex justify-center mb-6">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-40 h-40 rounded-2xl object-contain shadow-xl border border-[var(--gray-200)] bg-white p-3
                        dark:bg-white/5 dark:border-white/10"
                    />
                  ) : (
                    <div className={`w-40 h-40 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white text-4xl font-bold shadow-xl`}>
                      {testimonial.avatar}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <p className="text-[var(--gray-600)] dark:text-slate-300 leading-relaxed mb-6 min-h-[96px]">
                  “{testimonial.quote}”
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-[var(--gray-200)] dark:border-white/10">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">
                      {testimonial.avatar}
                    </span>
                  </div>

                  <div>
                    <p className="font-bold text-[var(--secondary)] dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-[var(--gray-500)] dark:text-slate-300">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prevSlide}
            className="w-14 h-14 rounded-full bg-white border-2 border-[var(--primary)] text-[var(--primary)]
              hover:bg-[var(--primary)] hover:text-white transition-all flex items-center justify-center
              dark:bg-white/10 dark:border-white/20 dark:text-slate-100"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="w-14 h-14 rounded-full bg-white border-2 border-[var(--primary)] text-[var(--primary)]
              hover:bg-[var(--primary)] hover:text-white transition-all flex items-center justify-center
              dark:bg-white/10 dark:border-white/20 dark:text-slate-100"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-light)] rounded-3xl p-10 lg:p-12 text-white text-center
          dark:from-white/10 dark:to-white/[0.08] dark:text-slate-100">
          <h3 className="text-3xl font-bold mb-4 text-white">
            Rejoignez nos clients satisfaits
          </h3>
          <p className="text-lg text-white/80 mb-6">
            Et bénéficiez de notre expertise pour propulser votre business
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-white text-[var(--secondary)] px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all
              dark:bg-[var(--primary)] dark:text-white"
          >
            Démarrer mon projet
          </button>
        </div>
      </div>
    </section>
  );
}
