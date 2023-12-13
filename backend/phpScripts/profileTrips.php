<?php
include "../../db/mysql.php";

// Retrieve user ID from the URL path
$userId = intval(basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)));

// Use prepared statements to prevent SQL injection
$sqlTrips = "SELECT pk_id, title, startpoint, destination, start_date, end_date, price FROM trip WHERE captain_ID = ?";
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

            // Use prepared statements for fetching images to prevent SQL injection
            $sqlImages = "SELECT img FROM trip_img WHERE trip_ID = ?";
            $stmtImages = $mySQL->prepare($sqlImages);
            $stmtImages->bind_param("i", $tripId);
            $stmtImages->execute();
            $resultImages = $stmtImages->get_result();

            $images = array();
            while ($imageRow = $resultImages->fetch_assoc()) {
                $images[] = $imageRow['img'];
            }

            // Append trip details and images to the $dataTrips array
            $dataTrips[] = array(
                'trip_id' => $tripId,
                'title' => $row['title'],
                'startpoint' => $row['startpoint'],
                'destination' => $row['destination'],
                'start_date' => $row['start_date'],
                'end_date' => $row['end_date'],
                'price' => $row['price'],
                'images' => $images,
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
