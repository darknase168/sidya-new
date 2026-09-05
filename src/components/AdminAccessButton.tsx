import React, { useState } from 'react';
import { Shield, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AdminLoginModal from './AdminLoginModal';
import AdminDrawer from './AdminDrawer';

export default function AdminAccessButton() {
  const { isLoggedIn, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminDrawer, setShowAdminDrawer] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      logout();
      setShowAdminDrawer(false);
    }
  };

  // Jika sudah login, tampilkan tombol admin access
  if (isLoggedIn) {
    return (
      <>
        <button
          onClick={() => setShowAdminDrawer(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 z-30 flex items-center justify-center group"
          title="Open Admin Panel (Esc to close)"
        >
          <Shield className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-10 right-0 bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Admin Panel
          </span>
        </button>

        {/* Admin Drawer */}
        <AdminDrawer 
          isOpen={showAdminDrawer}
          onClose={() => setShowAdminDrawer(false)}
        />

        {/* Keyboard shortcut handler */}
        <KeyboardShortcuts 
          onOpen={() => setShowAdminDrawer(true)}
          onLogout={handleLogout}
        />
      </>
    );
  }

  // Jika belum login, tampilkan tombol login kecil
  return (
    <>
      <button
        onClick={() => setShowLoginModal(true)}
        className="fixed bottom-6 right-6 bg-slate-800 hover:bg-slate-900 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-30 flex items-center justify-center group"
        title="Admin Login"
      >
        <LogIn className="w-5 h-5" />
        <span className="absolute -top-10 right-0 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Admin
        </span>
      </button>

      {/* Login Modal */}
      <AdminLoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={() => setShowAdminDrawer(true)}
      />
    </>
  );
}

function KeyboardShortcuts({ onOpen, onLogout }: { onOpen: () => void; onLogout: () => void }) {
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Alt + A untuk membuka admin panel
      if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        onOpen();
      }
      
      // Alt + L untuk logout
      if (e.altKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        onLogout();
      }

      // Esc untuk tutup
      if (e.key === 'Escape') {
        // Tombol admin drawer akan menangani ini
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onOpen, onLogout]);

  return null;
}