<?php
include '../db/mysql.php';

$response = array('success' => false, 'acceptedCrew' => array(), 'error' => '');

if (isset($_GET['trip'])) {
    try {
        $tripId = $_GET['trip'];

        $sql = "SELECT crewmember.firstname, crewmember.lastname, crewmember.pk_id, crewmember.profilePicture
                FROM applications
                JOIN crewmember ON applications.crewmember_ID = crewmember.pk_id
                WHERE applications.trip_ID = ? AND applications.applicationStatus = 'accepted'";

        $stmt = $mySQL->prepare($sql);

        if ($stmt === false) {
            throw new Exception("Database error: " . $mySQL->error);
        }

        $stmt->bind_param("i", $tripId);

        if (!$stmt->execute()) {
            throw new Exception("Query execution error: " . $stmt->error);
        }

        $result = $stmt->get_result();
        $acceptedCrew = array();

        while ($row = $result->fetch_assoc()) {
            $acceptedCrew[] = $row;
        }

        $response['success'] = true;
        $response['acceptedCrew'] = $acceptedCrew;

        $stmt->close();
    } catch (Exception $e) {
        $response['error'] = $e->getMessage();
        error_log("Error in PHP script: " . $e->getMessage());
    }
}

header('Content-Type: application/json');
echo json_encode($response);
?>
