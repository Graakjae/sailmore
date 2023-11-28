<?php
include "../../db/mysql.php";

// Retrieve user ID from the URL path
$userId = intval(basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)));

// Use prepared statements to prevent SQL injection
$sql = "SELECT firstname, lastname, age, bio, country, profilePicture, exp FROM captains WHERE pk_id = ?";
$stmt = $mySQL->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result === false) {
    // Output any MySQL errors
    echo json_encode(array('error' => 'MySQL Error: ' . $mySQL->error));
} else {
    if ($result->num_rows > 0) {
        $data = $result->fetch_assoc();
    } else {
        $data = array('message' => 'No data found');
    }

    // Encode the $data array as JSON and echo the result
    header('Content-Type: application/json');
    echo json_encode($data);
}

// Close the MySQL connection
$mySQL->close();
?>
