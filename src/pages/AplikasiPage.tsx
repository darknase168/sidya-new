import React from 'react';
import { useCms } from '../context/CmsContext';
import { AppsShowcase } from '../components/AppsShowcase';

export default function AplikasiPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900">
            Ekosistem <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">Aplikasi</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Solusi digital terintegrasi untuk memudahkan perjalanan ibadah Anda
          </p>
        </div>

        {/* Main Content */}
        <AppsShowcase />
      </div>
    </div>
  );
}
