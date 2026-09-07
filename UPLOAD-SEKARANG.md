# Upload ke Hostinger - Siap Deploy!

## ✅ Password Sudah Benar!

Semua file sudah diupdate dengan:
- Username: `u75916624_sidya_orgchart` ✅
- Password: `SidyaAdmin2024!` ✅
- Database: `u75916624_sidya_orgchart` ✅

Build sudah selesai! File siap upload!

---

## 📤 LANGKAH UPLOAD (5 Menit):

### **1. Hapus File Lama di Hostinger (Opsional)**

Di File Manager Hostinger `/public_html/`:
- Hapus folder `api/` lama (kalau ada)
- Hapus file `index.html` lama (kalau ada)
- Hapus folder `assets/` lama (kalau ada)

**JANGAN HAPUS:**
- File `wp-config.php` (kalau ada WordPress)
- Folder `wp-content`, `wp-admin`, `wp-includes` (kalau ada WordPress)

### **2. Upload Semua File dari dist/**

Upload SEMUA isi folder `dist/` ke `/public_html/`:

```
dist/
├── .htaccess              → /public_html/.htaccess
├── index.html             → /public_html/index.html
├── sidya-logo.png         → /public_html/sidya-logo.png
├── setup.php              → /public_html/setup.php
├── assets/                → /public_html/assets/
│   ├── index-*.css
│   └── index-*.js
└── api/                   → /public_html/api/
    ├── .htaccess          ← PENTING!
    ├── config.php         ← PENTING! (password sudah benar)
    ├── get-pengurus.php
    ├── save-pengurus.php
    ├── get-katalog.php
    ├── save-katalog.php
    ├── database-schema.sql
    ├── katalog-schema.sql
    ├── step3-db-connect.php  ← File test
    ├── test-connection-fix.php
    └── ... (semua file lainnya)
```

**Cara Upload:**
- Via **File Manager**: Zip folder `dist`, upload, extract di `/public_html/`
- Via **FTP**: Upload seluruh isi folder `dist/` ke `/public_html/`

### **3. Set File Permissions**

Di File Manager, set permission:
- File `.htaccess`: **644**
- File `.php`: **644**
- Folder `api/`: **755**
- Folder `assets/`: **755**

### **4. Import Database (Kalau Belum)**

**Cek dulu apakah tabel sudah ada:**
Buka: `https://sidya.id/api/step3-db-connect.php`

**Jika muncul:**
```
✓ CONNECTION SUCCESS!
Tables in database (0):
  (no tables found - database kosong)
```

**Berarti perlu import SQL:**

1. Login **Hostinger cPanel**
2. Buka **phpMyAdmin**
3. Klik database: `u75916624_sidya_orgchart`
4. Tab **"Import"**
5. Upload file: `dist/api/database-schema.sql`
6. Klik **"Go"**
7. Tunggu success
8. Ulangi untuk: `dist/api/katalog-schema.sql`

---

## 🧪 TEST SETELAH UPLOAD:

### **Test 1: Cek Database Connection**
```
https://sidya.id/api/step3-db-connect.php
```

**Harus muncul:**
```
✓ CONNECTION SUCCESS!
Server Info: 8.0.x
Tables in database (2):
  - pengurus
  - katalog_items
```

### **Test 2: Cek API Pengurus**
```
https://sidya.id/api/get-pengurus.php
```

**Harus return JSON:**
```json
{
  "success": true,
  "data": [
    {
      "id": "komisaris-utama",
      "realisticName": "Ir. H. Ahmad Fauzi, M.M.",
      ...
    }
  ],
  "total": 8
}
```

### **Test 3: Cek Halaman Pengurus**
```
https://sidya.id/pengurus
```

**Harus muncul:**
- Organizational chart dengan 8 orang
- Komisaris Utama di atas (gold theme)
- 3 Komisaris di bawahnya (gold theme)
- Direktur, Wakil Direktur, GM

### **Test 4: Cek Homepage**
```
https://sidya.id/
```

**Harus muncul:**
- Homepage dengan navbar
- Smooth scroll
- Semua section

### **Test 5: Test Edit (Login Admin)**
1. Buka: `https://sidya.id/pengurus`
2. Login admin (username: `admin`, password: `admin123`)
3. Edit nama salah satu pengurus
4. Save
5. Buka di browser lain → **Data harus update!**

---

## ✅ CHECKLIST FINAL:

- [ ] Upload semua file dari `dist/` ke `/public_html/`
- [ ] File permissions sudah benar (644 untuk PHP, 755 untuk folder)
- [ ] Import SQL di phpMyAdmin (database-schema.sql & katalog-schema.sql)
- [ ] Test `step3-db-connect.php` → SUCCESS
- [ ] Test `get-pengurus.php` → Return JSON dengan 8 data
- [ ] Test `/pengurus` → Muncul org chart
- [ ] Test homepage → Muncul
- [ ] Test edit → Data sync antar browser

---

## 🎉 JIKA SEMUA TEST BERHASIL:

**SELAMAT! Website sudah live dengan database sync!** 🚀

- ✅ Org chart dengan 8 pengurus (gold theme untuk Komisaris)
- ✅ Data tersimpan di MySQL database
- ✅ Edit data sync antar device/browser
- ✅ Admin login required untuk edit
- ✅ Routing SPA dengan .htaccess

---

## 🐛 JIKA MASIH ERROR:

**Kirim screenshot:**
1. Hasil dari: `https://sidya.id/api/step3-db-connect.php`
2. Hasil dari: `https://sidya.id/api/get-pengurus.php`
3. Hasil dari: `https://sidya.id/pengurus`
4. Error di browser console (F12 → Console tab)

Saya akan bantu debug! 🚀

---

**MULAI UPLOAD SEKARANG!** 📤
