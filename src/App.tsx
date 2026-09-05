import React, { useState } from 'react';
import { CmsProvider } from './context/CmsContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminBar from './components/AdminBar';
import AdminAccessButton from './components/AdminAccessButton';
import { WordPressAdminBar } from './components/cms/WordPressAdminBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AppsShowcase } from './components/AppsShowcase';
import { CatalogSection } from './components/CatalogSection';
import { CompanyProfileSection } from './components/CompanyProfileSection';
import { BoardOfDirectorsSection } from './components/BoardOfDirectorsSection';
import { PartnerSolutionsSection } from './components/PartnerSolutionsSection';
import { Footer } from './components/Footer';
import { EditPengurusModal } from './components/cms/EditPengurusModal';
import { ArticleEditor } from './components/cms/ArticleEditor';
import { CmsModal } from './components/cms/CmsModal';

function AppContent() {
  const { isLoggedIn } = useAuth();
  const [adminActiveMenu, setAdminActiveMenu] = useState<'artikel' | 'pengurus' | 'banner' | 'popup' | 'pengaturan'>('artikel');

  return (
    <div className="min-h-screen flex flex-col text-slate-800 font-sans selection:bg-emerald-700 selection:text-white relative" style={{
      backgroundColor: '#faf9f7',
      backgroundImage: `
        /* Organic noise/texture effect */
        url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" result="noise"/></filter><rect width="100" height="100" fill="rgba(16,185,129,0.015)" filter="url(%23noise)"/></svg>'),
        
        /* Subtle color wash - bottom left */
        radial-gradient(ellipse 800px 600px at 10% 70%, rgba(16, 185, 129, 0.06) 0%, transparent 60%),
        
        /* Subtle color wash - top right */
        radial-gradient(ellipse 600px 500px at 90% 20%, rgba(217, 119, 6, 0.04) 0%, transparent 50%),
        
        /* Soft diagonal sweep */
        linear-gradient(135deg, rgba(245, 243, 240, 0) 0%, rgba(16, 185, 129, 0.02) 50%, rgba(245, 243, 240, 0) 100%),
        
        /* Base watercolor-like gradient */
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

      {/* WordPress-style Sticky Admin Bar for easy editing */}
      <WordPressAdminBar />

      {/* Primary Enterprise Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with Dual Audience Interactive Toggle */}
        <HeroSection />

        {/* Ekosistem Aplikasi: Sidya Mobile (Jamaah) & Sidya Desktop (KBIH/Seller) */}
        <AppsShowcase />

        {/* Katalog Perlengkapan Haji & Umroh */}
        <CatalogSection />

        {/* Profil Perusahaan PT Sidya Sadaya Sejahtera */}
        <CompanyProfileSection />

        {/* Jajaran Pengurus & Dewan Direksi (Editable Foto & Jabatan) */}
        <BoardOfDirectorsSection />

        {/* Solusi Khusus KBIH, Agen Umroh, & Seller dengan Kalkulator Kuota */}
        <PartnerSolutionsSection />
      </main>

      {/* Corporate Footer */}
      <Footer />

      {/* Modals for WordPress-like Instant Editing */}
      <ArticleEditor />
      <EditPengurusModal />
      <CmsModal />

      {/* Admin Access Button - Floating Button */}
      <AdminAccessButton />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CmsProvider>
        <AppContent />
      </CmsProvider>
    </AuthProvider>
  );
}
