import React from 'react';
import { useCms } from '../context/CmsContext';
import { Building2, Target, Lightbulb, Award, Users, Globe, Zap, Shield } from 'lucide-react';

export default function ProfilPerusahaanPage() {
  const { data } = useCms();
  const { company } = data;

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-slate-900">
              Profil <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">Perusahaan</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Mengenal lebih dalam tentang {company.companyName} dan komitmen kami melayani jamaah dengan sepenuh hati
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left Side - Text Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Tentang Kami</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">{company.aboutStory}</p>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl font-black text-emerald-600">{company.establishedYear}</div>
                    <div>
                      <h3 className="font-bold text-slate-900">Tahun Berdiri</h3>
                      <p className="text-sm text-slate-500">Melayani jamaah dengan dedikasi penuh</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Stats Cards */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                    <div className="text-3xl font-bold text-emerald-700">{company.stats.pilgrimsServed}</div>
                    <p className="text-sm text-emerald-700 mt-2">Jamaah Terlayani</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="text-3xl font-bold text-blue-700">{company.stats.kbihPartners}</div>
                    <p className="text-sm text-blue-700 mt-2">Mitra KBIH & Travel</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
                    <div className="text-3xl font-bold text-amber-700">{company.stats.itemsDelivered}</div>
                    <p className="text-sm text-amber-700 mt-2">Barang Terkirim</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                    <div className="text-3xl font-bold text-purple-700">{company.stats.distributionCenters}</div>
                    <p className="text-sm text-purple-700 mt-2">Pusat Distribusi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visi & Misi Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Visi */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <Target className="w-10 h-10" />
              <h2 className="text-3xl font-bold">Visi</h2>
            </div>
            <p className="text-lg leading-relaxed opacity-95">{company.vision}</p>
          </div>

          {/* Misi */}
          <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl p-8 text-white shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <Lightbulb className="w-10 h-10" />
              <h2 className="text-3xl font-bold">Misi</h2>
            </div>
            <ul className="space-y-3">
              {company.missions.map((mission, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white bg-opacity-20 text-sm font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-base leading-relaxed">{mission}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Nilai-Nilai Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {company.values.map((value) => (
              <div key={value.id} className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg hover:border-emerald-300 transition-all group">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
                  {value.iconName === 'ShieldCheck' && <Shield className="w-6 h-6 text-emerald-600 group-hover:text-white" />}
                  {value.iconName === 'Clock' && <Zap className="w-6 h-6 text-emerald-600 group-hover:text-white" />}
                  {value.iconName === 'Sparkles' && <Award className="w-6 h-6 text-emerald-600 group-hover:text-white" />}
                  {value.iconName === 'Layers' && <Globe className="w-6 h-6 text-emerald-600 group-hover:text-white" />}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution Hubs */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Pusat Distribusi Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {company.distributionHubs.map((hub) => (
              <div key={hub.id} className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:shadow-lg transition-all group">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4">
                  <h3 className="text-lg font-bold text-white">{hub.name}</h3>
                </div>
                <div className="p-6 space-y-3">
                  <div>
                    <p className="text-sm text-slate-500">Lokasi</p>
                    <p className="font-semibold text-slate-900">{hub.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Tipe</p>
                    <p className="font-semibold text-slate-900">{hub.type}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-sm text-slate-500">Kapasitas</p>
                    <p className="font-bold text-emerald-700">{hub.capacity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legalities */}
        <div>
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Legalitas & Sertifikasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {company.legalities.map((legal) => (
              <div key={legal.id} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
                <p className="text-xs text-slate-500 font-semibold mb-1 uppercase">{legal.label}</p>
                <p className="text-lg font-bold text-emerald-700 mb-2">{legal.value}</p>
                <p className="text-xs text-slate-600">{legal.authority}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
