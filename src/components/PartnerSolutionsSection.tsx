import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { 
  Building, 
  Plane, 
  Store, 
  Calculator, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  PhoneCall,
  MessageCircle
} from 'lucide-react';

export const PartnerSolutionsSection: React.FC = () => {
  const { data } = useCms();
  const [quotaInput, setQuotaInput] = useState<number>(100);
  const [selectedService, setSelectedService] = useState<'haji' | 'umroh'>('haji');

  // Calculation estimates
  const koperSets = quotaInput;
  const seragamMeters = quotaInput * 2.5;
  const estimatedBoxes = Math.ceil(quotaInput / 4);
  const dispatchHub = quotaInput > 200 ? 'Dedicated Container Truk Langsung ke Asrama' : 'Armada Box Khusus Embarkasi Terdekat';

  return (
    <section id="solusi-mitra" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Geometric Balance Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
            Enterprise Solutions
          </h2>
          <div className="h-[1px] flex-1 mx-6 bg-slate-800"></div>
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
            B2B Supply Chain
          </div>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            <span>Kolaborasi Rantai Pasok B2B</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
            Solusi Khusus <span className="font-bold text-emerald-400 italic">KBIH, Agen Umroh, &amp; Seller</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Dirancang untuk mengatasi masalah klasik pengadaan: barang telat tiba, salah cetak logo koper, kekurangan ukuran seragam, dan ketidakteraturan pengiriman di asrama haji.
          </p>
        </div>

        {/* 3 Pillars Solution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Pillar 1: KBIH */}
          <div className="p-6 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-emerald-500/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-sm bg-slate-900 text-emerald-400 flex items-center justify-center font-bold mb-4 border border-slate-700">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Untuk Pengurus KBIH
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Fasilitas pengadaan koper rombongan terkoordinasi rapi tanpa perlu repot sewa gudang pribadi.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Kustom plat logo &amp; pita identitas regu KBIH</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Pengiriman langsung ke asrama haji per kloter</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Dashboard Sidya Desktop untuk manifes excel</span>
                </li>
              </ul>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-700/80">
              <a
                href="#simulasi-kuota"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 uppercase tracking-wider"
              >
                <span>Hitung Estimasi Kuota KBIH</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Pillar 2: Agen Umroh */}
          <div className="p-6 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-amber-500/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-sm bg-slate-900 text-amber-400 flex items-center justify-center font-bold mb-4 border border-slate-700">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Untuk Agen &amp; Biro Umroh
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Kecepatan turnaround untuk jadwal keberangkatan umroh reguler maupun umroh VIP sepanjang tahun.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Stok koper fiber siap kirim dalam 3-5 hari kerja</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Paket bundling hemat (Ihram/Mukena + Koper + Tas)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Jaminan garansi ganti unit jika cacat pabrik</span>
                </li>
              </ul>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-700/80">
              <a
                href="#simulasi-kuota"
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 uppercase tracking-wider"
              >
                <span>Simulasi Paket Umroh</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Pillar 3: Seller & Vendor */}
          <div className="p-6 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-teal-400/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-sm bg-slate-900 text-teal-400 flex items-center justify-center font-bold mb-4 border border-slate-700">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Untuk Seller &amp; Produsen
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Buka akses ke pasar institusional ratusan KBIH dan travel umroh tanpa beban mencari pembeli eceran.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                  <span>PO (Purchase Order) pesanan massal kuantitas besar</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                  <span>Sistem pembayaran invoice jelas dan tepat waktu</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                  <span>Sidya Desktop Vendor Portal konfirmasi stok</span>
                </li>
              </ul>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-700/80">
              <a
                href={`https://wa.me/6281288997439?text=Assalamu'alaikum%20Admin%20Sidya,%20kami%20produsen/seller%20ingin%20bergabung%20menjadi%20mitra%20suplier%20SIDYA.`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 uppercase tracking-wider"
              >
                <span>Daftar Sebagai Seller Mitra</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Kuota Simulator Tool */}
        <div id="simulasi-kuota" className="bg-slate-800/90 rounded-lg p-6 sm:p-8 border border-slate-700 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Side */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
                <Calculator className="w-3 h-3" />
                <span>Kalkulator Rencana Pengadaan</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-light">
                Simulasikan Kebutuhan <span className="font-bold text-emerald-400">Rombongan Anda</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Geser jumlah jamaah Anda untuk melihat alokasi koper, kebutuhan kain seragam, dan skema distribusi logistik dari PT Sidya Sadaya Sejahtera.
              </p>

              {/* Service Type Toggle */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setSelectedService('haji')}
                  className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedService === 'haji'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  Musim Haji Reguler / Khusus
                </button>
                <button
                  onClick={() => setSelectedService('umroh')}
                  className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedService === 'umroh'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  Keberangkatan Umroh
                </button>
              </div>

              {/* Range Slider for Pilgrims */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">Estimasi Kuota Jamaah:</span>
                  <span className="text-lg font-bold text-amber-400 font-mono">
                    {quotaInput} Orang
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1500"
                  step="10"
                  value={quotaInput}
                  onChange={(e) => setQuotaInput(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-sm cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>20 Jamaah</span>
                  <span>500 Jamaah</span>
                  <span>1.500 Jamaah</span>
                </div>
              </div>
            </div>

            {/* Output Side */}
            <div className="lg:col-span-6 bg-slate-900/90 rounded-md p-5 border border-slate-700/80 space-y-3.5">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Ringkasan Rekomendasi Logistik SIDYA
              </h4>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="bg-slate-800/80 p-3 rounded-sm border border-slate-700">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Set Koper Fiber KBIH:</span>
                  <span className="text-base font-bold text-white font-mono mt-0.5 block">{koperSets} Set</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Sudah Termasuk Logo Custom</span>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-sm border border-slate-700">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Kain Seragam Batik:</span>
                  <span className="text-base font-bold text-amber-400 font-mono mt-0.5 block">{seragamMeters} Meter</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Primisima Sanforized</span>
                </div>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-sm border border-slate-700 text-xs space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Skema Penyaluran &amp; Armada:</span>
                <p className="font-bold text-white text-xs">{dispatchHub}</p>
                <p className="text-[11px] text-emerald-300">
                  Perkiraan volume koli: ± {estimatedBoxes} Master Box bersegel barcode manifes Kemenag.
                </p>
              </div>

              <a
                href={`https://wa.me/6281288997439?text=Assalamu'alaikum%20PT%20Sidya%20Sadaya%20Sejahtera,%20kami%20ingin%20mengajukan%20penawaran%20resmi%20untuk%20kuota%20${quotaInput}%20jamaah%20${selectedService}.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-sm shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <MessageCircle className="w-3.5 h-3.5 text-amber-300" />
                <span>Kirim Hasil Simulasi ke WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
