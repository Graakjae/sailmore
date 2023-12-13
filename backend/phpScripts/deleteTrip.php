<?php
include "../db/mysql.php";

$tripID = intval(basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)));

session_start();
$userID = $_SESSION['user_id'];

// Initialize response array
$response = array();

// First, delete related records in the 'applications' table
$deleteApplicationsQuery = "DELETE FROM applications WHERE trip_ID = ?";
$deleteApplicationsStmt = $mySQL->prepare($deleteApplicationsQuery);
$deleteApplicationsStmt->bind_param("i", $tripID);

// Execute the statement to delete applications
if ($deleteApplicationsStmt->execute()) {
    // Now, delete related records in the 'trip_img' table
    $deleteImagesQuery = "DELETE FROM trip_img WHERE trip_ID = ?";
    $deleteImagesStmt = $mySQL->prepare($deleteImagesQuery);
    $deleteImagesStmt->bind_param("i", $tripID);

    // Execute the statement to delete images
    if ($deleteImagesStmt->execute()) {
        // Finally, delete the trip
        $deleteTripQuery = "DELETE FROM trip WHERE captain_ID = ? AND pk_id = ?";
        $deleteTripStmt = $mySQL->prepare($deleteTripQuery);
        $deleteTripStmt->bind_param("ii", $userID, $tripID);

        // Execute the statement to delete the trip
        if ($deleteTripStmt->execute()) {
            $response['success'] = true;
            $response['message'] = 'Trip, related applications, and images deleted successfully';
        } else {
            // Include error in response
            $response['success'] = false;
            $response['error'] = 'MySQL Error: ' . $deleteTripStmt->error;
        }

        // Close the statement for deleting the trip
        $deleteTripStmt->close();
    } else {
        // Include error in response
        $response['success'] = false;
        $response['error'] = 'MySQL Error: ' . $deleteImagesStmt->error;
    }

    // Close the statement for deleting images
    $deleteImagesStmt->close();
} else {
    // Include error in response
    $response['success'] = false;
    $response['error'] = 'MySQL Error: ' . $deleteApplicationsStmt->error;
}

// Close the statement for deleting applications and the MySQL connection
$deleteApplicationsStmt->close();
$mySQL->close();

// Output response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
