<?php
include "../db/mysql.php";

// Initialize an empty array to store the data
$data = array();

$sql = "SELECT * FROM crewmember";
$result = $mySQL->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
         // Create a DateTime object for the birthdate
         $birthdate = new DateTime($row['age']);
         // Create a DateTime object for the current date
         $now = new DateTime();
         // Calculate the difference between the two dates
         $age = $now->diff($birthdate)->y;
        $data[] = array(
            'firstname' => $row['firstname'],
            'lastname' => $row['lastname'],
            'age' => $age,
            'bio' => $row['bio'],
            'country' => $row['country'],
            'exp' => $row['exp'],
            'profilePicture' => $row['profilePicture'],
            'role' => $row['role']
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