import React from 'react';
import { useCms } from '../context/CmsContext';
import { 
  Building2, 
  ShieldCheck, 
  Target, 
  Compass, 
  CheckCircle, 
  Award, 
  MapPin, 
  Edit3, 
  Clock, 
  Sparkles, 
  Layers, 
  FileCheck 
} from 'lucide-react';

export const CompanyProfileSection: React.FC = () => {
  const { data, isEditMode, setIsCmsModalOpen, setActiveCmsTab } = useCms();
  const company = data.company;

  return (
    <section id="profil-perusahaan" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-stone-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              Profil Korporat Resmi
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
              {company.companyName}
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Didirikan sejak {company.establishedYear} • Solusi Distribusi Perlengkapan Haji & Umroh
            </p>
          </div>

          {isEditMode && (
            <button
              onClick={() => {
                setActiveCmsTab('profil');
                setIsCmsModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow transition-all shrink-0"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profil & Visi Misi (WordPress CMS)</span>
            </button>
          )}
        </div>

        {/* Story & Background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-7 space-y-5">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
              Amanah Melayani Tamu Allah Melalui Ketepatan Rantai Pasok Ibadah
            </h3>
            <p className="text-stone-600 text-base leading-relaxed">
              {company.aboutStory}
            </p>
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-950 text-sm font-medium leading-relaxed">
              <strong>Komitmen Pelayanan:</strong> Setiap koper, helai kain ihram, mukena, dan seragam batik yang kami produksi dan distribusikan melewati 3 lapis uji kualitas (Quality Assurance) berstandar penerbangan dan syariah, demi ketenangan ibadah para jamaah di tanah suci Mekkah & Madinah.
            </div>
          </div>

          {/* Visi & Misi Box */}
          <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-6 border border-stone-200 shadow-sm space-y-5">
            <div>
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-1.5">
                <Target className="w-4 h-4 text-emerald-700" />
                <span>Visi Perusahaan</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic bg-white p-3.5 rounded-xl border border-stone-200">
                &ldquo;{company.vision}&rdquo;
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
                <Compass className="w-4 h-4 text-emerald-700" />
                <span>Misi Strategis</span>
              </div>
              <ul className="space-y-2.5">
                {company.missions.map((misi, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 leading-normal">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{misi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Nilai Utama Perusahaan */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-stone-900 font-serif">
              4 Nilai Keberkahan & Landasan Operasional
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Prinsip integritas yang memandu seluruh staf, direksi, dan mitra logistik kami.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {company.values.map((val) => (
              <div
                key={val.id}
                className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-600/40 hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-4">
                  {val.iconName === 'ShieldCheck' && <ShieldCheck className="w-5 h-5" />}
                  {val.iconName === 'Clock' && <Clock className="w-5 h-5" />}
                  {val.iconName === 'Sparkles' && <Sparkles className="w-5 h-5" />}
                  {val.iconName === 'Layers' && <Layers className="w-5 h-5" />}
                </div>
                <h4 className="font-bold text-stone-900 text-base mb-2">
                  {val.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Legalitas & Sertifikasi */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 mb-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Kepatuhan Hukum & Standarisasi Resmi
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-1 font-serif">
                Legalitas Resmi PT Sidya Sadaya Sejahtera
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-2">
                Menjamin ketenangan hukum, transparansi audit, dan izin usaha resmi dalam penyediaan perlengkapan ibadah jemaah haji & umrah nasional.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {company.legalities.map((leg) => (
                <div
                  key={leg.id}
                  className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/80 space-y-1"
                >
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>{leg.label}</span>
                  </div>
                  <div className="font-mono text-sm font-bold text-white truncate">
                    {leg.value}
                  </div>
                  <div className="text-[11px] text-stone-400">
                    Penerbit: {leg.authority}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Jaringan Hub & Pergudangan Embarkasi */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-stone-900 font-serif">
                Jaringan Gudang & Hub Logistik Embarkasi
              </h3>
              <p className="text-xs sm:text-sm text-stone-500">
                Pusat distribusi strategis yang siap menyalurkan koper ke asrama haji dan bandara tanpa keterlambatan.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0 self-start sm:self-auto">
              Siap Layani Musim Haji & Umroh 1448 H / 2026 M
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {company.distributionHubs.map((hub) => (
              <div
                key={hub.id}
                className="p-4 rounded-xl bg-stone-50 border border-stone-200/90 space-y-2 hover:bg-stone-100/80 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm leading-tight">
                      {hub.name}
                    </h4>
                    <p className="text-xs text-stone-500 font-medium">{hub.city}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-stone-200 text-xs">
                  <p className="text-stone-600 font-medium">{hub.type}</p>
                  <p className="text-[11px] text-emerald-800 font-bold mt-0.5">
                    Kapasitas: {hub.capacity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
