import React from 'react';
import { useCms } from '../context/CmsContext';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Smartphone, 
  Monitor, 
  Clock, 
  ShieldCheck, 
  Edit3,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { data, toggleEditMode, isEditMode } = useCms();
  const { company, contact } = data;

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer id="kontak-perusahaan" className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-emerald-700 border border-emerald-500 flex items-center justify-center text-white font-black text-sm">
                S
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white uppercase">
                  SIDYA
                </span>
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                  {company.companyName}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Platform ekosistem rantai pasok dan distribusi barang perlengkapan haji dan umroh nusantara yang amanah, tepat waktu, dan berorientasi pada kepuasan tamu Allah.
            </p>

            <div className="text-xs text-slate-400 space-y-2 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{contact.phone} • WhatsApp: {contact.whatsapp}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{contact.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{contact.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Ekosistem Aplikasi */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-200 uppercase tracking-[0.2em]">
              Ekosistem Aplikasi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo('ekosistem-aplikasi')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Sidya Mobile (Untuk Jamaah)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('ekosistem-aplikasi')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Monitor className="w-3.5 h-3.5 text-amber-500" />
                  <span>Sidya Desktop (Untuk KBIH)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('ekosistem-aplikasi')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Monitor className="w-3.5 h-3.5 text-teal-400" />
                  <span>Portal Seller &amp; Vendor</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('ekosistem-aplikasi')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Pelacakan Koper Real-time
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Layanan & Solusi */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-200 uppercase tracking-[0.2em]">
              Solusi Mitra
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo('solusi-mitra')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Pengadaan Koper KBIH
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('katalog-perlengkapan')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Kain Ihram Jacquard Standar SNI
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('katalog-perlengkapan')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Mukena &amp; Seragam Batik Travel
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('solusi-mitra')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Kalkulator Kuota Jamaah
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('profil-perusahaan')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Legalitas &amp; Sertifikasi Halal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Pengelola CMS & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-200 uppercase tracking-[0.2em]">
              Panel Pengelola
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sistem ini dilengkapi visual editor CMS seperti WordPress untuk mempermudah pembaruan jajaran pengurus, foto, dan informasi profil.
            </p>
            {isLoggedIn && (
              <>
                <button
                  onClick={toggleEditMode}
                  className={`w-full py-2 px-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border ${
                    isEditMode
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditMode ? 'Nonaktifkan Mode Edit' : 'Buka Mode Edit (CMS)'}</span>
                </button>
                <div className="pt-2">
                  <span className="text-[10px] text-slate-500 block uppercase tracking-wider">
                    Penyimpanan Otomatis: Aktif
                  </span>
                </div>
              </>
            )}
            {!isLoggedIn && (
              <p className="text-[10px] text-slate-500 italic">
                Login sebagai admin untuk mengakses panel pengelola
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {company.companyName}. Hak Cipta Dilindungi Undang-Undang Republik Indonesia.
          </p>
          <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
            <span>Melayani Dhuyufurrahman Menuju Haji Mabrur</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
