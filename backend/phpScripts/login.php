<?php 
include '../../db/mysql.php';
session_start();
// Get data from POST request

$email = $_POST['email'];
$password = $_POST['password'];

// Retrieve user data from the database based on the provided email
$getUserQuery = "SELECT * FROM users WHERE email = '$email'";
$getUserResult = $mySQL->query($getUserQuery);

if ($getUserResult->num_rows > 0) {
    // User found, check the password
    $user = $getUserResult->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        // Set user information in the session
        $_SESSION['user_id'] = $user['pk_id'];
        $_SESSION['email'] = $user['email'];

        echo "Login successful";
    } else {
        echo "Incorrect password";
    }
} else {
    echo "User not found";
}

$mySQL->close();