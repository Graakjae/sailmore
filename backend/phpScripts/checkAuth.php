<?php
include '../../db/mysql.php';
session_start();

$response = array('loggedIn' => false, 'userId' => null, 'role' => 'none');

// Check if the user is logged in
if (isset($_SESSION['user_id'])) {
    $response['loggedIn'] = true;
    $email = $_SESSION['email']; // Make sure this matches the session variable name

    // Check captains table
    $captainQuery = "SELECT pk_id FROM captains WHERE email = '$email'";
    $captainResult = $mySQL->query($captainQuery);

    if ($captainResult) {
        $captainRow = $captainResult->fetch_assoc();
        if ($captainRow) {
            $response['userId'] = $_SESSION['user_id'];
            $response['role'] = 'captain';
        }
    }

    // Check crewmembers table if role is not set
    if ($response['role'] === 'none') {
        $crewQuery = "SELECT pk_id FROM crewmember WHERE email = '$email'";
        $crewResult = $mySQL->query($crewQuery);

        if ($crewResult) {
            $crewRow = $crewResult->fetch_assoc();
            if ($crewRow) {
                $response['userId'] = $_SESSION['user_id'];
                $response['role'] = 'crewmember';
            }
        }
    }

    if (!isset($response['role'])) {
        $response['error'] = "User not found in captains or crewmembers table.";
    }
} else {
    $response['error'] = "User is not logged in.";
}

header('Content-Type: application/json');
echo json_encode($response);
?>
