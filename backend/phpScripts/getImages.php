<?php
include "../../db/mysql.php";

// Initialize an empty array to store the data
$trip = $_GET['trip'];

// Use prepared statements to prevent SQL injection
$sql = "SELECT trip_ID, primary_img, img FROM trip_img WHERE trip_ID = ?";
$stmt = $mySQL->prepare($sql);
$stmt->bind_param("i", $trip);
$stmt->execute();
$result = $stmt->get_result();
$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Append each item to the $data array
        $data[] = array(
            'img' => $row['img'],
            'trip_ID' => $row['trip_ID'],
            'primary_img' => $row['primary_img']
            
        );
    }
} else {
    // If no data found, you can set a specific message in the array
    $data = array('message' => 'No data found');
}

// Close the MySQL connection
$mySQL->close();

// Encode the $data array as JSON and echo the result
echo json_encode($data);
?>