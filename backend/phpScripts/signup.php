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
$age = date("Y-m-d", strtotime($_POST['age']));
$role = $_POST['role'];
$experience = $_POST['exp']; // Added line for experience
$country = $_POST['country']; // Added line for country

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['error' => 'Email must contain @']);
    exit;
}

// Hash the password (you should use a stronger hashing method in a production environment)
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Check if the email already exists in either table
$checkEmailQuery = "SELECT * FROM captains WHERE email = '$email' UNION SELECT * FROM crewmember WHERE email = '$email'";
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
                $profilePicture = $_FILES['profilePicture']['name'];
            } else {
                echo json_encode(['error' => 'File size exceeds the limit']);
                exit;
            }
        } else {
            echo json_encode(['error' => 'Invalid file type. Allowed types: jpg, jpeg, png']);
            exit;
        }
    } else {
        $profilePicture = 'defaultProfilePicture.png'; // Default value
    }

    // Insert the user based on the specified role
    if ($role === 'captains') {
        $insertCaptainQuery = "INSERT INTO captains (email, password, firstName, lastName, age, exp, country, profilePicture, role) 
                        VALUES ('$email', '$hashedPassword', '$firstName', '$lastName', '$age', '$experience', '$country', '$profilePicture', 'captain')";
        
        if ($mySQL->query($insertCaptainQuery) === TRUE) {
            // Retrieve the newly created captain's ID
            $captainID = $mySQL->insert_id;

            // Create a boat for the captain
            $insertBoatQuery = "INSERT INTO boats (captainID, brand, model, year, length, toilet, shower, kitchen, gps, wifi, power) 
                                VALUES ('$captainID', '', '', 0, '', 0, 0, '', 0, 0, 0)";
            
            if ($mySQL->query($insertBoatQuery) === TRUE) {
                // Log in the captain
                $_SESSION['user_id'] = $captainID;
                $_SESSION['email'] = $email;

                echo "User registered successfully";
            } else {
                echo json_encode(['error' => 'Error creating boat for the captain']);
            }
        } else {
            echo json_encode(['error' => $mySQL->error]);
        }
    } elseif ($role === 'crewmember') {
        $insertCrewQuery = "INSERT INTO crewmember (email, password, firstName, lastName, age, exp, country, profilePicture, role) 
                        VALUES ('$email', '$hashedPassword', '$firstName', '$lastName', '$age', '$experience', '$country', '$profilePicture', 'crewmember')";
        
        if ($mySQL->query($insertCrewQuery) === TRUE) {
            // Retrieve the newly created crew member's ID
            $crewMemberID = $mySQL->insert_id;

            // Log in the crew member
            $_SESSION['user_id'] = $crewMemberID;
            $_SESSION['email'] = $email;

            echo "User registered successfully";
        } else {
            echo json_encode(['error' => $mySQL->error]);
        }
    }
}

$mySQL->close();
?>
