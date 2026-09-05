import React, { useState } from 'react';
import { X } from 'lucide-react';
import AdminDashboard from './AdminDashboard';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeMenu?: 'artikel' | 'pengurus' | 'banner' | 'popup' | 'pengaturan';
}

export default function AdminDrawer({ isOpen, onClose, activeMenu = 'artikel' }: AdminDrawerProps) {
  const [currentMenu, setCurrentMenu] = useState<'artikel' | 'pengurus' | 'banner' | 'popup' | 'pengaturan'>(activeMenu);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 bg-white z-50 max-w-full w-full lg:w-[80vw] overflow-y-auto shadow-xl flex flex-col">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-800">Admin Panel</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <AdminDashboard 
            activeMenu={currentMenu}
            onMenuChange={setCurrentMenu}
            onLogout={onClose}
          />
        </div>
      </div>
    </>
  );
}