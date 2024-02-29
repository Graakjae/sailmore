<?php
include "../db/mysql.php";

$rootPath = $_SERVER['DOCUMENT_ROOT'];

$tripID = intval(basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)));

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

$query = "UPDATE trip SET title = ?, description = ?, startpoint = ?, destination = ?, start_date = ?, end_date = ?, price = ?, crew_capacity = ?, rules = ? WHERE captain_ID = ? AND pk_id = ?";
$stmt = $mySQL->prepare($query);

// Bind parameters
$stmt->bind_param("ssssssiissi", $title, $description, $startpoint, $destination, $start_date, $end_date, $price, $crew_capacity, $rules, $userID, $tripID);


if(isset($_FILES['trip_img'])) {
    
    $tripImages = $_FILES['trip_img'];

    foreach ($tripImages['tmp_name'] as $key => $tempPath) {
        // Adjust the uploadPath to include the correct directory structure
        $originalFileName = $userID . "_" . $tripImages['name'][$key];
        $uploadPath = $rootPath . '/public/trip_img/' . $originalFileName;
        // Create the destination directory if it doesn't exist
        $destinationDirectory = $rootPath . '/public/trip_img/';
        if (!is_dir($destinationDirectory)) {
            mkdir($destinationDirectory, 0755, true);
        }

        if (move_uploaded_file($tempPath, $uploadPath)) {
            // Insert each image into the trip_img table with the original file name
            $insertImages =
                "INSERT INTO trip_img (img, trip_ID) VALUES ('$originalFileName', '$tripID')";
            if ($mySQL->query($insertImages) !== TRUE) {
                echo "Error inserting images: " . $insertImages . "<br>" . $mySQL->error;
                exit;
            }
        } else {
            echo "Error moving uploaded file: $tempPath to $uploadPath<br>";
        }
    }
}


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
