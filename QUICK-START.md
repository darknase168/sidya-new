# SIDYA Admin Panel - Quick Start Guide

## ⚡ Quick Access

### Akses Admin Panel:
1. **Buka website:** `http://localhost:3000`
2. **Scroll ke bawah** - Cari tombol **Shield** (sudut kanan bawah)
3. **Klik tombol Shield**
4. **Login:** 
   - Username: `admin`
   - Password: `password123`
5. **✅ Admin panel siap digunakan!**

---

## ⌨️ Keyboard Shortcuts (Lebih Cepat!)

| Tombol | Fungsi |
|--------|--------|
| **Alt + A** | Buka Admin Panel |
| **Alt + P** | Kelola Pengurus |
| **Alt + B** | Kelola Banner |
| **Alt + O** | Kelola Popup |
| **Alt + S** | Pengaturan |
| **Alt + L** | Logout |

> **Contoh:** Tekan Alt+P setelah login untuk langsung ke menu Pengurus

---

## 🎯 Menu Admin Utama

### 1. **Artikel & Blog** (Alt+A)
Buat, edit, publish artikel untuk blog website
- ✍️ Tulis artikel baru
- 📸 Upload gambar
- 🏷️ Tambah tags
- 📅 Atur tanggal publikasi

### 2. **Kelola Pengurus** (Alt+P)
Manajemen data pengurus dan direksi
- 👤 Tambah pengurus baru
- 📷 Upload foto profil
- 📝 Isi data lengkap
- 🎯 Atur urutan tampil

### 3. **Kelola Banner** (Alt+B)
Upload banner promosi dengan jadwal tayang
- 🖼️ Upload gambar banner
- 📅 Atur tanggal tampil
- 📍 Pilih posisi di website
- 🔗 Set link tujuan

### 4. **Kelola Popup** (Alt+O)
Buat notifikasi dan popup promosi
- 📢 Pilih tipe popup
- 🎨 Design popup
- ⏱️ Atur waktu tampil
- 🔔 Preview sebelum publish

### 5. **Pengaturan** (Alt+S)
Konfigurasi dasar website
- ⚙️ Edit judul website
- 🔍 SEO settings
- 📧 Email admin
- 💾 Backup/Restore

---

## 🔑 Login Info

**Username:** `admin`
**Password:** `password123`

> Ini adalah kredensial **demo**. Ganti dengan password yang kuat untuk production.

---

## 📋 Workflow Cepat

### Membuat Artikel Baru:
```
1. Klik "Artikel Baru"
2. Isi judul (slug auto-generate)
3. Upload gambar
4. Pilih kategori
5. Tulis konten
6. Tambah tags
7. Klik "Simpan Artikel"
```

### Menambah Pengurus:
```
1. Klik "Tambah Pengurus"
2. Upload foto
3. Isi nama & posisi
4. Isi email & telepon
5. Tulis biografi
6. Klik "Simpan Pengurus"
```

### Membuat Banner:
```
1. Klik "Banner Baru"
2. Upload gambar (1920x600 recommended)
3. Isi judul & link
4. Pilih posisi & tanggal
5. Klik "Simpan Banner"
```

### Membuat Popup:
```
1. Klik "Popup Baru"
2. Pilih tipe popup
3. Isi judul & konten
4. (Optional) Upload gambar
5. Atur delay & tanggal
6. Klik "Pratinjau"
7. Klik "Simpan Popup"
```

---

## 🎨 Admin Bar Elements

Saat login, Anda akan melihat:

```
┌─ ADMIN [User] ─────────────────────────────────────┐
│ ◆ Artikel  ◆ Pengurus  ◆ Banner  ◆ Popup  ◆ Settings │
├─────────────────────────────────────────────────────┤
│  [Content Area - Dynamic berdasarkan menu pilihan]  │
│  [Panel akan menampilkan menu yang dipilih]         │
└─────────────────────────────────────────────────────┘
```

**Desktop:** Full sidebar navigation + content
**Mobile:** Collapsible menu + drawer panel

---

## 🆘 Troubleshooting Cepat

### Tombol Admin tidak muncul?
→ Refresh halaman (Ctrl+F5)

### Login gagal?
→ Username: `admin` (huruf kecil)
→ Password: `password123` (case-sensitive)

### Menu tidak muncul saat login?
→ Tunggu 1-2 detik untuk load
→ Coba refresh

### Perubahan tidak tersimpan?
→ Periksa koneksi internet
→ Coba submit ulang
→ Cek console (F12) untuk error

---

## 📱 Mobile Usage

**Mobile-Optimized Features:**
- ✅ Responsive design
- ✅ Touch-friendly buttons
- ✅ Collapsible sidebar
- ✅ Full-screen modals
- ✅ Bottom floating button

**Tips:**
- Gunakan landscape mode untuk lebih nyaman
- Keyboard shortcuts tetap bekerja
- Double-tap untuk zoom (jika perlu)

---

## 💡 Pro Tips

1. **Gunakan Keyboard Shortcuts** → Lebih cepat navigasi
2. **Pratinjau Sebelum Publish** → Pastikan tampilan baik
3. **Backup Data Berkala** → Cegah kehilangan data
4. **Logout Setelah Selesai** → Secure practice
5. **Update Konten Rutin** → Website terasa fresh

---

## 📚 Documentation

| File | Fungsi |
|------|--------|
| **ADMIN-GUIDE.md** | Panduan detail setiap menu |
| **README-ADMIN.md** | Overview & catatan update |
| **IMPLEMENTATION-SUMMARY.md** | Technical details |
| **QUICK-START.md** | File ini - referensi cepat |

---

## 🚀 Next Steps

1. ✅ Test semua menu di browser
2. ✅ Coba buat artikel/pengurus/banner
3. ✅ Test keyboard shortcuts
4. ✅ Test di mobile/tablet
5. ✅ Report issues/feedback

---

## 📞 Support

Jika ada masalah:
1. Lihat **Troubleshooting** section
2. Baca **ADMIN-GUIDE.md** untuk detail
3. Check browser console (F12)
4. Contact: dev-team@sidya.co.id

---

## ✨ Feature Highlights

🔐 **Secure Login System**
- Session management
- Credentials demo

📝 **Full Editor Suite**
- Article editor with preview
- WYSIWYG-like interface
- Image uploads

🎯 **Content Scheduling**
- Date range scheduling
- Banner/Popup timing

⌨️ **Developer Friendly**
- Keyboard shortcuts
- TypeScript support
- Component-based

📱 **Fully Responsive**
- Desktop, tablet, mobile
- Touch-optimized
- PWA-ready

---

## 🎓 Learning Notes

**Teknologi yang Digunakan:**
- React 19 + TypeScript
- Tailwind CSS
- Context API
- localStorage
- Lucide Icons

**Architecture:**
- Component-based
- Context management
- Modal patterns
- Responsive design

---

## 📊 Status

| Fitur | Status |
|-------|--------|
| Login/Logout | ✅ Complete |
| Artikel Management | ✅ Complete |
| Pengurus Management | ✅ Complete |
| Banner Management | ✅ Complete |
| Popup Management | ✅ Complete |
| Settings | ✅ Complete |
| Mobile Support | ✅ Complete |
| Keyboard Shortcuts | ✅ Complete |
| Documentation | ✅ Complete |

**Overall Status: ✅ READY FOR USE**

---

## 🎉 You're All Set!

Admin panel SIDYA siap digunakan. Happy managing! 🚀

---

*Last Updated: September 4, 2026*
*Version: 2.0*