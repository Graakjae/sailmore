<?php
include '../../db/mysql.php';

$response = array('success' => false, 'applications' => array(), 'error' => '');

if (isset($_POST['crewMemberId'])) {
    try {
        $crewMemberId = $_POST['crewMemberId'];

        $sql = "SELECT applications.pk_id, applications.applicationStatus, 
                trip.title
                FROM applications
                JOIN trip ON applications.trip_ID = trip.pk_id
                WHERE applications.crewmember_ID = ?";

        $stmt = $mySQL->prepare($sql);

        if ($stmt === false) {
            throw new Exception("Database error: " . $mySQL->error);
        }

        $stmt->bind_param("i", $crewMemberId);

        if (!$stmt->execute()) {
            throw new Exception("Query execution error: " . $stmt->error);
        }

        $result = $stmt->get_result();
        $crewMemberApplications = array();

        while ($row = $result->fetch_assoc()) {
            $crewMemberApplications[] = $row;
        }

        $response['success'] = true;
        $response['applications'] = $crewMemberApplications;

        $stmt->close();
    } catch (Exception $e) {
        $response['error'] = $e->getMessage();
        error_log("Error in PHP script: " . $e->getMessage());
    }
}

header('Content-Type: application/json');
echo json_encode($response);
?>
