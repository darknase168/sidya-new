<?php
/**
 * Diagnostic script to check database connection and tables
 * Visit: https://sidya.id/api/diagnose.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$diagnostics = [];

// Step 1: Check config file
$diagnostics['config_loaded'] = file_exists('config.php');

// Step 2: Try to connect
require_once 'config.php';

$diagnostics['db_host'] = DB_HOST;
$diagnostics['db_user'] = DB_USER;
$diagnostics['db_name'] = DB_NAME;
$diagnostics['environment'] = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', 'localhost:3000', '127.0.0.1', 'localhost:5173']) ? 'local' : 'production';

// Step 3: Check connection
if ($conn->connect_error) {
    $diagnostics['connection_status'] = 'FAILED';
    $diagnostics['connection_error'] = $conn->connect_error;
} else {
    $diagnostics['connection_status'] = 'SUCCESS';
    
    // Step 4: Check if tables exist
    $tables_query = "SHOW TABLES";
    $tables_result = $conn->query($tables_query);
    
    $tables = [];
    if ($tables_result) {
        while ($row = $tables_result->fetch_row()) {
            $tables[] = $row[0];
        }
    }
    
    $diagnostics['tables'] = $tables;
    $diagnostics['pengurus_exists'] = in_array('pengurus', $tables);
    $diagnostics['katalog_items_exists'] = in_array('katalog_items', $tables);
    
    // Step 5: If pengurus table exists, count rows
    if (in_array('pengurus', $tables)) {
        $count_query = "SELECT COUNT(*) as count FROM pengurus";
        $count_result = $conn->query($count_query);
        if ($count_result) {
            $count_row = $count_result->fetch_assoc();
            $diagnostics['pengurus_row_count'] = (int)$count_row['count'];
        }
    }
    
    // Step 6: Test a simple query
    $test_query = "SELECT VERSION() as version";
    $test_result = $conn->query($test_query);
    if ($test_result) {
        $version_row = $test_result->fetch_assoc();
        $diagnostics['mysql_version'] = $version_row['version'];
    }
}

echo json_encode($diagnostics, JSON_PRETTY_PRINT);
?>
