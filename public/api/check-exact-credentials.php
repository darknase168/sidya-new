<?php
// Coba semua kemungkinan kombinasi username
header('Content-Type: text/plain; charset=utf-8');

echo "=== Testing All Possible Username Variations ===\n\n";

$db_host = 'localhost';
$db_pass = 'SidyaAdmin2024!';  // Password yang sudah kamu set

// Kemungkinan username yang berbeda
$possible_users = [
    'u75916624_sidya_orgchart',
    'u759166247_sidya_orgchart',
    'u75916624_sidya',
    'u759166247_sidya',
];

// Kemungkinan database name
$possible_dbs = [
    'u75916624_sidya_orgchart',
    'u759166247_sidya_orgchart',
    'u75916624_sidya',
    'u759166247_sidya',
];

foreach ($possible_users as $user) {
    foreach ($possible_dbs as $db) {
        echo "Testing: User='$user' DB='$db'\n";
        
        $conn = @new mysqli($db_host, $user, $db_pass, $db);
        
        if (!$conn->connect_error) {
            echo "✅✅✅ BERHASIL! ✅✅✅\n";
            echo "Username yang BENAR: $user\n";
            echo "Database yang BENAR: $db\n";
            echo "Password: SidyaAdmin2024!\n\n";
            
            // Cek tabel
            $result = $conn->query("SHOW TABLES");
            if ($result) {
                echo "Tables:\n";
                while ($row = $result->fetch_row()) {
                    echo "  - " . $row[0] . "\n";
                }
            }
            
            echo "\n========================================\n";
            echo "UPDATE CONFIG.PHP DENGAN INI:\n";
            echo "========================================\n";
            echo "define('DB_HOST', 'localhost');\n";
            echo "define('DB_USER', '$user');\n";
            echo "define('DB_PASS', 'SidyaAdmin2024!');\n";
            echo "define('DB_NAME', '$db');\n";
            
            $conn->close();
            exit;
        } else {
            echo "  ❌ Error: " . $conn->connect_error . "\n\n";
        }
    }
}

echo "========================================\n";
echo "SEMUA KOMBINASI GAGAL!\n";
echo "========================================\n";
echo "Cek lagi di Hostinger cPanel > MySQL Databases\n";
echo "Screenshot bagian 'Current Users' dan 'Current Databases'\n";
?>
