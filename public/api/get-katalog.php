<?php
/**
 * GET /api/get-katalog.php
 * Fetch all katalog items from database
 * Optional: ?category=koper to filter by category
 * Returns: JSON array of catalog items
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'config.php';

try {
    // Get category filter from query param
    $category = isset($_GET['category']) && $_GET['category'] !== 'all' ? $_GET['category'] : null;
    
    // Build query
    $query = "SELECT * FROM katalog_items";
    
    if ($category) {
        $query .= " WHERE category = ?";
    }
    
    $query .= " ORDER BY created_at DESC";
    
    $stmt = $conn->prepare($query);
    
    if ($category) {
        $stmt->bind_param('s', $category);
    }
    
    if (!$stmt->execute()) {
        throw new Exception("Query failed: " . $stmt->error);
    }
    
    $result = $stmt->get_result();
    $katalog_array = [];
    
    while ($row = $result->fetch_assoc()) {
        // Convert JSON strings to arrays
        $row['specifications'] = json_decode($row['specifications'] ?? '[]', true);
        
        // Remove database-specific fields
        unset($row['created_at']);
        unset($row['updated_at']);
        
        $katalog_array[] = $row;
    }
    
    $stmt->close();
    
    sendJSON([
        'success' => true,
        'data' => $katalog_array,
        'total' => count($katalog_array),
        'category_filter' => $category,
        'timestamp' => date('c')
    ]);
    
} catch (Exception $e) {
    sendJSON([
        'success' => false,
        'error' => $e->getMessage()
    ], 500);
}
?>
