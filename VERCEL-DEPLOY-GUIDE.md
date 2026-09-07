# Panduan Deploy ke Vercel - SIDYA

## ✅ GitHub Sudah Updated

Kode sudah berhasil di-push ke GitHub dengan perubahan:
- ✅ 8 pengurus dengan gold theme untuk Komisaris
- ✅ Database integration (pengurus & katalog)
- ✅ Semua file dokumentasi .md sudah dibersihkan
- ✅ Routing sudah diperbaiki dengan .htaccess

---

## 🚀 Cara Deploy ke Vercel

### **Step 1: Login ke Vercel**
1. Buka https://vercel.com
2. Login dengan akun GitHub kamu
3. Klik **"Add New"** → **"Project"**

### **Step 2: Import dari GitHub**
1. Pilih repository: **`sidya-new`** (atau nama repo kamu)
2. Klik **"Import"**

### **Step 3: Configure Project**
1. **Framework Preset**: Pilih **"Vite"**
2. **Build Command**: `npm run build` (otomatis terisi)
3. **Output Directory**: `dist` (otomatis terisi)
4. **Install Command**: `npm install` (otomatis terisi)

### **Step 4: Environment Variables (Opsional)**
Jika nanti perlu environment variable untuk database:
1. Klik **"Environment Variables"**
2. Add variable:
   - `VITE_API_URL` = URL API kamu (jika pakai backend terpisah)

### **Step 5: Deploy!**
1. Klik **"Deploy"**
2. Tunggu 2-3 menit
3. Setelah selesai, Vercel akan memberikan URL: `https://sidya-new.vercel.app` (atau custom domain)

---

## ⚠️ PENTING: Database di Vercel

**Vercel adalah static hosting**, artinya:
- ✅ React app akan berjalan sempurna
- ❌ PHP API **TIDAK AKAN BERJALAN** di Vercel
- ❌ Database MySQL tidak supported

### **Solusi untuk Database:**

**Option 1: Pakai Vercel Serverless Functions (Recommended)**
- Convert PHP API ke JavaScript/TypeScript serverless functions
- Pakai Vercel Postgres atau external database (Supabase, PlanetScale, dll)

**Option 2: Backend Terpisah (Hybrid)**
- Deploy React app di Vercel (frontend only)
- Keep PHP API di Hostinger (backend only)
- Set `VITE_API_URL` environment variable di Vercel pointing ke: `https://sidya.id/api/`

**Option 3: Deploy Semua ke Hostinger**
- Upload `dist/` folder ke Hostinger
- PHP API akan berjalan normal

---

## 🎯 Rekomendasi Saya

**Untuk sekarang (quick deploy):**
1. Deploy ke Vercel → Akan jalan, tapi data tidak persistent (pakai localStorage saja)
2. Route `/pengurus` akan berfungsi
3. Edit data akan tersimpan di browser, tidak sync antar device

**Untuk production (database sync):**
1. Convert PHP API ke Vercel Serverless Functions
2. Pakai Vercel Postgres atau Supabase
3. Atau pakai hybrid: React di Vercel + PHP API di Hostinger

---

## 📋 Checklist Deploy

- [ ] Login ke Vercel
- [ ] Import repo `sidya-new`
- [ ] Set framework: Vite
- [ ] Klik Deploy
- [ ] Test URL: `https://[project-name].vercel.app`
- [ ] Test route: `/pengurus` harus muncul org chart
- [ ] (Optional) Add custom domain di Vercel settings

---

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs
- GitHub Repo: https://github.com/darknase168/sidya-new

---

**Selamat mencoba! 🚀**
