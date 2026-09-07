# Fix Error: Access Denied (Password Salah)

## 🎯 Masalah Terdeteksi:
```
Access denied for user 'u75166247_sidya_orgchart'@'localhost' (using password: YES)
```

**Artinya:** Username atau password database **SALAH**!

---

## ✅ SOLUSI CEPAT (5 Menit):

### **1. Login ke Hostinger cPanel**

### **2. Buka "MySQL Databases"**

### **3. Reset Password:**
Di bagian **"Current Users"**, cari user `u75166247_sidya_orgchart`:
- Klik **"Change Password"**
- Set password baru: `SidyaAdmin2024!` (atau terserah kamu)
- **CATAT password ini!**

### **4. Assign User ke Database:**
Scroll ke **"Add User To Database"**:
- User: `u75166247_sidya_orgchart`
- Database: `u75166247_sidya_orgchart`
- Klik **"Add"**
- Set **ALL PRIVILEGES** (centang semua)
- Klik **"Make Changes"**

### **5. Upload File Baru:**
Upload file ini ke Hostinger:
```
dist/api/step5-fix-credentials.php → /public_html/api/step5-fix-credentials.php
```

### **6. Edit File di Hostinger:**
Buka File Manager, edit file: `/public_html/api/step5-fix-credentials.php`

Ganti baris ini dengan credentials yang BENAR:
```php
$db_user = 'u75166247_sidya_orgchart';  // ← Username dari cPanel
$db_pass = 'SidyaAdmin2024!';           // ← Password yang baru kamu set
```

Save file.

### **7. Test:**
Buka: `https://sidya.id/api/step5-fix-credentials.php`

**Jika muncul:**
```
✅ CONNECTION SUCCESS!
Tables found:
  - pengurus
  - katalog_items
Pengurus table: 8 rows
✅ DATABASE SIAP DIGUNAKAN!
```

**→ BERHASIL!** Lanjut ke step 8.

### **8. Update config.php:**
Edit file: `/public_html/api/config.php`

Ganti bagian ini (sekitar baris 17-20):
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'u75166247_sidya_orgchart');  // ← Ganti dengan yang benar
define('DB_PASS', 'SidyaAdmin2024!');           // ← Ganti dengan password baru
define('DB_NAME', 'u75166247_sidya_orgchart');  // ← Ganti dengan yang benar
```

Save.

### **9. Test API Final:**
Buka: `https://sidya.id/api/get-pengurus.php`

**Harusnya muncul JSON:**
```json
{
  "success": true,
  "data": [ ... 8 pengurus ... ],
  "total": 8
}
```

### **10. Test Website:**
Buka: `https://sidya.id/pengurus`

**Harusnya muncul org chart dengan 8 orang!**

---

## 🚨 Jika Masih Error:

**Screenshot dan kirim:**
1. Halaman cPanel > MySQL Databases (bagian Current Users)
2. Hasil dari: `https://sidya.id/api/step5-fix-credentials.php`

Saya akan bantu fix! 🚀

---

## 📝 Catatan Penting:

- Password **HARUS SAMA** di 3 tempat:
  1. MySQL user password di cPanel
  2. `step5-fix-credentials.php` (untuk test)
  3. `config.php` (untuk production)
  
- Jangan ada spasi atau karakter aneh di password
- Jika pakai karakter special (`@`, `!`, dll), pastikan konsisten di semua file

---

**MULAI DARI STEP 1! IKUTI URUT!** 🎯
