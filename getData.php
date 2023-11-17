<?php 
include "../db/mysql.php";

// Check the connection
if ($mySQL->connect_error) {
    die("Connection failed: " . $mySQL->connect_error);
}

// Query to fetch data from the 'users' table
$sql = "SELECT * FROM users";
$result = $mySQL->query($sql);

// Check if the query was successful
if (!$result) {
    die("Query failed: " . $mySQL->error);
}

// Check if there is any data
if ($result->num_rows > 0) {
    $data = array();

    // Fetch data and push it into the array
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Return data as JSON
    echo json_encode($data);
} else {
    echo "No data found";
}

// Close the MySQL connection
$mySQL->close();

exit();
?>
