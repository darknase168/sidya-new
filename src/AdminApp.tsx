import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import SplashScreen from './components/SplashScreen';

function AdminAppContent() {
  const { isLoggedIn, login, logout } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [activeMenu, setActiveMenu] = useState<'artikel' | 'pengurus' | 'banner' | 'popup' | 'pengaturan'>('artikel');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (username: string, password: string) => {
    // Validasi login menggunakan AuthContext
    const success = login(username, password);
    if (!success) {
      alert('Username atau password salah');
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div>
      {isLoggedIn ? (
        <AdminDashboard 
          onLogout={logout}
          activeMenu={activeMenu}
          onMenuChange={setActiveMenu}
        />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminAppContent />
    </AuthProvider>
  );
}