<?php
include "../../db/mysql.php";

// Retrieve trip ID from the URL path
$tripId = intval(basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)));

// Use prepared statements to prevent SQL injection
$sql = "SELECT title, description, start_date, end_date, price, crew_capacity, rules, trip_img FROM trip_page WHERE pk_id = ?";
$stmt = $mySQL->prepare($sql);
$stmt->bind_param("i", $tripId);
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
