import React, { useState } from 'react';
import { X, Upload, Save } from 'lucide-react';

interface StaffMember {
  id: string | number;
  name: string;
  position: string;
  category: 'direksi' | 'manajemen' | 'tim';
  photo: string;
  bio: string;
  email: string;
  phone: string;
  linkedin?: string;
  order: number;
}

interface StaffEditorProps {
  staff?: StaffMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (staff: StaffMember) => void;
}

export default function StaffEditor({ staff, isOpen, onClose, onSave }: StaffEditorProps) {
  const [formData, setFormData] = useState<StaffMember>(
    staff || {
      id: Date.now().toString(),
      name: '',
      position: '',
      category: 'manajemen',
      photo: '',
      bio: '',
      email: '',
      phone: '',
      linkedin: '',
      order: 1,
    }
  );

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert('Nama pengurus tidak boleh kosong');
      return;
    }
    if (!formData.position.trim()) {
      alert('Posisi/Jabatan tidak boleh kosong');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">
            {staff ? 'Edit Pengurus' : 'Tambah Pengurus Baru'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="space-y-6">
            {/* Foto Profil */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Foto Profil</label>
              <div className="flex gap-4">
                <div className="w-32 h-32 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-slate-50">
                  {formData.photo ? (
                    <img src={formData.photo} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-slate-400 text-center text-sm">Foto</span>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="photo"
                    value={formData.photo}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 mb-2"
                  />
                  <button className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <Upload className="w-4 h-4" />
                    Upload Foto
                  </button>
                </div>
              </div>
            </div>

            {/* Nama & Posisi */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Jabatan/Posisi *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Contoh: Direktur Utama"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Kategori & Urutan */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Kategori</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="direksi">Dewan Direksi</option>
                  <option value="manajemen">Manajemen</option>
                  <option value="tim">Tim</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Urutan Tampil</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  placeholder="1"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@sidya.co.id"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">No. Telepon</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+62 123 456 789"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin || ''}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Biografi */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Biografi / Deskripsi</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tuliskan pengalaman, pencapaian, dan peran strategis di PT Sidya Sadaya Sejahtera..."
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <p className="text-xs text-slate-500 mt-1">{formData.bio.length} / 500 karakter</p>
            </div>

            {/* Info Tambahan */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                💡 <strong>Tips:</strong> Pastikan foto profil berkualitas tinggi dan biografi informatif untuk kesan profesional yang baik.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            Simpan Pengurus
          </button>
        </div>
      </div>
    </div>
  );
}