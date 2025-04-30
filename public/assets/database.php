<?php
session_start();
// Configure the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "b-pavillion";

// Create a connession
$conn = new mysqli($servername, $username, $password, $dbname);

// Connection check
if ($conn->connect_error) {
    exit("Connection failed: " . $conn->connect_error);
}

// Get the form data
$email = $_POST['email'];

$stmt = $conn->prepare("INSERT INTO users (email) VALUES (?)");
$stmt->bind_param("s", $email);

if ($stmt->execute()) {
    $_SESSION['email'] = $email;

    header("Location: newsletter-page.php");
    exit();
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();