import React from 'react';

interface IconWrapperProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'gradient' | 'outline';
  className?: string;
}

export function IconWrapper({ 
  children, 
  size = 'md', 
  variant = 'primary',
  className = '' 
}: IconWrapperProps) {
  const sizes = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-16 h-16 text-3xl',
    xl: 'w-20 h-20 text-4xl'
  };
  
  const variants = {
    primary: 'bg-[var(--primary)] text-white',
    secondary: 'bg-[var(--secondary)] text-white',
    gradient: 'bg-gradient-to-br from-[var(--primary)] to-[var(--accent-teal)] text-white',
    outline: 'border-2 border-[var(--primary)] text-[var(--primary)] bg-white'
  };
  
  return (
    <div className={`${sizes[size]} ${variants[variant]} rounded-xl flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}
