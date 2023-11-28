<?php
include '../../db/mysql.php';
session_start();

// Initialize variables
$userRole = 'none';
$userId = null;

// Check if the user is a captain
$checkCaptainQuery = "SELECT role, pk_id FROM captains WHERE email = '{$_SESSION['email']}'";
$captainResult = $mySQL->query($checkCaptainQuery);
$captainRow = $captainResult->fetch_assoc();

if ($captainRow && $captainRow['role'] === 'captain') {
    $userRole = 'captain';
    $userId = $captainRow['pk_id'];
}

// Check if the user is a crewmember
$checkCrewmemberQuery = "SELECT role, pk_id FROM crewmember WHERE email = '{$_SESSION['email']}'";
$crewmemberResult = $mySQL->query($checkCrewmemberQuery);
$crewmemberRow = $crewmemberResult->fetch_assoc();

if ($crewmemberRow && $crewmemberRow['role'] === 'crewmember') {
    $userRole = 'crewmember';
    $userId = $crewmemberRow['pk_id'];
}

// Check if not logged in
if (!isset($_SESSION['email'])) {
    echo json_encode(['role' => 'none']);
} else {
    // Send a JSON response
    header('Content-Type: application/json');
    echo json_encode(['role' => $userRole, 'userId' => $userId]);
}

$mySQL->close();
?>
