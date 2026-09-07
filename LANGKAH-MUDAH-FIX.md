# Langkah Mudah Fix Database - TIDAK PERLU ADD USER!

## ✅ Kabar Baik!
Database dan user sudah ada! Tidak perlu add user baru.

## 🔧 Masalah yang Ditemukan:
1. ❌ Angka database salah: pakai `u751662**47**` harusnya `u751662**24**`
2. ❌ Password mungkin salah

## ✅ SOLUSI (3 LANGKAH):

---

### **LANGKAH 1: Cek/Reset Password Database**

1. Di halaman **"Daftar Database dan User MySQL Saat Ini"** (yang ada di screenshot kamu)
2. Lihat baris database: `u75916624_sidya_orgchart`
3. Klik **titik tiga (•••)** di sebelah kanan baris itu
4. Pilih **"Kelola"** atau **"Change Password"** atau **"Edit"**
5. Set password baru: **`SidyaAdmin2024!`**
6. Simpan
7. **CATAT password ini di notepad!**

---

### **LANGKAH 2: Upload & Test File Baru**

1. Upload file ini ke Hostinger:
   ```
   dist/api/test-connection-fix.php → /public_html/api/test-connection-fix.php
   ```

2. **EDIT file tersebut di Hostinger** (File Manager):
   - Buka: `/public_html/api/test-connection-fix.php`
   - Cari baris: `$db_pass = 'SidyaAdmin2024!';`
   - Ganti dengan password yang kamu set di Langkah 1
   - Save

3. Test dengan buka di browser:
   ```
   https://sidya.id/api/test-connection-fix.php
   ```

**HARUS MUNCUL:**
```
✅✅✅ KONEKSI BERHASIL! ✅✅✅
Server: 8.0.x
Tabel yang ada:
  (belum ada tabel - perlu import SQL)
DATABASE SIAP DIGUNAKAN!
```

---

### **LANGKAH 3: Update config.php**

1. Di Hostinger File Manager, buka:
   ```
   /public_html/api/config.php
   ```

2. Cari bagian ini (sekitar baris 17-20):
   ```php
   } else {
       // HOSTINGER PRODUCTION
       define('DB_HOST', 'localhost');
       define('DB_USER', 'u75916624_sidya_orgchart');  // ← Cek angkanya: 24
       define('DB_PASS', '@P4g3r4jl');  // ← GANTI dengan password baru
       define('DB_NAME', 'u75916624_sidya_orgchart');  // ← Cek angkanya: 24
   }
   ```

3. **GANTI `DB_PASS`** dengan password yang sama di Langkah 1:
   ```php
   define('DB_PASS', 'SidyaAdmin2024!');  // ← Password baru
   ```

4. Save file

---

### **LANGKAH 4: Import Tabel Database**

1. Upload file SQL ke Hostinger (optional):
   ```
   dist/api/database-schema.sql
   dist/api/katalog-schema.sql
   ```

2. Di Hostinger cPanel, buka **phpMyAdmin**

3. Klik database: **`u75916624_sidya_orgchart`**

4. Klik tab **"Import"**

5. Klik **"Choose File"** → Pilih `database-schema.sql`

6. Klik **"Go"**

7. Tunggu sampai muncul: "Import has been successfully finished"

8. Ulangi untuk `katalog-schema.sql`

---

### **LANGKAH 5: Test Final!**

**Test API:**
```
https://sidya.id/api/get-pengurus.php
```

**HARUS RETURN JSON:**
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

**Test Website:**
```
https://sidya.id/pengurus
```

**HARUS MUNCUL ORG CHART dengan 8 orang!**

---

## 📦 File yang Sudah Saya Update:

1. ✅ `config.php` - Username sudah dikoreksi ke `u75916624` (angka 24)
2. ✅ `test-connection-fix.php` - File test dengan credentials yang benar

---

## 🎯 Ringkasan Singkat:

1. **Reset password** database di Hostinger (klik ••• → Kelola)
2. **Upload** `test-connection-fix.php` → Edit password → Test
3. **Edit** `config.php` → Ganti password yang sama → Save
4. **Import** SQL di phpMyAdmin
5. **Test** `get-pengurus.php` dan `/pengurus`

---

## ❓ Jika Masih Bingung:

**Kirim screenshot:**
1. Halaman setelah klik ••• (titik tiga) di database
2. Hasil dari: `https://sidya.id/api/test-connection-fix.php`

Saya akan bantu lagi! 🚀
