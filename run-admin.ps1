# Script untuk menjalankan aplikasi admin
# Mengatasi masalah path dengan karakter khusus

Write-Host "Starting SIDYA Admin Panel..." -ForegroundColor Green

# Gunakan npx dengan path lengkap yang di-quote
$currentDir = Get-Location
$nodeModulesBin = Join-Path $currentDir "node_modules\.bin"

# Cek apakah node_modules sudah terinstall
if (-not (Test-Path $nodeModulesBin)) {
    Write-Host "Running npm install..." -ForegroundColor Yellow
    npm install
}

Write-Host "Starting development server..." -ForegroundColor Cyan
Write-Host "Server will be available at: http://localhost:3000/admin.html" -ForegroundColor Yellow

# Jalankan Vite
npx vite --port=3000 --host=0.0.0.0