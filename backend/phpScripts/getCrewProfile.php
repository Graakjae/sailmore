<?php
include "../../db/mysql.php";

// Retrieve user ID from the URL path
$userId = intval(basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)));

$data = array();

// Use prepared statements to prevent SQL injection
$sql = "SELECT * FROM crewmember WHERE pk_id = ?";
$stmt = $mySQL->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result === false) {
    // Output any MySQL errors
    echo json_encode(array('error' => 'MySQL Error: ' . $mySQL->error));
} else {
    if ($result->num_rows > 0) {
        $data = $result->fetch_assoc();

        // Convert boolean values to actual booleans
        // $booleanFields = array('age');
        // foreach ($booleanFields as $field) {
        //     if (isset($data[$field])) {
        //         $data[$field] = (bool)$data[$field];
        //     }
        // }
    } else {
        $data = array('message' => 'No data found');
}
}

header('Content-Type: application/json');
echo json_encode($data);

// Close the MySQL connection
$mySQL->close();
?>