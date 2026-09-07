import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  Users, 
  Building, 
  Sparkles,
  Edit3
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { data, isEditMode, setIsCmsModalOpen, setActiveCmsTab } = useCms();
  const { isLoggedIn } = useAuth();
  const [activeAudience, setActiveAudience] = useState<'kbih' | 'jamaah'>('kbih');

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 text-slate-800 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200">
      {/* Geometric Decorative Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-slate-200/50 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badging & CMS quick trigger */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold tracking-[0.2em] rounded-full uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
            <span>PT Sidya Sadaya Sejahtera • Platform Logistik Resmi</span>
          </div>

          {isEditMode && isLoggedIn && (
            <button
              onClick={() => {
                setActiveCmsTab('profil');
                setIsCmsModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors shadow-sm uppercase tracking-wider"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Data &amp; Statistik</span>
            </button>
          )}
        </div>

        {/* Main Geometric Split / Balanced Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Typography & Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] text-slate-900 tracking-tight">
              Digitalizing <span className="font-bold text-emerald-700 italic">Umroh &amp; Haji</span> Logistics.
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              The most trusted distribution platform connecting <strong className="text-slate-900 font-semibold">KBIH</strong>,{' '}
              <strong className="text-slate-900 font-semibold">Agen Umroh</strong>, dan{' '}
              <strong className="text-slate-900 font-semibold">Seller/Produsen</strong> directly to pilgrims with seamless technology integration. Dari pengadaan koper kustom berlogo hingga pengiriman terintegrasi ke asrama haji dan bandara.
            </p>

            {/* Audience Switcher Segmented Control */}
            <div className="pt-2">
              <div className="inline-flex p-1 bg-white border border-slate-200 rounded-md shadow-sm">
                <button
                  onClick={() => setActiveAudience('kbih')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                    activeAudience === 'kbih'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>KBIH &amp; Travel (Desktop)</span>
                </button>

                <button
                  onClick={() => setActiveAudience('jamaah')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                    activeAudience === 'jamaah'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Jamaah (Mobile App)</span>
                </button>
              </div>
            </div>

            {/* Active Audience Card */}
            <div className="p-5 bg-white border border-slate-200 rounded-md shadow-sm">
              {activeAudience === 'kbih' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block">
                        Enterprise Solutions
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">
                        Sidya Desktop: Manajemen Pengadaan Skala Massal
                      </h3>
                    </div>
                    <button
                      onClick={() => scrollTo('ekosistem-aplikasi')}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 uppercase tracking-wider"
                    >
                      <span>Detail</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Manifes Ribuan Jamaah</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Kustom Logo &amp; Warna 3D</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Dispatch Asrama Terjadwal</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block">
                        Pilgrim Companion
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">
                        Sidya Mobile: Pelacakan Koper &amp; Kebutuhan Manasik
                      </h3>
                    </div>
                    <button
                      onClick={() => scrollTo('ekosistem-aplikasi')}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 uppercase tracking-wider"
                    >
                      <span>Detail</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Tracking Posisi Koper Realtime</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Validasi Ukuran Ihram &amp; Seragam</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Checklist Doa &amp; Panduan Manasik</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollTo('ekosistem-aplikasi')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 text-xs font-bold rounded-sm shadow-lg shadow-emerald-200 uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <span>Lihat Ekosistem Aplikasi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => scrollTo('profil-perusahaan')}
                className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 px-6 py-3 text-xs font-bold rounded-sm uppercase tracking-wider transition-all"
              >
                Profil Perusahaan
              </button>
            </div>
          </div>

          {/* Right Column: Geometric App Highlights Preview */}
          <div className="lg:col-span-5 space-y-4">
            {/* Geometric Card 1: Sidya Mobile */}
            <div className="group bg-emerald-900 rounded-xl p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-lg">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-sm flex items-center justify-center mb-4">
                  <span className="text-xl">📱</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Sidya Mobile</h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Tailored for individual Jamaah. Real-time bag tracking, equipment status, and ritual checklist in one hand.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase opacity-80">
                <div className="w-8 h-[1px] bg-white"></div>
                <span>App Store &amp; Google Play</span>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/20 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
            </div>

            {/* Geometric Card 2: Sidya Desktop */}
            <div className="bg-slate-900 rounded-xl p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-lg">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-amber-500 rounded-sm flex items-center justify-center mb-4">
                  <span className="text-xl">💻</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Sidya Desktop</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Professional suite for KBIH, Travel Agents, and Sellers. Manage bulk distribution, manifest sync, and supply chains.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase opacity-80">
                <div className="w-8 h-[1px] bg-white"></div>
                <span>Windows &amp; MacOS Client</span>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-slate-800 rounded-full -mr-16 -mb-16 pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Live Counters & Key Metrics in Geometric Balance style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200">
          <div className="p-4 bg-white border border-slate-200 rounded-md shadow-sm">
            <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-tighter">
              Jamaah Terfasilitasi
            </div>
            <div className="text-2xl font-bold text-emerald-700 font-mono">
              {data.company.stats.pilgrimsServed}
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-md shadow-sm">
            <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-tighter">
              Partners Registered
            </div>
            <div className="text-2xl font-bold text-emerald-700 font-mono">
              {data.company.stats.kbihPartners}
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-md shadow-sm">
            <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-tighter">
              Perlengkapan Terdistribusi
            </div>
            <div className="text-2xl font-bold text-emerald-700 font-mono">
              {data.company.stats.itemsDelivered}
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-md shadow-sm">
            <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-tighter">
              Sentra Hub Embarkasi
            </div>
            <div className="text-2xl font-bold text-emerald-700 font-mono">
              {data.company.stats.distributionCenters}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
