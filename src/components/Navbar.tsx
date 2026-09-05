import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { 
  PackageCheck, 
  Smartphone, 
  Monitor, 
  Users, 
  Building2, 
  Phone, 
  Menu, 
  X, 
  Edit3, 
  Download,
  ArrowRight,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isEditMode, toggleEditMode, data } = useCms();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      id="main-navigation"
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2.5 border-b border-slate-200'
          : 'bg-white py-3.5 border-b border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Identity in Geometric Balance theme */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-emerald-700 rounded-sm rotate-45 flex items-center justify-center overflow-hidden shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold -rotate-45 text-xs">SY</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tighter text-emerald-900 font-sans">
                  SIDYA
                </span>
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-800 border border-emerald-200">
                  RESMI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                PT Sidya Sadaya Sejahtera
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold uppercase tracking-widest text-slate-600">
            <button
              onClick={() => scrollTo('ekosistem-aplikasi')}
              className="hover:text-emerald-700 transition-colors py-1 flex items-center gap-1.5"
            >
              <span>Aplikasi</span>
            </button>

            <button
              onClick={() => scrollTo('katalog-perlengkapan')}
              className="hover:text-emerald-700 transition-colors py-1 flex items-center gap-1.5"
            >
              <span>Katalog</span>
            </button>

            <button
              onClick={() => scrollTo('profil-perusahaan')}
              className="hover:text-emerald-700 transition-colors py-1 flex items-center gap-1.5"
            >
              <span>Profil Perusahaan</span>
            </button>

            <button
              onClick={() => scrollTo('jajaran-pengurus')}
              className="hover:text-emerald-700 transition-colors py-1 flex items-center gap-1.5"
            >
              <span>Pengurus</span>
            </button>

            <button
              onClick={() => scrollTo('solusi-mitra')}
              className="hover:text-emerald-700 transition-colors py-1 flex items-center gap-1.5"
            >
              <span>Mitra KBIH</span>
            </button>
          </nav>

          {/* Action CTAs in Geometric Style */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scrollTo('solusi-mitra')}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 text-xs font-bold rounded-sm shadow-lg shadow-emerald-200 uppercase tracking-wider transition-all"
            >
              <span>Kemitraan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-sm"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-3 border-t border-slate-200 mt-3 space-y-2 animate-fade-in">
            <button
              onClick={() => scrollTo('ekosistem-aplikasi')}
              className="w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-100 rounded-sm flex items-center gap-2"
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Ekosistem Aplikasi (Mobile & Desktop)</span>
            </button>
            <button
              onClick={() => scrollTo('katalog-perlengkapan')}
              className="w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-100 rounded-sm flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>Katalog Barang & Koper</span>
            </button>
            <button
              onClick={() => scrollTo('profil-perusahaan')}
              className="w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-100 rounded-sm flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>Profil PT Sidya Sadaya Sejahtera</span>
            </button>
            <button
              onClick={() => scrollTo('jajaran-pengurus')}
              className="w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-100 rounded-sm flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Jajaran Pengurus & Direksi</span>
            </button>
            <button
              onClick={() => scrollTo('solusi-mitra')}
              className="w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-100 rounded-sm flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Untuk KBIH & Agen Travel</span>
            </button>
            <button
              onClick={() => scrollTo('kontak-perusahaan')}
              className="w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-100 rounded-sm flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Kontak & Kemitraan</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
