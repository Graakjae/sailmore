<?php
include "../../db/mysql.php";

$userId = intval(basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)));

$sqlTrips = "SELECT pk_id, title, start_date, end_date, price, description, startpoint, destination, crew_capacity, rules FROM trip WHERE pk_id = ?";
$stmtTrips = $mySQL->prepare($sqlTrips);
$stmtTrips->bind_param("i", $userId);
$stmtTrips->execute();
$resultTrips = $stmtTrips->get_result();

if ($resultTrips === false) {
    // Output any MySQL errors
    echo json_encode(array('error' => 'MySQL Error: ' . $mySQL->error));
} else {
    $dataTrips = array();

    if ($resultTrips->num_rows > 0) {
        while ($row = $resultTrips->fetch_assoc()) {
            $tripId = $row['pk_id'];

            $dataTrips[] = array(
                'pk_id' => $row['pk_id'],
                'title' => $row['title'],
                'start_date' => $row['start_date'],
                'end_date' => $row['end_date'],
                'price' => $row['price'],
                'description' => $row['description'],
                'startpoint' => $row['startpoint'],
                'destination' => $row['destination'],
                'crew_capacity' => $row['crew_capacity'],
                'rules' => $row['rules'],

            );
        }
    } else {
        $dataTrips = array('message' => 'No data found');
    }

    header('Content-Type: application/json');
    echo json_encode($dataTrips);
}

$mySQL->close();
?>
