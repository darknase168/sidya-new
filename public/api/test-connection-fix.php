<?php
// Test koneksi dengan credentials YANG BENAR dari screenshot
header('Content-Type: text/plain; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "=== Test Koneksi Database (Credentials Benar) ===\n\n";

// CREDENTIALS YANG BENAR DARI SCREENSHOT HOSTINGER
$db_host = 'localhost';
$db_user = 'u75916624_sidya_orgchart';  // ← ANGKA: 24 (bukan 47)
$db_pass = 'SidyaAdmin2024!';            // ← GANTI dengan password yang kamu set
$db_name = 'u75916624_sidya_orgchart';  // ← ANGKA: 24 (bukan 47)

echo "Menggunakan credentials:\n";
echo "Host: $db_host\n";
echo "User: $db_user\n";
echo "Database: $db_name\n";
echo "Password: " . str_repeat('*', strlen($db_pass)) . "\n\n";

// Coba connect
$conn = @new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    echo "❌ KONEKSI GAGAL!\n";
    echo "Error: " . $conn->connect_error . "\n\n";
    
    echo "Yang perlu kamu lakukan:\n";
    echo "1. Di Hostinger, klik titik tiga (•••) di sebelah database\n";
    echo "2. Pilih 'Change Password' atau 'Kelola'\n";
    echo "3. Set password baru: SidyaAdmin2024!\n";
    echo "4. Edit file ini, ganti \$db_pass dengan password yang baru\n";
    echo "5. Refresh halaman ini\n";
} else {
    echo "✅✅✅ KONEKSI BERHASIL! ✅✅✅\n\n";
    echo "Server: " . $conn->server_info . "\n";
    
    // Cek tabel
    $result = $conn->query("SHOW TABLES");
    echo "\nTabel yang ada:\n";
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_row()) {
            echo "  ✓ " . $row[0] . "\n";
        }
    } else {
        echo "  (belum ada tabel - perlu import SQL)\n";
    }
    
    echo "\n=================================\n";
    echo "DATABASE SIAP DIGUNAKAN!\n";
    echo "=================================\n\n";
    
    echo "Sekarang update file config.php dengan credentials ini:\n";
    echo "define('DB_HOST', '$db_host');\n";
    echo "define('DB_USER', '$db_user');\n";
    echo "define('DB_PASS', '$db_pass');\n";
    echo "define('DB_NAME', '$db_name');\n";
    
    $conn->close();
}
?>
