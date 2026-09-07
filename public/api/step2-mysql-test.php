<?php
// STEP 2: Test apakah MySQL extension tersedia
header('Content-Type: text/plain; charset=utf-8');

echo "=== MySQL Extension Test ===\n\n";

if (extension_loaded('mysqli')) {
    echo "✓ mysqli extension: LOADED\n";
} else {
    echo "✗ mysqli extension: NOT LOADED\n";
}

if (extension_loaded('mysqlnd')) {
    echo "✓ mysqlnd extension: LOADED\n";
} else {
    echo "✗ mysqlnd extension: NOT LOADED\n";
}

echo "\nPHP Version: " . phpversion() . "\n";

if (function_exists('mysqli_connect')) {
    echo "✓ mysqli_connect function: EXISTS\n";
} else {
    echo "✗ mysqli_connect function: NOT FOUND\n";
}
?>
