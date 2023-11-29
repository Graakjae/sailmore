<?php
include('../../db/mysql.php');

// Add this after establishing the database connection
if ($mySQL->connect_error) {
    die("Connection failed: " . $mySQL->connect_error);
}


session_start();

// Get data from POST request
$title = $_POST['title'];
$description = $_POST['description'];
$startpoint = $_POST['startpoint'];
$destination = $_POST['destination'];
$start_date = date("Y-m-d", strtotime($_POST['start_date']));
$end_date = date("Y-m-d", strtotime($_POST['end_date']));
$price = $_POST['price'];
$crew_capacity = $_POST['crew_capacity'];
$captain_ID = $_SESSION['user_id'];
$rules = $_POST['rules'];

if (!isset($title, $startpoint, $destination, $start_date, $end_date, $price, $crew_capacity)) {
    echo "Please fill out the remaining fields";
} else {
    // Insert user data into the database
    $insertQuery =
        "INSERT INTO trip (title, description, startpoint, destination, start_date, end_date, price, crew_capacity, captain_ID, rules) 
    VALUES ('$title', '$description', '$startpoint', '$destination', '$start_date', '$end_date', '$price', '$crew_capacity', '$captain_ID', '$rules')";
    // Add this after your SQL queries
    if ($mySQL->query($insertQuery) === TRUE) {
        // Get the ID of the last inserted trip
        $tripId = $mySQL->insert_id;

        // $dropView = "DROP VIEW trip_card";
        // $mySQL->query($dropView);

        // $createView = "CREATE VIEW trip_card AS
        // SELECT title, start_date, startpoint, destination, end_date, price, img FROM trip
        // INNER JOIN trip_img
        // ON trip.pk_id = trip_img.trip_ID
        // WHERE trip_img.primary_img = 1";
        // $mySQL->query($createView);

if (!empty($_FILES['trip_img']['name'][0])) {
    $tripImages = $_FILES['trip_img'];

    foreach ($tripImages['tmp_name'] as $key => $tempPath) {
        // Adjust the uploadPath to include the correct directory structure
        $originalFileName = $tripImages['name'][$key];
        $uploadPath = '../../public/trip_img/' . $originalFileName;

        // Create the destination directory if it doesn't exist
        $destinationDirectory = '../../public/trip_img/';
        if (!is_dir($destinationDirectory)) {
            mkdir($destinationDirectory, 0755, true);
        }

        

        if (move_uploaded_file($tempPath, $uploadPath)) {
            // Insert each image into the trip_img table with the original file name
            $insertImages =
                "INSERT INTO trip_img (img, trip_ID) VALUES ('$originalFileName', '$tripId')";

            if ($mySQL->query($insertImages) !== TRUE) {
                echo "Error inserting images: " . $insertImages . "<br>" . $mySQL->error;
                exit;
            }
        } else {
            echo "Error moving uploaded file: $tempPath to $uploadPath<br>";
        }
    }
}
        
        echo "Trip registered successfully";
    } else {
        echo "Error: " . $insertQuery . "<br>" . $mySQL->error;
    }
}

$mySQL->close();

?>
