<?php
/**
 * POST /api/save-pengurus.php
 * Save or update pengurus data in database
 * Accepts: JSON array of pengurus objects
 * Returns: Success/error response
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
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
    $errors = [];
    
    foreach ($data as $pengurus) {
        try {
            $id = $pengurus['id'] ?? null;
            $code = $pengurus['code'] ?? null;
            
            if (!$id || !$code) {
                throw new Exception('Missing id or code');
            }
            
            // Prepare data
            $placeholderName = $pengurus['placeholderName'] ?? 'NAME LASTNAME';
            $roleLabel = $pengurus['roleLabel'] ?? '';
            $realisticName = $pengurus['realisticName'] ?? '';
            $officialTitle = $pengurus['officialTitle'] ?? '';
            $department = $pengurus['department'] ?? '';
            $level = (int)($pengurus['level'] ?? 0);
            $colorTheme = $pengurus['colorTheme'] ?? 'blue';
            $avatarUrl = $pengurus['avatarUrl'] ?? '';
            $avatarKey = $pengurus['avatarKey'] ?? '';
            $email = $pengurus['email'] ?? '';
            $phone = $pengurus['phone'] ?? '';
            $location = $pengurus['location'] ?? '';
            $responsibilities = json_encode($pengurus['responsibilities'] ?? []);
            $parentId = $pengurus['parentId'] ?? null;
            $childrenIds = json_encode($pengurus['childrenIds'] ?? []);
            
            // Check if pengurus exists
            $check_query = "SELECT id FROM pengurus WHERE id = ?";
            $check_stmt = $conn->prepare($check_query);
            $check_stmt->bind_param('s', $id);
            $check_stmt->execute();
            $exists = $check_stmt->get_result()->num_rows > 0;
            $check_stmt->close();
            
            if ($exists) {
                // UPDATE
                $update_query = "UPDATE pengurus SET 
                    code = ?, 
                    placeholderName = ?, 
                    roleLabel = ?, 
                    realisticName = ?, 
                    officialTitle = ?, 
                    department = ?, 
                    level = ?, 
                    colorTheme = ?, 
                    avatarUrl = ?, 
                    avatarKey = ?, 
                    email = ?, 
                    phone = ?, 
                    location = ?, 
                    responsibilities = ?, 
                    parentId = ?, 
                    childrenIds = ?,
                    updated_at = NOW()
                    WHERE id = ?";
                
                $stmt = $conn->prepare($update_query);
                $stmt->bind_param(
                    'ssssssiisssssssss',
                    $code, $placeholderName, $roleLabel, $realisticName, $officialTitle,
                    $department, $level, $colorTheme, $avatarUrl, $avatarKey,
                    $email, $phone, $location, $responsibilities, $parentId, $childrenIds, $id
                );
                
                if ($stmt->execute()) {
                    $updated_count++;
                } else {
                    throw new Exception("Update failed: " . $stmt->error);
                }
                $stmt->close();
            } else {
                // INSERT
                $insert_query = "INSERT INTO pengurus 
                    (id, code, placeholderName, roleLabel, realisticName, officialTitle, department, level, 
                     colorTheme, avatarUrl, avatarKey, email, phone, location, responsibilities, parentId, childrenIds) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                
                $stmt = $conn->prepare($insert_query);
                $stmt->bind_param(
                    'sssssssiiisssssss',
                    $id, $code, $placeholderName, $roleLabel, $realisticName, $officialTitle,
                    $department, $level, $colorTheme, $avatarUrl, $avatarKey,
                    $email, $phone, $location, $responsibilities, $parentId, $childrenIds
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
                'id' => $pengurus['id'] ?? 'unknown',
                'error' => $e->getMessage()
            ];
        }
    }
    
    // Commit transaction
    $conn->commit();
    
    // Update sync metadata
    $count_query = "SELECT COUNT(*) as total FROM pengurus";
    $count_result = $conn->query($count_query);
    $count_row = $count_result->fetch_assoc();
    $total_records = $count_row['total'];
    
    $update_sync = "UPDATE sync_metadata SET total_records = ?, sync_status = 'success', last_sync = NOW() LIMIT 1";
    $sync_stmt = $conn->prepare($update_sync);
    $sync_stmt->bind_param('i', $total_records);
    $sync_stmt->execute();
    $sync_stmt->close();
    
    sendJSON([
        'success' => true,
        'message' => "Sync complete: $updated_count updated, $inserted_count inserted",
        'updated' => $updated_count,
        'inserted' => $inserted_count,
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
