<?php
include '../../db/mysql.php';
session_start();

// Get data from POST request
$email = $_POST['email'];
$password = $_POST['password'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$age = $_POST['age'];

// Hash the password (you should use a stronger hashing method in a production environment)
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Check if the email already exists
$checkEmailQuery = "SELECT * FROM captains WHERE email = '$email'";
$checkEmailResult = $mySQL->query($checkEmailQuery);

if ($checkEmailResult->num_rows > 0) {
    echo json_encode(['error' => 'Email already exists']);
} else {
    // Handle file upload
    $profilePicture = ''; // Default value
    if (isset($_FILES['profilePicture']) && $_FILES['profilePicture']['error'] === UPLOAD_ERR_OK) {
        $tempPath = $_FILES['profilePicture']['tmp_name'];
        $uploadPath = '../../public/profilePictures/' . $_FILES['profilePicture']['name'];

        move_uploaded_file($tempPath, $uploadPath);
        $profilePicture = $uploadPath;
    }

    // Insert user data into the database
    $insertQuery = 
    "INSERT INTO captains (email, password, firstName, lastName, age, profilePicture) 
    VALUES ('$email', '$hashedPassword', '$firstName', '$lastName', '$age', '$profilePicture')";

    if ($mySQL->query($insertQuery) === TRUE) {
        // Retrieve user data from the database based on the provided email
        $getUserQuery = "SELECT * FROM captains WHERE email = '$email'";
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
