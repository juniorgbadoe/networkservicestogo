import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'hover' | 'bordered';
  className?: string;
  onClick?: () => void;
}

export function Card({ children, variant = 'default', className = '', onClick }: CardProps) {
  const baseStyles = 'bg-white rounded-xl transition-all duration-300';
  
  const variants = {
    default: 'p-8 shadow-md',
    hover: 'p-8 shadow-md hover:shadow-xl hover:-translate-y-1 cursor-pointer',
    bordered: 'p-8 border-2 border-[var(--gray-200)] hover:border-[var(--primary)]'
  };
  
  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <Card variant="hover">
      <div className="flex flex-col items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center text-white">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-[var(--secondary)]">{title}</h3>
        <p className="text-[var(--gray-600)] leading-relaxed">{description}</p>
      </div>
    </Card>
  );
}

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  category: string;
}

export function ProjectCard({ image, title, description, category }: ProjectCardProps) {
  return (
    <Card variant="hover" className="overflow-hidden p-0">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-[var(--primary)] text-white px-4 py-1 rounded-full text-sm font-medium">
          {category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-[var(--secondary)] mb-2">{title}</h3>
        <p className="text-[var(--gray-600)]">{description}</p>
      </div>
    </Card>
  );
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export function TestimonialCard({ quote, author, role, avatar }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <div className="flex flex-col gap-6">
        <div className="text-4xl text-[var(--primary)] leading-none">"</div>
        <p className="text-[var(--gray-700)] italic leading-relaxed flex-grow">{quote}</p>
        <div className="flex items-center gap-4 mt-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent-teal)] flex items-center justify-center text-white font-bold text-lg">
            {avatar}
          </div>
          <div>
            <p className="font-semibold text-[var(--secondary)]">{author}</p>
            <p className="text-sm text-[var(--gray-500)]">{role}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
