<?php
include "../db/mysql.php";

// Retrieve trip ID from the URL path
$trip = $_GET["trip"];

// Use prepared statements to prevent SQL injection
$sql = "SELECT * FROM trip_captain WHERE pk_id = ?";
$stmt = $mySQL->prepare($sql);
$stmt->bind_param("i", $trip);
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
}

// Close the MySQL connection
$mySQL->close();

header('Content-Type: application/json');
echo json_encode($data);

?>