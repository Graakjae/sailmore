<?php
include "../../db/mysql.php";

// Initialize an empty array to store the data
$data = array();

$sql = "SELECT firstname, lastname, age, email, bio, country, exp, profilePicture FROM captains";
$result = $mySQL->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Append each item to the $data array
        $data[] = array(
            'firstname' => $row['firstname'],
            'lastname' => $row['lastname'],
            'age' => $row['age'],
            'email' => $row['email'],
            'bio' => $row['bio'],
            'country' => $row['country'],
            'exp' => $row['exp'],
            'profilePicture' => $row['profilePicture']
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