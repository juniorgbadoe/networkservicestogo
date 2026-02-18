import { Outlet } from 'react-router';
import { NstogoHeader } from './components/NstogoHeader';
import { NstogoFooter } from './components/NstogoFooter';

export function Layout() {
  return (
    <div className="min-h-screen bg-[var(--background)] transition-colors duration-300">
      <NstogoHeader />
      <main>
        <Outlet />
      </main>
      <NstogoFooter />
    </div>
  );
}
