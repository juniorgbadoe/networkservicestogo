import { createBrowserRouter, Navigate } from 'react-router';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Testimonials } from './pages/Testimonials';
import { Contact } from './pages/Contact';
import { Mediatheque } from './pages/Mediatheque';
import Maintenance from './pages/Maintenance';
import Cablage from './pages/Cablage';
import Deploiement from './pages/Deploiement';
import Infrastructure from './pages/Infrastructure';
import { NotFound } from './pages/NotFound';
import { Login } from './admin/pages/Login';
import { AdminLayout } from './admin/components/AdminLayout';
import { Dashboard } from './admin/pages/Dashboard';
import { GaleriesList } from './admin/pages/Galerie/GaleriesList';
import { ProjetsList } from './admin/pages/Projets/ProjetsList';
import { Temoignages } from './admin/pages/Temoignages';
import { Services as AdminServices } from './admin/pages/Services';
import { Users } from './admin/pages/Users';
import { Settings } from './admin/pages/Settings';
import { Pages } from './admin/pages/Pages';
import { Navigation } from './admin/pages/Navigation';

export const router = createBrowserRouter([
  {
    path: '/admin/login',
    element: <Login />
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'galerie', element: <GaleriesList /> },
      { path: 'projets', element: <ProjetsList /> },
      { path: 'temoignages', element: <Temoignages /> },
      { path: 'services', element: <AdminServices /> },
      { path: 'pages', element: <Pages /> },
      { path: 'navigation', element: <Navigation /> },
      { path: 'settings', element: <Settings /> },
      { path: 'users', element: <Users /> },
    ]
  },
  {
    path: '/admin/*',
    element: <Navigate to="/admin" replace />
  },
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'services', Component: Services },
      { path: 'maintenance', Component: Maintenance },
      { path: 'cablage', Component: Cablage },
      { path: 'deploiement', Component: Deploiement },
      { path: 'infrastructure', Component: Infrastructure },
      { path: 'about', Component: About },
      { path: 'projects', Component: Projects },
      { path: 'testimonials', Component: Testimonials },
      { path: 'mediatheque', Component: Mediatheque },
      { path: 'contact', Component: Contact },
      { path: '*', Component: NotFound },
    ],
  },
]);
