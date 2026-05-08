import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--gray-100)] dark:bg-[var(--gray-700)] hover:bg-[var(--gray-200)] dark:hover:bg-[var(--gray-600)] transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-[var(--accent-gold)] transition-transform duration-300 rotate-0" />
      ) : (
        <Moon size={20} className="text-[var(--primary)] transition-transform duration-300 rotate-0" />
      )}
    </button>
  );
}
