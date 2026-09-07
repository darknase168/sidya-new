import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import HomePage from './pages/HomePage';
import ProfilPerusahaanPage from './pages/ProfilPerusahaanPage';
import KatalogPage from './pages/KatalogPage';
import PengurusPage from './pages/PengurusPage';
import AplikasiPage from './pages/AplikasiPage';
import MitraPage from './pages/MitraPage';
import KontakPage from './pages/KontakPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'profil',
        element: <ProfilPerusahaanPage />,
      },
      {
        path: 'katalog',
        element: <KatalogPage />,
      },
      {
        path: 'pengurus',
        element: <PengurusPage />,
      },
      {
        path: 'jajaran-pengurus',
        element: <PengurusPage />,
      },
      {
        path: 'aplikasi',
        element: <AplikasiPage />,
      },
      {
        path: 'mitra',
        element: <MitraPage />,
      },
      {
        path: 'kontak',
        element: <KontakPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
