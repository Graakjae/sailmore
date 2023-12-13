<?php

include '../db/mysql.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "You must be logged in to apply for a trip"]);
    exit();
}

// Check for POST data
if (isset($_POST['msg']) && isset($_POST['trip_ID'])) {
    $msg = $_POST['msg'];
    $trip_ID = $_POST['trip_ID'];
    $crewmember_ID = $_SESSION['user_id'];

    // Use prepared statements to prevent SQL injection
    $sql = "INSERT INTO applications (msg, trip_ID, crewmember_ID) VALUES (?, ?, ?)";
    $stmt = $mySQL->prepare($sql);
    $stmt->bind_param("sii", $msg, $trip_ID, $crewmember_ID);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Application submitted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error submitting application: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid data received"]);
}

$mySQL->close();
?>
