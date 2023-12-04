<?php
include "../../db/mysql.php";

session_start();
$userID = $_SESSION['user_id'];
$title = $_POST['title'];
$description = $_POST['description'];
$startpoint = $_POST['startpoint'];
$destination = $_POST['destination'];
$start_date = date("Y-m-d", strtotime($_POST['start_date']));
$end_date = date("Y-m-d", strtotime($_POST['end_date']));
$price = $_POST['price'];
$crew_capacity = $_POST['crew_capacity'];
$rules = $_POST['rules'];

// Use prepared statements to prevent SQL injection
$query = "UPDATE trip SET title = ?, description = ?, startpoint = ?, destination = ?, start_date = ?, end_date = ?, price = ?, crew_capacity = ?, rules = ? WHERE captain_ID = ?";
$stmt = $mySQL->prepare($query);

// Bind parameters
$stmt->bind_param("ssssssiiis", $title, $description, $startpoint, $destination, $start_date, $end_date, $price, $crew_capacity, $rules, $userID);

// Initialize response array
$response = array();

// Execute the statement
if ($stmt->execute()) {
    $response['message'] = 'Trip updated successfully';
} else {
    // Include error in response
    $response['error'] = 'MySQL Error: ' . $stmt->error;
}

// Close the statement and the MySQL connection
$stmt->close();
$mySQL->close();

// Output response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
