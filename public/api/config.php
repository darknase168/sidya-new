<?php
/**
 * Database Configuration for SIDYA Org Chart
 * Support for both local development and Hostinger production
 */

// Enable error display for debugging (remove after fixing)
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display on screen
ini_set('log_errors', 1);

// Get environment - detect if running locally or on Hostinger
$is_localhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', 'localhost:3000', '127.0.0.1', 'localhost:5173']);

if ($is_localhost) {
    // LOCAL DEVELOPMENT
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASS', '');
    define('DB_NAME', 'sidya_orgchart');
} else {
    // HOSTINGER PRODUCTION
    define('DB_HOST', 'localhost');
    define('DB_USER', 'u75166247_sidya_orgchart');
    define('DB_PASS', '@P4g3r4jl');
    define('DB_NAME', 'u75166247_sidya_orgchart');
}

// Create connection with error suppression
$conn = @new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    http_response_code(500);
    die(json_encode([
        'success' => false,
        'error' => 'Database connection failed',
        'error_code' => $conn->connect_errno,
        'error_message' => $conn->connect_error,
        'db_host' => DB_HOST,
        'db_user' => DB_USER,
        'db_name' => DB_NAME
    ]));
}

// Set charset to utf8
$conn->set_charset('utf8mb4');

// Helper: Send JSON response
function sendJSON($data, $statusCode = 200) {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    
    http_response_code($statusCode);
    echo json_encode($data, JSON_PRETTY_PRINT);
    exit;
}

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    http_response_code(200);
    exit;
}
?>
