import React, { useState } from 'react';
import { X, Save, Eye, EyeOff } from 'lucide-react';

interface Popup {
  id: string | number;
  title: string;
  content: string;
  type: 'newsletter' | 'promo' | 'info' | 'warning';
  image?: string;
  buttonText?: string;
  buttonLink?: string;
  status: 'active' | 'inactive';
  displayOnce: boolean;
  startDate: string;
  endDate: string;
  delay: number; // dalam detik
}

interface PopupEditorProps {
  popup?: Popup | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (popup: Popup) => void;
}

export default function PopupEditor({ popup, isOpen, onClose, onSave }: PopupEditorProps) {
  const [formData, setFormData] = useState<Popup>(
    popup || {
      id: Date.now().toString(),
      title: '',
      content: '',
      type: 'info',
      image: '',
      buttonText: '',
      buttonLink: '',
      status: 'active',
      displayOnce: true,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      delay: 2,
    }
  );

  const [showPreview, setShowPreview] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type: inputType } = e.target;
    if (inputType === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checkbox.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('Judul popup tidak boleh kosong');
      return;
    }
    if (!formData.content.trim()) {
      alert('Konten popup tidak boleh kosong');
      return;
    }
    onSave(formData);
    onClose();
  };

  const getTypeColor = () => {
    switch (formData.type) {
      case 'newsletter':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'promo':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'info':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'warning':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">
            {popup ? 'Edit Popup' : 'Tambah Popup Baru'}
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
            {/* Judul */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Judul Popup *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Contoh: Dapatkan Penawaran Spesial"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Tipe Popup */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tipe Popup</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="info">📋 Informasi Umum</option>
                <option value="newsletter">📧 Newsletter</option>
                <option value="promo">🎉 Promosi</option>
                <option value="warning">⚠️ Peringatan</option>
              </select>
            </div>

            {/* Konten Utama */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Konten Popup *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Tuliskan pesan atau konten yang akan ditampilkan di popup..."
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <p className="text-xs text-slate-500 mt-1">{formData.content.length} / 1000 karakter</p>
            </div>

            {/* Gambar (Opsional) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Gambar (Opsional)</label>
              <input
                type="text"
                name="image"
                value={formData.image || ''}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              {formData.image && (
                <img src={formData.image} alt="preview" className="mt-3 rounded-lg max-h-32 object-cover" />
              )}
            </div>

            {/* Tombol CTA */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Teks Tombol</label>
                <input
                  type="text"
                  name="buttonText"
                  value={formData.buttonText || ''}
                  onChange={handleChange}
                  placeholder="Contoh: Selengkapnya"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Link Tombol</label>
                <input
                  type="url"
                  name="buttonLink"
                  value={formData.buttonLink || ''}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Status & Pengaturan */}
            <div className="space-y-3">
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

              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <input
                  type="checkbox"
                  id="displayOnce"
                  name="displayOnce"
                  checked={formData.displayOnce}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-300"
                />
                <label htmlFor="displayOnce" className="text-sm text-slate-700">
                  Tampilkan hanya sekali per user (menggunakan cookie)
                </label>
              </div>
            </div>

            {/* Waktu Tayang */}
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

            {/* Delay Tampil */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Delay Tampil (detik)</label>
              <input
                type="number"
                name="delay"
                value={formData.delay}
                onChange={handleChange}
                min="0"
                max="30"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <p className="text-xs text-slate-500 mt-1">Popup akan muncul {formData.delay} detik setelah halaman dimuat</p>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                💡 <strong>Tips:</strong> Gunakan popup dengan bijak untuk tidak mengganggu pengalaman pengguna. Rekomendasi: gunakan delay 2-3 detik.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPreview ? 'Sembunyikan' : 'Pratinjau'}
          </button>

          <div className="flex gap-3">
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
              Simpan Popup
            </button>
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[60]" onClick={() => setShowPreview(false)}>
            <div className={`bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden ${getTypeColor()} border-2`}>
              {formData.image && (
                <img src={formData.image} alt="popup" className="w-full h-40 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{formData.title}</h3>
                <p className="mb-4 text-sm">{formData.content}</p>
                {formData.buttonText && (
                  <button className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                    {formData.buttonText}
                  </button>
                )}
                <button 
                  onClick={() => setShowPreview(false)}
                  className="w-full mt-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}