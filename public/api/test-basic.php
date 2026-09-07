<?php
// Basic PHP test - should work even if database fails
header('Content-Type: text/plain');
echo "PHP is working!\n";
echo "PHP Version: " . phpversion() . "\n";
echo "Server: " . $_SERVER['SERVER_SOFTWARE'] . "\n";
echo "Host: " . $_SERVER['HTTP_HOST'] . "\n";
?>
