<?php
// STEP 4: Check apakah tabel pengurus ada dan isinya
header('Content-Type: text/plain; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "=== Pengurus Table Check ===\n\n";

$db_host = 'localhost';
$db_user = 'u75916624_sidya_orgchart';
$db_pass = 'SidyaAdmin2024!';
$db_name = 'u75916624_sidya_orgchart';

$conn = @new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error . "\n");
}

echo "✓ Connected to database\n\n";

// Check if pengurus table exists
$result = $conn->query("SHOW TABLES LIKE 'pengurus'");

if ($result->num_rows == 0) {
    echo "✗ Table 'pengurus' TIDAK ADA!\n\n";
    echo "Solusi:\n";
    echo "1. Buka phpMyAdmin di cPanel\n";
    echo "2. Pilih database: u75166247_sidya_orgchart\n";
    echo "3. Import file: database-schema.sql\n";
} else {
    echo "✓ Table 'pengurus' EXISTS\n\n";
    
    // Count rows
    $count_result = $conn->query("SELECT COUNT(*) as total FROM pengurus");
    $count_row = $count_result->fetch_assoc();
    $total = $count_row['total'];
    
    echo "Total rows: $total\n\n";
    
    if ($total == 0) {
        echo "⚠ Table kosong! Perlu insert data.\n";
    } else {
        echo "✓ Data found! Showing first 3 rows:\n\n";
        
        $data_result = $conn->query("SELECT id, realisticName, officialTitle FROM pengurus LIMIT 3");
        while ($row = $data_result->fetch_assoc()) {
            echo "  - {$row['id']}: {$row['realisticName']} ({$row['officialTitle']})\n";
        }
    }
}

$conn->close();
?>
