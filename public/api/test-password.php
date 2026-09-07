<?php
// TEST: Coba connect dengan password yang berbeda-beda
header('Content-Type: text/plain; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "=== Test Password Database ===\n\n";

$db_host = 'localhost';
$db_user = 'u75916624_sidya_orgchart';
$db_name = 'u75916624_sidya_orgchart';

// EDIT PASSWORD INI SETELAH RESET DI HOSTINGER
$passwords_to_try = [
    'admin123',           // ← COBA YANG INI DULU (setelah reset password ke ini)
    '@P4g3r4jl',         // Password lama yang tidak work
    'SidyaAdmin2024!',   // Alternatif
];

foreach ($passwords_to_try as $index => $password) {
    echo "Test #" . ($index + 1) . ": ";
    echo "Password = '$password'\n";
    
    $conn = @new mysqli($db_host, $db_user, $password, $db_name);
    
    if ($conn->connect_error) {
        echo "  ❌ GAGAL: " . $conn->connect_error . "\n\n";
    } else {
        echo "  ✅✅✅ BERHASIL! ✅✅✅\n";
        echo "  Server: " . $conn->server_info . "\n\n";
        
        echo "===========================================\n";
        echo "PASSWORD YANG BENAR: $password\n";
        echo "===========================================\n\n";
        
        echo "Sekarang edit file config.php:\n";
        echo "define('DB_PASS', '$password');\n\n";
        
        // Cek tabel
        $result = $conn->query("SHOW TABLES");
        if ($result) {
            echo "Tabel yang ada:\n";
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_row()) {
                    echo "  - " . $row[0] . "\n";
                }
            } else {
                echo "  (belum ada tabel - perlu import SQL)\n";
            }
        }
        
        $conn->close();
        exit; // Stop setelah ketemu yang benar
    }
}

echo "===========================================\n";
echo "SEMUA PASSWORD GAGAL!\n";
echo "===========================================\n\n";
echo "Yang harus kamu lakukan:\n";
echo "1. Di Hostinger, klik ••• pada user database\n";
echo "2. Pilih 'Change Password'\n";
echo "3. Set password baru: admin123\n";
echo "4. Refresh halaman ini\n";
echo "5. Kalau berhasil, password yang benar akan muncul\n";
?>
