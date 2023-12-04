<?php
include "../../db/mysql.php";
session_start();
$userID = $_SESSION['user_id'];
$brand = $_POST['brand'];
$model = $_POST['model'];
$year = $_POST['year'];
$length = $_POST['length'];
$toilet = $_POST['toilet'];
$shower = $_POST['shower']=== 'true' ? 1 : 0;
$kitchen = $_POST['kitchen']=== 'true' ? 1 : 0;
$gps = $_POST['gps']=== 'true' ? 1 : 0;
$wifi = $_POST['wifi']=== 'true' ? 1 : 0;
$power = $_POST['power']=== 'true' ? 1 : 0;

// Use prepared statements to prevent SQL injection
$query = "UPDATE boats SET brand = ?, model = ?, year = ?, length = ?, toilet = ?, shower = ?, kitchen = ?, gps = ?, wifi = ?, power = ? WHERE captainID = ?";
$stmt = $mySQL->prepare($query);

// Bind parameters
$stmt->bind_param("ssiiiiiiiii", $brand, $model, $year, $length, $toilet, $shower, $kitchen, $gps, $wifi, $power, $userID);

// Initialize response array
$response = array();

// Execute the statement
if ($stmt->execute()) {
    $response['message'] = 'Boat updated successfully';
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
