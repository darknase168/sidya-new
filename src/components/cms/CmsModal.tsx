import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { useAuth } from '../../context/AuthContext';
import { 
  X, 
  Users, 
  Building2, 
  Smartphone, 
  Package, 
  PhoneCall, 
  Database,
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  Save, 
  ExternalLink,
  ShieldCheck,
  MapPin,
  Image as ImageIcon,
  FileText
} from 'lucide-react';

export const CmsModal: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { 
    data, 
    isCmsModalOpen, 
    setIsCmsModalOpen, 
    activeCmsTab, 
    setActiveCmsTab,
    setEditingMember,
    addNewBoardMember,
    deleteBoardMember,
    setEditingArticle,
    addNewArticle,
    updateCompanyProfile,
    updateContactInfo,
    updateAppsInfo,
    saveCatalogItem,
    deleteCatalogItem,
    addNewCatalogItem,
    resetToDefaults,
    exportDataAsJson,
    importDataFromJson
  } = useCms();

  // Local state for company profile form
  const [companyForm, setCompanyForm] = useState(data.company);
  const [contactForm, setContactForm] = useState(data.contact);
  const [appsForm, setAppsForm] = useState(data.apps);

  // Hanya tampilkan CMS Modal jika user sudah login
  if (!isLoggedIn || !isCmsModalOpen) return null;

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyProfile(companyForm);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactInfo(contactForm);
  };

  const handleSaveApps = (e: React.FormEvent) => {
    e.preventDefault();
    updateAppsInfo(appsForm);
  };

  const addMission = () => {
    setCompanyForm(prev => ({
      ...prev,
      missions: [...prev.missions, 'Misi baru PT Sidya Sadaya Sejahtera...']
    }));
  };

  const updateMission = (index: number, text: string) => {
    setCompanyForm(prev => {
      const next = [...prev.missions];
      next[index] = text;
      return { ...prev, missions: next };
    });
  };

  const removeMission = (index: number) => {
    setCompanyForm(prev => ({
      ...prev,
      missions: prev.missions.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        id="cms-admin-dashboard-modal"
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[90vh] my-auto"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-900 text-white border-b border-stone-800 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-base">
              S
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">
                Pusat Pengelola Konten (CMS) SIDYA
              </h2>
              <p className="text-xs text-stone-400">
                Ubah profil perusahaan, jajaran dewan, aplikasi, dan katalog produk seperti di WordPress
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCmsModalOpen(false)}
            className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body with Sidebar Tabs */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Navigation Sidebar */}
          <div className="w-full md:w-64 bg-stone-50 border-r border-stone-200 p-4 space-y-1 shrink-0 overflow-y-auto">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-3 mb-2">
              Menu Pengaturan
            </div>

            <button
              onClick={() => setActiveCmsTab('artikel')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeCmsTab === 'artikel'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-700 hover:bg-stone-200/70'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Artikel ({data.articles.length})</span>
            </button>

            <button
              onClick={() => setActiveCmsTab('pengurus')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeCmsTab === 'pengurus'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-700 hover:bg-stone-200/70'
              }`}
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>Jajaran Pengurus ({data.boardMembers.length})</span>
            </button>

            <button
              onClick={() => setActiveCmsTab('profil')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeCmsTab === 'profil'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-700 hover:bg-stone-200/70'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Profil PT Sidya</span>
            </button>

            <button
              onClick={() => setActiveCmsTab('aplikasi')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeCmsTab === 'aplikasi'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-700 hover:bg-stone-200/70'
              }`}
            >
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>Sidya Mobile & Desktop</span>
            </button>

            <button
              onClick={() => setActiveCmsTab('katalog')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeCmsTab === 'katalog'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-700 hover:bg-stone-200/70'
              }`}
            >
              <Package className="w-4 h-4 text-amber-400" />
              <span>Katalog Perlengkapan</span>
            </button>

            <button
              onClick={() => setActiveCmsTab('kontak')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeCmsTab === 'kontak'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-700 hover:bg-stone-200/70'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Kontak & Lokasi</span>
            </button>

            <button
              onClick={() => setActiveCmsTab('backup')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeCmsTab === 'backup'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-700 hover:bg-stone-200/70'
              }`}
            >
              <Database className="w-4 h-4 text-amber-400" />
              <span>Cadangkan / Restore</span>
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            {/* TAB: ARTIKEL */}
            {activeCmsTab === 'artikel' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">
                      Manajemen Artikel & Blog
                    </h3>
                    <p className="text-xs text-stone-500">
                      Kelola konten artikel, tips, testimoni, dan berita terkait perlengkapan haji dan umroh.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      addNewArticle();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-all shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    Artikel Baru
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {data.articles.map((article) => (
                    <div
                      key={article.id}
                      className="flex items-start gap-4 p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100/70 transition-all group"
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-20 h-20 rounded-xl object-cover border border-stone-300 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                            {article.category}
                          </span>
                          {article.featured && (
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                              Featured
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-stone-900 truncate mb-1">
                          {article.title}
                        </h4>
                        <p className="text-xs text-stone-600 line-clamp-2 mb-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-stone-500">
                          <span>📅 {article.publishedDate}</span>
                          <span>⏱️ {article.readTime}</span>
                          <span>✍️ {article.author}</span>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingArticle(article);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PENGURUS */}
            {activeCmsTab === 'pengurus' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">
                      Manajemen Jajaran Pengurus & Direksi
                    </h3>
                    <p className="text-xs text-stone-500">
                      Kelola foto, nama, jabatan resmi, dan profil singkat seluruh dewan komisaris & direksi PT Sidya Sadaya Sejahtera.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      addNewBoardMember();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-all shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Pengurus Baru
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.boardMembers
                    .sort((a, b) => a.order - b.order)
                    .map((member) => (
                      <div
                        key={member.id}
                        className="flex items-start gap-4 p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100/70 transition-all group"
                      >
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-16 h-16 rounded-xl object-cover object-top border border-stone-300 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                              {member.category}
                            </span>
                            <span className="text-[10px] text-stone-400">
                              Urutan: #{member.order}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-stone-900 truncate">
                            {member.name}
                          </h4>
                          <p className="text-xs font-semibold text-emerald-800 truncate mb-1">
                            {member.title}
                          </p>
                          <p className="text-xs text-stone-500 line-clamp-2">
                            {member.bio}
                          </p>

                          <div className="mt-3 flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingMember(member);
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              Edit Foto & Jabatan
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Hapus pengurus ${member.name}?`)) {
                                  deleteBoardMember(member.id);
                                }
                              }}
                              className="p-1 text-stone-400 hover:text-red-600 rounded transition-colors"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB: PROFIL PERUSAHAAN */}
            {activeCmsTab === 'profil' && (
              <form onSubmit={handleSaveCompany} className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">
                      Profil Perusahaan PT Sidya Sadaya Sejahtera
                    </h3>
                    <p className="text-xs text-stone-500">
                      Identitas korporat, tahun berdiri, visi, misi, dan nilai-nilai amanah.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Simpan Profil Perusahaan
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Nama Resmi Perusahaan
                    </label>
                    <input
                      type="text"
                      value={companyForm.companyName}
                      onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Tahun Berdiri
                    </label>
                    <input
                      type="text"
                      value={companyForm.establishedYear}
                      onChange={(e) => setCompanyForm({ ...companyForm, establishedYear: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Tagline / Slogan Perusahaan
                  </label>
                  <input
                    type="text"
                    value={companyForm.tagline}
                    onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Latar Belakang & Kisah Pendirian
                  </label>
                  <textarea
                    rows={4}
                    value={companyForm.aboutStory}
                    onChange={(e) => setCompanyForm({ ...companyForm, aboutStory: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Visi Perusahaan
                  </label>
                  <textarea
                    rows={3}
                    value={companyForm.vision}
                    onChange={(e) => setCompanyForm({ ...companyForm, vision: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-stone-700">
                      Misi Perusahaan ({companyForm.missions.length})
                    </label>
                    <button
                      type="button"
                      onClick={addMission}
                      className="text-xs text-emerald-700 hover:text-emerald-800 font-bold inline-flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah Misi
                    </button>
                  </div>
                  <div className="space-y-2">
                    {companyForm.missions.map((misi, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-400 w-5">
                          {i + 1}.
                        </span>
                        <input
                          type="text"
                          value={misi}
                          onChange={(e) => updateMission(i, e.target.value)}
                          className="flex-1 px-3 py-1.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => removeMission(i)}
                          className="text-stone-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Angka Statistik */}
                <div className="pt-4 border-t border-stone-200">
                  <h4 className="text-sm font-bold text-stone-800 mb-3">
                    Angka Pencapaian & Statistik (Live Counter)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[11px] text-stone-500 block">Jamaah Terlayani</label>
                      <input
                        type="text"
                        value={companyForm.stats.pilgrimsServed}
                        onChange={(e) => setCompanyForm({
                          ...companyForm,
                          stats: { ...companyForm.stats, pilgrimsServed: e.target.value }
                        })}
                        className="w-full px-2.5 py-1.5 text-sm border rounded font-semibold text-emerald-800"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-500 block">Mitra KBIH & Travel</label>
                      <input
                        type="text"
                        value={companyForm.stats.kbihPartners}
                        onChange={(e) => setCompanyForm({
                          ...companyForm,
                          stats: { ...companyForm.stats, kbihPartners: e.target.value }
                        })}
                        className="w-full px-2.5 py-1.5 text-sm border rounded font-semibold text-emerald-800"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-500 block">Barang Terkirim</label>
                      <input
                        type="text"
                        value={companyForm.stats.itemsDelivered}
                        onChange={(e) => setCompanyForm({
                          ...companyForm,
                          stats: { ...companyForm.stats, itemsDelivered: e.target.value }
                        })}
                        className="w-full px-2.5 py-1.5 text-sm border rounded font-semibold text-emerald-800"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-500 block">Pusat Distribusi</label>
                      <input
                        type="text"
                        value={companyForm.stats.distributionCenters}
                        onChange={(e) => setCompanyForm({
                          ...companyForm,
                          stats: { ...companyForm.stats, distributionCenters: e.target.value }
                        })}
                        className="w-full px-2.5 py-1.5 text-sm border rounded font-semibold text-emerald-800"
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* TAB: APLIKASI SIDYA MOBILE & DESKTOP */}
            {activeCmsTab === 'aplikasi' && (
              <form onSubmit={handleSaveApps} className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">
                      Informasi Aplikasi: Sidya Mobile & Desktop
                    </h3>
                    <p className="text-xs text-stone-500">
                      Atur judul, peruntukan pengguna, versi, dan fitur utama untuk Jamaah (Mobile) dan KBIH/Seller (Desktop).
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Simpan Info Aplikasi
                  </button>
                </div>

                {/* Section Sidya Mobile */}
                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <Smartphone className="w-5 h-5" />
                    <span>Sidya Mobile (Untuk Jamaah)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Nama Aplikasi</label>
                      <input
                        type="text"
                        value={appsForm.mobile.appName}
                        onChange={(e) => setAppsForm({
                          ...appsForm,
                          mobile: { ...appsForm.mobile, appName: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-sm border rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Versi & Platform</label>
                      <input
                        type="text"
                        value={appsForm.mobile.version}
                        onChange={(e) => setAppsForm({
                          ...appsForm,
                          mobile: { ...appsForm.mobile, version: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-sm border rounded-lg bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Subjudul / Tagline Mobile</label>
                    <input
                      type="text"
                      value={appsForm.mobile.subtitle}
                      onChange={(e) => setAppsForm({
                        ...appsForm,
                        mobile: { ...appsForm.mobile, subtitle: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Deskripsi Lengkap</label>
                    <textarea
                      rows={2}
                      value={appsForm.mobile.description}
                      onChange={(e) => setAppsForm({
                        ...appsForm,
                        mobile: { ...appsForm.mobile, description: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border rounded-lg bg-white"
                    />
                  </div>
                </div>

                {/* Section Sidya Desktop */}
                <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100 space-y-4">
                  <div className="flex items-center gap-2 text-amber-900 font-bold">
                    <Package className="w-5 h-5 text-amber-700" />
                    <span>Sidya Desktop (Untuk KBIH, Agen Umroh, & Seller)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Nama Aplikasi Desktop</label>
                      <input
                        type="text"
                        value={appsForm.desktop.appName}
                        onChange={(e) => setAppsForm({
                          ...appsForm,
                          desktop: { ...appsForm.desktop, appName: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-sm border rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Versi & Dukungan OS</label>
                      <input
                        type="text"
                        value={appsForm.desktop.version}
                        onChange={(e) => setAppsForm({
                          ...appsForm,
                          desktop: { ...appsForm.desktop, version: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-sm border rounded-lg bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Subjudul / Peran</label>
                    <input
                      type="text"
                      value={appsForm.desktop.subtitle}
                      onChange={(e) => setAppsForm({
                        ...appsForm,
                        desktop: { ...appsForm.desktop, subtitle: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Deskripsi Lengkap</label>
                    <textarea
                      rows={2}
                      value={appsForm.desktop.description}
                      onChange={(e) => setAppsForm({
                        ...appsForm,
                        desktop: { ...appsForm.desktop, description: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border rounded-lg bg-white"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* TAB: KATALOG PERLENGKAPAN */}
            {activeCmsTab === 'katalog' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">
                      Katalog Perlengkapan Haji & Umroh
                    </h3>
                    <p className="text-xs text-stone-500">
                      Kelola koper, kain ihram, mukena, seragam, dan aksesoris yang didistribusikan.
                    </p>
                  </div>
                  <button
                    onClick={addNewCatalogItem}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-all shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Barang Katalog
                  </button>
                </div>

                <div className="space-y-4">
                  {data.catalog.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover border shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                              {item.category}
                            </span>
                            {item.popularBadge && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                                {item.popularBadge}
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-stone-900 text-sm mt-0.5">
                            {item.name}
                          </h4>
                          <p className="text-xs text-stone-500 line-clamp-1">
                            {item.description}
                          </p>
                          <span className="text-xs font-medium text-emerald-800">
                            Min Order: {item.minOrder} • Custom Logo: {item.customLogoAvailable ? 'Bisa' : 'Tidak'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            const newName = prompt('Ubah nama produk:', item.name);
                            if (newName) {
                              saveCatalogItem({ ...item, name: newName });
                            }
                          }}
                          className="px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg hover:bg-stone-100 font-medium"
                        >
                          Ubah Cepat
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus item "${item.name}"?`)) {
                              deleteCatalogItem(item.id);
                            }
                          }}
                          className="p-2 text-stone-400 hover:text-red-600 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: KONTAK & LOKASI */}
            {activeCmsTab === 'kontak' && (
              <form onSubmit={handleSaveContact} className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">
                      Informasi Kontak & Jam Operasional
                    </h3>
                    <p className="text-xs text-stone-500">
                      Nomor telepon, WhatsApp, email kemitraan, dan alamat kantor pusat.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Simpan Kontak
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Nomor WhatsApp Resmi
                    </label>
                    <input
                      type="text"
                      value={contactForm.whatsapp}
                      onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Telepon Kantor
                    </label>
                    <input
                      type="text"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Email Kemitraan KBIH & Travel
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Alamat Lengkap Kantor Pusat
                  </label>
                  <textarea
                    rows={3}
                    value={contactForm.address}
                    onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Jam Operasional & Layanan Musim Haji
                  </label>
                  <input
                    type="text"
                    value={contactForm.operatingHours}
                    onChange={(e) => setContactForm({ ...contactForm, operatingHours: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </form>
            )}

            {/* TAB: BACKUP & RESTORE */}
            {activeCmsTab === 'backup' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-stone-900">
                    Cadangan (Backup) & Pemulihan (Restore) Data
                  </h3>
                  <p className="text-xs text-stone-500">
                    Ekspor seluruh data website SIDYA dalam format JSON layaknya file XML WordPress untuk diamankan atau dipindahkan.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50 space-y-4">
                    <h4 className="font-bold text-stone-900 flex items-center gap-2">
                      <Database className="w-5 h-5 text-emerald-700" />
                      Ekspor Cadangan JSON
                    </h4>
                    <p className="text-xs text-stone-600">
                      Simpan seluruh data profil perusahaan, jajaran pengurus, katalog perlengkapan, dan kontak ke komputer Anda sebagai file .json.
                    </p>
                    <button
                      onClick={exportDataAsJson}
                      className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
                    >
                      Unduh File Backup Sekarang
                    </button>
                  </div>

                  <div className="p-6 rounded-2xl border border-red-200 bg-red-50/50 space-y-4">
                    <h4 className="font-bold text-red-900 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-red-700" />
                      Kembalikan ke Setelan Awal
                    </h4>
                    <p className="text-xs text-red-700">
                      Reset seluruh teks dan data pengurus kembali ke data asli PT Sidya Sadaya Sejahtera.
                    </p>
                    <button
                      onClick={resetToDefaults}
                      className="w-full py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
                    >
                      Reset Seluruh Data ke Default
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <span>PT Sidya Sadaya Sejahtera • Sistem Manajemen Konten Mandiri</span>
          <button
            onClick={() => setIsCmsModalOpen(false)}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg font-medium"
          >
            Tutup Panel
          </button>
        </div>
      </div>
    </div>
  );
};
