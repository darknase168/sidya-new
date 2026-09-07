import React from 'react';
import { Outlet } from 'react-router-dom';
import PremiumNavbar from '../components/layout/PremiumNavbar';
import PremiumFooter from '../components/layout/PremiumFooter';
import AdminAccessButton from '../components/AdminAccessButton';
import AdminBar from '../components/AdminBar';
import { WordPressAdminBar } from '../components/cms/WordPressAdminBar';
import { EditPengurusModal } from '../components/cms/EditPengurusModal';
import { ArticleEditor } from '../components/cms/ArticleEditor';
import { CmsModal } from '../components/cms/CmsModal';
import { LiveChat } from '../components/LiveChat';
import { AuthProvider } from '../context/AuthContext';
import { CmsProvider } from '../context/CmsContext';
import { useAuth } from '../context/AuthContext';

const RootLayoutContent: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [adminActiveMenu, setAdminActiveMenu] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col text-slate-800 font-sans selection:bg-emerald-700 selection:text-white relative" style={{
      backgroundColor: '#faf9f7',
      backgroundImage: `
        url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" result="noise"/></filter><rect width="100" height="100" fill="rgba(16,185,129,0.015)" filter="url(%23noise)"/></svg>'),
        radial-gradient(ellipse 800px 600px at 10% 70%, rgba(16, 185, 129, 0.06) 0%, transparent 60%),
        radial-gradient(ellipse 600px 500px at 90% 20%, rgba(217, 119, 6, 0.04) 0%, transparent 50%),
        linear-gradient(135deg, rgba(245, 243, 240, 0) 0%, rgba(16, 185, 129, 0.02) 50%, rgba(245, 243, 240, 0) 100%),
        linear-gradient(to bottom right, #faf9f7 0%, #f5f3f0 35%, #f0fdf4 65%, #faf9f7 100%)
      `,
      backgroundAttachment: 'fixed',
      backgroundSize: '200% 200%, 100% 100%, 100% 100%, 100% 100%, 100% 100%',
      backgroundPosition: '0 0, 0 0, 0 0, 0 0, 0 0'
    }}>
      {/* Soft light accent - top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent opacity-40"></div>

      {/* Admin Bar - Hanya tampil saat login */}
      {isLoggedIn && <AdminBar onMenuClick={setAdminActiveMenu} />}

      {/* Premium Navbar */}
      <PremiumNavbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Premium Footer */}
      <PremiumFooter />

      {/* Admin Button - Floating */}
      <AdminAccessButton />

      {/* Live Chat Widget */}
      <LiveChat />

      {/* Admin Modals */}
      {isLoggedIn && (
        <>
          <WordPressAdminBar />
          <ArticleEditor />
          <EditPengurusModal />
          <CmsModal />
        </>
      )}
    </div>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <CmsProvider>
        <RootLayoutContent />
      </CmsProvider>
    </AuthProvider>
  );
}
