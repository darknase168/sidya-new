# 📝 Article Management System - Feature Guide

**Status:** ✅ READY FOR USE  
**Date:** September 4, 2026  
**Version:** 1.0

---

## 📋 Overview

Fitur artikel management memungkinkan admin untuk membuat, mengedit, dan menghapus artikel/blog posts ketika sudah login. Sistem ini terintegrasi penuh dengan admin panel CMS Sidya.

---

## ✨ Fitur Utama

### **1. Create Article (Buat Artikel Baru)**
- ✅ Buat artikel dengan judul, kategori, konten lengkap
- ✅ Upload gambar sampul custom
- ✅ Set tanggal publikasi
- ✅ Tentukan waktu baca estimasi
- ✅ Mark sebagai Featured

### **2. Edit Article (Edit Artikel)**
- ✅ Edit judul, konten, kategori
- ✅ Ganti gambar sampul
- ✅ Update meta info (penulis, tanggal, read time)
- ✅ Toggle featured status

### **3. Delete Article (Hapus Artikel)**
- ✅ Hapus artikel dengan konfirmasi
- ✅ Hapus gambar terkait
- ✅ Auto-update daftar artikel

### **4. Article List**
- ✅ Tampilkan semua artikel di CMS Dashboard
- ✅ Preview gambar sampul
- ✅ Lihat metadata (kategori, featured status)
- ✅ Quick access tombol edit

---

## 🎯 How to Use

### **Access Article Management**

```
1. Login dengan akun admin
   - Username: admin
   - Password: password123

2. Klik Shield button (bottom-right)

3. Di Dasbor CMS, pilih tab "Artikel"
   atau
   Dari WordPressAdminBar, klik "Dasbor Konten CMS"
```

### **Create New Article**

```
1. Di tab Artikel, klik tombol "+ Artikel Baru"
2. Modal ArticleEditor akan terbuka
3. Isi form:
   - Judul Artikel
   - Slug URL (auto-generate)
   - Kategori (misal: Tips & Trik, Testimoni, Proses Bisnis)
   - Gambar Sampul (upload atau pilih URL)
   - Ringkasan (excerpt)
   - Konten Lengkap
   - Penulis, Tanggal Publikasi, Waktu Baca
4. Klik "Simpan Artikel"
```

### **Edit Article**

```
1. Di tab Artikel, lihat daftar artikel
2. Cari artikel yang ingin diedit
3. Klik tombol "Edit" pada artikel
4. Modal ArticleEditor akan terbuka dengan data terisi
5. Ubah field yang diperlukan
6. Klik "Simpan Artikel"
```

### **Delete Article**

```
1. Di modal ArticleEditor, klik tombol "Hapus Artikel"
2. Confirm konfirmasi penghapusan
3. Artikel akan dihapus dari sistem
```

---

## 📊 Data Structure

### **Article Interface**

```typescript
interface Article {
  id: string;              // Unique ID (auto-generated)
  title: string;           // Judul artikel
  slug: string;            // URL slug (auto-converted from title)
  category: string;        // Kategori (Tips & Trik, Testimoni, dll)
  featured: boolean;       // Apakah artikel featured
  image: string;           // URL gambar sampul
  excerpt: string;         // Ringkasan singkat
  content: string;         // Konten lengkap artikel
  author: string;          // Nama penulis
  publishedDate: string;   // Tanggal publikasi (YYYY-MM-DD)
  readTime: string;        // Estimasi waktu baca (misal: "5 menit")
}
```

---

## 🗂️ File Structure

```
src/
├── types.ts                           (UPDATED)
│   └── Added: Article interface
├── data/
│   └── defaultData.ts                (UPDATED)
│       └── Added: articles array with sample data
├── context/
│   └── CmsContext.tsx                (UPDATED)
│       ├── Added: editingArticle state
│       ├── Added: setEditingArticle hook
│       ├── Added: saveArticle function
│       ├── Added: deleteArticle function
│       └── Added: addNewArticle function
├── components/
│   ├── cms/
│   │   ├── ArticleEditor.tsx          (NEW)
│   │   │   └── Modal untuk edit artikel
│   │   └── CmsModal.tsx               (UPDATED)
│   │       ├── Added: artikel tab button
│   │       ├── Added: artikel tab content
│   │       └── Added: setEditingArticle
│   └── App.tsx                        (UPDATED)
│       └── Added: <ArticleEditor /> component
```

---

## 🎨 UI Components

### **CmsModal - Artikel Tab**
- Menampilkan daftar semua artikel
- Preview gambar sampul
- Metadata badges (kategori, featured status)
- Tombol "+ Artikel Baru" untuk membuat
- Tombol "Edit" di setiap artikel

### **ArticleEditor Modal**
- Form lengkap untuk editing artikel
- Image upload dengan preview
- Textarea untuk konten panjang
- Meta info fields (penulis, tanggal, read time)
- Tombol Save & Delete dengan konfirmasi

---

## 🔧 Implementation Details

### **Add New Article Flow**
```
User klik "+ Artikel Baru"
    ↓
addNewArticle() di CmsContext
    ↓
Create default Article object
    ↓
setEditingArticle(newArticle)
    ↓
ArticleEditor modal muncul
    ↓
User fill form & klik Simpan
    ↓
saveArticle(article) di CmsContext
    ↓
setData update articles array
    ↓
localStorage auto-save
    ↓
showNotification("Berhasil disimpan")
```

### **Edit Article Flow**
```
User klik "Edit" di artikel list
    ↓
setEditingArticle(article)
    ↓
ArticleEditor modal muncul dengan data terisi
    ↓
User ubah field
    ↓
User klik Simpan
    ↓
saveArticle(updatedArticle)
    ↓
Update existing article di array
    ↓
localStorage auto-save
```

### **Delete Article Flow**
```
User klik "Hapus Artikel"
    ↓
window.confirm("Apakah yakin?")
    ↓
Jika Yes: deleteArticle(id)
    ↓
Filter articles array
    ↓
localStorage auto-save
    ↓
Modal close & setEditingArticle(null)
```

---

## 📱 Sample Articles (Included)

### **Article 1: Tips Memilih Perlengkapan Haji**
- Category: Tips & Trik
- Featured: Yes
- Content: Panduan lengkap memilih koper, kain ihram, dan aksesoris

### **Article 2: Testimoni Jamaah**
- Category: Testimoni
- Featured: Yes
- Content: Pengalaman jamaah menggunakan layanan Sidya

### **Article 3: Proses Kustomisasi Logo**
- Category: Proses Bisnis
- Featured: No
- Content: Penjelasan proses kustomisasi untuk travel dan KBIH

---

## 💾 Data Persistence

- Semua artikel disimpan di **localStorage** browser
- Auto-save setiap kali ada perubahan
- Backup/Restore tersedia di tab "Cadangkan / Restore" di CMS
- Export data sebagai JSON file
- Import data dari JSON file

---

## 🔐 Access Control

- ✅ Hanya admin yang sudah login bisa edit artikel
- ✅ Tab Artikel hanya muncul di CmsModal saat login
- ✅ ArticleEditor modal hidden tanpa login
- ✅ Public users hanya bisa lihat artikel, tidak bisa edit

---

## 🎯 Best Practices

### **Untuk Judul Artikel**
- Gunakan judul yang deskriptif dan menarik
- Max 80 karakter untuk tampil optimal
- Hindari karakter khusus

### **Untuk Slug**
- Auto-generate dari judul (replace spasi dengan dash)
- Gunakan lowercase
- Contoh: "Panduan Memilih Koper" → "panduan-memilih-koper"

### **Untuk Konten**
- Gunakan paragraf pendek (3-5 kalimat)
- Tambahkan sub-heading dengan format:
  ```
  Bagian 1: Judul Bagian
  [konten]
  
  Bagian 2: Judul Bagian
  [konten]
  ```
- Max panjang konten: sesuai kebutuhan (tidak ada limit)

### **Untuk Gambar**
- Ukuran optimal: 800x400px (aspect ratio 2:1)
- Format: PNG, JPG, WEBP
- Max file size: 5 MB
- Gunakan gambar berkualitas tinggi

### **Untuk Read Time**
- Hitung dengan rumus: jumlah kata ÷ 200 = menit
- Contoh: 1000 kata ÷ 200 = 5 menit
- Gunakan estimasi realistis

---

## 📊 Article Categories (Recommended)

```
- Tips & Trik           (Panduan praktis)
- Testimoni             (Pengalaman jamaah)
- Proses Bisnis         (Penjelasan proses)
- Berita                (Informasi terbaru)
- FAQ                   (Pertanyaan umum)
- Update Produk         (Produk baru/update)
- Pelatihan             (Tutorial/training)
```

---

## ✅ Checklist Sebelum Publish

- [ ] Judul jelas dan deskriptif
- [ ] Slug URL sudah benar
- [ ] Kategori dipilih dengan tepat
- [ ] Gambar sampul sudah upload
- [ ] Ringkasan (excerpt) menarik
- [ ] Konten lengkap dan tidak ada typo
- [ ] Penulis tercantum
- [ ] Tanggal publikasi benar
- [ ] Read time sudah diisi
- [ ] Apakah perlu featured? (toggle jika ya)
- [ ] Preview sekali sebelum simpan

---

## 🐛 Troubleshooting

### **Artikel tidak muncul di list**
- Cek apakah sudah login
- Refresh halaman
- Cek browser console untuk error

### **Gambar tidak ter-upload**
- Pastikan file < 5 MB
- Format harus PNG/JPG/WEBP
- Coba gunakan gambar URL langsung

### **Changes tidak tersimpan**
- Cek localStorage di browser settings
- Tidak ada storage quota error?
- Coba clear cache dan refresh

---

## 🚀 Future Enhancements

Fitur yang bisa ditambahkan di masa depan:
1. Rich text editor (untuk formatting lebih baik)
2. Tag system untuk artikel
3. Search/filter artikel
4. SEO optimization fields
5. Article preview sebelum publish
6. Scheduled publishing
7. Revisi history/versioning
8. Comment system untuk artikel

---

## 📞 Support

Untuk pertanyaan atau masalah dengan article management:
1. Cek dokumentasi ini terlebih dahulu
2. Lihat browser console untuk error messages
3. Coba clear localStorage dan refresh
4. Contact admin Sidya jika masalah berlanjut

---

## ✅ Status Summary

| Feature | Status | Details |
|---------|--------|---------|
| Create Article | ✅ Done | Buat artikel baru dengan form lengkap |
| Edit Article | ✅ Done | Edit konten, gambar, metadata |
| Delete Article | ✅ Done | Hapus dengan konfirmasi |
| Article List | ✅ Done | Tampilkan semua artikel di CMS |
| Image Upload | ✅ Done | Upload gambar sampul |
| Default Articles | ✅ Done | 3 sampel artikel sudah tersedia |
| Access Control | ✅ Done | Hanya admin yang bisa edit |
| Data Persistence | ✅ Done | Auto-save ke localStorage |

---

**Article Management System: READY FOR PRODUCTION ✅**

Enjoy managing your articles! 📝✨

---

*Documentation Created: September 4, 2026*  
*Version: 1.0*  
*Last Updated: September 4, 2026*