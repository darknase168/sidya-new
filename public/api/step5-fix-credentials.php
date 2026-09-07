<?php
// STEP 5: Update credentials dan test lagi
// EDIT FILE INI DI HOSTINGER dengan credentials yang BENAR

header('Content-Type: text/plain; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "=== Credential Update & Test ===\n\n";

// ============================================
// EDIT CREDENTIALS INI SESUAI DENGAN HOSTINGER
// ============================================
$db_host = 'localhost';  // Biasanya 'localhost', tapi cek di cPanel
$db_user = 'u75166247_sidya_orgchart';  // ← GANTI dengan user yang benar dari cPanel
$db_pass = '@P4g3r4jl';  // ← GANTI dengan password yang baru kamu set
$db_name = 'u75166247_sidya_orgchart';  // ← GANTI dengan nama database yang benar

echo "Credentials yang digunakan:\n";
echo "Host: $db_host\n";
echo "User: $db_user\n";
echo "Password: " . str_repeat('*', strlen($db_pass)) . " (panjang: " . strlen($db_pass) . " karakter)\n";
echo "Database: $db_name\n\n";

// Try connection
$conn = @new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    echo "❌ MASIH ERROR!\n";
    echo "Error Code: " . $conn->connect_errno . "\n";
    echo "Error: " . $conn->connect_error . "\n\n";
    
    if ($conn->connect_errno == 1045) {
        echo "Solusi:\n";
        echo "1. Cek lagi username di cPanel > MySQL Databases > Current Users\n";
        echo "2. Reset password user tersebut\n";
        echo "3. Edit file ini (step5-fix-credentials.php) dengan credentials yang BARU\n";
        echo "4. Pastikan user sudah di-assign ke database (Add User To Database)\n";
    }
} else {
    echo "✅ CONNECTION SUCCESS!\n\n";
    
    // Check tables
    $result = $conn->query("SHOW TABLES");
    echo "Tables found:\n";
    while ($row = $result->fetch_row()) {
        echo "  - " . $row[0] . "\n";
    }
    
    // Check pengurus table
    $count = $conn->query("SELECT COUNT(*) as total FROM pengurus");
    if ($count) {
        $row = $count->fetch_assoc();
        echo "\nPengurus table: " . $row['total'] . " rows\n";
    }
    
    echo "\n✅ DATABASE SIAP DIGUNAKAN!\n";
    echo "\nSekarang update credentials di file:\n";
    echo "  /public_html/api/config.php\n";
    echo "\nGanti bagian:\n";
    echo "  define('DB_HOST', '$db_host');\n";
    echo "  define('DB_USER', '$db_user');\n";
    echo "  define('DB_PASS', '$db_pass');\n";
    echo "  define('DB_NAME', '$db_name');\n";
    
    $conn->close();
}
?>
