<?php
session_start();

$response = array('loggedIn' => false);

// Check if the user is logged in based on your authentication logic
if (isset($_SESSION['user_id'])) {
    // You might want to perform additional checks here if needed
    $response['loggedIn'] = true;
}

header('Content-Type: application/json');
echo json_encode($response);
?>
