<?php
// STEP 3: Test koneksi database dengan credentials
header('Content-Type: text/plain; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "=== Database Connection Test ===\n\n";

// Credentials - SESUAIKAN DENGAN HOSTINGER KAMU
$db_host = 'localhost';
$db_user = 'u75916624_sidya_orgchart';  // ← ANGKA: 24 (bukan 47)
$db_pass = 'SidyaAdmin2024!';            // ← Password yang sudah diganti
$db_name = 'u75916624_sidya_orgchart';  // ← ANGKA: 24 (bukan 47)

echo "Trying to connect with:\n";
echo "Host: $db_host\n";
echo "User: $db_user\n";
echo "Database: $db_name\n";
echo "Password: " . str_repeat('*', strlen($db_pass)) . "\n\n";

// Try to connect
$conn = @new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    echo "✗ CONNECTION FAILED!\n";
    echo "Error Code: " . $conn->connect_errno . "\n";
    echo "Error Message: " . $conn->connect_error . "\n\n";
    
    echo "Common Solutions:\n";
    if ($conn->connect_errno == 1045) {
        echo "- Error 1045: Username atau password salah\n";
        echo "- Cek di cPanel > MySQL Databases > Current Users\n";
    } elseif ($conn->connect_errno == 1044) {
        echo "- Error 1044: User tidak punya akses ke database\n";
        echo "- Cek di cPanel > MySQL Databases > Add User To Database\n";
    } elseif ($conn->connect_errno == 2002) {
        echo "- Error 2002: MySQL server tidak bisa dijangkau\n";
        echo "- Cek hostname (biasanya 'localhost' atau IP spesifik)\n";
    }
} else {
    echo "✓ CONNECTION SUCCESS!\n";
    echo "Server Info: " . $conn->server_info . "\n";
    echo "Host Info: " . $conn->host_info . "\n";
    echo "Character Set: " . $conn->character_set_name() . "\n";
    
    // Test query
    $result = $conn->query("SHOW TABLES");
    if ($result) {
        $tables = [];
        while ($row = $result->fetch_row()) {
            $tables[] = $row[0];
        }
        
        echo "\nTables in database (" . count($tables) . "):\n";
        if (count($tables) > 0) {
            foreach ($tables as $table) {
                echo "  - $table\n";
            }
        } else {
            echo "  (no tables found - database kosong)\n";
        }
    }
    
    $conn->close();
}
?>
