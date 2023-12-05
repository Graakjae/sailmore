<?php
include "../../db/mysql.php";

// Retrieve user ID from the URL path
$userId = intval(basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)));

// Use prepared statements to prevent SQL injection
$sqlTrips = "SELECT pk_id, title, start_date, end_date, price FROM trip WHERE pk_id = ?";
$stmtTrips = $mySQL->prepare($sqlTrips);
$stmtTrips->bind_param("i", $userId);
$stmtTrips->execute();
$resultTrips = $stmtTrips->get_result();

if ($resultTrips === false) {
    // Output any MySQL errors
    echo json_encode(array('error' => 'MySQL Error: ' . $mySQL->error));
} else {
    $dataTrips = array(); // Initialize as an array

    if ($resultTrips->num_rows > 0) {
        while ($row = $resultTrips->fetch_assoc()) {
            $tripId = $row['pk_id'];

            // Append trip details and images to the $dataTrips array
            $dataTrips[] = array(
                'pk_id' => $row['pk_id'],
                'title' => $row['title'],
                'description' => $row['description'],
                'startpoint' => $row['startpoint'],
                'destination' => $row['destination'],
                'start_date' => $row['start_date'],
                'end_date' => $row['end_date'],
                'price' => $row['price'],
                'crew_capacity' => $row['crew_capacity'],
                'captain_ID' => $row['captain_ID'],
                'rules' => $row['rules']
            );
        }
    } else {
        $dataTrips = array('message' => 'No data found');
    }

    // Encode the $dataTrips array as JSON and echo the result
    header('Content-Type: application/json');
    echo json_encode($dataTrips);
}

// Close the MySQL connection
$mySQL->close();
?>