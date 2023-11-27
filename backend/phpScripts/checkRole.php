<?php
include '../../db/mysql.php';
session_start();

// Check if the user is a captain
$checkCaptainQuery = "SELECT role FROM captains WHERE email = '{$_SESSION['email']}'";
$captainResult = $mySQL->query($checkCaptainQuery);
$captainRow = $captainResult->fetch_assoc();

if ($captainRow && $captainRow['role'] === 'captain') {
    $userRole = 'captain';    
} 

// Check if the user is a crewmember
$checkCrewmemberQuery = "SELECT role FROM crewmember WHERE email = '{$_SESSION['email']}'";
$crewmemberResult = $mySQL->query($checkCrewmemberQuery);
$crewmemberRow = $crewmemberResult->fetch_assoc();

if ($crewmemberRow && $crewmemberRow['role'] === 'crewmember') {
    $userRole = 'crewmember';    
}

if (!isset($_SESSION['email'])) {
    echo "not logged in";
}

// Send a JSON response
header('Content-Type: application/json');
echo json_encode(['role' => $userRole]);

$mySQL->close();
?>
