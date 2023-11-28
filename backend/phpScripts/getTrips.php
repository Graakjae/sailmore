<?php

// Get root folder  
$rootFolder = $_SERVER['DOCUMENT_ROOT'];
$fullPath = $rootFolder . "/db/mysql.php";

include $fullPath;

// Initialize an empty array to store the data
$data = array();

$sql = "SELECT * FROM trip";
$result = $mySQL->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Append each item to the $data array
        $data[] = array(
            'title' => $row['title'],
            'description' => $row['description'],
            'startpoint' => $row['startpoint'],
            'destination' => $row['destination'],
            'start_date' => $row['start_date'],
            'end_date' => $row['end_date'],
            'price' => $row['price'],
            'crew_capacity' => $row['crew_capacity'],
            'captain_ID' => $row['captain_ID'],
            'rules' => $row['rules'],
            'trip_img' => $row['trip_img']
        );
    }
} else {
    // If no data found, you can set a specific message in the array
    $data = array('message' => 'No data found');
};

// Close the MySQL connection
$mySQL->close();

// Encode the $data array as JSON and echo the result
header('Content-Type: application/json');
$json_response = json_encode($data);
echo $json_response;

?>