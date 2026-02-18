import React from 'react';
import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-[64px] font-bold text-[var(--primary)] mb-4">404</h1>
        <h2 className="text-[32px] font-semibold text-[var(--foreground)] mb-4">
          Page non trouvée
        </h2>
        <p className="text-[18px] text-[var(--muted-foreground)] mb-8 max-w-md mx-auto">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link 
          to="/" 
          className="inline-block px-8 py-4 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
