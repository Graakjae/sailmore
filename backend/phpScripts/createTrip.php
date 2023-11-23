<?php

include('../../db/mysql.php');
session_start();

// Get data from POST request
$title = $_POST['title'];
$description = $_POST['description'];
$startpoint = $_POST['startpoint'];
$destination = $_POST['destination'];
$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];
$price = $_POST['price'];
$crew_capacity = $_POST['crew_capacity'];
$captain_ID = "SELECT pk_id FROM captains WHERE pk_id = " . $_SESSION['user_id'];
$rules = $_POST['rules'];

if (!isset($title, $startpoint, $destination, $start_date, $end_date, $price, $crew_capacity)) {
    echo "Please fill out the remaining fields";
} else {
    // Handle file upload
    $trip_img = ''; // Default value
    if (isset($_FILES['trip_img']) && $_FILES['trip_img']['error'] === UPLOAD_ERR_OK) {
        $tempPath = $_FILES['trip_img']['tmp_name'];
        $uploadPath = '../../public/trip_img/' . $_FILES['trip_img']['name'];
        
        move_uploaded_file($tempPath, $uploadPath);
        $trip_img = $uploadPath;
    }

    // Insert user data into the database
    $insertQuery = 
    "INSERT INTO trip (title, description, startpoint, destination, start_date, end_date, price, crew_capacity, captain_ID, rules, trip_img) 
    VALUES ('$title', '$description', '$startpoint', '$destiantion', '$start_date', '$end_date', '$price', '$crew_capacity', '$captain_ID', '$rules', '$trip_img')";

    if ($mySQL->query($insertQuery) === TRUE) {
        echo "Trip registered successfully";
    } else {
        echo "Error: " . $insertQuery . "<br>" . $mySQL->error;
    }
}

$mySQL->close();

?>