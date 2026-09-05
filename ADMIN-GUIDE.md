# SIDYA Admin Panel - Panduan Lengkap

## 📋 Daftar Isi
1. [Overview](#overview)
2. [Cara Mengakses Admin Panel](#cara-mengakses-admin-panel)
3. [Fitur Admin](#fitur-admin)
4. [Kredensial Demo](#kredensial-demo)
5. [Struktur File](#struktur-file)
6. [Panduan Penggunaan Setiap Menu](#panduan-penggunaan-setiap-menu)

---

## 📌 Overview

Admin Panel SIDYA adalah sistem manajemen konten untuk mengelola website distribusi perlengkapan haji dan umroh. Panel admin **hanya tampil saat administrator login** dan berfungsi untuk:

- ✍️ **Mengelola Artikel & Blog** - Buat, edit, publikasikan artikel
- 👥 **Kelola Pengurus** - Tambah, edit foto dan data pengurus
- 🖼️ **Kelola Banner** - Upload banner promosi dengan jadwal tayang
- 📢 **Kelola Popup** - Buat popup notifikasi, newsletter, promo
- ⚙️ **Pengaturan Website** - Konfigurasi dasar website

---

## 🚪 Cara Mengakses Admin Panel

### **Method 1: Melalui Floating Button**
1. Cari tombol **Shield** berwarna hijau di sudut kanan bawah halaman website
2. Klik tombol tersebut untuk membuka login modal
3. Masukkan kredensial admin

### **Method 2: Keyboard Shortcut**
- **Tekan Alt + A** - Buka Admin Panel (jika sudah login)
- **Tekan Alt + L** - Logout (jika sudah login)

### **Method 3: Halaman Admin Dedicated**
Akses langsung ke: `http://localhost:3000/admin.html`

---

## 🔐 Kredensial Demo

```
Username: admin
Password: password123
```

> ⚠️ **Catatan:** Ini adalah kredensial demo. Untuk production, ganti dengan sistem autentikasi yang lebih aman.

---

## 🎯 Fitur Admin

### **1. Menu Artikel & Blog**
Kelola semua artikel dan blog post website.

**Fitur:**
- ✅ Buat artikel baru
- ✅ Edit judul, slug auto-generate
- ✅ Upload gambar feature
- ✅ Kategori artikel (Haji, Umroh, Perlengkapan, Tips, Berita)
- ✅ Draft atau Publish langsung
- ✅ Ringkasan (excerpt)
- ✅ Konten lengkap dengan HTML support
- ✅ Tambah tags
- ✅ Set tanggal publikasi
- ✅ Pratinjau sebelum publish

### **2. Menu Kelola Pengurus**
Manajemen data pengurus dan direksi.

**Fitur:**
- ✅ Tambah pengurus baru
- ✅ Upload foto profil
- ✅ Data lengkap (nama, jabatan, email, phone)
- ✅ Kategori (Dewan Direksi, Manajemen, Tim)
- ✅ Biografi/deskripsi
- ✅ Link LinkedIn
- ✅ Atur urutan tampil
- ✅ Edit dan hapus data

### **3. Menu Kelola Banner**
Kelola banner promosi di website.

**Fitur:**
- ✅ Upload banner image
- ✅ Set link tujuan (optional)
- ✅ Pilih posisi (Top/Hero, Middle, Bottom)
- ✅ Atur jadwal tayang (start & end date)
- ✅ Active/Inactive status
- ✅ Urutan tampil
- ✅ Preview banner

### **4. Menu Kelola Popup**
Manajemen popup notifikasi dan promosi.

**Fitur:**
- ✅ Tipe popup (Info, Newsletter, Promo, Warning)
- ✅ Judul dan konten
- ✅ Upload gambar popup
- ✅ Tombol CTA (call-to-action) dengan link
- ✅ Jadwal tayang
- ✅ Display once (cookie-based)
- ✅ Delay tampil (dalam detik)
- ✅ Pratinjau popup

### **5. Menu Pengaturan**
Konfigurasi dasar website.

**Fitur:**
- ✅ Edit judul website
- ✅ Meta deskripsi SEO
- ✅ Email admin
- ✅ Backup data website
- ✅ Restore data dari backup

---

## 📁 Struktur File

```
src/
├── components/
│   ├── AdminBar.tsx              # Top bar saat admin login
│   ├── AdminAccessButton.tsx     # Floating button untuk akses admin
│   ├── AdminDashboard.tsx        # Dashboard utama admin
│   ├── AdminDrawer.tsx           # Drawer/modal untuk admin panel
│   ├── AdminLoginModal.tsx       # Modal login admin
│   ├── admin/
│   │   ├── ArticleEditor.tsx     # Editor untuk artikel
│   │   ├── StaffEditor.tsx       # Editor untuk pengurus
│   │   ├── BannerEditor.tsx      # Editor untuk banner
│   │   └── PopupEditor.tsx       # Editor untuk popup
│   └── ...
├── context/
│   ├── AuthContext.tsx           # Context untuk authentication
│   ├── CmsContext.tsx            # Context untuk CMS
│   └── ...
├── App.tsx                       # App utama dengan AuthProvider
├── AdminApp.tsx                  # App untuk halaman admin dedicated
└── ...
```

---

## 📖 Panduan Penggunaan Setiap Menu

### **Artikel & Blog**

#### Membuat Artikel Baru:
1. Klik tombol "Artikel Baru"
2. Isi judul (slug auto-generate)
3. Upload gambar feature
4. Pilih kategori dan status
5. Isi ringkasan (excerpt)
6. Tulis konten lengkap
7. Tambah tags
8. Set tanggal publikasi
9. Klik "Pratinjau" untuk melihat hasil
10. Klik "Simpan Artikel"

#### Tips Menulis:
- Gunakan judul yang menarik dan SEO-friendly
- Ringkasan harus singkat dan jelas
- Gunakan HTML untuk format konten:
  ```html
  <h2>Subjudul</h2>
  <p>Paragraf</p>
  <strong>Bold</strong> <em>Italic</em>
  <ul>
    <li>Poin 1</li>
    <li>Poin 2</li>
  </ul>
  ```

### **Kelola Pengurus**

#### Menambah Pengurus:
1. Klik "Tambah Pengurus"
2. Upload foto profil
3. Isi nama lengkap
4. Isi jabatan/posisi
5. Pilih kategori (Direksi/Manajemen/Tim)
6. Isi email dan telepon
7. Isi biografi singkat
8. (Optional) LinkedIn URL
9. Set urutan tampil
10. Klik "Simpan Pengurus"

#### Rekomendasi Foto:
- Ukuran: Min 200x200px
- Format: JPG atau PNG
- Potret profesional

### **Kelola Banner**

#### Membuat Banner:
1. Klik "Banner Baru"
2. Upload gambar banner
3. Isi judul banner
4. (Optional) Masukkan link tujuan
5. Pilih posisi (Top/Middle/Bottom)
6. Set tanggal mulai dan berakhir
7. Pilih status (Active/Inactive)
8. Set urutan tampil
9. Klik "Simpan Banner"

#### Ukuran Banner Rekomendasi:
- Rasio: 16:5 (1920x600px)
- Format: JPG atau PNG
- Compressed: Max 500KB

### **Kelola Popup**

#### Membuat Popup:
1. Klik "Popup Baru"
2. Isi judul popup
3. Pilih tipe (Info/Newsletter/Promo/Warning)
4. Isi konten pesan
5. (Optional) Upload gambar
6. Isi teks dan link tombol
7. Pilih status
8. Centang "Display Once" untuk tampil sekali per user
9. Set delay tampil (2-3 detik recommended)
10. Klik "Pratinjau" untuk test
11. Klik "Simpan Popup"

#### Tips Popup:
- Gunakan delay 2-3 detik agar tidak mengganggu
- Display Once: gunakan untuk popup yang penting
- Jangan buat terlalu banyak popup active bersamaan

### **Pengaturan**

#### Mengubah Pengaturan:
1. Klik menu "Pengaturan"
2. Edit judul website
3. Edit meta deskripsi (untuk SEO)
4. Edit email admin
5. Klik "Simpan Perubahan"

#### Backup & Restore:
- Klik "Backup Data" untuk download backup
- Klik "Restore Data" untuk upload backup

---

## 🔄 Alur Login ke Admin Panel

```
Website SIDYA
    ↓
Klik Tombol Shield (Bottom Right)
    ↓
Modal Login Muncul
    ↓
Input Username & Password
    ↓
Klik "Masuk"
    ↓
✅ Login Berhasil
    ↓
AdminBar Muncul di Atas
+ Floating Button Berubah
+ Akses ke Admin Panel
    ↓
Klik Menu (Artikel, Pengurus, dll)
    ↓
Kelola Konten Website
    ↓
Klik "Logout" untuk Keluar
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Fungsi |
|----------|--------|
| **Alt + A** | Buka Admin Panel |
| **Alt + P** | Kelola Pengurus |
| **Alt + B** | Kelola Banner |
| **Alt + O** | Kelola Popup |
| **Alt + S** | Pengaturan |
| **Alt + L** | Logout |
| **Esc** | Tutup Drawer |

---

## 🛡️ Keamanan

### Best Practices:
1. ✅ **Ganti Password Secara Berkala** - Gunakan password yang kuat
2. ✅ **Jangan Bagikan Kredensial** - Berikan akses terpisah per admin
3. ✅ **Logout Setelah Selesai** - Selalu logout dari admin panel
4. ✅ **Backup Berkala** - Gunakan fitur backup setiap minggu
5. ✅ **Monitor Aktivitas** - Periksa perubahan konten secara rutin

### Untuk Production:
- [ ] Implementasi JWT Token authentication
- [ ] Rate limiting untuk login attempts
- [ ] Audit logging untuk semua aksi admin
- [ ] Role-based access control (RBAC)
- [ ] Email verification untuk password reset
- [ ] Two-factor authentication (2FA)

---

## 🐛 Troubleshooting

### Tombol Admin Tidak Muncul?
- Refresh halaman (Ctrl + F5)
- Clear browser cache
- Pastikan JavaScript enabled

### Tidak Bisa Login?
- Periksa username: `admin`
- Periksa password: `password123`
- Coba di browser berbeda
- Check console untuk error message (F12)

### Perubahan Tidak Tersimpan?
- Pastikan koneksi internet stabil
- Coba submit ulang
- Cek ukuran file/image

### Foto Tidak Upload?
- Pastikan format: JPG/PNG
- Maksimal ukuran: 5MB
- Resolusi minimum: 200x200px

---

## 📞 Support & Development

### Untuk Melaporkan Bug:
Hubungi tim development dengan:
- Deskripsi masalah
- Screenshot/video
- Browser dan versi OS
- Langkah-langkah reproduksi

### Untuk Fitur Baru:
- Diskusikan dengan stakeholder
- Dokumentasikan requirement
- Prioritaskan berdasarkan impact

---

## 📄 Changelog

### Version 1.0 (Current)
- ✅ Admin authentication system
- ✅ Article management
- ✅ Staff/Pengurus management
- ✅ Banner management
- ✅ Popup management
- ✅ Website settings
- ✅ Floating admin access button
- ✅ Keyboard shortcuts

---

**© 2026 PT Sidya Sadaya Sejahtera - Distribusi Perlengkapan Haji & Umroh**