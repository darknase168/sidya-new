import React, { useRef } from 'react';
import { useCms } from '../../context/CmsContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Edit3, 
  Eye, 
  UserPlus, 
  Settings, 
  Download, 
  Upload, 
  RotateCcw, 
  CheckCircle2, 
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';

export const WordPressAdminBar: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { 
    isEditMode, 
    toggleEditMode, 
    addNewBoardMember, 
    setIsCmsModalOpen, 
    setActiveCmsTab, 
    resetToDefaults,
    exportDataAsJson,
    importDataFromJson,
    notification
  } = useCms();

  // Hanya tampilkan admin bar jika user sudah login
  if (!isLoggedIn) {
    return null;
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          importDataFromJson(text);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      {/* Top Admin Bar ala WordPress WP-Admin Toolbar */}
      <aside 
        id="wp-admin-bar-sidya"
        aria-label="Panel Pengelola Website"
        className="sticky top-0 z-40 w-full bg-stone-900 border-b border-stone-800 text-stone-200 text-xs px-3 sm:px-6 py-2 shadow-lg transition-all select-none"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Logo & Status Mode */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-bold text-white bg-emerald-800/80 px-2.5 py-1 rounded border border-emerald-700/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="tracking-wide">SIDYA WP-Engine</span>
            </div>

            <button
              id="btn-toggle-edit-mode"
              onClick={toggleEditMode}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-all ${
                isEditMode
                  ? 'bg-amber-500 hover:bg-amber-600 text-stone-950 ring-2 ring-amber-300/40'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
              }`}
            >
              {isEditMode ? (
                <>
                  <Edit3 className="w-3.5 h-3.5" />
                  Mode Edit Aktif (Klik untuk Preview)
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  Tampilan Publik (Aktifkan Mode Edit)
                </>
              )}
            </button>
          </div>

          {/* Quick Actions (Mirip barisan menu WordPress Dashboard) */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            <button
              id="btn-wp-add-pengurus"
              onClick={() => {
                addNewBoardMember();
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-stone-800 hover:bg-emerald-800 hover:text-white text-stone-300 transition-colors"
              title="Tambah foto & profil pengurus baru"
            >
              <UserPlus className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">+ Pengurus Baru</span>
              <span className="sm:hidden">+ Pengurus</span>
            </button>

            <button
              id="btn-wp-open-cms"
              onClick={() => {
                setActiveCmsTab('pengurus');
                setIsCmsModalOpen(true);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              title="Buka Dasbor Pengelola Lengkap"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Dasbor Konten CMS</span>
            </button>

            <button
              id="btn-wp-edit-profil-pt"
              onClick={() => {
                setActiveCmsTab('profil');
                setIsCmsModalOpen(true);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              title="Ubah Visi, Misi, Legalitas PT Sidya"
            >
              <Settings className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden lg:inline">Profil PT Sidya</span>
            </button>

            <button
              id="btn-wp-export-json"
              onClick={exportDataAsJson}
              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              title="Unduh Cadangan Data (Backup JSON)"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Backup</span>
            </button>

            <label
              htmlFor="wp-import-file-input"
              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer transition-colors"
              title="Pulihkan Data dari JSON"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restore</span>
              <input
                id="wp-import-file-input"
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </label>

            <button
              id="btn-wp-reset-default"
              onClick={resetToDefaults}
              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-stone-800 hover:bg-red-900/60 hover:text-red-200 text-stone-400 transition-colors"
              title="Kembalikan ke data awal bawaan sistem"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Reset</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-500/40 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-sm font-medium">{notification}</p>
        </div>
      )}

      {/* Mode Edit Banner Indicator */}
      {isEditMode && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-amber-700" />
            <span>
              <strong>Mode Edit Visual Sedang Aktif:</strong> Anda dapat menekan tombol &ldquo;Edit Foto &amp; Jabatan&rdquo; di setiap kartu pengurus, atau gunakan tombol Dasbor CMS di atas untuk mengubah profil perusahaan.
            </span>
          </div>
          <button
            onClick={toggleEditMode}
            className="text-amber-800 underline font-semibold hover:text-amber-950 ml-4 shrink-0"
          >
            Selesai / Tutup Mode Edit
          </button>
        </div>
      )}
    </>
  );
};
