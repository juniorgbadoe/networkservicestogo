import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '',
  type = 'button',
  icon,
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] focus:ring-[var(--primary)] shadow-md hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'bg-[var(--secondary)] text-white hover:bg-[var(--secondary-light)] focus:ring-[var(--secondary)] shadow-md hover:shadow-xl hover:-translate-y-0.5',
    ghost: 'bg-transparent text-[var(--primary)] hover:bg-[var(--gray-100)] focus:ring-[var(--primary)]',
    outline: 'border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white focus:ring-[var(--primary)]',
    gold: 'bg-gradient-to-r from-[var(--accent-gold)] to-[#FFCC33] text-[var(--secondary)] hover:shadow-xl hover:-translate-y-0.5 focus:ring-[var(--accent-gold)] shadow-md font-bold'
  };
  
  const sizes = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-6 py-3.5 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
