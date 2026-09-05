import React, { useState } from 'react';
import { 
  FileText,
  Users,
  Image,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Edit2,
  Trash2,
  ChevronDown
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout?: () => void;
  activeMenu?: 'artikel' | 'pengurus' | 'banner' | 'popup' | 'pengaturan';
  onMenuChange?: (menu: 'artikel' | 'pengurus' | 'banner' | 'popup' | 'pengaturan') => void;
}

type AdminMenu = 'artikel' | 'pengurus' | 'banner' | 'popup' | 'pengaturan';

export default function AdminDashboard({ onLogout, activeMenu: propActiveMenu, onMenuChange }: AdminDashboardProps) {
  const [activeMenu, setActiveMenu] = useState<AdminMenu>(propActiveMenu || 'artikel');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sample data untuk artikel
  const [articles, setArticles] = useState([
    { id: 1, title: 'Panduan Persiapan Haji 2026', date: '2026-01-15', status: 'Published', author: 'Admin' },
    { id: 2, title: 'Tips Memilih Paket Umroh Terbaik', date: '2026-01-10', status: 'Draft', author: 'Admin' },
  ]);

  // Sample data untuk banner
  const [banners, setBanners] = useState([
    { id: 1, title: 'Banner Promosi Haji', image: '/placeholder-banner.jpg', status: 'Active' },
    { id: 2, title: 'Banner Umroh Spesial', image: '/placeholder-banner.jpg', status: 'Inactive' },
  ]);

  // Sample data untuk popup
  const [popups, setPopups] = useState([
    { id: 1, title: 'Popup Diskon Haji', content: 'Dapatkan diskon hingga 20%', status: 'Active' },
    { id: 2, title: 'Popup Newsletter', content: 'Daftar untuk mendapatkan update terbaru', status: 'Active' },
  ]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-emerald-800 text-white transition-all duration-300 shadow-lg flex flex-col`}>
        <div className="p-6 border-b border-emerald-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold">SIDYA Admin</h1>
                <p className="text-sm text-emerald-100">Manajemen Konten</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {/* Artikel */}
          <button
            onClick={() => {
              setActiveMenu('artikel');
              onMenuChange?.('artikel');
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeMenu === 'artikel'
                ? 'bg-emerald-600 text-white'
                : 'text-emerald-100 hover:bg-emerald-700'
            }`}
          >
            <FileText className="w-5 h-5" />
            {sidebarOpen && <span>Artikel & Blog</span>}
          </button>

          {/* Pengurus */}
          <button
            onClick={() => {
              setActiveMenu('pengurus');
              onMenuChange?.('pengurus');
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeMenu === 'pengurus'
                ? 'bg-emerald-600 text-white'
                : 'text-emerald-100 hover:bg-emerald-700'
            }`}
          >
            <Users className="w-5 h-5" />
            {sidebarOpen && <span>Kelola Pengurus</span>}
          </button>

          {/* Banner */}
          <button
            onClick={() => {
              setActiveMenu('banner');
              onMenuChange?.('banner');
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeMenu === 'banner'
                ? 'bg-emerald-600 text-white'
                : 'text-emerald-100 hover:bg-emerald-700'
            }`}
          >
            <Image className="w-5 h-5" />
            {sidebarOpen && <span>Kelola Banner</span>}
          </button>

          {/* Popup */}
          <button
            onClick={() => {
              setActiveMenu('popup');
              onMenuChange?.('popup');
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeMenu === 'popup'
                ? 'bg-emerald-600 text-white'
                : 'text-emerald-100 hover:bg-emerald-700'
            }`}
          >
            <Bell className="w-5 h-5" />
            {sidebarOpen && <span>Kelola Popup</span>}
          </button>

          {/* Pengaturan */}
          <button
            onClick={() => {
              setActiveMenu('pengaturan');
              onMenuChange?.('pengaturan');
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeMenu === 'pengaturan'
                ? 'bg-emerald-600 text-white'
                : 'text-emerald-100 hover:bg-emerald-700'
            }`}
          >
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span>Pengaturan</span>}
          </button>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-emerald-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-emerald-100 hover:bg-red-600 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">
              {activeMenu === 'artikel' && 'Manajemen Artikel & Blog'}
              {activeMenu === 'pengurus' && 'Kelola Pengurus'}
              {activeMenu === 'banner' && 'Kelola Banner'}
              {activeMenu === 'popup' && 'Kelola Popup'}
              {activeMenu === 'pengaturan' && 'Pengaturan Website'}
            </h2>
            <div className="text-sm text-slate-500">
              Halo, <span className="font-medium text-slate-800">Administrator</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {/* Artikel Menu */}
          {activeMenu === 'artikel' && <ArticleManagement articles={articles} setArticles={setArticles} />}
          
          {/* Pengurus Menu */}
          {activeMenu === 'pengurus' && <StaffManagement />}
          
          {/* Banner Menu */}
          {activeMenu === 'banner' && <BannerManagement banners={banners} setBanners={setBanners} />}
          
          {/* Popup Menu */}
          {activeMenu === 'popup' && <PopupManagement popups={popups} setPopups={setPopups} />}
          
          {/* Pengaturan Menu */}
          {activeMenu === 'pengaturan' && <SettingsManagement />}
        </div>
      </main>
    </div>
  );
}

// ============ ARTICLE MANAGEMENT COMPONENT ============
function ArticleManagement({ articles, setArticles }: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Daftar Artikel</h3>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-5 h-5" />
          Artikel Baru
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Judul</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Tanggal</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Penulis</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Status</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-slate-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article: any) => (
              <tr key={article.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-800 font-medium">{article.title}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{article.date}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{article.author}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    article.status === 'Published' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {article.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-sm">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 hover:bg-blue-100 text-blue-600 rounded transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ STAFF MANAGEMENT COMPONENT ============
function StaffManagement() {
  const [staff, setStaff] = useState([
    { id: 1, name: 'Budi Santoso', position: 'Direktur Utama', photo: '' },
    { id: 2, name: 'Siti Nurhaliza', position: 'Wakil Direktur', photo: '' },
    { id: 3, name: 'Ahmad Rizki', position: 'Manager Operasional', photo: '' },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Daftar Pengurus</h3>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-5 h-5" />
          Tambah Pengurus
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="w-20 h-20 bg-slate-200 rounded-lg mb-4"></div>
            <h4 className="text-lg font-semibold text-slate-800">{member.name}</h4>
            <p className="text-sm text-slate-600 mb-4">{member.position}</p>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button className="flex-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" />
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ BANNER MANAGEMENT COMPONENT ============
function BannerManagement({ banners, setBanners }: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Daftar Banner</h3>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-5 h-5" />
          Banner Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner: any) => (
          <div key={banner.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="w-full h-40 bg-slate-200 flex items-center justify-center">
              <span className="text-slate-400">Banner Preview</span>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-semibold text-slate-800 mb-2">{banner.title}</h4>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  banner.status === 'Active' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-slate-100 text-slate-800'
                }`}>
                  {banner.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button className="flex-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ POPUP MANAGEMENT COMPONENT ============
function PopupManagement({ popups, setPopups }: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Daftar Popup</h3>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-5 h-5" />
          Popup Baru
        </button>
      </div>

      <div className="space-y-4">
        {popups.map((popup: any) => (
          <div key={popup.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-semibold text-slate-800">{popup.title}</h4>
                <p className="text-sm text-slate-600 mt-1">{popup.content}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                popup.status === 'Active' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-slate-100 text-slate-800'
              }`}>
                {popup.status}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm font-medium transition-colors flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm font-medium transition-colors flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ SETTINGS MANAGEMENT COMPONENT ============
function SettingsManagement() {
  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Pengaturan Website</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Judul Website</label>
            <input type="text" defaultValue="SIDYA - Distribusi Perlengkapan Haji & Umroh" 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Meta Deskripsi</label>
            <textarea defaultValue="Platform resmi ekosistem distribusi perlengkapan haji dan umroh"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" rows={3} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Alamat Email Admin</label>
            <input type="email" defaultValue="admin@sidya.co.id"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
              Simpan Perubahan
            </button>
            <button className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors">
              Batalkan
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h4 className="font-semibold text-yellow-900 mb-3">Backup & Restore</h4>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium transition-colors">
            📥 Backup Data
          </button>
          <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium transition-colors">
            📤 Restore Data
          </button>
        </div>
      </div>
    </div>
  );
}