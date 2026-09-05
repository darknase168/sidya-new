import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { 
  Smartphone, 
  Monitor, 
  Truck, 
  Ruler, 
  CheckSquare, 
  ShoppingBag, 
  FileSpreadsheet, 
  Palette, 
  Box, 
  Store, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  Layers,
  ArrowRight,
  ShieldCheck,
  Edit3
} from 'lucide-react';

export const AppsShowcase: React.FC = () => {
  const { data, isEditMode, setIsCmsModalOpen, setActiveCmsTab } = useCms();
  const [activeTab, setActiveTab] = useState<'mobile' | 'desktop'>('mobile');

  const mobileData = data.apps.mobile;
  const desktopData = data.apps.desktop;

  return (
    <section id="ekosistem-aplikasi" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Geometric Balance Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
            Applications Ecosystem
          </h2>
          <div className="h-[1px] flex-1 mx-6 bg-slate-200"></div>
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
            Mobile &amp; Desktop Suite
          </div>
        </div>

        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-3">
            <Layers className="w-3 h-3 text-emerald-700" />
            <span>Dedicated Multiplatform System</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
            Dua Aplikasi, <span className="font-bold text-emerald-700 italic">Satu Rantai Pasok</span> Terpadu
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            SIDYA menghadirkan teknologi yang dirancang presisi untuk dua kebutuhan: kemudahan personal jamaah melalui smartphone, dan kekuatan pengadaan skala besar bagi KBIH, Agen Umroh, serta Seller melalui software desktop.
          </p>

          {isEditMode && (
            <div className="mt-4">
              <button
                onClick={() => {
                  setActiveCmsTab('aplikasi');
                  setIsCmsModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-sm bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 shadow-sm transition-all uppercase tracking-wider"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Konten Sidya Mobile &amp; Desktop</span>
              </button>
            </div>
          )}
        </div>

        {/* Tab Selector in Geometric Style */}
        <div className="flex justify-start sm:justify-center mb-10">
          <div className="p-1 bg-slate-100 rounded-md flex max-w-md w-full border border-slate-200">
            <button
              onClick={() => setActiveTab('mobile')}
              className={`flex-1 py-2.5 px-4 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                activeTab === 'mobile'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Sidya Mobile (Jamaah)</span>
            </button>

            <button
              onClick={() => setActiveTab('desktop')}
              className={`flex-1 py-2.5 px-4 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                activeTab === 'desktop'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Sidya Desktop (KBIH &amp; Seller)</span>
            </button>
          </div>
        </div>

        {/* Dynamic App Content */}
        {activeTab === 'mobile' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Interactive Feature Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-2.5 py-1 rounded-sm border border-emerald-200">
                  Untuk Jamaah Haji &amp; Umroh
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
                  {mobileData.appName}
                </h3>
                <p className="text-emerald-700 font-semibold text-xs mt-1 uppercase tracking-wider">
                  {mobileData.subtitle} • <span className="text-slate-500 font-normal">{mobileData.version}</span>
                </p>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  {mobileData.description}
                </p>
              </div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {mobileData.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-md bg-white border border-slate-200 shadow-sm hover:border-emerald-600/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-sm bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm mb-2">
                      {idx === 0 && <Truck className="w-4 h-4" />}
                      {idx === 1 && <Ruler className="w-4 h-4" />}
                      {idx === 2 && <CheckSquare className="w-4 h-4" />}
                      {idx === 3 && <ShoppingBag className="w-4 h-4" />}
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Download Badges */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => alert('Sidya Mobile dapat diunduh melalui Google Play Store resmi atau hubungi KBIH Anda untuk tautan aktivasi rombongan.')}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-sm text-xs font-bold flex items-center gap-2 shadow-sm transition-all uppercase tracking-wider"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Google Play</span>
                </button>
                <button
                  onClick={() => alert('Sidya Mobile di App Store segera tersedia atau gunakan Progressive Web App melalui browser Safari Anda.')}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-sm text-xs font-bold flex items-center gap-2 shadow-sm transition-all uppercase tracking-wider"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>App Store</span>
                </button>
                <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                  Khusus jamaah mitra terdaftar
                </span>
              </div>
            </div>

            {/* Right: Realistic Phone Mockup Frame in Geometric Style */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[340px] rounded-[36px] bg-slate-950 p-3 shadow-2xl ring-1 ring-slate-800">
                {/* Phone Speaker & Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2"></div>
                  <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
                </div>

                {/* Inner Phone Screen */}
                <div className="w-full bg-slate-50 rounded-[28px] overflow-hidden pt-8 pb-4 text-slate-900 border border-slate-800">
                  {/* App Header Inside Phone */}
                  <div className="bg-emerald-900 text-white p-4 pt-3 pb-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-sm bg-emerald-800 flex items-center justify-center text-amber-400 font-bold text-xs">
                          SY
                        </div>
                        <div>
                          <p className="text-[10px] text-emerald-200 leading-tight">Assalamu&apos;alaikum,</p>
                          <h5 className="text-xs font-bold leading-tight">H. Abdullah Wijaya</h5>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-sm bg-amber-400/20 text-amber-300 font-bold border border-amber-300/30 uppercase tracking-wider">
                        Kloter 14 JKS
                      </span>
                    </div>

                    <div className="mt-3 bg-emerald-800/80 p-2.5 rounded-sm text-xs border border-emerald-700/60">
                      <p className="text-[9px] text-emerald-200 uppercase tracking-widest">KBIH / Biro Travel Anda:</p>
                      <p className="font-bold text-white text-xs">KBIH Al-Mabrur Hajj &amp; Umrah Jakarta</p>
                    </div>
                  </div>

                  {/* Pilgrim In-App Cards */}
                  <div className="p-3 space-y-3">
                    {/* Status Paket & Koper */}
                    <div className="bg-white p-3 rounded-md border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-slate-800 flex items-center gap-1 text-[11px] uppercase tracking-wide">
                          <Truck className="w-3.5 h-3.5 text-emerald-600" />
                          Status Koper &amp; Perlengkapan
                        </span>
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm uppercase">
                          Terkirim
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden my-2">
                        <div className="bg-emerald-600 h-1.5 rounded-full w-4/5"></div>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        1 Set Koper Fiber (Biru KBIH) + Kain Ihram telah tiba di <strong>Asrama Haji Pondok Gede</strong> (Gedung Mina D-12).
                      </p>
                    </div>

                    {/* Konfirmasi Ukuran */}
                    <div className="bg-white p-3 rounded-md border border-slate-200 shadow-sm flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Batik &amp; Seragam</span>
                        <h6 className="text-xs font-bold text-slate-900">Ukuran Terkonfirmasi: XL</h6>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-sm uppercase tracking-wider">
                        Sesuai
                      </span>
                    </div>

                    {/* Checklist Ibadah */}
                    <div className="bg-amber-50/70 p-3 rounded-md border border-amber-200">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-amber-950 flex items-center gap-1 text-[11px] uppercase tracking-wide">
                          <CheckSquare className="w-3.5 h-3.5 text-amber-700" />
                          Checklist Bawaan Ihram
                        </span>
                        <span className="text-[9px] font-bold text-amber-800 uppercase">8/9 Siap</span>
                      </div>
                      <p className="text-[10px] text-slate-600">
                        Sabuk haji tanpa jahitan, sandal anti licin, dan botol semprot wudhu sudah masuk koper kabin.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* DESKTOP APP SHOWCASE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Desktop Features */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest bg-amber-100 px-2.5 py-1 rounded-sm border border-amber-300">
                  Untuk KBIH, Agen Umroh &amp; Manufaktur
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
                  {desktopData.appName}
                </h3>
                <p className="text-emerald-700 font-semibold text-xs mt-1 uppercase tracking-wider">
                  {desktopData.subtitle} • <span className="text-slate-500 font-normal">{desktopData.version}</span>
                </p>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  {desktopData.description}
                </p>
              </div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {desktopData.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-md bg-white border border-slate-200 shadow-sm hover:border-amber-500/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-sm bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm mb-2">
                      {idx === 0 && <FileSpreadsheet className="w-4 h-4" />}
                      {idx === 1 && <Palette className="w-4 h-4" />}
                      {idx === 2 && <Box className="w-4 h-4" />}
                      {idx === 3 && <Store className="w-4 h-4" />}
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Download Desktop Client */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => alert('Installer Sidya Desktop Pro (Windows .exe) untuk KBIH & Vendor terdaftar. Hubungi tim kemitraan SIDYA untuk mendapatkan lisensi aktivasi.')}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-sm text-xs font-bold flex items-center gap-2 shadow-sm transition-all uppercase tracking-wider"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Windows Client (.exe)</span>
                </button>
                <button
                  onClick={() => alert('Installer Sidya Desktop Pro untuk macOS (.dmg Apple Silicon & Intel).')}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-sm text-xs font-bold flex items-center gap-2 shadow-sm transition-all uppercase tracking-wider"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>macOS Client (.dmg)</span>
                </button>
                <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                  Sync SISKOPATUH Kemenag
                </span>
              </div>
            </div>

            {/* Right: Realistic Desktop Software Frame in Geometric Style */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-xl rounded-lg bg-slate-900 p-2 shadow-2xl ring-1 ring-slate-800 border border-slate-700">
                {/* Desktop Window Titlebar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                    <span className="ml-2 font-mono text-[10px] text-slate-300 font-semibold uppercase tracking-wider">
                      SIDYA Enterprise — KBIH Portal v3.2
                    </span>
                  </div>
                  <span className="text-[9px] bg-slate-800 px-2 py-0.5 rounded-sm text-emerald-400 font-mono">
                    Online • Hub JKT
                  </span>
                </div>

                {/* Inner Desktop App Content */}
                <div className="bg-slate-950 p-4 rounded-b-md text-slate-200 text-xs space-y-4">
                  {/* Stats Bar */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-900 p-2.5 rounded-sm border border-slate-800">
                      <p className="text-[9px] uppercase tracking-wider text-slate-400">Total Jamaah</p>
                      <p className="text-sm font-bold text-white font-mono">450 Orang</p>
                      <span className="text-[9px] text-emerald-400">Kloter 14, 15, &amp; 21</span>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-sm border border-slate-800">
                      <p className="text-[9px] uppercase tracking-wider text-slate-400">Status Koper Logo</p>
                      <p className="text-sm font-bold text-amber-400 font-mono">100% Selesai</p>
                      <span className="text-[9px] text-slate-400">450 Set Siap Kirim</span>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-sm border border-slate-800">
                      <p className="text-[9px] uppercase tracking-wider text-slate-400">Embarkasi</p>
                      <p className="text-sm font-bold text-teal-300 font-mono">Pondok Gede</p>
                      <span className="text-[9px] text-slate-400">SDY-LOG-04</span>
                    </div>
                  </div>

                  {/* Batch Table Preview */}
                  <div className="bg-slate-900 rounded-sm border border-slate-800 overflow-hidden">
                    <div className="p-2.5 bg-slate-800/80 font-bold text-slate-300 flex items-center justify-between text-[10px] uppercase tracking-wider">
                      <span>Daftar Manifest &amp; Alokasi Barang</span>
                      <span className="text-emerald-400 font-mono text-[9px]">Auto-Sync SISKOPATUH</span>
                    </div>
                    <div className="divide-y divide-slate-800 text-[11px]">
                      <div className="p-2 flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-white">H. Ahmad Fauzi</span>
                          <span className="text-slate-400 block text-[10px]">No. Porsi: 100098442 • Regu 1</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-sm bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] uppercase tracking-wider font-mono">
                          Koper + Ihram + Batik (L)
                        </span>
                      </div>
                      <div className="p-2 flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-white">Hj. Maryam Susanti</span>
                          <span className="text-slate-400 block text-[10px]">No. Porsi: 100098443 • Regu 1</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-sm bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] uppercase tracking-wider font-mono">
                          Koper + Mukena (M)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] pt-1 text-slate-400">
                    <span>Seller PO: Produksi Koper Fiber ABS/PC</span>
                    <span className="text-amber-400 font-semibold cursor-pointer hover:underline uppercase tracking-wider">
                      Surat Jalan &amp; Barcode &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
