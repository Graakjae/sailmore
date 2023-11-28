<?php
include '../../db/mysql.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo "User not logged in";
    exit;
}

$user_id = $_SESSION['user_id'];

// Get data from POST request
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$age = $_POST['age'];

$updateQuery = "UPDATE captains SET firstName = '$firstName', lastName = '$lastName', age = '$age' WHERE pk_id = '$user_id'";

if ($mySQL->query($updateQuery) === TRUE) {
    echo "Profile updated successfully";
} else {
    echo json_encode(['error' => $mySQL->error]);
}

$mySQL->close();
?>
