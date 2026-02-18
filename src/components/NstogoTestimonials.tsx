import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useNavigate } from 'react-router';
import afp from '../assets/AFP.png';
import cls from '../assets/CAISSE LE SALUT.png';
import cf from '../assets/CAPITAL FINANCE.png';
import ilema from '../assets/ILEMAlogo.png';
import MECREF from '../assets/MECREF-LOGO.png';
import MF from '../assets/MUTUAL FINANCE.png';

export function NstogoTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  const testimonials = [
    {
      quote: "Network Service a complètement transformé notre infrastructure cloud. Leur expertise technique et leur réactivité sont impressionnantes. Le passage à une architecture serverless a réduit nos coûts de 60% tout en améliorant nos performances.",
      author: "AFP",
      role: "AFP",
      image: afp,
      avatar: "AFP",
      color: "from-[var(--primary)] to-[var(--primary-light)]",
      rating: 5
    },
    {
      quote: "L'équipe Network Service a développé notre plateforme e-commerce de A à Z en respectant parfaitement nos délais. Leur approche agile et leur transparence nous ont permis de lancer notre MVP en seulement 8 semaines. Un vrai partenaire de confiance !",
      author: "CAISSE LE SALUT",
      role: "CAISSE LE SALUT",
      image: cls,
      avatar: "CLS",
      color: "from-[var(--accent-turquoise)] to-[#00A0A0]",
      rating: 5
    },
    {
      quote: "Excellente collaboration avec Network Service sur notre refonte digitale complète. Leur expertise UX/UI combinée à leur maîtrise technique a donné un résultat au-delà de nos attentes. Nos conversions ont augmenté de 180% en 3 mois.",
      author: "CAPITAL FINANCE",
      role: "CAPITAL FINANCE",
      image: cf,
      avatar: "CF",
      color: "from-[var(--accent-gold)] to-[#FF8C00]",
      rating: 5
    },
    {
      quote: "Support technique exceptionnel disponible 24/7. Network Service gère notre hébergement cloud depuis 2 ans avec un uptime de 99.98%. Leur monitoring proactif nous évite les mauvaises surprises. Je recommande sans hésitation.",
      author: "ILEMA",
      role: "ILEMA",
      image: ilema,
      avatar: "ILEMA",
      color: "from-[#10B981] to-[#059669]",
      rating: 5
    },
    {
      quote: "Network Service nous a accompagnés de l'idée initiale jusqu'au lancement de notre application mobile. Leur méthodologie structurée et leurs conseils stratégiques ont été déterminants pour notre succès. Une équipe vraiment à l'écoute.",
      author: "MECREF",
      role: "MECREF",
      image: MECREF,
      avatar: "MF",
      color: "from-[#8B5CF6] to-[#6366F1]",
      rating: 5
    },
    {
      quote: "Network Service nous a accompagnés de l'idée initiale jusqu'au lancement de notre application mobile. Leur méthodologie structurée et leurs conseils stratégiques ont été déterminants pour notre succès. Une équipe vraiment à l'écoute.",
      author: "MUTUAL FINANCE",
      role: "MUTUAL FINANCE",
      image: MF,
      avatar: "MF",
      color: "from-[#8B5CF6] to-[#6366F1]",
      rating: 5
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  /*const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i<3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], index });
    }
    return visible;
  };*/

  return (
    <section id="testimonials" className="section-padding bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--primary)] opacity-5 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[var(--accent-turquoise)] opacity-5 rounded-full blur-3xl -translate-y-1/2"></div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full mb-6">
            <span className="text-sm font-semibold text-[var(--primary)]">
              Témoignages Clients
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[var(--secondary)]">
            Ils nous font
            <span className="block gradient-text mt-2">
              confiance
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--gray-600)] leading-relaxed">
            La satisfaction de nos clients est notre meilleure récompense. Découvrez leurs retours d'expérience.
          </p>
        </div>

        {/* Desktop Carousel */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          <div
            className="flex gap-8 transition-transform duration-700"
            style={{
              transform: `translateX(-${currentIndex * 350}px)`
            }}
          >
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="min-w-[310px] bg-gradient-to-br from-[var(--gray-50)] to-white rounded-3xl p-8 shadow-lg border border-[var(--gray-200)] hover:shadow-2xl hover:-translate-y-1 transition-all"
              >

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center mb-4`}>
                <Quote className="text-white" size={24} />
              </div>

              {/*<div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-[var(--accent-gold)] fill-[var(--accent-gold)]" size={18} />
                ))}
              </div>*/}

              {/*<p className="text-[var(--gray-700)] leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>*/}

              {/* Image */}
              <div className="flex justify-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-40 h-40 rounded-2xl object-contain shadow-xl border border-[var(--gray-200)] bg-white p-3"
                />
              </div>


              <div className="flex items-center gap-4 pt-6 border-t border-[var(--gray-200)]">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
                </div>
                <div>
                  <p className="font-bold text-[var(--secondary)]">{testimonial.author}</p>
                  <p className="text-sm text-[var(--gray-500)]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden mb-12">
          <div className="bg-gradient-to-br from-[var(--gray-50)] to-white rounded-3xl p-8 shadow-xl border border-[var(--gray-200)]">
            {/* Quote Icon */}
            {/*<div className="mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonials[currentIndex].color} flex items-center justify-center`}>
                <Quote className="text-white" size={24} />
              </div>
            </div>*/}


            <div className="flex justify-center mb-6">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].author}
                className="w-40 h-40 rounded-2xl object-contain bg-white p-3 shadow-xl border border-[var(--gray-200)]"
              />
            </div>


            {/* Rating */}
            {/*<div className="flex gap-1 mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="text-[var(--accent-gold)] fill-[var(--accent-gold)]" size={18} />
              ))}
            </div>*/}

            {/* Quote */}
            {/*<p className="text-[var(--gray-700)] leading-relaxed mb-6 italic">
              "{testimonials[currentIndex].quote}"
            </p>*/}

            {/* Author */}
            <div className="flex items-center gap-4 pt-6 border-t border-[var(--gray-200)]">
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonials[currentIndex].color} flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-bold text-lg">{testimonials[currentIndex].avatar}</span>
              </div>
              <div>
                <p className="font-bold text-[var(--secondary)]">{testimonials[currentIndex].author}</p>
                <p className="text-sm text-[var(--gray-500)]">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prevSlide}
            className="w-14 h-14 rounded-full bg-white border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-xl"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'w-10 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]'
                    : 'w-2.5 bg-[var(--gray-300)] hover:bg-[var(--gray-400)]'
                  }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-14 h-14 rounded-full bg-white border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-xl"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Trust Banner */}
        <div className="mt-20 bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-light)] rounded-3xl p-10 lg:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Rejoignez nos clients satisfaits</h3>
          <p className="text-lg text-white/80 mb-6">
            Et bénéficiez de notre expertise pour propulser votre business
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-white text-[var(--secondary)] px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            Démarrer mon projet
          </button>
        </div>
      </div>
    </section>
  );
}