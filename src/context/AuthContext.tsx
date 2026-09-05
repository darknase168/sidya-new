import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  adminName: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_AUTH_KEY = 'sidya_admin_auth_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(ADMIN_AUTH_KEY);
      return stored ? JSON.parse(stored).isLoggedIn : false;
    } catch {
      return false;
    }
  });

  const [adminName, setAdminName] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem(ADMIN_AUTH_KEY);
      return stored ? JSON.parse(stored).adminName : null;
    } catch {
      return null;
    }
  });

  // Simpan ke localStorage setiap kali ada perubahan
  useEffect(() => {
    try {
      localStorage.setItem(
        ADMIN_AUTH_KEY,
        JSON.stringify({ isLoggedIn, adminName })
      );
    } catch (e) {
      console.error('Failed to save auth state:', e);
    }
  }, [isLoggedIn, adminName]);

  const login = (username: string, password: string): boolean => {
    // Validasi sederhana untuk demo
    // Dalam production, ini harus memanggil API backend untuk verifikasi
    if (username === 'admin' && password === 'password123') {
      setIsLoggedIn(true);
      setAdminName('Administrator');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAdminName(null);
    localStorage.removeItem(ADMIN_AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, adminName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};