<?php
include "../../db/mysql.php";
session_start();
$userID = $_SESSION['user_id'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$password = $_POST['password'];
$bio = $_POST['bio'];
$country = $_POST['country'];
$exp = $_POST['exp'];

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Use prepared statements to prevent SQL injection
$query = "UPDATE crewmember SET firstName = ?, lastName = ?, email =?, password = ?, bio = ?, country = ?, exp = ? WHERE pk_id = ?";
$stmt = $mySQL->prepare($query);

// Bind parameters
$stmt->bind_param("sssssssi", $firstName, $lastName, $email, $hashedPassword, $bio, $country, $exp, $userID);

// Execute the statement
if ($stmt->execute()) {
    // Check if a new profile picture is provided
    if (isset($_FILES['profilePicture']) && $_FILES['profilePicture']['error'] === UPLOAD_ERR_OK) {
        // Handle file upload for profile picture
        $allowedExtensions = ['jpg', 'jpeg', 'png'];
        $tempPath = $_FILES['profilePicture']['tmp_name'];
        $uploadPath = '../../public/profilePictures/' . $_FILES['profilePicture']['name'];
        $fileInfo = pathinfo($uploadPath);
        $fileExtension = strtolower($fileInfo['extension']);

        // Check if the file extension is allowed
        if (in_array($fileExtension, $allowedExtensions)) {
            move_uploaded_file($tempPath, $uploadPath);

            // Update the profile picture filename in the database
            $profilePictureFilename = $_FILES['profilePicture']['name'];
            $updateProfilePictureQuery = "UPDATE crewmember SET profilePicture = ? WHERE pk_id = ?";
            $stmtProfilePicture = $mySQL->prepare($updateProfilePictureQuery);
            $stmtProfilePicture->bind_param("si", $profilePictureFilename, $userID);

            if ($stmtProfilePicture->execute()) {
                echo json_encode(['message' => 'Profile and profile picture updated successfully']);
            } else {
                echo json_encode(['error' => 'Error updating profile picture']);
            }
            

            $stmtProfilePicture->close();
        } else {
            echo json_encode(['error' => 'Invalid file type. Allowed types: jpg, jpeg, png']);
        }
    } else {
        echo json_encode(['message' => 'Profile updated successfully']);
    }
} else {
    echo json_encode(['error' => 'Error updating profile']);
}

// Close the statement and the MySQL connection
$stmt->close();
$mySQL->close();
?>
