<?php
include '../../db/mysql.php';
session_start();

$response = array('loggedIn' => false, 'userId' => null);

// Check if the user is logged in
if (isset($_SESSION['user_id'])) {
    $response['loggedIn'] = true;

    // Query the database for the user ID using the session email
    $email = $_SESSION['email']; // Make sure this matches the session variable name
    $query = "SELECT pk_id FROM captains WHERE email = '$email'";
    $result = $mySQL->query($query);

    if ($result) {
        $row = $result->fetch_assoc();
        if ($row) {
            $response['userId'] = $_SESSION['user_id'];
        } else {
            $response['error'] = "No rows returned from the query.";
        }
    } else {
        // Handle query execution error
        $response['error'] = "Query execution error: " . $mySQL->error;
    }
} else {
    $response['error'] = "User is not logged in.";
}

header('Content-Type: application/json');
echo json_encode($response);
?>
