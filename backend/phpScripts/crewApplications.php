<?php
include '../db/mysql.php';

$response = array('success' => false, 'applications' => array(), 'error' => '');

if (isset($_POST['crewMemberId'])) {
    try {
        $crewMemberId = $_POST['crewMemberId'];

        $sql = "SELECT trip_card.title, trip_card.pk_id, trip_card.img, applications.applicationStatus 
        FROM trip_card 
        JOIN applications ON trip_card.pk_id = applications.trip_ID 
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
