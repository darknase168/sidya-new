<?php
/**
 * POST /api/save-katalog.php
 * Save or update katalog items in database
 * Accepts: JSON array of katalog objects
 * Returns: Success/error response
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'config.php';

try {
    // Get POST data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!is_array($data)) {
        throw new Exception('Invalid JSON data');
    }
    
    // Start transaction
    $conn->begin_transaction();
    
    $updated_count = 0;
    $inserted_count = 0;
    $deleted_count = 0;
    $errors = [];
    
    // Get existing IDs
    $existing_query = "SELECT id FROM katalog_items";
    $existing_result = $conn->query($existing_query);
    $existing_ids = [];
    
    while ($row = $existing_result->fetch_assoc()) {
        $existing_ids[] = $row['id'];
    }
    
    // Track incoming IDs to detect deleted items
    $incoming_ids = [];
    
    foreach ($data as $item) {
        try {
            $id = $item['id'] ?? null;
            $name = $item['name'] ?? null;
            $category = $item['category'] ?? null;
            
            if (!$id || !$name || !$category) {
                throw new Exception('Missing required fields: id, name, category');
            }
            
            $incoming_ids[] = $id;
            
            // Prepare data
            $description = $item['description'] ?? '';
            $image = $item['image'] ?? '';
            $customLogoAvailable = isset($item['customLogoAvailable']) ? (int)$item['customLogoAvailable'] : 1;
            $minOrder = $item['minOrder'] ?? '';
            $specifications = json_encode($item['specifications'] ?? []);
            $popularBadge = $item['popularBadge'] ?? null;
            
            // Check if item exists
            $check_query = "SELECT id FROM katalog_items WHERE id = ?";
            $check_stmt = $conn->prepare($check_query);
            $check_stmt->bind_param('s', $id);
            $check_stmt->execute();
            $exists = $check_stmt->get_result()->num_rows > 0;
            $check_stmt->close();
            
            if ($exists) {
                // UPDATE
                $update_query = "UPDATE katalog_items SET 
                    name = ?, 
                    category = ?, 
                    description = ?, 
                    image = ?, 
                    customLogoAvailable = ?, 
                    minOrder = ?, 
                    specifications = ?, 
                    popularBadge = ?,
                    updated_at = NOW()
                    WHERE id = ?";
                
                $stmt = $conn->prepare($update_query);
                $stmt->bind_param(
                    'ssssissss',
                    $name, $category, $description, $image, $customLogoAvailable,
                    $minOrder, $specifications, $popularBadge, $id
                );
                
                if ($stmt->execute()) {
                    $updated_count++;
                } else {
                    throw new Exception("Update failed: " . $stmt->error);
                }
                $stmt->close();
            } else {
                // INSERT
                $insert_query = "INSERT INTO katalog_items 
                    (id, name, category, description, image, customLogoAvailable, minOrder, specifications, popularBadge) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                
                $stmt = $conn->prepare($insert_query);
                $stmt->bind_param(
                    'ssssissss',
                    $id, $name, $category, $description, $image, $customLogoAvailable,
                    $minOrder, $specifications, $popularBadge
                );
                
                if ($stmt->execute()) {
                    $inserted_count++;
                } else {
                    throw new Exception("Insert failed: " . $stmt->error);
                }
                $stmt->close();
            }
        } catch (Exception $e) {
            $errors[] = [
                'id' => $item['id'] ?? 'unknown',
                'error' => $e->getMessage()
            ];
        }
    }
    
    // Delete items that are no longer in the incoming data
    $ids_to_delete = array_diff($existing_ids, $incoming_ids);
    
    foreach ($ids_to_delete as $del_id) {
        $delete_query = "DELETE FROM katalog_items WHERE id = ?";
        $stmt = $conn->prepare($delete_query);
        $stmt->bind_param('s', $del_id);
        
        if ($stmt->execute()) {
            $deleted_count++;
        }
        $stmt->close();
    }
    
    // Commit transaction
    $conn->commit();
    
    // Get updated count
    $count_query = "SELECT COUNT(*) as total FROM katalog_items";
    $count_result = $conn->query($count_query);
    $count_row = $count_result->fetch_assoc();
    $total_records = $count_row['total'];
    
    sendJSON([
        'success' => true,
        'message' => "Sync complete: $updated_count updated, $inserted_count inserted, $deleted_count deleted",
        'updated' => $updated_count,
        'inserted' => $inserted_count,
        'deleted' => $deleted_count,
        'errors' => $errors,
        'total_records' => $total_records,
        'timestamp' => date('c')
    ]);
    
} catch (Exception $e) {
    // Rollback on error
    $conn->rollback();
    
    sendJSON([
        'success' => false,
        'error' => $e->getMessage()
    ], 500);
}
?>
