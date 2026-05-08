import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialCard } from './Card';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "DigitalPro a transformé notre présence en ligne. Leur expertise technique et leur approche centrée sur l'utilisateur ont dépassé toutes nos attentes. Un vrai partenaire de confiance !",
      author: "Marie Dubois",
      role: "CEO, TechStart",
      avatar: "MD"
    },
    {
      quote: "L'équipe est incroyablement professionnelle et réactive. Ils ont livré notre application mobile en avance et le résultat est au-delà de nos espérances. Je recommande vivement !",
      author: "Thomas Laurent",
      role: "Directeur Digital, InnovateCorp",
      avatar: "TL"
    },
    {
      quote: "Un accompagnement exceptionnel du début à la fin. DigitalPro a su comprendre nos besoins et proposer des solutions innovantes qui ont boosté notre croissance de 300%.",
      author: "Sophie Martin",
      role: "Fondatrice, GrowthLab",
      avatar: "SM"
    },
    {
      quote: "La qualité du travail et l'attention aux détails sont remarquables. Notre nouveau site e-commerce a doublé nos conversions en seulement 3 mois. Merci pour votre expertise !",
      author: "Alexandre Chen",
      role: "Directeur E-commerce, ShopPlus",
      avatar: "AC"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Get visible testimonials based on screen size
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-semibold mb-4">
            Témoignages Clients
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ce que nos clients
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent-teal)]">
              disent de nous
            </span>
          </h2>
          <p className="text-lg text-[var(--gray-600)] leading-relaxed">
            La satisfaction de nos clients est notre plus grande fierté. Découvrez leurs expériences.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {getVisibleTestimonials().map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              avatar={testimonial.avatar}
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <TestimonialCard
            quote={testimonials[currentIndex].quote}
            author={testimonials[currentIndex].author}
            role={testimonials[currentIndex].role}
            avatar={testimonials[currentIndex].avatar}
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 flex items-center justify-center"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-[var(--primary)]' 
                    : 'w-2 bg-[var(--gray-300)]'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 flex items-center justify-center"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
