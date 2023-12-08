<?php
include "../../db/mysql.php";

$imageID = intval(basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)));

// Use prepared statement to prevent SQL injection
$query = "DELETE FROM trip_img WHERE pk_id = ?";
$stmt = $mySQL->prepare($query);

// Bind parameters
$stmt->bind_param("i", $imageID);

// Initialize response array
$response = array();

// Execute the statement
if ($stmt->execute()) {
    $response['success'] = true;
    $response['message'] = 'Image deleted successfully';
} else {
    // Include error in response
    $response['success'] = false;
    $response['error'] = 'MySQL Error: ' . $stmt->error;
}

// Close the statement and the MySQL connection
$stmt->close();
$mySQL->close();

// Output response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
