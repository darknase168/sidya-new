import React, { useState } from 'react';
import AdminBar from './AdminBar';
import AdminDashboard from './AdminDashboard';
import { useAuth } from '../context/AuthContext';

export default function AdminPortal() {
  const { isLoggedIn } = useAuth();
  const [activeMenu, setActiveMenu] = useState<'artikel' | 'pengurus' | 'banner' | 'popup' | 'pengaturan'>('artikel');

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-end">
      <div className="w-full bg-white max-h-[90vh] overflow-y-auto flex flex-col">
        <AdminBar onMenuClick={setActiveMenu} />
        
        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          <AdminDashboard 
            activeMenu={activeMenu} 
            onMenuChange={setActiveMenu}
          />
        </div>
      </div>
    </div>
  );
}