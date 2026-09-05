import React, { useState } from 'react';
import { X, Upload, Save } from 'lucide-react';

interface Banner {
  id: string | number;
  title: string;
  image: string;
  link?: string;
  status: 'active' | 'inactive';
  position: 'top' | 'middle' | 'bottom';
  startDate: string;
  endDate: string;
  order: number;
}

interface BannerEditorProps {
  banner?: Banner | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (banner: Banner) => void;
}

export default function BannerEditor({ banner, isOpen, onClose, onSave }: BannerEditorProps) {
  const [formData, setFormData] = useState<Banner>(
    banner || {
      id: Date.now().toString(),
      title: '',
      image: '',
      link: '',
      status: 'active',
      position: 'top',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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
    if (!formData.title.trim()) {
      alert('Judul banner tidak boleh kosong');
      return;
    }
    if (!formData.image.trim()) {
      alert('Gambar banner tidak boleh kosong');
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
            {banner ? 'Edit Banner' : 'Tambah Banner Baru'}
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
            {/* Judul Banner */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Judul Banner *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Contoh: Promosi Haji 2026"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Gambar Banner */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Gambar Banner *</label>
              <div className="space-y-3">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  {formData.image ? (
                    <div>
                      <img src={formData.image} alt="preview" className="w-full rounded-lg max-h-48 object-cover mb-3" />
                      <p className="text-xs text-slate-500 mb-2">Ukuran rekomendasi: 1920x600px</p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Klik untuk upload atau paste URL gambar</p>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Upload className="w-4 h-4" />
                  Upload dari Komputer
                </button>
              </div>
            </div>

            {/* Link Banner */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Link Tujuan (Opsional)</label>
              <input
                type="url"
                name="link"
                value={formData.link || ''}
                onChange={handleChange}
                placeholder="https://sidya.co.id/promo-haji"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Posisi & Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Posisi di Website</label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="top">Banner Atas (Hero)</option>
                  <option value="middle">Banner Tengah</option>
                  <option value="bottom">Banner Bawah</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>
            </div>

            {/* Tanggal Tayang */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Mulai</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Berakhir</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Urutan */}
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
              <p className="text-xs text-slate-500 mt-1">Angka lebih kecil = ditampilkan lebih dulu</p>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                💡 <strong>Tips:</strong> Gunakan gambar berkualitas tinggi dengan rasio 16:5 untuk hasil terbaik. Banner akan otomatis disembunyikan setelah tanggal berakhir.
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
            Simpan Banner
          </button>
        </div>
      </div>
    </div>
  );
}