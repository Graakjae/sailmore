<?php
include "../../db/mysql.php";

// Initialize an empty array to store the data
$data = array();

$sql = "SELECT * FROM trip_card";
$result = $mySQL->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Append each item to the $data array
        $data[] = array(
            'title' => $row['title'],
            'start_date' => $row['start_date'],
            'end_date' => $row['end_date'],
            'price' => $row['price'],
            'trip_img' => $row['trip_img']
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