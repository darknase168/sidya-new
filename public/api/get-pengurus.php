<?php
/**
 * GET /api/get-pengurus.php
 * Fetch all pengurus (org chart data) from database
 * Returns: JSON array of employee nodes
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
    // Get all pengurus sorted by level and code
    $query = "SELECT * FROM pengurus ORDER BY level ASC, code ASC";
    $result = $conn->query($query);
    
    if (!$result) {
        throw new Exception("Query failed: " . $conn->error);
    }
    
    $pengurus_array = [];
    
    while ($row = $result->fetch_assoc()) {
        // Convert JSON strings back to arrays
        $row['responsibilities'] = json_decode($row['responsibilities'] ?? '[]', true);
        $row['childrenIds'] = json_decode($row['childrenIds'] ?? '[]', true);
        
        // Convert level to number
        $row['level'] = (int)$row['level'];
        
        // Remove database-specific fields
        unset($row['created_at']);
        unset($row['updated_at']);
        
        $pengurus_array[] = $row;
    }
    
    sendJSON([
        'success' => true,
        'data' => $pengurus_array,
        'total' => count($pengurus_array),
        'timestamp' => date('c')
    ]);
    
} catch (Exception $e) {
    sendJSON([
        'success' => false,
        'error' => $e->getMessage()
    ], 500);
}
?>
