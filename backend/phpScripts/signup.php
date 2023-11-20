<?php
include '../../db/mysql.php';
session_start();

// // Check if the user is not logged in, redirect to the login page
// if (!isset($_SESSION['user_id'])) {
//     header("Location: /login.php");
//     exit();
// }

// Get data from POST request
$email = $_POST['email'];
$password = $_POST['password'];

// Hash the password (you should use a stronger hashing method in a production environment)
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Check if the email already exists
$checkEmailQuery = "SELECT * FROM captains WHERE email = '$email'";
$checkEmailResult = $mySQL->query($checkEmailQuery);

if ($checkEmailResult->num_rows > 0) {
    echo "Email already exists";
} else {
    // Insert user data into the database
    $insertQuery = "INSERT INTO captains (email, password) VALUES ('$email', '$hashedPassword')";

    if ($mySQL->query($insertQuery) === TRUE) {
        echo "User registered successfully";
    } else {
        echo "Error: " . $insertQuery . "<br>" . $mySQL->error;
    }
}

$mySQL->close();
?>
