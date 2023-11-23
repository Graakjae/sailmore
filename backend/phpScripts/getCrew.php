<?php
include "../../db/mysql.php";

// Initialize an empty array to store the data
$data = array();

$sql = "SELECT * FROM CrewMembersTest";
$result = $mySQL->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Append each item to the $data array
        $data[] = array(
            'firstname' => $row['firstname'],
            'age' => $row['age'],
            'exp' => $row['exp'],
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