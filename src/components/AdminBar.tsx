import React, { useState } from 'react';
import { LogOut, Menu, X, FileText, Users, Image, Bell, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminBarProps {
  onMenuClick: (menu: 'artikel' | 'pengurus' | 'banner' | 'popup' | 'pengaturan') => void;
}

export default function AdminBar({ onMenuClick }: AdminBarProps) {
  const { isLoggedIn, adminName, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isLoggedIn) {
    return null;
  }

  const menuItems = [
    { id: 'artikel', icon: FileText, label: 'Artikel', shortcut: 'A' },
    { id: 'pengurus', icon: Users, label: 'Pengurus', shortcut: 'P' },
    { id: 'banner', icon: Image, label: 'Banner', shortcut: 'B' },
    { id: 'popup', icon: Bell, label: 'Popup', shortcut: 'O' },
    { id: 'pengaturan', icon: Settings, label: 'Pengaturan', shortcut: 'S' },
  ];

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      logout();
      window.location.reload();
    }
  };

  return (
    <>
      {/* Admin Bar - Desktop & Mobile */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 rounded-lg p-2">
                <div className="text-sm font-bold">ADMIN</div>
              </div>
              <div>
                <p className="text-xs text-emerald-100">Logged in as</p>
                <p className="font-semibold text-sm">{adminName || 'Administrator'}</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onMenuClick(item.id as any)}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-emerald-600 rounded-lg transition-colors text-sm group"
                    title={`${item.label} (Alt+${item.shortcut})`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden xl:inline">{item.label}</span>
                    <span className="hidden xl:inline text-xs text-emerald-100 ml-1">(Alt+{item.shortcut})</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-emerald-600 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Logout Button - Desktop */}
            <button
              onClick={handleLogout}
              className="hidden lg:flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>

            {/* Logout Button - Mobile */}
            <button
              onClick={handleLogout}
              className="lg:hidden p-2 hover:bg-red-600 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-3 pt-3 border-t border-emerald-600 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onMenuClick(item.id as any);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-emerald-600 rounded-lg transition-colors text-sm"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </div>

      {/* Keyboard Shortcuts Handler */}
      <KeyboardShortcuts onMenuClick={onMenuClick} />
    </>
  );
}

function KeyboardShortcuts({ onMenuClick }: { onMenuClick: (menu: any) => void }) {
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!e.altKey) return;

      const shortcuts: { [key: string]: any } = {
        a: 'artikel',
        p: 'pengurus',
        b: 'banner',
        o: 'popup',
        s: 'pengaturan',
      };

      const key = e.key.toLowerCase();
      if (shortcuts[key]) {
        e.preventDefault();
        onMenuClick(shortcuts[key]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onMenuClick]);

  return null;
}