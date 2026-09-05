import React, { useState, useEffect, useRef } from 'react';
import { useCms } from '../../context/CmsContext';
import { BoardMember } from '../../types';
import { X, Upload, Check, Trash2, Camera, User, Sparkles } from 'lucide-react';

const PRESET_AVATARS = [
  { label: 'Pria Jas Formal 1', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
  { label: 'Wanita Hijab Bisnis 1', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
  { label: 'Pria Pimpinan Eksekutif', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' },
  { label: 'Pria Senior Direktur', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80' },
  { label: 'Pria Muda Eksekutif IT', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80' },
  { label: 'Wanita Hijab Eksekutif 2', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80' },
  { label: 'Pria Manager Kemitraan', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80' },
  { label: 'Wanita Hijab Desainer/QA', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
];

const COMMON_TITLES = [
  'Komisaris Utama',
  'Komisaris Independen',
  'Dewan Pengawas Syariah',
  'Direktur Utama (President Director)',
  'Direktur Operasional & Rantai Pasok',
  'Direktur Teknologi & Produk Digital (CTO)',
  'Direktur Keuangan & Kemitraan Strategis',
  'Head of KBIH & Travel Relations',
  'Head of Logistics & Embarkation Distribution',
  'Head of Quality Assurance & Custom Branding',
  'Manager Operasional Pengadaan Koper',
  'Manager Ekosistem Seller & Vendor'
];

export const EditPengurusModal: React.FC = () => {
  const { editingMember, setEditingMember, saveBoardMember, deleteBoardMember } = useCms();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<BoardMember | null>(null);
  const [photoTab, setPhotoTab] = useState<'url' | 'upload' | 'preset'>('upload');

  useEffect(() => {
    if (editingMember) {
      setFormData({ ...editingMember });
    } else {
      setFormData(null);
    }
  }, [editingMember]);

  if (!editingMember || !formData) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file foto maksimal 5 MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        const result = loadEvt.target?.result as string;
        if (result) {
          setFormData((prev) => (prev ? { ...prev, photo: result } : null));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.title.trim()) {
      alert('Nama dan Jabatan wajib diisi!');
      return;
    }
    saveBoardMember(formData);
  };

  const handleDelete = () => {
    if (window.confirm(`Hapus pengurus "${formData.name}"?`)) {
      deleteBoardMember(formData.id);
      setEditingMember(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        id="modal-edit-pengurus-card"
        className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden my-8"
      >
        {/* Header mirip WordPress Post Editor */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-800 rounded-sm">
              <User className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight uppercase tracking-wider">
                {formData.id.startsWith('board-') && formData.name === 'Nama Pengurus Lengkap, Gelar' ? 'Tambah Jajaran Pengurus Baru' : 'Edit Jajaran Pengurus'}
              </h3>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">
                PT Sidya Sadaya Sejahtera • Editor Profil &amp; Foto Instan
              </p>
            </div>
          </div>
          <button
            id="btn-close-edit-pengurus"
            onClick={() => setEditingMember(null)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-sm transition-colors"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Bagian Foto Pengurus */}
          <div className="bg-slate-50 p-5 rounded-md border border-slate-200">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Foto Pengurus / Dewan Direksi
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Preview Foto */}
              <div className="relative group shrink-0">
                <div className="w-28 h-28 rounded-md overflow-hidden ring-2 ring-emerald-600/40 shadow-sm bg-slate-200">
                  <img
                    src={formData.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'}
                    alt={formData.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 p-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-sm shadow-md transition-transform hover:scale-105"
                  title="Upload Foto Baru"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Kontrol Foto (Upload / Link URL / Preset) */}
              <div className="flex-1 w-full">
                <div className="flex border-b border-slate-200 mb-3 text-xs font-bold uppercase tracking-wider">
                  <button
                    type="button"
                    onClick={() => setPhotoTab('upload')}
                    className={`pb-2 px-3 border-b-2 transition-colors ${photoTab === 'upload' ? 'border-emerald-700 text-emerald-800' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                  >
                    Upload Perangkat
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoTab('url')}
                    className={`pb-2 px-3 border-b-2 transition-colors ${photoTab === 'url' ? 'border-emerald-700 text-emerald-800' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                  >
                    Tempel Link URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoTab('preset')}
                    className={`pb-2 px-3 border-b-2 transition-colors ${photoTab === 'preset' ? 'border-emerald-700 text-emerald-800' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                  >
                    Pilihan Contoh
                  </button>
                </div>

                {photoTab === 'upload' && (
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                      id="input-file-pengurus-photo"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-sm text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 hover:border-emerald-600 shadow-sm transition-all"
                    >
                      <Upload className="w-4 h-4 text-emerald-600" />
                      Pilih Foto dari Komputer/HP (JPG/PNG)
                    </button>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Foto langsung disimpan di browser (tanpa perlu hosting eksternal).
                    </p>
                  </div>
                )}

                {photoTab === 'url' && (
                  <div>
                    <input
                      type="url"
                      value={formData.photo}
                      onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                      placeholder="https://contoh.com/foto-pengurus.jpg"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Masukkan URL gambar langsung yang dapat diakses publik.
                    </p>
                  </div>
                )}

                {photoTab === 'preset' && (
                  <div className="grid grid-cols-4 gap-2 max-h-28 overflow-y-auto p-1">
                    {PRESET_AVATARS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, photo: preset.url })}
                        className={`group relative rounded-sm overflow-hidden border-2 transition-all ${formData.photo === preset.url ? 'border-emerald-600 ring-2 ring-emerald-500/40' : 'border-transparent hover:border-slate-400'}`}
                        title={preset.label}
                      >
                        <img src={preset.url} alt={preset.label} className="w-full h-12 object-cover" />
                        <span className="text-[10px] text-slate-700 block truncate p-0.5 bg-slate-100 text-center font-medium">
                          {preset.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Nama & Gelar */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Nama Lengkap &amp; Gelar Kehormatan / Akademik <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: H. Muhammad Faisal Sadaya, S.E., M.M."
              className="w-full px-4 py-2 text-sm border border-slate-300 rounded-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none font-medium"
            />
          </div>

          {/* Jabatan & Kategori Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Jabatan / Posisi Resmi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Contoh: Direktur Utama (President Director)"
                className="w-full px-4 py-2 text-sm border border-slate-300 rounded-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
              {/* Quick suggestions */}
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="text-[10px] text-slate-400 self-center mr-1 uppercase font-bold">Rekomendasi:</span>
                {COMMON_TITLES.slice(0, 4).map((t, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormData({ ...formData, title: t })}
                    className="text-[10px] px-1.5 py-0.5 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-600 rounded-sm border border-slate-200 transition-colors uppercase font-medium"
                  >
                    {t.split(' (')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Tingkat / Dewan Pengurus <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as BoardMember['category'] })}
                className="w-full px-4 py-2 text-sm border border-slate-300 rounded-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white font-medium"
              >
                <option value="komisaris">Dewan Komisaris &amp; Pengawas Syariah</option>
                <option value="direksi">Dewan Direksi (Board of Directors)</option>
                <option value="manajemen">Kepala Divisi &amp; Manajemen Eksekutif</option>
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Pengurus akan dikelompokkan sesuai tab dewan di halaman publik.
              </p>
            </div>
          </div>

          {/* Bio / Riwayat Singkat */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Profil Singkat / Peran Strategis di SIDYA
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tuliskan pengalaman, rekam jejak, dan kontribusi beliau bagi ekosistem haji dan umroh..."
              className="w-full px-4 py-2 text-sm border border-slate-300 rounded-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Kontak & Urutan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Resmi
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="nama@sidya.co.id"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.linkedin || ''}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Urutan Tampilan
              </label>
              <input
                type="number"
                min="1"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {formData.id && !formData.id.startsWith('temp-') ? (
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-700 hover:bg-red-50 rounded-sm transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Hapus Pengurus
              </button>
            ) : <div />}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-sm transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                id="btn-save-pengurus-data"
                className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm transition-all"
              >
                <Check className="w-4 h-4" />
                Simpan Data Pengurus
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
