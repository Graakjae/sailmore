<?php
include '../../db/mysql.php';
session_start();

$response = array('success' => false, 'applications' => array(), 'error' => '');

if (!isset($_SESSION['user_id'])) {
    $response['error'] = 'Unauthorized access';
} else {
    try {
        $captainId = $_SESSION['user_id'];

        // Check for captain's decision (accept or decline)
        $action = $_POST['action'] ?? null;
        $applicationId = $_POST['applicationId'] ?? null;

        if ($action && $applicationId) {
            // Update application status based on the captain's decision
            $updateSql = "UPDATE applications SET applicationStatus = ? WHERE pk_id = ?";
            $updateStmt = $mySQL->prepare($updateSql);

            if ($updateStmt === false) {
                throw new Exception("Database error: " . $mySQL->error);
            }

            $updateStmt->bind_param("si", $action, $applicationId);

            if (!$updateStmt->execute()) {
                throw new Exception("Query execution error: " . $updateStmt->error);
            }

            $updateStmt->close();
        }

        // Fetch updated applications
        $sql = "SELECT applications.*, crewmember.firstname AS crewmember_firstname, trip.title AS trip_title, trip.crew_capacity AS trip_crew_capacity
                FROM applications
                JOIN crewmember ON applications.crewmember_ID = crewmember.pk_id
                JOIN trip ON applications.trip_ID = trip.pk_id
                WHERE trip.captain_ID = ?
                ORDER BY applications.pk_id DESC";

        $stmt = $mySQL->prepare($sql);

        if ($stmt === false) {
            throw new Exception("Database error: " . $mySQL->error);
        }

        $stmt->bind_param("i", $captainId);

        if (!$stmt->execute()) {
            throw new Exception("Query execution error: " . $stmt->error);
        }

        $result = $stmt->get_result();
        $applications = array();

        while ($row = $result->fetch_assoc()) {
            $applications[] = $row;
        }

        $response['success'] = true;
        $response['applications'] = $applications;

        $stmt->close();
    } catch (Exception $e) {
        $response['error'] = $e->getMessage();
        error_log("Error in PHP script: " . $e->getMessage());
    }
}

header('Content-Type: application/json');
echo json_encode($response);
?>
