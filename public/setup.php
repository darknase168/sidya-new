<?php
/**
 * Database Setup Wizard - ROOT LEVEL
 * Jalankan file ini di browser: https://sidya.id/setup.php
 * Akan membuat tabel otomatis jika belum ada
 */

header('Content-Type: text/html; charset=utf-8');

// Read config from api folder
require_once __DIR__ . '/api/config.php';

$output = [];
$success = true;

try {
    $output[] = "🔍 Checking database connection...";
    $output[] = "✅ Connected to database!";
    
    // Create pengurus table
    $output[] = "\n📋 Creating pengurus table...";
    
    $pengurus_sql = "CREATE TABLE IF NOT EXISTS pengurus (
      id VARCHAR(50) PRIMARY KEY,
      code VARCHAR(20) NOT NULL,
      placeholderName VARCHAR(255) NOT NULL,
      roleLabel VARCHAR(100) NOT NULL,
      realisticName VARCHAR(255) NOT NULL,
      officialTitle VARCHAR(255) NOT NULL,
      department VARCHAR(100) NOT NULL,
      level INT NOT NULL,
      colorTheme VARCHAR(20) NOT NULL DEFAULT 'blue',
      avatarUrl LONGTEXT,
      avatarKey VARCHAR(100),
      email VARCHAR(255),
      phone VARCHAR(20),
      location VARCHAR(255),
      responsibilities JSON,
      parentId VARCHAR(50),
      childrenIds JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    if ($conn->query($pengurus_sql) === TRUE) {
        $output[] = "✅ Pengurus table created!";
    } else {
        throw new Exception("Error: " . $conn->error);
    }
    
    // Create katalog table
    $output[] = "\n📋 Creating katalog_items table...";
    
    $katalog_sql = "CREATE TABLE IF NOT EXISTS katalog_items (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(50) NOT NULL,
      description LONGTEXT NOT NULL,
      image LONGTEXT,
      customLogoAvailable BOOLEAN DEFAULT 1,
      minOrder VARCHAR(100),
      specifications JSON,
      popularBadge VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    if ($conn->query($katalog_sql) === TRUE) {
        $output[] = "✅ Katalog_items table created!";
    } else {
        throw new Exception("Error: " . $conn->error);
    }
    
    $output[] = "\n✅ ✅ ✅ DATABASE TABLES SETUP COMPLETE! ✅ ✅ ✅";
    $output[] = "\nNow insert initial data using the SQL scripts or API endpoints.";
    
} catch (Exception $e) {
    $success = false;
    $output[] = "\n❌ ERROR: " . $e->getMessage();
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>SIDYA Database Setup</title>
    <style>
        body { font-family: monospace; padding: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        h1 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
        .output { background: #f9f9f9; border: 1px solid #ddd; padding: 15px; border-radius: 4px; line-height: 1.8; }
        pre { overflow-x: auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 SIDYA Database Setup</h1>
        <div class="output">
            <pre><?php
                foreach ($output as $line) {
                    echo htmlspecialchars($line) . "\n";
                }
            ?></pre>
        </div>
    </div>
</body>
</html>
