import { createElement } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { AdminLayout } from './components/AdminLayout';
import { Dashboard } from './pages/Dashboard';
import { GaleriesList } from './pages/Galerie/GaleriesList';
import { Login } from './pages/Login';
import { ProjetsList } from './pages/Projets/ProjetsList';
import { Services } from './pages/Services';
import { Temoignages } from './pages/Temoignages';
import { Users } from './pages/Users';

export const adminRouter = createBrowserRouter([
  {
    path: '/admin/login',
    element: createElement(Login),
  },
  {
    path: '/admin',
    element: createElement(AdminLayout),
    children: [
      { index: true, element: createElement(Dashboard) },
      { path: 'galerie', element: createElement(GaleriesList) },
      { path: 'projets', element: createElement(ProjetsList) },
      { path: 'temoignages', element: createElement(Temoignages) },
      { path: 'services', element: createElement(Services) },
      { path: 'users', element: createElement(Users) },
    ],
  },
  {
    path: '/admin/*',
    element: createElement(Navigate, { to: '/admin', replace: true }),
  },
]);
