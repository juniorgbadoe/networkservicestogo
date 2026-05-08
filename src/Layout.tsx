import { Outlet } from 'react-router';
import { NstogoHeader } from './components/NstogoHeader';
import { NstogoFooter } from './components/NstogoFooter';
import ScrollToTop from './components/ScrollToTop';

export function Layout() {
  return (
    <div className="min-h-screen bg-[var(--background)] transition-colors duration-300">
      <NstogoHeader />
      <main>
        <ScrollToTop />
        <Outlet />
      </main>
      <NstogoFooter />
    </div>
  );
}
