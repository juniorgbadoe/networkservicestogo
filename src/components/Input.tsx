import React from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  name?: string;
}

export function Input({ 
  type = 'text', 
  placeholder, 
  label, 
  value, 
  onChange, 
  required,
  className = '',
  name
}: InputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-[var(--secondary)]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 bg-[var(--gray-50)] border-2 border-transparent rounded-lg text-[var(--secondary)] placeholder:text-[var(--gray-400)] focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-all duration-300"
      />
    </div>
  );
}

interface TextareaProps {
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  className?: string;
  name?: string;
}

export function Textarea({ 
  placeholder, 
  label, 
  value, 
  onChange, 
  required,
  rows = 5,
  className = '',
  name
}: TextareaProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-[var(--secondary)]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className="w-full px-4 py-3 bg-[var(--gray-50)] border-2 border-transparent rounded-lg text-[var(--secondary)] placeholder:text-[var(--gray-400)] focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-all duration-300 resize-vertical"
      />
    </div>
  );
}
