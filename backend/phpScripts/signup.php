<?php
include '../../db/mysql.php';
session_start();

// Set maximum allowed file size to 2MB
$maxFileSize = 2 * 1024 * 1024; // 2 MB

// Set maximum allowed post size to 4MB (to account for additional form data)
ini_set('upload_max_filesize', $maxFileSize);
ini_set('post_max_size', $maxFileSize * 2);

// Get data from POST request
$email = $_POST['email'];
$password = $_POST['password'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$age = $_POST['age'];
$role = $_POST['role'];  

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Email must contain @";
    exit;
}

// Hash the password (you should use a stronger hashing method in a production environment)
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$checkEmailQuery = ""; // Initialize the variable

if ($role === 'captains') {
    $checkEmailQuery = "SELECT * FROM captains WHERE email = '$email'";
} elseif ($role === 'crewmember') {
    $checkEmailQuery = "SELECT * FROM crewmember WHERE email = '$email'";
} else {
    echo json_encode(['error' => 'Select a role']);
    exit;
}

$checkEmailResult = $mySQL->query($checkEmailQuery);

if ($checkEmailResult->num_rows > 0) {
    echo json_encode(['error' => 'Email already exists']);
} else {
    // Handle file upload
    if (isset($_FILES['profilePicture']) && $_FILES['profilePicture']['error'] === UPLOAD_ERR_OK) {
        $allowedExtensions = ['jpg', 'jpeg', 'png'];

        $tempPath = $_FILES['profilePicture']['tmp_name'];
        $uploadPath = '../../public/profilePictures/' . $_FILES['profilePicture']['name'];
        $fileInfo = pathinfo($uploadPath);
        $fileExtension = strtolower($fileInfo['extension']);

        // Check if the file extension is allowed
        if (in_array($fileExtension, $allowedExtensions)) {
            // Check if the file size is within the allowed limit
            if ($_FILES['profilePicture']['size'] <= $maxFileSize) {
                move_uploaded_file($tempPath, $uploadPath);
                $profilePicture = $uploadPath;
            } else {
                echo json_encode(['error' => 'File size exceeds the limit']);
                exit;
            }
        } else {
            echo json_encode(['error' => 'Invalid file type. Allowed types: jpg, jpeg, png']);
            exit;
        }
    } else {
        $profilePicture = '/defaultProfilePicture.png'; // Default value
    }

    if ($role === 'captains') {
        $insertQuery = "INSERT INTO captains (email, password, firstName, lastName, age, profilePicture, role) 
                        VALUES ('$email', '$hashedPassword', '$firstName', '$lastName', '$age', '$profilePicture', 'captain')";
    } elseif ($role === 'crewmember') {
        $insertQuery = "INSERT INTO crewmember (email, password, firstName, lastName, age, profilePicture, role) 
                        VALUES ('$email', '$hashedPassword', '$firstName', '$lastName', '$age', '$profilePicture', 'crewmember')";
    } else {
        echo "Invalid role";
        exit;
    }

    if ($mySQL->query($insertQuery) === TRUE) {

        // Retrieve user data from the database based on the provided email
        $getUserQuery = "SELECT * FROM $role WHERE email = '$email'";
        $getUserResult = $mySQL->query($getUserQuery);

        $loggedInUser = $getUserResult->fetch_assoc();

        if ($loggedInUser) {
            $_SESSION['user_id'] = $loggedInUser['pk_id'];
            $_SESSION['email'] = $loggedInUser['email'];
            echo "User registered successfully";
        } else {
            echo json_encode(['error' => 'User not found after signup']);
        }
    } else {
        echo json_encode(['error' => $mySQL->error]);
    }
}

$mySQL->close();

?>