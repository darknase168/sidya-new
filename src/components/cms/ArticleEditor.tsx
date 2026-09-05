import React, { useState, useEffect, useRef } from 'react';
import { useCms } from '../../context/CmsContext';
import { Article } from '../../types';
import { X, Upload, Check, Trash2, Image as ImageIcon } from 'lucide-react';

export const ArticleEditor: React.FC = () => {
  const { editingArticle, setEditingArticle, saveArticle, deleteArticle } = useCms();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Article | null>(null);

  useEffect(() => {
    if (editingArticle) {
      setFormData({ ...editingArticle });
    } else {
      setFormData(null);
    }
  }, [editingArticle]);

  if (!editingArticle || !formData) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file gambar maksimal 5 MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        const result = loadEvt.target?.result as string;
        if (result) {
          setFormData((prev) => (prev ? { ...prev, image: result } : null));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Judul dan konten artikel wajib diisi!');
      return;
    }
    saveArticle(formData);
  };

  const handleDelete = () => {
    if (window.confirm(`Hapus artikel "${formData.title}"?`)) {
      deleteArticle(formData.id);
      setEditingArticle(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[90vh] my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-900 text-white border-b border-stone-800 shrink-0">
          <div>
            <h2 className="font-bold text-lg text-white">
              {editingArticle.id.startsWith('art-') && !editingArticle.id.includes(Date.now().toString().slice(0, 3)) ? 'Edit Artikel' : 'Artikel Baru'}
            </h2>
            <p className="text-xs text-stone-400">Kelola konten artikel, gambar, kategori, dan publikasi</p>
          </div>
          <button
            onClick={() => setEditingArticle(null)}
            className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-stone-900 mb-2">
              Judul Artikel
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Masukkan judul artikel"
              className="w-full px-4 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-bold text-stone-900 mb-2">
              Slug URL (untuk permalink)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
              placeholder="judul-artikel-baru"
              className="w-full px-4 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Category & Featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-2">
                Kategori
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Tips & Trik"
                className="w-full px-4 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-stone-300"
                />
                <span className="text-sm font-semibold text-stone-700">Jadikan Artikel Featured</span>
              </label>
            </div>
          </div>

          {/* Image Section */}
          <div>
            <label className="block text-sm font-bold text-stone-900 mb-3">
              Gambar Sampul Artikel
            </label>
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-lg border-2 border-dashed border-stone-300 overflow-hidden flex items-center justify-center bg-stone-50">
                {formData.image ? (
                  <img src={formData.image} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-stone-400" />
                )}
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold rounded-lg transition-colors inline-flex items-center gap-2 w-fit"
                >
                  <Upload className="w-4 h-4" />
                  Upload Gambar
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <p className="text-xs text-stone-500">PNG, JPG, WEBP • Max 5 MB</p>
                {formData.image && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold"
                  >
                    Hapus Gambar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-bold text-stone-900 mb-2">
              Ringkasan (Excerpt)
            </label>
            <textarea
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Ringkasan singkat artikel untuk ditampilkan di daftar artikel"
              className="w-full px-4 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-bold text-stone-900 mb-2">
              Konten Artikel
            </label>
            <textarea
              rows={8}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Tulis konten artikel lengkap Anda di sini. Anda dapat menggunakan paragraf, daftar, dan pemformatan teks biasa."
              className="w-full px-4 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
            />
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-stone-50 rounded-lg border border-stone-200">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Penulis
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-2 py-1 text-xs border rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Tanggal Publikasi
              </label>
              <input
                type="date"
                value={formData.publishedDate}
                onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                className="w-full px-2 py-1 text-xs border rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Waktu Baca
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="5 menit"
                className="w-full px-2 py-1 text-xs border rounded-lg bg-white"
              />
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-50 border-t border-stone-200 shrink-0">
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 text-red-600 hover:text-red-700 font-bold text-sm inline-flex items-center gap-2 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Hapus Artikel
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setEditingArticle(null)}
              className="px-4 py-2 text-stone-700 hover:text-stone-900 font-bold text-sm transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              onClick={handleSave}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-lg shadow-md transition-all inline-flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Simpan Artikel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
