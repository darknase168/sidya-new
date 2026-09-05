import React, { useState } from 'react';
import { X, Upload, Eye, Save } from 'lucide-react';

interface Article {
  id: string | number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  status: 'draft' | 'published';
  author: string;
  tags: string[];
}

interface ArticleEditorProps {
  article?: Article | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: Article) => void;
}

export default function ArticleEditor({ article, isOpen, onClose, onSave }: ArticleEditorProps) {
  const [formData, setFormData] = useState<Article>(
    article || {
      id: Date.now().toString(),
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      image: '',
      category: 'umroh',
      date: new Date().toISOString().split('T')[0],
      status: 'draft',
      author: 'Admin',
      tags: [],
    }
  );

  const [previewMode, setPreviewMode] = useState(false);
  const [tagInput, setTagInput] = useState('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('Judul artikel tidak boleh kosong');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">
            {article ? 'Edit Artikel' : 'Tambah Artikel Baru'}
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
          {previewMode ? (
            // Preview Mode
            <div className="prose max-w-none">
              <h1 className="text-3xl font-bold mb-2">{formData.title}</h1>
              <div className="text-slate-500 mb-4">
                <span>oleh {formData.author} • {formData.date}</span>
              </div>
              {formData.image && (
                <div className="mb-6 rounded-lg overflow-hidden">
                  <img src={formData.image} alt={formData.title} className="w-full h-auto" />
                </div>
              )}
              <p className="text-slate-600 mb-4 italic">{formData.excerpt}</p>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: formData.content }} />
              <div className="mt-6 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span key={tag} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            // Edit Mode
            <div className="space-y-6">
              {/* Judul */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Judul Artikel</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Masukkan judul artikel"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">URL Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="url-artikel"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">https://sidya.co.id/blog/{formData.slug}</p>
              </div>

              {/* Gambar Feature */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Gambar Utama</label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-2 transition-colors">
                    <Upload className="w-4 h-4" />
                    Upload
                  </button>
                </div>
                {formData.image && (
                  <img src={formData.image} alt="preview" className="mt-3 rounded-lg max-h-48 object-cover" />
                )}
              </div>

              {/* Kategori */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Kategori</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="haji">Haji</option>
                    <option value="umroh">Umroh</option>
                    <option value="perlengkapan">Perlengkapan</option>
                    <option value="tips">Tips & Trik</option>
                    <option value="berita">Berita</option>
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
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ringkasan (Excerpt)</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Ringkasan singkat artikel untuk ditampilkan di daftar blog..."
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Konten Utama */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Konten Artikel</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Tulis konten artikel Anda di sini..."
                  rows={10}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">Anda dapat menggunakan HTML untuk format teks</p>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tags</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    placeholder="Tambah tag..."
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                  >
                    Tambah
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm"
                    >
                      <span>#{tag}</span>
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-emerald-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tanggal & Author */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Publikasi</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            {previewMode ? 'Kembali ke Edit' : 'Pratinjau'}
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
              Simpan Artikel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}