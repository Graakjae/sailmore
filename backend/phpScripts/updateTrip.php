<?php
include "../../db/mysql.php";

session_start();

// Initialize response array
$response = array();

try {
    // Check if the user is logged in (adjust as needed)
    if (!isset($_SESSION['user_id'])) {
        throw new Exception('User not logged in');
    }

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
    $query = "UPDATE trip SET title = ?, description = ?, startpoint = ?, destination = ?, start_date = ?, end_date = ?, price = ?, crew_capacity = ?, rules = ? WHERE captainID = ?";
    $stmt = $mySQL->prepare($query);

    // Bind parameters
    $stmt->bind_param("ssssssiiis", $title, $description, $startpoint, $destination, $start_date, $end_date, $price, $crew_capacity, $rules, $userID);

    // Execute the statement
    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Trip updated successfully';
    } else {
        // Include error in response
        $response['success'] = false;
        $response['message'] = 'Error updating trip: ' . $stmt->error;
    }

    // Close the statement
    $stmt->close();
} catch (Exception $e) {
    // Handle exceptions
    $response['success'] = false;
    $response['message'] = 'Error updating trip: ' . $e->getMessage();
} finally {
    // Close the MySQL connection
    $mySQL->close();
}

// Output response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>

