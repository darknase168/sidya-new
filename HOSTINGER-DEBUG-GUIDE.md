# Panduan Debug Hostinger - Step by Step

## 🎯 Tujuan
Menemukan kenapa database tidak konek ke web di Hostinger dengan test bertahap.

---

## 📋 Yang Harus Kamu Lakukan

### **Persiapan:**
1. Upload **SEMUA FILE** dari folder `dist/api/` ke `/public_html/api/` di Hostinger
   
   Pastikan file-file ini ada:
   ```
   /public_html/api/
   ├── step1-php-test.php      ← TEST 1
   ├── step2-mysql-test.php    ← TEST 2
   ├── step3-db-connect.php    ← TEST 3
   ├── step4-check-table.php   ← TEST 4
   ├── config.php
   ├── get-pengurus.php
   └── ... (file lainnya)
   ```

---

## 🧪 Test 1: Apakah PHP Bisa Jalan?

**Buka di browser:**
```
https://sidya.id/api/step1-php-test.php
```

### ✅ **Jika Muncul:**
```
PHP WORKS!
PHP Version: 8.1.x
```
→ **BAGUS!** PHP berfungsi. Lanjut ke Test 2.

### ❌ **Jika Muncul Error 500 atau Blank:**
**Masalah:** PHP tidak bisa dieksekusi di folder `/api/`

**Solusi:**
1. Cek file permission:
   - `step1-php-test.php` harus permission `644`
   - Folder `api/` harus permission `755`
2. Cek apakah ada `.htaccess` yang memblokir PHP
3. Contact Hostinger support: "PHP files in /api/ folder returning 500 error"

---

## 🧪 Test 2: Apakah MySQL Extension Ada?

**Buka di browser:**
```
https://sidya.id/api/step2-mysql-test.php
```

### ✅ **Jika Muncul:**
```
✓ mysqli extension: LOADED
✓ mysqlnd extension: LOADED
✓ mysqli_connect function: EXISTS
```
→ **BAGUS!** MySQL ready. Lanjut ke Test 3.

### ❌ **Jika Muncul:**
```
✗ mysqli extension: NOT LOADED
```
**Masalah:** MySQL extension tidak aktif

**Solusi:**
1. Login ke cPanel
2. Cari **"Select PHP Version"** atau **"MultiPHP Manager"**
3. Pastikan extension **mysqli** dan **mysqlnd** tercentang
4. Refresh test ini

---

## 🧪 Test 3: Apakah Bisa Konek ke Database?

**Buka di browser:**
```
https://sidya.id/api/step3-db-connect.php
```

### ✅ **Jika Muncul:**
```
✓ CONNECTION SUCCESS!
Server Info: 8.0.x
Tables in database (2):
  - pengurus
  - katalog_items
```
→ **SEMPURNA!** Database konek. Lanjut ke Test 4.

### ❌ **Jika Muncul Error 1045:**
```
✗ CONNECTION FAILED!
Error Code: 1045
Error Message: Access denied for user...
```

**Masalah:** Username atau password salah

**Solusi:**
1. Login ke Hostinger cPanel
2. Cari menu **"MySQL Databases"**
3. Lihat bagian **"Current Users"** - catat username yang benar
4. Klik **"Change Password"** untuk user tersebut - set password baru
5. Edit file `step3-db-connect.php` di Hostinger:
   ```php
   $db_user = 'USERNAME_YANG_BENAR';
   $db_pass = 'PASSWORD_YANG_BARU';
   ```
6. Test lagi

### ❌ **Jika Muncul Error 1044:**
```
Error Code: 1044
Error Message: Access denied for user ... to database...
```

**Masalah:** User belum di-assign ke database

**Solusi:**
1. Di cPanel > **MySQL Databases**
2. Scroll ke **"Add User To Database"**
3. Pilih:
   - User: `u75166247_sidya_orgchart`
   - Database: `u75166247_sidya_orgchart`
4. Klik **"Add"**
5. Set privileges: **ALL PRIVILEGES**
6. Test lagi

### ❌ **Jika Muncul Error 2002:**
```
Error Code: 2002
```

**Masalah:** Hostname salah

**Solusi:**
1. Di cPanel > MySQL Databases
2. Lihat **"Database Host"** di bagian atas (biasanya `localhost`)
3. Jika bukan `localhost`, edit `step3-db-connect.php`:
   ```php
   $db_host = 'HOSTNAME_YANG_BENAR';
   ```

---

## 🧪 Test 4: Apakah Tabel Ada dan Berisi Data?

**Buka di browser:**
```
https://sidya.id/api/step4-check-table.php
```

### ✅ **Jika Muncul:**
```
✓ Table 'pengurus' EXISTS
Total rows: 8
✓ Data found! Showing first 3 rows:
  - komisaris-utama: Ir. H. Ahmad Fauzi, M.M. (Komisaris Utama)
  - komisaris-1: Drs. H. Budi Santoso (Komisaris)
  - komisaris-2: Hj. Siti Nurhaliza, S.E., M.M. (Komisaris)
```
→ **PERFECT!** Database siap pakai!

### ❌ **Jika Muncul:**
```
✗ Table 'pengurus' TIDAK ADA!
```

**Masalah:** Tabel belum dibuat

**Solusi - Cara A (phpMyAdmin):**
1. Login cPanel > **phpMyAdmin**
2. Klik database: `u75166247_sidya_orgchart`
3. Klik tab **"Import"**
4. Upload file: `dist/api/database-schema.sql`
5. Klik **"Go"**
6. Upload file: `dist/api/katalog-schema.sql`
7. Klik **"Go"**
8. Test lagi

**Solusi - Cara B (Copy-paste SQL):**
1. Buka file `dist/api/database-schema.sql` di notepad
2. Copy semua isinya
3. Di phpMyAdmin > tab **"SQL"**
4. Paste SQL code
5. Klik **"Go"**
6. Ulangi untuk `katalog-schema.sql`

---

## ✅ Jika Semua Test Berhasil

**Berarti database sudah OK!** Sekarang test API endpoint:

```
https://sidya.id/api/get-pengurus.php
```

**Harusnya muncul JSON:**
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

---

## 📤 Kirim Hasil ke Saya

Setelah kamu test semua, **screenshot hasil dari:**
1. `step1-php-test.php`
2. `step2-mysql-test.php`
3. `step3-db-connect.php`
4. `step4-check-table.php`

Kirim ke saya, nanti saya bantu fix masalahnya! 🚀

---

## 🔧 Quick Fix untuk config.php

Setelah tahu credentials yang benar dari Test 3, edit file ini di Hostinger:

**File:** `/public_html/api/config.php`

Ganti bagian ini:
```php
define('DB_HOST', 'localhost');  // ← Sesuaikan jika beda
define('DB_USER', 'u75166247_sidya_orgchart');  // ← Pakai user yang benar
define('DB_PASS', '@P4g3r4jl');  // ← Pakai password yang benar
define('DB_NAME', 'u75166247_sidya_orgchart');  // ← Pakai database yang benar
```

Setelah edit, test:
```
https://sidya.id/api/get-pengurus.php
```

---

**MULAI DARI TEST 1 DAN LAPORKAN HASILNYA!** 🎯
