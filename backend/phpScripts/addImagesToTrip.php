<?php
include "../../db/mysql.php";

$tripID = intval(basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)));

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tripImages = $_FILES['trip_img'];

    foreach ($tripImages['tmp_name'] as $key => $tempPath) {
        // Adjust the uploadPath to include the correct directory structure
        $originalFileName = $tripImages['name'][$key];
        $uploadPath = '/../../public/trip_img/' . $originalFileName;

        // Create the destination directory if it doesn't exist
        $destinationDirectory = '/../../public/trip_img/';
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
} else {
    $response['error'] = 'Invalid request method.';
    echo json_encode($response);
}
?>
